(function (exports) {
  var Hogan = require('hogan.js');
  
  var t = {
    /* jshint ignore:start */
    'multi1' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("MULTI 1!");t.b("\n" + i);t.b("From: http://mustache.github.com/mustache.5.html");t.b("\n" + i);t.b("Hello ");t.b(t.v(t.f("name",c,p,0)));t.b("\n" + i);t.b("You have just won $");t.b(t.v(t.f("value",c,p,0)));t.b("!");t.b("\n" + i);if(t.s(t.f("in_ca",c,p,1),c,p,0,113,151,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("Well, $");t.b(t.v(t.f("taxed_value",c,p,0)));t.b(", after taxes.");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }}),
    'multi2' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("MULTI 2!");t.b("\n" + i);t.b("From: http://mustache.github.com/mustache.5.html");t.b("\n" + i);t.b("Hello ");t.b(t.v(t.f("name",c,p,0)));t.b("\n" + i);t.b("You have just won $");t.b(t.v(t.f("value",c,p,0)));t.b("!");t.b("\n" + i);if(t.s(t.f("in_ca",c,p,1),c,p,0,113,151,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("Well, $");t.b(t.v(t.f("taxed_value",c,p,0)));t.b(", after taxes.");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }}),
    'multi3' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("MULTI 3!");t.b("\n" + i);t.b("From: http://mustache.github.com/mustache.5.html");t.b("\n" + i);t.b("Hello ");t.b(t.v(t.f("name",c,p,0)));t.b("\n" + i);t.b("You have just won $");t.b(t.v(t.f("value",c,p,0)));t.b("!");t.b("\n" + i);if(t.s(t.f("in_ca",c,p,1),c,p,0,113,151,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("Well, $");t.b(t.v(t.f("taxed_value",c,p,0)));t.b(", after taxes.");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }})
    /* jshint ignore:end */
  },
  r = function(n) {
    var tn = t[n];
    return function(c, p, i) {
      return tn.render(c, p || t, i);
    };
  };
  return {
    'multi1' : r('multi1'),
    'multi2' : r('multi2'),
    'multi3' : r('multi3')
  };
}(typeof exports === 'undefined' ? (this.multi = {}) : exports));