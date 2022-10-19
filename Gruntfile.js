const sass = require('node-sass');

module.exports = function (grunt) {
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  //NOT part of Build process
    // Clears out dev and prod folders
    clean: {
      folder: ['pattern_exports/', 'public/'],
      css: ['source/css/style.css', 'source/css/style.css.map'],
      meta: ['source/_meta/_foot.hbs', 'source/_meta/_head.hbs']
    },
    // Turns SCSS to CSS 
    sass: {
      dist: {
        options: {
          implementation: sass,
          outputStyle: 'compact',
          sourceComments: false,
          sourceMap: true
        },
        files: {
          'source/css/style.css': 'source/css/style.scss'
        }
      }
    },
  //Build process
    // Minifies CSS
    cssmin: {
      sitecss: {
        options: {
          banner: ''
        },
        files: {
          'pattern_exports/css/site.min.css': [
            'public/css/style.css'
          ]
        }
      }
    },
    // Combines and condenses JS
    uglify: {
      options: {
        compress: true
      },
      applib: {
        src: [
          'public/js/*'
        ],
        dest: 'pattern_exports/js/applib.js'
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'public/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'pattern_exports/images/'
        }]
      }
    },
    // Copies over SVG and Favicon into images 
    copy: {
      main: {
        expand: true,
        cwd: 'public',
        src: ['*.ico', '*.svg'],
        dest: 'pattern_exports/images/'
      }
    },
  });

  // Default task(s).
  grunt.registerTask('default', ['cssmin', 'uglify', 'imagemin', 'copy']);
};