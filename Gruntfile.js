'using strict';
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      code: [
        'Gruntfile.js', 
        'tasks/hogan.js',
        'example/Gruntfile.js',
        'tasks/binders.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    //Make a shell call
    shell: {
      bootstrap: {
        //To the hulk CLI
        command:
          'node '+
          __dirname + 
          '/node_modules/hogan.js/bin/hulk '+
          __dirname +
          '/view/binder/*.hogan',
        options: {
          stdout: false,
          stderr: false,
          //But catch the output
          callback: function log(err, stdout, stderr, cb) {
              //And handle errors (if any)
              if (err) {
                grunt.log.errorlns(err);
              }
              else if (stderr) {
                grunt.log.errorlns(stderr);
              }
              else {
                //Otherwise load a lodash template
                var template = grunt.file.read(
                  __dirname +
                  '/view/binders.lodash');
                
                //process it with the hulk result
                var result = grunt.template.process(template, {data: {stdout: stdout}});  
                
                //And write out our bootstrap module
                grunt.file.write(
                  __dirname +
                  '/tasks/binders.js',
                  result
                );
                grunt.log.ok('hulk: generated binders.js');
                cb();
              }
          }
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['shell:bootstrap', 'jshint']);
};
