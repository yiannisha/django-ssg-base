const path = require('path');
const fs = require('fs');

/**
 *  
 * @returns {list[str]} entryPoints: list of app js bundle entry points 
 */
 function getEntryPoints () {
    // get all directories that are apps (search for a templates folder inside)
    var entryPoints = {};
    
    fs.readdirSync(__dirname).forEach((folder) => {
        if (folder === path.basename(__dirname)) {
            return;
        }
        
        if (fs.lstatSync(folder).isDirectory()) {
            const isApp = fs.readdirSync(folder).find((subfolder) => subfolder === "templates");
            if (isApp) {
                const staticPath = path.join(folder, "static");
                const hasJS = fs.readdirSync(staticPath).find((sub) => sub === "js");
                if (hasJS) {
                    console.log(folder);
                    entryPoints[folder] = "./" + path.join(staticPath, "js", `${folder}.js`);
                }
            }
        }
    });

    return entryPoints;
}


module.exports = (env) => ({
    mode: env.mode,
    entry: {
        transitions: './dist/static/js/transitions.js',
        ...getEntryPoints()
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/static/js'),
        clean: true
    },
});