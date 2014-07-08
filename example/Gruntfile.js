'use strict';

//An example gruntfile that shows
//Common uses of grunt-hogan
//https://github.com/automatonic/grunt-hogan
module.exports = function(grunt) {

  //Standard grunt init
  grunt.initConfig({
    
    //configure a grunt-hogan task
    hogan: {
      //grunt-hogan is a "multitarget" task
      //so each key is a new, arbitrarily-named target

      //the 'simple' target compiles the src template
      //into the destination file
      simple : {
        src: './view/simple.html',
        dest: './tmp/simple.js'
      },
    
      //the 'glob' target compiles template files matched by the glob
      //into the destination file
      glob: {
        src : './view/multi*.html',
        dest : './tmp/glob.js'
      },
      
      //the 'glob' target compiles template files matched by the glob
      //into the destination file
      multi: {
        src : ['./view/multi1.html', './view/multi2.html', './view/multi3.html'],
        dest : './tmp/multi.js'
      },
      
      //use the 'revealing' binder
      //(resulting template javascript will follow the 'revealing
      // module pattern')
      use_revealing: {
        src : './view/multi*.html',
        dest : './tmp/use_revealing.js',
        options: { binderName: 'revealing' }
      },
      
      //use the 'amd' binder
      //(resulting template javascript will follow the 'abstract
      // module definition')
      use_amd : {
        src : './view/multi*.html',
        dest : './tmp/use_amd.js',
        options: { binderName: 'amd' }
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
            
            //'yada/yada/multi1.html' -> 'multi1'
            var name = _path
              .basename(
                fileName, 
                _path.extname(fileName));
                
            //'multi1' -> 'name_1'
            return 'name_'+name[5];
          }
        }
      }
    },
    //clean our compiled templates
    clean: {
      all: ['tmp']
    }
  });
  
  //Load the grunt-hogan plugin!
  grunt.loadNpmTasks('grunt-hogan');
  
  //And the clean
  grunt.loadNpmTasks('grunt-contrib-clean');
  
  //Just clean and run all hogan targets
  //For custom binder examples, see
  //Gruntfile.custombinder.js and
  //Gruntfile.twocustombinders.js
  grunt.registerTask('default', ['clean', 'hogan']);
};