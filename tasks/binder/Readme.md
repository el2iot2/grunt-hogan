## Binders ##

Binders are simply hogan templates that fit a certain profile and are used to render other templates to
a specific javascript format (AMD/RequireJS/etc.) so that they can be leveraged by a wide variety of 
tools. 
To see how the built-in binders are created, look at `grunt-hogan`'s 
[grunt.js file](https://github.com/automatonic/grunt-hogan/blob/master/grunt.js).
In short, use the `bootstrap` binder template so that the resulting generated
file can be `require`d and then `Render`ed by the grunt-hogan tasks. 
