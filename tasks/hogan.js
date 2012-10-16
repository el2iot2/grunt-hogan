/*
 * grunt-hogan
 * https://github.com/automatonic/grunt-hogan
 *
 * Copyright (c) 2012 Elliott B. Edwards
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('hogan', 'Compile or render a hogan template.', function() {
    var hogan = require('hogan.js'),
        path = require('path'),
        target = this.target,
        data = this.data,
        render = this.data.render,
        compile = this.data.compile,
        result ="";
        
        if (render) {
            if (!render.output) {
                grunt.log.error("expected \"render.output\" directive");
                return false;
            }
            grunt.file.write(render.output,     
             hoganRender(render.template, render.context, render.options));
        }
        else if (compile) {
            var templates = compile.templates || compile.template;
            if (!templates) {
                grunt.log.error("expected either \"compile.template\" or \"compile.templates\" directive.");
                return false;
            }
            if (!compile.output) {
                grunt.log.error("expected \"compile.output\" directive");
                return false;
            }
            
            grunt.file.write(compile.output, 
                hoganCompile(templates, compile.options));
            return true;
        }
        else {
            grunt.log.error("expected either \"compile\" or \"render\" directive.");
            return false;
        }
        
        function hoganCompile(templatePatterns, options) {
            options = options || {};
            options.binder = options.binder || require("hogan-binder-vanilla.js");
            options.nameFunc = options.nameFunc || function(fileName) {
                path.basename(fileName, path.extname(fileName));
            };
            var templateFilePaths = grunt.file.expand(templatePatterns);
            var templates = [];
            
            templateFilePaths.forEach(function(templateFilePath) {
                try {
                    template.push({
                        name: name,
                        template: hogan.compile(
                            grunt.file.read(templateFilePath).toString(), 
                            {asString:true})});                
                } 
                catch (var error) {
                    grunt.log.error(error);
                    grunt.log.error("Error compiling template " + name + " in " + templateFilePath);
                    throw error;
                }
            });
            var context = { //build a context for the binder template to work against
                config: function() { //lambda that retrieves config parameters
                    return function(text) {
                        return grunt.config(text);
                    }}, 
                templates: templates}
            
            return options.binder.render(context);    
        }
        
        function hoganRender(template, context, options) {
            if (!template.render) {
                template = hoganCompile(template, options);
            }
            return template.render(context);
        }
        
  });
};
