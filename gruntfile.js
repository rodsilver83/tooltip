/**
 * Created by jose.soria on 06/16/2015.
 */
module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scripts: {
        files: ['bpg/src/**/*.html','bpg/src/**/*.js','bpg/src/**/*.css'],
        tasks: ['distribution']
      },
      options: {
        livereload: true
      },
      html: {
        files: '**/*.html'
      },
      js: {
        files: '**/*.js'
      },
      css: {
        files: '**/*.css'
      }
    },
    connect: {
      server: {
        options: {
          livereload: true,
          open: {
            target: 'http://localhost:8000/dma/',
            appName: 'Chrome',
          }
        }
      }
    },
    postcss: {
      options: {

        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer-core')({browsers: 'last 2 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'dma/css/*.css'
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'dma/dist/js/movies.min.js': [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'bower_components/bootstrap/js/dropdown.js',
            'bower_components/angular-translate/angular-translate.js',
            'dma/src/js/app.js',
            'dma/src/js/controllers.js',
            'dma/src/js/filters.js',
            'dma/src/js/services.js']
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dma/dist/css/movies.min.css': [
            'dma/src/css/animations.css',
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            'dma/src/css/app.css'
          ]
        }
      }
    },
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'dma/dist/index.html': 'tmp/src/index.html',     // 'destination': 'source'
          'dma/dist/templates/movie-list.html': 'dma/src/templates/movie-list.html',     // 'destination': 'source'
          'dma/dist/templates/movie-detail.html': 'dma/src/templates/movie-detail.html'     // 'destination': 'source'
        }
      }
    },
    processhtml: {
      dist: {
        files: {
          'tmp/src/index.html': ['dma/src/index.html']
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-processhtml');

  grunt.registerTask('server', "Serve your app", [
    'connect:server', 'watch']);

  grunt.registerTask('distribution', "Prepare files for production", [
    'cssmin', 'processhtml', 'htmlmin', 'uglify']);

};