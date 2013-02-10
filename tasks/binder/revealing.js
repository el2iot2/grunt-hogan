var Hogan = require("hogan.js"),
    templates = {};

exports.templates = templates;

templates["revealing"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("var ");_.b(_.v(_.f("exportName",c,p,0)));_.b(" = function(){\r");_.b("\n" + i);_.b("\r");_.b("\n" + i);if(_.s(_.f("templates",c,p,1),c,p,0,50,109,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("    var _");_.b(_.v(_.f("name",c,p,0)));_.b(" = new Hogan.Template(");_.b(_.t(_.f("template",c,p,0)));_.b(");\r");_.b("\n");});c.pop();}_.b("\r");_.b("\n" + i);_.b("   return {\r");_.b("\n" + i);if(_.s(_.f("templates",c,p,1),c,p,0,154,270,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("        ");_.b(_.v(_.f("name",c,p,0)));_.b(": function render_");_.b(_.v(_.f("name",c,p,0)));_.b("(context) {\r");_.b("\n" + i);_.b("            return _");_.b(_.v(_.f("name",c,p,0)));_.b(".render(context);\r");_.b("\n" + i);_.b("        },\r");_.b("\n");});c.pop();}_.b("        termination: null;\r");_.b("\n" + i);_.b("}();\r");_.b("\n" + i);_.b("\r");_.b("\n" + i);_.b("\r");_.b("\n" + i);_.b("\r");_.b("\n");return _.fl();;});

exports.render = function(context, templateName) {
    if (templateName) {
        return templates[templateName].render(context);
    }
    else {
        for (name in templates) {
            if (templates.hasOwnProperty(name) && typeof(name) !== 'function') {
                return templates[name].render(context);
            }
        }
        throw "could not resolve default template";
    }
}