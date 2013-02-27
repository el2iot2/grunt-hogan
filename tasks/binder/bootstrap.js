//This exports the "bootstrap" binder template so we can use it to generate the other binder templates
//The template is based off the bootstrap binder template and manually created
//using the "hulk" tool of hogan.js
var Hogan = require('hogan.js');
var t = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("var Hogan = require('hogan.js');");_.b("\n" + i);if(_.s(_.f("templates",c,p,1),c,p,0,155,200,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("var t = new Hogan.Template(");_.b(_.t(_.f("template",c,p,0)));_.b(");");_.b("\n");});c.pop();}_.b("\n" + i);_.b("module.exports = {");_.b("\n" + i);if(_.s(_.f("exposeTemplates",c,p,1),c,p,0,319,341,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("  templates : [t],");_.b("\n");});c.pop();}_.b("  render : function(c, p, i) {");_.b("\n" + i);_.b("    return t.render(c, p, i);");_.b("\n" + i);_.b("  }");_.b("\n" + i);_.b("}");return _.fl();;});
module.exports = {
  templates : [t],
  render : function(c, p, i) {
    return t.render(c, p, i);
  }
};