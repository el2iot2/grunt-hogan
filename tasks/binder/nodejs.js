var Hogan = require('hogan.js');
var t = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("var Hogan = require('hogan.js');");_.b("\n" + i);_.b("var t = {");_.b("\n" + i);if(_.s(_.f("templates",c,p,1),c,p,0,111,173,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("  '");_.b(_.v(_.f("name",c,p,0)));_.b("' : new Hogan.Template(");_.b(_.t(_.f("template",c,p,0)));_.b(")");_.b(_.v(_.f("comma",c,p,0)));_.b("\n");});c.pop();}_.b("},");_.b("\n" + i);_.b("r = function(n) {");_.b("\n" + i);_.b("  var tn = t[n];");_.b("\n" + i);_.b("  return function(c, p, i) {");_.b("\n" + i);_.b("    return tn.render(c, p || t, i);");_.b("\n" + i);_.b("  };");_.b("\n" + i);_.b("};");_.b("\n" + i);_.b("module.exports = {");_.b("\n" + i);if(_.s(_.f("exposeTemplates",c,p,1),c,p,0,340,360,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("  templates : t,");_.b("\n");});c.pop();}if(_.s(_.f("templates",c,p,1),c,p,0,397,438,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("  '");_.b(_.v(_.f("name",c,p,0)));_.b("' : r('");_.b(_.v(_.f("name",c,p,0)));_.b("')");_.b(_.v(_.f("comma",c,p,0)));_.b("\n");});c.pop();}_.b("};");return _.fl();;});

module.exports = {
  render : function(c, p, i) {
    return t.render(c, p, i);
  }
};