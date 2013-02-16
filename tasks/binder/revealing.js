var Hogan = require("hogan.js"),
    templates = {};

exports.templates = templates;

templates["revealing"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("var ");_.b(_.v(_.f("exportName",c,p,0)));_.b(" = function() {");_.b("\n" + i);_.b("\n" + i);if(_.s(_.f("templates",c,p,1),c,p,0,49,106,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("    var _");_.b(_.v(_.f("name",c,p,0)));_.b(" = new Hogan.Template(");_.b(_.t(_.f("template",c,p,0)));_.b(");");_.b("\n");});c.pop();}_.b("\n" + i);_.b("   return {");_.b("\n" + i);if(_.s(_.f("templates",c,p,1),c,p,0,148,260,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("        ");_.b(_.v(_.f("name",c,p,0)));_.b(": function render_");_.b(_.v(_.f("name",c,p,0)));_.b("(context) {");_.b("\n" + i);_.b("            return _");_.b(_.v(_.f("name",c,p,0)));_.b(".render(context);");_.b("\n" + i);_.b("        },");_.b("\n");});c.pop();}_.b("        termination: null;");_.b("\n" + i);_.b("}();");_.b("\n");return _.fl();;});

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