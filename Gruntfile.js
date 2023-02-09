module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        // Clean
        clean: { //https://www.npmjs.com/package/grunt-contrib-clean
            folder: ["pattern_exports/", "integrated/", "public/"],
        },
        // Copy to integrated, minify
        copy: { //https://github.com/gruntjs/grunt-contrib-copy
            public: {
                expand: true,
                cwd: "public",
                src: ["fonts/*", "images/*", "favicon.ico"],
                dest: "integrated/",
            },
        },
        imagemin: { //https://www.npmjs.com/package/grunt-contrib-imagemin
            dynamic: {
                files: [
                    {
                        expand: true,
                        cwd: "integrated/images/",
                        src: ["**/*.{png,jpg,gif}"],
                        dest: "integrated/images/",
                    },
                ],
            },
        },
    });

    grunt.registerTask("default", ["clean"]);
    grunt.registerTask("integrate", ["clean", "copy", "imagemin"]);
};