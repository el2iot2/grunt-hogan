"using strict";
module.exports = function(grunt) {

   // Project configuration.
  grunt.initConfig({
    hogan: {
        nodejs : {
            templates : "view/binder/nodejs.hogan",
            output : "tasks/binder/nodejs.js",
            binderName: "bootstrap"
        },
        "default" : {
            templates : "view/binder/default.hogan",
            output : "tasks/binder/default.js",
            binderName: "bootstrap"
        },
        hulk : {
            templates : "view/binder/hulk.hogan",
            output : "tasks/binder/hulk.js",
            binderName: "bootstrap"
        },
        revealing : {
            templates : "view/binder/revealing.hogan",
            output : "tasks/binder/revealing.js",
            binderName: "bootstrap"
        },
        amd : {
            templates : "view/binder/amd.hogan",
            output : "tasks/binder/amd.js",
            binderName: "bootstrap"
        }
    },
    lint: {
      files: ['grunt.js', 'tasks/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
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
        es5: true
      },
      globals: {}
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', 'hogan');

};
