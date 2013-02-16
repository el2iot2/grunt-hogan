/*
 * grunt-hogan
 * https://github.com/automatonic/grunt-hogan
 *
 * Copyright (c) 2013 Elliott B. Edwards
 * Licensed under the MIT license.
 */

var fs = require('fs');
var _ = require('underscore');

module.exports = function(grunt) {

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('hogan', 'Compile a hogan template.', function() {
    var hogan = require('hogan.js'),
      nodepath = require('path'),
      target = this.target,
      compile = this.data,
      output = null;

    if (compile) {
      var templates = compile.templates || compile.template;
      if (!templates) {
        grunt.log.error('expected either "template" or "templates" directive.');
        return false;
      }
      if (!compile.output) {
        grunt.log.error('expected "output" directive');
        return false;
      }
      output = compile.output;
      grunt.file.write(
      compile.output,
      hoganCompile(templates, compile));
      return true;
    }
    else {
      grunt.log.error('expected "compile" directive.');
      return false;
    }

    function hoganCompile(templatePatterns, options) {
      options = options || {};
      if (!options.binder) {
        //fall back to a default iff there is a binder specified
        //it is ok to not have a binderName if a binder is set
        options.binderName = options.binderName || 'default';
      }
      options.exportName = options.exportName || target;
      var binderPath = options.binder || __dirname + '/binder/' + options.binderName + '.js';
      var error;
      try {
        //Check if binderName is a path to a real file
        var stats = fs.lstatSync(binderPath);
        if (stats === null || !stats.isFile()) {
          error = new Error('Expected binder was file at ' + binderPath);
          grunt.log.error(error);
          throw error;
        }
      }
      catch (e) {
        error = new Error('Cannot find binder template at ' + binderPath);
        grunt.log.error(error);
        throw error;
      }

      options.batchRender = options.batchRender || require(binderPath).render;

      if (!_.isFunction(options.batchRender)) {
        error = new Error('Binder render not available in ' + binderPath);
        grunt.log.error(error);
        throw error;
      }

      options.nameFunc = options.nameFunc || function(fileName) {
        return nodepath.basename(fileName, nodepath.extname(fileName));
      };
      var templateFilePaths = grunt.file.expand(templatePatterns);
      var templates = [];

      templateFilePaths.forEach(function(templateFilePath) {
        try {
          templates.push({
            name: options.nameFunc(templateFilePath) || 'NameFuncFailed',
            template: hogan.compile(
            grunt.file.read(templateFilePath).toString(), {
              asString: true
            })
          });
        }
        catch (error) {
          grunt.log.error(error);
          grunt.log.error('Error compiling template ' + name + ' in ' + templateFilePath);
          throw error;
        }
      });
      var context = { //build a context for the binder template to work against
        config: function() { //lambda that retrieves config parameters
          return function(text) {
            return grunt.config(text);
          };
        },
        output: output,
        exportName: options.exportName,
        outputFileName: nodepath.basename(output, nodepath.extname(output)),
        templates: templates
      };

      return options.batchRender(context, options.binderName);
    }
  });
};
