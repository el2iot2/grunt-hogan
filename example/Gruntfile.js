'use strict';
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    
    //configure a grunt-hogan task
    hogan: {
      //It is a "multitarget" task so each key is a new, arbitrarily-named target
    
    
      //the 'simple' target compiles the src template
      //into the destination file
      simple : {
        src: './view/simple.html',
        dest: './tmp/simple.js'
      },
    
      //the 'multi' target compiles the matched src templates
      //into the destination file
      multi: {
        src : './view/multi*.html',
        dest : './tmp/multi.js'
      },
      
      //use the 'revealing' binder
      //(resulting template javascript will follow the 'revealing
      // module pattern')
      use_revealing: {
        src : './view/multi*.html',
        dest : './tmp/multi_revealing.js',
        options: { binderName: 'revealing' }
      },
      
      //use the 'amd' binder
      //(resulting template javascript will follow the 'abstract
      // module definition')
      use_amd : {
        src : './view/multi*.html',
        dest : './tmp/multi_amd.js',
        options: { binderName: 'amd' }
      },
      
      //compile a template that can be used
      //as a grunt-hogan "binder template"
      //Uses the (required) "bootstrap" binder template
      bootstrap_custombinder : {
        src : './view/custombinder.hogan',
        dest : './tmp/custombinder.js',
        options: { binderName: 'bootstrap' }
      },
      
      //use the custom binder with an explicit path
      custombinder : {
        src : './view/multi*.html',
        dest : './tmp/multi_custombinder.js',
        //a binder path relative to this script
        options: { binderPath: __dirname + '/tmp/custombinder.js' }
      },
      
      //this time into the "binders" subfolder
      bootstrap_custombinder2 : {
        src : './view/custombinder.hogan',
        dest : './binders/custombinder2.js',
        options: { binderName: 'bootstrap' }
      },
      
      //use the custom binder with just its name
      custombinder2 : {
        src : './view/multi*.html',
        dest : './tmp/multi_custombinder2.js',
        //we specify our binder path relative to this script
        options: { binder: 'custombinder2' }
      },
      
      //the 'namefunc' target will compile
      //the multi templates giving each a custom
      //name via nameFunc
      namefunc : {
        src : './view/multi*.html',
        dest : './tmp/namefunc.js',
        options: {
          binderName: 'hulk',
          //Specify a custom name function
          nameFunc: function(fileName) {
            
            //Grab the path package here locally for clarity
            var _path = require('path');
            
            //'yada/yada/multi.1.js' -> 'multi.1'
            var name = _path
              .basename(
                fileName, 
                _path.extname(fileName));
                
            //'multi.1' -> 'name_1'
            return 'name_'+name[6];
          }
        }
      },
      //Run option sets
      old_options: {
        templates: 'view/binder/amd.hogan',
        output: 'tasks/binder/amd.js',
        binderName: 'bootstrap'
      },
      default_options: {
        options: {
        },
        files: {
          'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123']
        }
      },
      custom_options: {
        options: {
          separator: ': ',
          punctuation: ' !!!'
        },
        files: {
          'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123']
        }
      }
    },
    
    //lint the example!
    jshint: {
      code: ['Gruntfile.js', '<%= nodeunit.tests %>'],
      results: ['tmp/*.js'], //Make sure our results are valid javascript
      options: {
        jshintrc: '.jshintrc'
      }
    },
    clean: {
      tests: ['tmp', 'binders/custombinder2.js']
    },
  });

  //Load the grunt-hogan plugin!
  grunt.loadNpmTasks('grunt-hogan');
  
  //And then some other, usual, testy stuff
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('custombinders', ['custombinders']);

  //What you would normally use (give or take lint/testing/etc)
  grunt.registerTask('default', 'hogan');
  
  
    
  //But our test task will lint and verify the results
  grunt.registerTask('test', [
      'jshint:code', 
      'hogan',
      'jshint:results',
      'nodeunit'
    ]);
};