'use strict';

//An example gruntfile that shows
//Common uses of grunt-hogan
//https://github.com/automatonic/grunt-hogan
module.exports = function(grunt) {

  //Standard grunt init
  grunt.initConfig({
    
    //configure a grunt-hogan task
    hogan: {
      
      //compile a template that can be used
      //as a grunt-hogan "binder template"
      //Uses the (required) "bootstrap" binder template
      custombinder : {
        src : './custombinder/one.hogan',
        dest : './tmp/custombinder.js',
        options: { binderName: 'bootstrap' }
      },
      
      //use the custom binder with an explicit path
      use_custombinder : {
        src : './view/multi*.html',
        dest : './tmp/use_custombinder.js',
        //a binder path relative to this script
        //since binderName is not specified, the
        //first/only binder in the module 
        //will be used
        options: { binderPath: __dirname + '/tmp/custombinder.js' }
      },
      
      //this time, compile two binders into a single module
      twocustombinders : {
        src : ['./custombinder/one.hogan', './custombinder/two.hogan'],
        dest : './tmp/twocustombinders.js',
        options: { binderName: 'bootstrap' }
      },
      
      //use the combined custom binder module
      use_twocustombinders : {
        src : './view/simple.html',
        dest : './tmp/use_twocustombinders.js',
        //we specify our binder path relative to this script
        options: { 
          //use the custom module
          binderPath: __dirname + '/tmp/twocustombinders.js',
          //use the binder named "two" (as opposed to "one")
          binderName: "two"
        }
      },
    }
  });
  
  //Load the grunt-hogan plugin!
  grunt.loadNpmTasks('grunt-hogan');
  
  //"Whenever this "alias task" is run, every specified tasks 
  //in taskList will be run, in the order specified."
  grunt.registerTask('bootstrap', ['hogan:custombinder', 'hogan:twocustombinders' ]);
  grunt.registerTask('use', ['hogan:use_custombinder', 'hogan:use_twocustombinders' ]);
  
  //our custom binders have to be bootstrapped before we can 
  //use them
  grunt.registerTask('default', ['bootstrap', 'use' ]);
};