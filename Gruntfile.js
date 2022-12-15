const sass = require('node-sass');

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    clean: {
      folder: ['pattern_exports/', 'integrated/', 'public/'],
    },

    // DEV TASKS

    // Live PL build modified from https://gist.github.com/lrobeson/433267cbebb8377d3c5a
    sass: { 
      patternlab: {
        options: {
          implementation: sass,
          outputStyle: 'compact',
          sourceComments: false,
          sourceMap: true
        },
        files: {
          'source/css/style.css': 'source/sass/style.scss'
        }
      },
      integrate: {
        options: {
          implementation: sass,
          outputStyle: 'compact',
          sourceComments: false,
          sourceMap: true
        },
        files: {
          'integrated/css/style.css': 'src/sass/style-master.scss'
        }
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      patternlab: {
        tasks: [
          'watch:patternlab', // use Grunt Watch task for Sass file changes
          'shell:patternlabStart', // use Pattern Lab's native Watch task for HTML & CSS changes
        ],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    shell: {
      patternlabStart: {
        command: [
          'npm run pl:serve', 
        ].join('&&')
      },
      patternlabBuild: {
        command: [
          'npm run pl:build', 
        ].join('&&')
      },
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      patternlab: {
        files: ['**/*.scss'],
        tasks: ['sass:patternlab'],
        options: {
          spawn: false,
        }
      },
    },

    // PRODUCTION BUILD TASKS

    // CSS
    cssmin: {
      sitecss: {
        options: {
          banner: ''
        },
        files: {
          'integrated/css/style.css': [
            'public/css/style.css'
          ]
        }
      },
      src: {
        options: {
          banner: ''
        },
        files: {
          'integrated/css/style.css': [
            'source/css/style.css'
          ]
        }
      }
    },
    stylelint: {
      options: {
        configFile: 'config/.stylelintrc.json',
        formatter: 'string',
        ignoreDisables: false,
        failOnError: true,
        outputFile: '',
        reportNeedlessDisables: false,
        fix: false,
        syntax: ''
      },
      src: [
              'source/**/*.scss',
          ]
      },

    // JavaScript
    uglify: {
      options: {
        compress: true
      },
      applib: {
        src: [
          'public/js/custom_js/*.js'
        ],
        dest: 'integrated/js/main.js'
      }
    },
    eslint: {
      options: {
        overrideConfigFile: 'config/.eslintrc.json',
      },
      target: ['public/js/**/*.js']
    },

    // Copy to integrated, minify
    copy: { 
      public: {
        expand: true,
        cwd: 'public',
        src: ['fonts/*', 'images/*', 'favicon.ico'],
        dest: 'integrated/',
      }
    },
    prettify: {
      options: {
        config: 'config/.prettifyrc.json'
      },
      // Prettify a directory of files
      all: {
        expand: true,
        cwd: 'public',
        ext: '.html',
        src: ['patterns/**/*.html'],
        dest: 'integrated/'
      },
    },
    imagemin: { 
      dynamic: {
        files: [{ 
          expand: true,
          cwd: 'integrated/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'integrated/images/'
        }]
      }
    }
  });
  grunt.registerTask('build', ['clean', 'stylelint', 'sass', 'shell:patternlabBuild', 'eslint', 'copy:public', 'uglify', 'cssmin:sitecss', 'imagemin', 'prettify' ]);
  grunt.registerTask('buildCSS', ['stylelint', 'sass', 'cssmin:src']);
  grunt.registerTask('buildJS', ['eslint', 'uglify']);
};
