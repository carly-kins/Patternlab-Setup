const sass = require('node-sass');

module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      copy: {
        main: {
          expand: true,
          cwd: 'public', 
          src: ['images/*', 'css/style.css', 'js/*.js', 'fonts/*', '*.ico'], 
          dest: 'pattern_exports/'
        },
      },
      sass: {
        dist: {
          options: {
            implementation: sass,
            outputStyle: 'compact',
            sourceComments: false,
            sourceMap: true
          },
          files: {
            'source/css/style.css' : 'source/css/style.scss'
          }
        },
      },
    });

    //TODO: Clear ./patten-export and ./public folder 
  
    // Load the plugin that provides the tasks.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sass');
    
    // Default task(s).
    grunt.registerTask('default', ['']);
  };

