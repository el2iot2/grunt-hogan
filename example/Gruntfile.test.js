'use strict';

//This gruntfile is not a good general example
//It is used to verify output and test
//deprecated cases in the CI build
//See Gruntfile.js for more typical usage examples

module.exports = function(grunt) {
  grunt.initConfig({
    nodeunit: {
      all: './test/*_test.js'
    },
    hogan: {
      deprecated_template: {
        template: 'view/binder/amd.hogan',
        output: 'tmp/deprecated_template.js'
      },
      deprecated_templates: {
        templates: ['view/multi1.html', 'view/multi2.html', 'view/multi3.html'],
        output: 'tmp/deprecated_templates.js',
        binderName: 'amd'
      },
      deprecated_templates_glob: {
        templates: ['view/multi*.html'],
        output: 'tmp/deprecated_templates_glob.js',
        binderName: 'default'
      },
    },
    jshint: {
      code: ['Gruntfile*.js', '<%= nodeunit.tests %>', 'tmp/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    }
  });

grunt.registerTask(
    'force', 
    'force run of deprecated styles that warn', 
    function () {
      // always use force when watching
      grunt.option('force', true);
      grunt.task.run('hogan');
  });


  //Load the grunt-hogan plugin!
  grunt.loadNpmTasks('grunt-hogan');
  
  //And then some other, usual, testy stuff
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  
  //But our test task will lint and verify the results
  grunt.registerTask('default', ['jshint', 'nodeunit', 'force']);
};