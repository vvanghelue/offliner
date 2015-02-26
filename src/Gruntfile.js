
/*
 * grunt-contrib-requirejs
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 Tyler Kellen, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    appFolder: './',
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %>',

    connect: {
      server: {
        options: {
          livereload:true,
          hostname : '127.0.0.1',
          port: 8081
        }
      }
    },

    // Configuration to be run (and then tested).
    requirejs: {
      compile: {
        options: {
          mainConfigFile: 'app.js',
          out: 'build/build.min.js',
          name: 'app'
        }
      }
    },

    concat: {
      basic: {
        src: ['tpl/app.less', 'tpl/**/*.less'],
        dest: 'build/tmp.less',
      },
    },

    watch: {
      less_files: {
        files: ['tpl/**/*.less'],
        tasks: ['concat','less:development'],
        options: {
          spawn: false,
        },
      },
    },

    less: {
      development: {
          options: {
            compress: false,
            cleancss: false,
            report: 'none',
            strictImports: true,
          },
          files: { 'build/build.css': 'build/tmp.less'},
      }
    }
  });

  // Actually load this plugin's task(s).
  //grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-connect');
  
  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('build', ['concat', 'less:development', 'requirejs']);

  grunt.registerTask('dev', ['connect:server', 'watch:less_files']);

};