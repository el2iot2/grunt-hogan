/*
 * grunt-hogan
 * https://github.com/automatonic/grunt-hogan
 *
 * Copyright (c) 2014 Elliott B. Edwards
 * Licensed under the MIT license.
 */

var _ = require('lodash'),
  nodepath = require('path'),
  hogan = require('hogan.js');

module.exports = function(grunt) {

  //Register with grunt and massage options
  grunt.registerMultiTask('hogan', 'Compile a hogan template.', function() {
    var data = this.data,
      files = this.files,
      defaultNameFunc = function(fileName) {
          return nodepath.basename(fileName, nodepath.extname(fileName));
      }, 
      defaults = {
        binderName: 'default',
        exportName: this.target,
        nameFunc: defaultNameFunc,
        suppressLastTemplateComma: true
      },
      options = this.options(defaults); 
      
    //Support deprecated options for now
    {
      var migrate = function(key) {
        if (_.has(data, key)) {
          grunt.log.warn(
            'DEPRECATED: "'+
            key+
            '" should now be set in options.');
          grunt.log.warn('See: http://gruntjs.com/configuring-tasks#options');
          options[key] = data[key]; //migrate the option
        }
      };
      
      migrate('binderName');
      migrate('batchRender');
      migrate('exportName');
      migrate('nameFunc');
      migrate('exposeTemplates');
      
      if (_.has(data, 'binder')) {
        grunt.log.warn('DEPRECATED: "binder" should be "binderPath" for clarity');
        options.binderPath = data.binder;
      }
      
      var pushFile = function(src) {
        if (_.has(data, 'output')) {
          grunt.log.warn('DEPRECATED: "output" should be "dest".');
          grunt.log.warn('See: http://gruntjs.com/configuring-tasks#files');
          //transform to grunt files style
          files.push({src: src, dest: data.output});
        }
        else if (_.has(data, 'dest')) {
          files.push({src: src, dest: data.dest});
        }
        else {
          throw new Error('No "dest" or "output" (deprecated) found.');
        }
      };
      
      if (_.has(data, 'template')) {
        grunt.log.warn('DEPRECATED: "template" should be set as "src". See: http://gruntjs.com/configuring-tasks#files');
        pushFile(data.template);
      }
      else if (_.has(data, 'templates')) {
        grunt.log.warn('DEPRECATED: "templates" should be set as "src". See: http://gruntjs.com/configuring-tasks#files');
        pushFile(data.templates);
      }
    }
    
    var err = function(message, hintKey) {
      grunt.log.oklns('options.'+hintKey+' = '+options[hintKey]);
      grunt.log.errorlns(message);
      return false;
    };
    
    //Begin task
    grunt.log.writeln('Compiling template...');
    
    //Load the render function if it isn't specified
    if (!_.isFunction(options.batchRender)) {
      //establish a path to our binder javascript module
      options.binderPath = 
        options.binderPath || 
        __dirname + '/binders.js';
      
      //Make sure it is an accessible file
      if (!grunt.file.isFile(options.binderPath)) {
        return err('Binder template is not accessible', 'binderPath');
      }
      
      //Require the module...path should follow node.js require() rules
      grunt.verbose.writeln('Requiring binder template...');
      try {
        var binderModule = require(options.binderPath);
        if (_.isFunction(binderModule)) {
          options.batchRender = binderModule;
        }
        else if (_.isPlainObject(binderModule)) {
          options.batchRender = binderModule[options.binderName].render;
        }
        grunt.verbose.ok();
      }
      catch(error) {
        grunt.log.errorlns(error);
        return err('Could not require binder template', 'binderPath');
      }
      
      if (!_.isFunction(options.batchRender)) {
        return err('Binder template must export a "render" func', 'binderPath');
      }
    }

    files
      .forEach(function(file) {
        var templates = file
          .src
          .map(
            function(filepath) {
              if (!grunt.file.exists(filepath)) {
                grunt.log.error('Template "' + filepath + '" not found.');
                return null;
              }
              
              var name, template;
              
              try {
                name = options.nameFunc(filepath);    
              }
              catch (error) {
                grunt.log.warn('Could not select template name from path.');
                name = defaultNameFunc(filepath);
              }
              
              try {
                template = hogan.compile(
                  grunt.file.read(filepath), 
                  {
                    asString: true
                  });      
              }
              catch (error) {
                grunt.log.error(error);
                grunt.log.error('Could not compile template ' + filepath);
                return null;
              }
              return {
                name: name,
                comma: ',',
                template: template
              }; 
            }
          );
          
          //No comma on the last template
          if (options.suppressLastTemplateComma && _.any(templates)) {
            templates[templates.length-1].comma = '';
          }
          
          var context = { //build a context for the binder template to work against
            config: function() { //lambda that retrieves config parameters
              return function(text) {
                return grunt.config(text);
              };
            },
            exposeTemplates : options.exposeTemplates,
            output: file.dest,
            exportName: options.exportName,
            outputFileName: defaultNameFunc(file.dest),
            binderName: options.binderName,
            templates: templates
          };
        
          try
          {
            grunt.file.write(
              file.dest, 
              options.batchRender(
                context, 
                options.binderName));
            grunt.log.ok(file.dest);
          }
          catch(error) {
            grunt.log.error(error);
            grunt.log.error('Failed to write out compiled template:');
            grunt.log.error(file.dest);
          }
      });
      
    if (this.errorCount) {
      return false;
    }
    
    return true;
  });
};
