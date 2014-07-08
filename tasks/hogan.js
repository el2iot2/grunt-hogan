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

var defaultNameFunc = function(fileName) {
    return nodepath.basename(fileName, nodepath.extname(fileName));
}; 

module.exports = function(grunt) {

  //Register with grunt and massage options
  grunt.registerMultiTask('hogan', 'Compile a hogan template.', function() {
    var data = this.data,
      files = this.files,
      
      defaults = {
        binderName: 'default',
        binderPath: __dirname +'/binders.js',
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
      migrate('exportName');
      migrate('nameFunc');
      migrate('exposeTemplates');
      
      if (_.has(data, 'binder')) {
        grunt.log.warn('DEPRECATED: "binder" should be "binderPath" for clarity');
        options.binderPath = data.binder;
      }
      
      if (_.has(data, 'batchRender')) {
        grunt.log.warn('DEPRECATED: "batchRender" is no longer supported');
      }
      
      var pushFiles = function(srcFiles) {
        if (_.has(data, 'output')) {
          grunt.log.warn('DEPRECATED: "output" should be "dest".');
          grunt.log.warn('See: http://gruntjs.com/configuring-tasks#files');
          //transform to grunt files style
          files.push({src: grunt.file.expand(srcFiles), dest: data.output});
        }
        else if (_.has(data, 'dest')) {
          files.push({src: grunt.file.expand(srcFiles), dest: data.dest});
        }
        else {
          throw new Error('No "dest" or "output" (deprecated) found.');
        }
      };
      
      if (_.has(data, 'template')) {
        grunt.log.warn('DEPRECATED: "template" should be set as "src". See: http://gruntjs.com/configuring-tasks#files');
        pushFiles([data.template]);
      }
      else if (_.has(data, 'templates')) {
        grunt.log.warn('DEPRECATED: "templates" should be set as "src". See: http://gruntjs.com/configuring-tasks#files');
        pushFiles(data.templates);
      }
    }
    
    var err = function(message) {
      grunt.log.errorlns(message);
      return false;
    };
    
    //Begin task
    grunt.log.writeln('Compiling template...');
    
    //Make sure it is an accessible file
    if (!grunt.file.isFile(options.binderPath)) {
      return err('Binder template is not accessible');
    }
  
    //Require the module...path should follow node.js require() rules
    grunt.verbose.writeln('Requiring binder template...');
    try {
      var binderModule = require(options.binderPath);
      if (_.isPlainObject(binderModule)) {
        //Try the specified name
        if (_.has(binderModule,options.binderName)) {
          options.binderTemplate = binderModule[options.binderName];
          grunt.verbose.ok('Found templates["'+options.binderName+'"]');
        }
        else {
          if (!_.isEmpty(binderModule)) {
            var firstKey = _.findKey(binderModule);
            options.binderTemplate = binderModule[firstKey];
            grunt.verbose.ok('Defaulted to templates["'+firstKey+'"]');
          }
          else {
            return err('Binder export must have one or more templates exported');
          }
        }
      }
      else {
        return err('Binder export must be either a function or a plain object');
      }
    }
    catch(error) {
      grunt.log.errorlns(error);
      return err('Could not require binder template');
    }
    
    if (!_.isFunction(options.binderTemplate.render)) {
      return err('Binder template should have had a "render" func');
    }
    
    if (!_.isFunction(options.nameFunc)) {
      return err('options include an invalid "nameFunc"');
    }

    files
      .forEach(function(file) {
        var templates = file
          .src
          .map(
            function(filepath) {
              var name;
              
              if (!grunt.file.exists(filepath)) {
                grunt.log.errorlns('Template "' + filepath + '" not found.');
                return null;
              }
              
              try {
                name = options.nameFunc(filepath);
                grunt.verbose.writeln(filepath + ' -> ' + name);
              }
              catch (error) {
                grunt.log.warn('Could not select template name from path.');
                name = defaultNameFunc(filepath);
              }
              
              try {
                return {
                  name: name,
                  comma: ',',
                  template: hogan.compile(grunt.file.read(filepath), 
                  { asString: 1 })
                }; 
              }
              catch (error) {
                grunt.log.error(error);
                grunt.log.error('Could not compile template ' + filepath);
                return null;
              }
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
              options.binderTemplate.render(
                context));
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
