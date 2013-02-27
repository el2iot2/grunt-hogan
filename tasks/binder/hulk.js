var Hogan = require('hogan.js');
var t = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("var templates = {};\r");_.b("\n" + i);if(_.s(_.f("templates",c,p,1),c,p,0,113,176,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("templates['");_.b(_.v(_.f("name",c,p,0)));_.b("'] = new Hogan.Template(");_.b(_.t(_.f("template",c,p,0)));_.b(");\r");_.b("\n");});c.pop();}return _.fl();;});

module.exports = {
  render : function(c, p, i) {
    return t.render(c, p, i);
  }
}