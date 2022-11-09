const sass = require('node-sass');

module.exports = function(grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      clean: {
        folder: ['pattern_exports/', 'public/'],
        css: ['source/css/style.css', 'source/css/style.css.map'],
        meta: ['source/_meta/*'],
        js: ['source/js/main.js']
      },

      cssmin: { // Minifies CSS
        sitecss: {
          options: {
            banner: ''
          },
          files: {
            'pattern_exports/css/style.css': [
              'public/css/style.css'
            ]
          }
        }
      },

      copy: {
        js: {
          expand: true,
          cwd: 'public/js/',
          src: ['*.js'],
          dest: 'pattern_exports/js/'
        },
        main: {
          expand: true,
          cwd: 'source',
          src: ['*.ico', '/images/*.svg'],
          dest: 'pattern_exports/images/'
        },
        meta: { 
          expand: true,
          flatten: true,
          cwd: 'source',
          src: ['**/tokens/_head.hbs', '**/tokens/_foot.hbs'],
          dest: 'source/_meta/',
        },
        mustache: { // Make .mustache match .hbs
          expand: true,
          flatten: true,
          cwd: 'source',
          src: ['**/tokens/_head.hbs', '**/tokens/_foot.hbs'],
          dest: 'source/_meta/',
          rename: function(dest, matchedSrcPath) {
            if (matchedSrcPath.substring(0, 1) == '_') {
              return dest + matchedSrcPath.replace('.hbs', '.mustache');
            }
          }
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

      sass: { // Turns SCSS to CSS 
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
      
      uglify: { // Combines and condenses JS
        options: {
          compress: true
        },
        applib: {
          src: [
            'source/js/custom_js/*.js'
          ],
          dest: 'source/js/main.js'
        }
      }

  });
  // Tasks
  grunt.registerTask('default', ['clean']);
  grunt.registerTask('source', ['sass', 'copy:meta', 'copy:mustache', 'uglify']);
  grunt.registerTask('public', ['cssmin', 'imagemin', 'copy:main', 'copy:js'])
};