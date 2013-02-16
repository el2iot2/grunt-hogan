var Hogan = require("hogan.js"),
    templates = {};

exports.templates = templates;

templates["default"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("(function (exports) {");_.b("\n" + i);_.b("    var Hogan = require('hogan.js');");_.b("\n" + i);_.b("    var templates = {};");_.b("\n" + i);_.b("\n" + i);if(_.s(_.f("templates",c,p,1),c,p,0,102,171,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("    templates['");_.b(_.v(_.f("name",c,p,0)));_.b("'] = new Hogan.Template(");_.b(_.t(_.f("template",c,p,0)));_.b(");");_.b("\n");});c.pop();}_.b("\n" + i);_.b("    function render(context, templateName) {");_.b("\n" + i);_.b("        if (templateName) {");_.b("\n" + i);_.b("            return templates[templateName].render(context);");_.b("\n" + i);_.b("        }");_.b("\n" + i);_.b("        else {");_.b("\n" + i);_.b("            for (name in templates) {");_.b("\n" + i);_.b("                if (templates.hasOwnProperty(name) && typeof(name) !== 'function') {");_.b("\n" + i);_.b("                    return templates[name].render(context);");_.b("\n" + i);_.b("                }");_.b("\n" + i);_.b("            }");_.b("\n" + i);_.b("            throw new Error('could not resolve default template');");_.b("\n" + i);_.b("        }");_.b("\n" + i);_.b("    }");_.b("\n" + i);_.b("    exports.render = render;");_.b("\n" + i);_.b("}(typeof exports === 'undefined' ? (this.");_.b(_.v(_.f("exportName",c,p,0)));_.b(" = {}) : exports));");return _.fl();;});

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