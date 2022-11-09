const sass = require('node-sass');

module.exports = function(grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      clean: {
        folder: ['pattern_exports/', 'public/'],
        css: ['source/css/style.css', 'source/css/style.css.map'],
        meta: ['source/_meta/*.mustache'],
        js: ['source/js/main.js']
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
            'pattern_exports/css/style.css': [
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
            //'node_modules/jquery/dist/jquery.slim.min.js',
            //'node_modules/@popperjs/core/dist/umd/popper.min.js',
            //'node_modules/bootstrap/dist/js/bootstrap.min.js',
            //'node_modules/bootstrap/js/dist/alert.js',
            //'node_modules/bootstrap/js/dist/base-component.js',
            //'node_modules/bootstrap/js/dist/button.js',
            //'node_modules/bootstrap/js/dist/carousel.js',
            //'node_modules/bootstrap/js/dist/collapse.js',
            //'node_modules/bootstrap/js/dist/dropdown.js',
            //'node_modules/bootstrap/js/dist/modal.js',
            //'node_modules/bootstrap/js/dist/offcanvas.js',
            //'node_modules/bootstrap/js/dist/popover.js',
            //'node_modules/bootstrap/js/dist/scrollspy.js',
            //'node_modules/bootstrap/js/dist/tab.js',
            //'node_modules/bootstrap/js/dist/toast.js',
            //'node_modules/bootstrap/js/dist/tooltip.js',
            'source/js/custom_js/*.js'
          ],
          dest: 'source/js/main.js'
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
      // Copy Grunt build processesses.
      copy: {
        main: {
          expand: true,
          cwd: 'source',
          src: ['*.ico', '/images/*.svg'],
          dest: 'pattern_exports/images/'
        },
        js: {
          expand: true,
          cwd: 'public/js/',
          src: ['*.js'],
          dest: 'pattern_exports/js/'
        },
      // Make .mustache match .hbs
        mustache: {
          expand: true,
          flatten: true,
          cwd: 'source',
          src: ['**/head.hbs', '**/foot.hbs'],
          dest: 'source/_meta/',
          rename: function(dest, matchedSrcPath) {
            if (matchedSrcPath.substring(0, 1) == '_') {
              return dest + matchedSrcPath.replace('.hbs', '.mustache');
            }
          }
        },
    }
  });
  // Default task(s).
  grunt.registerTask('default', ['clean']);
  grunt.registerTask('source', ['sass', 'copy:mustache', 'uglify']);
  grunt.registerTask('public', ['cssmin', 'imagemin', 'copy:main', 'copy:js'])
};