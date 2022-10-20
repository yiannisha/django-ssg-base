import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import replace from 'gulp-replace';
import { deleteAsync } from 'del';

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

// build task
gulp.task('build', gulp.series('process-images'));