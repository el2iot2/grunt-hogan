module.exports = function(grunt) {

   // Project configuration.
  grunt.initConfig({
    hogan: {
        nodejs : {
            compile : {
                templates : "view/binder/nodejs.hogan",
                output : "tasks/binder/nodejs.js",
                options : {
                    binderName: "bootstrap",
                }
            }
        },
        "default" : {
            compile : {
                templates : "view/binder/default.hogan",
                output : "tasks/binder/default.js",
                options : {
                    binderName: "bootstrap",
                }
            }
        },
        hulk : {
            compile : {
                templates : "view/binder/hulk.hogan",
                output : "tasks/binder/hulk.js",
                options : {
                    binderName: "bootstrap",
                }
            }
        },
        revealing : {
            compile : {
                templates : "view/binder/revealing.hogan",
                output : "tasks/binder/revealing.js",
                options : {
                    binderName: "bootstrap",
                }
            }
        },
        customBinderPath : {
            compile : {
                templates : "view/binder/revealing.hogan",
                output : "tasks/binder/customBinderPath.js",
                options : {
                    binderName: "./binder/hulk.js",
                }
            }
        }
    },
    test: {
      files: ['test/**/*.js']
    },
    lint: {
      files: ['grunt.js', 'tasks/**/*.js', 'test/**/*.js']
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
