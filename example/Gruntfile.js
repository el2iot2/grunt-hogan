"use strict";
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    //configure a grunt-hogan task
    hogan: {
      //the "simple_default" target will just compile a 
      //template with the "default" binder
      simple_default : {
        templates : "./view/simple.html",
        output : "./temp/simple.js"
      },
      //the "multi_revealing" target will compile multiple
      //templates into a single file
      //using the specified "revealing" binder
      //(resulting template javascript will follow the "revealing
      // module pattern")
      multi_revealing : {
        templates : "./view/multi*.html",
        output : "./temp/multi.js",
        binderName: "revealing"
      },
      //the "custombinder_bootstrap" target will compile
      //a new binder template (suitable for use as a binder
      //in other compiles)
      custombinder_bootstrap : {
        templates : "./view/custombinder.hogan",
        output : "./temp/custombinder.js",
        binderName: "bootstrap"
      },
      //the "multi_custombinder" target will compile
      //the multi templates, but use the custom
      //binder built by the "custombinder_bootstrap" target
      multi_custombinder : {
        templates : "./view/multi*.html",
        output : "./temp/multi.js",
        //we specify our binder path relative to this script
        binder: __dirname + "/temp/custombinder.js"
      },
      //the "namefunc" target will compile
      //the multi templates giving each a custom
      //name via nameFunc
      namefunc : {
        templates : "./view/multi*.html",
        output : "./temp/namefunc.js",
        binderName: "hulk",
        
        //Specify a custom name function
        nameFunc: function(fileName) {
          
          //Grab the path package here locally for clarity
          var _path = require('path');
          
          //"yada/yada/multi.1.js" -> "multi.1"
          var name = _path
            .basename(
              fileName, 
              _path.extname(fileName));
              
          //"multi.1" -> "name_1"
          return 'name_'+name[6];
        }
      }
    },
      
    //The rest is from the boilerplate generated by "grunt init:node"
    pkg: '<json:package.json>',
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        globals: {
          exports: true
        }
      },
      files: ['grunt.js', 'lib/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    }
  });

  grunt.loadNpmTasks('grunt-hogan');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task.
  grunt.registerTask(
    'default', 
    [
      'jshint', 
      'hogan:simple_default', 
      'hogan:multi_revealing', 
      'hogan:custombinder_bootstrap', 
      'hogan:multi_custombinder',
      'hogan:namefunc']);
};