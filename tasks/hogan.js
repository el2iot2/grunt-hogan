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
        render = this.data.render,
        compile = this.data.compile,
        output = null;
        
        if (render) {
            if (!render.output) {
                grunt.log.error("expected \"render.output\" directive");
                return false;
            }
            output = render.output;
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
            output = compile.output;
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
            options.binderName = options.binderName || "default";
            options.exportName = options.exportName || target;
            
            if (!options.batchRender) {
                if (path.existsSync("./binders.js")) {
                    options.batchRender = require("./binders.js").render;
                }
                else {
                    options.batchRender = require("./binder-bootstrap.js").render;
                }
            }
            
            options.nameFunc = options.nameFunc || function(fileName) {
                return path.basename(fileName, path.extname(fileName));
            };
            var templateFilePaths = grunt.file.expand(templatePatterns);
            var templates = [];
            
            templateFilePaths.forEach(function(templateFilePath) {
                try {
                    templates.push({
                        name: options.nameFunc(templateFilePath) || "NameFuncFailed",
                        template: hogan.compile(
                            grunt.file.read(templateFilePath).toString(), 
                            {asString:true})});                
                } 
                catch (error) {
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
                output: output,
                exportName: options.exportName,
                outputFileName: path.basename(output, path.extname(output)),
                templates: templates}
            
            return options.batchRender(context, options.binderName);    
        }
        
        function hoganRender(template, context, options) {
            if (!template.render) {
                template = hoganCompile(template, options);
            }
            return template.render(context);
        }
        
  });
};
