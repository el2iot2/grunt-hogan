# grunt-hogan

a [grunt](http://gruntjs.com) task to compile/precompile [hogan](http://hoganjs.com) templates 

## Getting Started

> NOTE: This documentation is for grunt version 0.4+. To work with version 0.3.x, see [here](https://github.com/automatonic/grunt-hogan/blob/grunt-0.3/README.md)

Install this grunt plugin next to your project's [Gruntfile.js][getting_started] with: `npm install grunt-hogan --save-dev`

Then add this line to your project's `Gruntfile.js`:

```javascript
grunt.loadNpmTasks('grunt-hogan');
```

To compile multiple mustache templates to a single output file, 
your config should look like this:

```javascript
grunt.initConfig({
    //...
    hogan: {
        //desired target name
        mytarget : {
          //Wildcard of desired templates
          templates : "view/**/*.hogan",
          //output destination
          output : "hulkingup.js"
        }
    },
    //...
});
```

By default, the all compiled templates in a target will be "bound" together by the default "binder" (which
is itself a pre-compiled template). The "default" binder generates javascript
that is designed to work both as a node.js module and in the browser via a 
`<script/>` tag. Also supported are the "hulk" binder (should output similarly to
hogan's "hulk" command line tool...which is "vanilla" javascript), the "nodejs"
binder, which provides a pure node.js format and the "amd" binder, which provides support for amd modules. 
You can also create your own binder templates to support other usages.

To specify a binder, use a "binderName" directive:

```javascript
//...
mytarget : {
    templates : "view/**/*.hogan",
    output : "hulkingup.js",
    binderName : "hulk"
}
//...
```

To specify a *custom* binder, supply a path for the "binder" attribute that resolves to a binder module:

```javascript
//...
binder : __dirname + "/my/custom/binder.js"
//...
```
See the `*custombinder*` targets in the 
[example gruntfile](https://github.com/automatonic/grunt-hogan/blob/master/example/Gruntfile.js) 
for futher
detail on creating and using custom binders.

There can be multiple template patterns:

```javascript
//...
mytarget : {
    //...
    templates : ["view/wwf/*.hogan", "view/wcw/*.hogan"],
    //...
}
//...
```

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/wiki/Getting-started

## Documentation
 * See [an example gruntfile](https://github.com/automatonic/grunt-hogan/blob/master/example/Gruntfile.js)

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
 * 0.2.- - [in progress](https://github.com/automatonic/grunt-hogan/issues?milestone=2&state=open)
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
