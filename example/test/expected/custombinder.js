var Hogan = require('hogan.js');
var templates = {};
/* jshint ignore:start */
templates['one'] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("\r");t.b("\n" + i);t.b("/*an amd binder that returns you the templates*/\r");t.b("\n" + i);t.b("define(['hogan'], function (Hogan) {\r");t.b("\n" + i);t.b("  var templates = {};\r");t.b("\n" + i);if(t.s(t.f("templates",c,p,1),c,p,0,337,404,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  templates[\"");t.b(t.v(t.f("name",c,p,0)));t.b("\"] = new Hogan.Template(");t.b(t.t(t.f("template",c,p,0)));t.b(");\r");t.b("\n" + i);});c.pop();}t.b("  return templates;\r");t.b("\n" + i);t.b("});");return t.fl(); },partials: {}, subs: {  }}); 
/* jshint ignore:end */
module.exports = templates;