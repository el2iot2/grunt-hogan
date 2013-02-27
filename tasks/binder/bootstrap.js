//This exports the "bootstrap" binder template so we can use it to generate the other binder templates
//The template is based off the bootstrap binder template and manually created
//using the "hulk" tool of hogan.js
var Hogan = require('hogan.js');
var t = null;

t = new Hogan.Template();
module.exports = {
  templates : [t],
  render : function(c, p, i) {
    return t.render(c, p, i);
  }
};