import fs from 'fs';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import replace from 'gulp-replace';
import rev from 'gulp-rev';
import cleanCSS from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';
import concatCSS from 'gulp-concat-css';
import gulpRemoveHtml from 'gulp-remove-html';
import { deleteAsync } from 'del';

const STATIC_DIR = './dist/static';
const IMG_DIR = STATIC_DIR + '/img';
const CSS_DIR = STATIC_DIR + '/css';

// --- IMAGES ---

// compress JPEG, JPG, PNG and GIF images 
gulp.task('imagemin', function () {
    return gulp.src('./dist/static/img/*.{png,jpeg,jpg,gif}')
           .pipe(imagemin({
                optimizationLevel: 3,
                progressive: true,
                interlaced: true
            }))
            .pipe(gulp.dest('./dist/static/img'));
});

// convert JPEG, JPG, PNG and GIF to WEBP
gulp.task('webp', function () {
    return gulp.src('./dist/static/img/*.{png,jpeg,jpg,gif}')
           .pipe(webp())
           .pipe(gulp.dest('./dist/static/img'));

});

// remove JPEG, JPG, PNG and GIF images from dist/static/img
gulp.task('delete-images', function () {
    return deleteAsync(['dist/static/img/*.{jpeg,png,jpg,gif}']);
})

// replace paths to JPEG, JPG, PNG and GIF images in HTML with paths
// the converted WEBP images
gulp.task('replace-image-paths', function () {
    return gulp.src('./dist/*.html')
           .pipe(replace(/jpeg|jpg|png|gif/g, 'webp'))
           .pipe(gulp.dest('./dist'));
});

gulp.task('process-images', gulp.series('imagemin', 'webp', 'delete-images', 'replace-image-paths'));

// --- CSS Files ---

// Minify CSS files
gulp.task('minify-css', function () {
    return gulp.src(`${CSS_DIR}/*.css`)
           .pipe(cleanCSS())
           .pipe(gulp.dest(CSS_DIR));
});

// Concatenate CSS files
gulp.task('concat-css', function () {
    return gulp.src('./dist/static/css/*.css')
           .pipe(concatCSS('main.css'))
           .pipe(gulp.dest(CSS_DIR));
});

// Add hash to main CSS file name
gulp.task('rev-css', function () {
    return gulp.src(`${CSS_DIR}/main.css`)
           .pipe(rev())
           .pipe(gulp.dest(CSS_DIR))
           .pipe(rev.manifest())
           .pipe(gulp.dest('./config'));
});

// Remove extra CSS files from dist
gulp.task('remove-extra-css', function () {
    return deleteAsync([`${CSS_DIR}/*.css`, `!${CSS_DIR}/main-*.css`]);
});

gulp.task('process-css', gulp.series('minify-css', 'concat-css', 'rev-css', 'remove-extra-css'));

// --- HTML Files ---


// Remove links to css files and unnecessary comments in HTML files
gulp.task('remove-css-links', function () {
    return gulp.src('./dist/*html')
        .pipe(gulpRemoveHtml())
        .pipe(gulp.dest('./dist'));
});

// Replace CSS file paths in HTML files
gulp.task('replace-css-path', async function () {
    fs.readFile('./config/rev-manifest.json', 'utf-8', (err, jsonString) => {
        if (err) {
            throw err;
        }
        const mainCssFilename = JSON.parse(jsonString)['main.css'];
        return gulp.src('./dist/*html')
        .pipe(replace(/\/[a-zA-Z\d\.]+\.css/g, `/${mainCssFilename}`))
        .pipe(gulp.dest('./dist'));
    });
});

// Minify HTML files
gulp.task('htmlmin', function () {
    return gulp.src('./dist/*.html')
           .pipe(htmlmin({ collapseWhitespace: true }))
           .pipe(gulp.dest('./dist'));
});

gulp.task('process-html', gulp.series('htmlmin', 'remove-css-links', 'replace-css-path'));

// build task
gulp.task('build', gulp.series('process-images', 'process-html', 'process-css'));
