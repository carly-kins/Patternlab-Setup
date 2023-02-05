const sass = require("node-sass");

module.exports = function (grunt) {
  require("load-grunt-tasks")(grunt);
  require("time-grunt")(grunt);
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    clean: {
      folder: ["pattern_exports/", "integrated/", "public/"],
    },

    // DEV TASKS

    // Live PL build modified from https://gist.github.com/lrobeson/433267cbebb8377d3c5a
    sass: {
      patternlab: {
        options: {
          implementation: sass,
          outputStyle: "compact",
          sourceComments: false,
          sourceMap: true,
        },
        files: {
          "public/css/small.css": "source/sass/small.scss",
          //'public/css/med.css': 'source/sass/med.scss',
          //'public/css/large.css': 'source/sass/large.scss',
          //'public/css/xl.css': 'source/sass/xl.scss'
        },
      },
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      patternlab: {
        tasks: [
          "watch:patternlab", // use Grunt Watch task for Sass file changes
          "shell:patternlabStart", // use Pattern Lab's native Watch task for HTML & CSS changes
        ],
        options: {
          logConcurrentOutput: true,
        },
      },
    },
    shell: {
      patternlabStart: {
        command: ["npm run pl:serve"].join("&&"),
      },
      patternlabBuild: {
        command: ["npm run pl:build"].join("&&"),
      },
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      patternlab: {
        files: ["**/*.scss"],
        tasks: ["sass:patternlab"],
        options: {
          spawn: false,
        },
      },
    },

    // PRODUCTION BUILD TASKS

    // CSS
    cssmin: {
      sitecss: {
        options: {
          banner: "",
        },
        files: {
          "integrated/css/small.css": "public/css/small.scss",
          //'integrated/css/med.css': 'public/css/med.scss',
          //'integrated/css/large.css': 'public/css/large.scss',
          //'integrated/css/xl.css': 'public/css/xl.scss'
        },
      },
    },
    stylelint: {
      options: {
        configFile: "_config/.stylelintrc.yml",
        ignoreDisables: false,
        failOnError: false,
        //outputFile: "",
        reportNeedlessDisables: false,
        fix: false,
      },
      src: [
        "source/sass/**/*.scss",
        "!source/sass/_partials/_vendor/**/*.scss",
      ],
    },

    // JavaScript
    uglify: {
      options: {
        compress: true,
      },
      applib: {
        src: ["public/js/custom_js/*.js"],
        dest: "integrated/js/main.js",
      },
    },
    eslint: {
      options: {
        overrideConfigFile: "_config/.eslintrc.json",
      },
      target: ["public/js/**/*.js"],
    },

    // Copy to integrated, minify
    copy: {
      public: {
        expand: true,
        cwd: "public",
        src: ["fonts/*", "images/*", "favicon.ico"],
        dest: "integrated/",
      },
    },
    prettify: {
      options: {
        config: "_config/.prettifyrc.json",
      },
      // Prettify a directory of files
      all: {
        expand: true,
        cwd: "public",
        ext: ".html",
        src: ["patterns/**/*.html"],
        dest: "integrated/",
      },
    },
    imagemin: {
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
  grunt.registerTask("dev", ["stylelint", "sass", "concurrent:patternlab"]);
  grunt.registerTask("build", [
    "clean",
    "stylelint",
    "sass",
    "shell:patternlabBuild",
    "eslint",
    "copy:public",
    "uglify",
    "cssmin:sitecss",
    "imagemin",
    "prettify",
  ]);
  grunt.registerTask("buildCSS", ["stylelint", "sass", "cssmin:src"]);
  grunt.registerTask("buildJS", ["eslint", "uglify"]);
};
