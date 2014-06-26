# grunt-hogan

a [grunt](http://gruntjs.com) task to precompile [hogan](http://hoganjs.com) templates 

[![Build status](https://ci.appveyor.com/api/projects/status/7sl7shna3qi0uo74)](https://ci.appveyor.com/project/automatonic/grunt-hogan)

## Getting Started

> NOTE: This documentation is for grunt version 0.4+. To work with version 0.3.x, see [here](https://github.com/automatonic/grunt-hogan/blob/grunt-0.3/README.md)

Install this grunt plugin next to your project's [Gruntfile.js][getting_started] with: `npm install grunt-hogan --save-dev`

Then add this line to your project's `Gruntfile.js`:

```javascript
grunt.loadNpmTasks('grunt-hogan');
```

To precompile a single template into a single output file:

```javascript
grunt.initConfig({
    //...
    hogan: {
        //desired target name
        mytarget : {
          //path to input template
          template : 'view/chair.hogan',
          //output path, relative to Gruntfile.js
          output : 'bandanna.js'
        }
    },
    //...
});
```

###Multiple input templates via patterns

```javascript
grunt.initConfig({
    //...
    hogan: {
        //desired target name
        mytarget : {
          //Wildcard of desired templates
          templates : 'view/**/*.hogan',
          //output destination
          output : 'hulkingup.js'
        }
    },
    //...
});
```

###Multiple input template patterns

```javascript
//...
mytarget : {
    //...
    templates : ['view/wwf/*.hogan', 'view/wcw/*.hogan'],
    //...
}
//...
```

##"Binders"

By default, the all compiled templates in a single grunt target will be "bound" together by the default "binder" (which
is itself a pre-compiled template). The "default" binder generates javascript
that is designed to work both as a node.js module and in the browser via a 
`<script/>` tag. Other built-in binders are:

  * "hulk" - should output similarly to hogan's "hulk" command line tool...which is "vanilla" javascript
  * "nodejs" - exposes compiled templates as a node.js module
  * "amd" - exposes compiled templates in amd format
  * "revealing" - exposes compile templates via the revealing module pattern 

You can also create your own binder templates to support other usages. See "Custom Binders" section below.

To specify a binder, use a "binderName" directive:

```javascript
//...
mytarget : {
    templates : 'view/**/*.hogan',
    output : 'hulkingup.js',
    binderName : 'hulk'
}
//...
```
###Custom Binders

To specify a *custom* binder, supply a path for the "binder" attribute (note that this differs from the "binderName" in examples above) that resolves to a binder module:

```javascript
//...
binder : __dirname + '/my/custom/binder.js'
//...
```
See the `custombinder_bootstrap` and `multi_custombinder` targets in the 
[example gruntfile](https://github.com/automatonic/grunt-hogan/blob/master/example/Gruntfile.js) 
for futher detail on creating and using custom binders.

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/wiki/Getting-started

###Using precompiled templates

As of version 0.2.2, all built in binders create javascript that functions similarly in intention, but varies with respect to the target use.

Given a precompile task like:

```javascript
mytarget : {
  templates : ['view/fist.html', 'view/foe.html', 'view/what.you.gonna.do.html'],
  output : 'templates.js',
  binderName : 'nodejs'
}
```
A node.js application could:

```javascript
//Load the module
var templates = require('./templates.js');

//Render a template with a context object
var html1 = templates.fist({knuckles: true});

//Render a template with context and partial templates
var html2 = templates.foe({}, {partialName: partialTemplateFromSomewhere});

//Render a template with a non-variable-like name
var html3 = templates['what.you.gonna.do']({context:'catchphrase'});

```

All of the binders (with the exceptions of special case binders like the bootstrap and "hulk") seek to expose the full api of the template render in this manner.

Also, if a partial parameter is not specified, the default render behavior is to make all the other templates in the binder ("sibling templates") available as partials in the render.

Other templates will vary slightly in their syntax to support their purpose.

###Template naming

The default behavior of `grunt-hogan` is to use the input templates file name (without the extension) as the name of the template in the output, precompiled result.

Thus an input of `view/yada.hogan` will be available as `templates.yada(...)`. However, there are plenty of scenarios where
one may want to customize this behavior. This is accomplished via the `nameFunc` directive on a task:

```javascript
mytarget : {
    templates : './view/multi*.html',
    output : './temp/namefunc.js',
    binderName: 'hulk',
    
    //Specify a custom name function
    nameFunc: function(fileName) {
      
      //Grab the path package here locally for clarity
      var _path = require('path');
      
      //'yada/yada/multi.1.js' -> 'multi.1'
      var name = _path
        .basename(
          fileName, 
          _path.extname(fileName));
          
      //'multi.1' -> 'name_1'
      return 'name_'+name[6];
    }
}
```
## Partial Templates
Hogan supports Partial Templates as defined by the [mustache spec](http://mustache.github.io/mustache.5.html).

Say we have a template (defined in a file named `message.hogan`):
```
<p>Dear {{name}}, {{> mypartial}}</p>
```
And another template (defined in `mypartial.hogan`):
```
<em>{{text}}</em>
```
Assuming you use a `grunt-hogan` task to compile both these templates into a single module, you end up with a template render object something like:
```javascript
{
    message: func(...){...},
    mypartial: func(...){...}
}
```
We want Hogan to now expand the `mypartial` template and interpret the `message` template as:
```
<p>Dear {{name}}, <em>{{text}}</em></p>
```
But how do we give Hogan what it needs to resolve the `mypartial` template? `grunt-hogan` supports this through three features:
### 1. "Sibling" Partial Templates
By default, if you call the render function with just a context object:
```javascript
template.message({name:'Hulk', text:'Have a nice day!'});
```
`grunt-hogan` will make the `mypartial` template available to the `message` template *automatically*. 
This will happen if:

  1. `message.hogan` and `mypartial.hogan` were bound together into a single template render module
  2. The `nameFunc` (if specified) preserves the partial name `mypartial` mentioned in the `message.hogan` template

Since `grunt-hogan` exposes the render as a function, this is the intended "common practice" for partial templates. 

*If you want a partial template to be automatically available, bind it as a sibling template with the template that depends on it.*

### 2. Explicit Partial Templates
To disable the default behavior of "Sibling" Partial Templates, you simply specify the second parameter:
```javascript
template.message(
    {name:'Hulk', text:'Have a nice day!'}, //context
    {mypartial: getMyPartialFromSomewhere()} //partials
    );
```
But now you are on your own when resolving the `Hogan.Template` objects passed through to the Hogan render. Hogan will use the passed partials only if they are valid `Hogan.Template` instances.
### 3. Use the `exposeTemplates` task option
If you don't know at template compile time what partials are needed, 
and/or can't/won't put templates together as "Siblings", then you will need a way to retrieve the actual 
`Hogan.Template` instances from `grunt-hogan` modules. 
To do this, specify the `exposeTemplates` option on the compile task. 
Doing so makes the actual templates available as a `template` property on the module:
```javascript
{
    message: func(...){...},
    mypartial: func(...){...},
    templates: { message: {...}, mypartial: {...}}
}
```
Using this, you can pass the actual `Hogan.Template` instance to wherever it is needed (with the "Explicit Partial Templates" mentioned above, for example).
## Examples
 * See [an example gruntfile](https://github.com/automatonic/grunt-hogan/blob/master/example/Gruntfile.js)

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
 * 0.2.- - [in progress](https://github.com/automatonic/grunt-hogan/issues?milestone=2&state=open)
 * 0.2.2 - Binder template overhaul
   * Added partial support on render functions
   * Sibling partials by default
   * *Breaking changes for precompiled template API*
 * 0.2.1 - AMD Binder
   * Now supports use of "sibling templates" (defined within the same binder) as partials
   * *Breaking change* - Now exports a render function instead of the full template
 * 0.1.1 - [*Breaking Changes* and Custom Binder Support](https://github.com/automatonic/grunt-hogan/issues?milestone=1)
   * "render" directive has [been discarded](https://github.com/automatonic/grunt-hogan/issues/8)
   * "options" notation has been discarded (supply attributes directly as keys on the target)

##Acknowledgements
 * a comment by "baz" [here](http://soenkerohde.com/2012/02/node-js-server-side-compile-hogan-js-templates/) pointed me in the right direction

## License
Copyright (c) 2013 Elliott B. Edwards  
Licensed under the MIT license.
