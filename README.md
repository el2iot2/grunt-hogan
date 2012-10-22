# grunt-hogan

a [grunt](http://gruntjs.com) task to compile/precompile [hogan](http://hoganjs.com) templates

## Status

Alpha, unpublished to npm. TODO:

 * ~~generate default binder template~~
 * fill in tests
 * ~~investigate desired binder template styles (APM, requireJS, vanilla, browser?)~~

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-hogan`

Then add this line to your project's `grunt.js` gruntfile:

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
            //indicate you want to compile templates
            compile : {
                //Wildcard of desired templates
                templates : "view/**/*.hogan",
                //output destination
                output : "hulkingup.js"
            }
        }
    },
    //...
});
```

By default, the templates will be "bound" by the default "binder" (which
is itself a pre-compiled template). The "default" template generates javascript
that is designed to work both as a node.js module and in the browser via a 
`<script/>` tag. Also supported are the "hulk" binder (should output similarly to
hogan's "hulk" command line tool...which is "vanilla" javascript), and the "nodejs"
binder, which provides a pure node.js format. You can also create your own binder templates to support other usages.

To specify a binder, use a "binderName" directive:

```javascript
//...
compile : {
    templates : "view/**/*.hogan",
    output : "hulkingup.js",
    binderName : "hulk"
}
//...
```

There can be multiple template patterns:

```javascript
//...
compile : {
    //...
    templates : ["view/wwf/*.hogan", "view/wcw/*.hogan"],
    //...
}
//...
```

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md

## Documentation
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
_(Nothing yet)_

##Acknowledgements
 * a comment by "baz" [here](http://soenkerohde.com/2012/02/node-js-server-side-compile-hogan-js-templates/) pointed me in the right direction

## License
Copyright (c) 2012 Elliott B. Edwards  
Licensed under the MIT license.
