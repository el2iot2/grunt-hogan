'using strict';
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      code: [
        'Gruntfile.js', 
        'tasks/*.js', 
        'example/Gruntfile.js', 
        '<%= nodeunit.tests %>'],
      binders: ['tasks/binder/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    clean: {
      tests: ['tmp']
    },
    hogan: {
      //Build binder templates
      nodejs: {
        src: 'view/binder/nodejs.hogan',
        dest: 'tasks/binder/nodejs.js'
      },
      'default': {
        src: 'view/binder/default.hogan',
        dest: 'tasks/binder/default.js'
      },
      hulk: {
        src: 'view/binder/hulk.hogan',
        dest: 'tasks/binder/hulk.js'
      },
      revealing: {
        src: 'view/binder/revealing.hogan',
        dest: 'tasks/binder/revealing.js'
      },
      amd: {
        src: 'view/binder/amd.hogan',
        dest: 'tasks/binder/amd.js'
      },
      //task-option default...use bootstrapper
      options: {
        binderName: 'bootstrap'
      }
    },
    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');


  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'hogan', 'jshint:binders', 'nodeunit']);

  // By default, lint the code and run all tests.
  grunt.registerTask('default', ['jshint:code', 'test']);

};
