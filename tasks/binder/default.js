var Hogan = require("hogan.js"),
    templates = {};

exports.templates = templates;

templates["default"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("/*USAGE (Node.js):*/\r");_.b("\n" + i);_.b("/*var templates = require(\"./somewhere/");_.b(_.v(_.f("outputFileName",c,p,0)));_.b(".js\");*/\r");_.b("\n" + i);_.b("/*var soleTemplateOutput = templates.render({context: \"example\"});*/\r");_.b("\n" + i);_.b("/*var specificTemplateOutputs = templates.render({}, \"specific\");*/\r");_.b("\n" + i);_.b("/**/\r");_.b("\n" + i);_.b("/*USAGE (In Browser)*/\r");_.b("\n" + i);_.b("/*<script type=\"text/javascript\" src=\"./somewhere/");_.b(_.v(_.f("outputFileName",c,p,0)));_.b(".js\"></script>*/\r");_.b("\n" + i);_.b("/*<script type=\"text/javascript\">\r");_.b("\n" + i);_.b("/*var soleTemplateOutput = ");_.b(_.v(_.f("exportName",c,p,0)));_.b(".render({context: \"example\"});*/\r");_.b("\n" + i);_.b("/*var specificTemplateOutputs = ");_.b(_.v(_.f("exportName",c,p,0)));_.b(".render({}, \"specific\");*/\r");_.b("\n" + i);_.b("/*someDiv.innerHTML = soleTemplateOutput || specificTemplateOutput;*/\r");_.b("\n" + i);_.b("/*</script>*/\r");_.b("\n" + i);_.b("\r");_.b("\n" + i);_.b("\r");_.b("\n" + i);_.b("(function (exports) {\r");_.b("\n" + i);_.b("    var Hogan = require(\"hogan.js\");\r");_.b("\n" + i);_.b("    var templates = {};\r");_.b("\n" + i);_.b("\r");_.b("\n" + i);if(_.s(_.f("templates",c,p,1),c,p,0,724,795,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("    templates[\"");_.b(_.v(_.f("name",c,p,0)));_.b("\"] = new Hogan.Template(");_.b(_.t(_.f("template",c,p,0)));_.b(");\r");_.b("\n");});c.pop();}_.b("\r");_.b("\n" + i);_.b("    function render(context, templateName) {\r");_.b("\n" + i);_.b("        if (templateName) {\r");_.b("\n" + i);_.b("            return templates[templateName].render(context);\r");_.b("\n" + i);_.b("        }\r");_.b("\n" + i);_.b("        else {\r");_.b("\n" + i);_.b("            for (name in templates) {\r");_.b("\n" + i);_.b("                if (templates.hasOwnProperty(name) && typeof(name) !== 'function') {\r");_.b("\n" + i);_.b("                    return templates[name].render(context);\r");_.b("\n" + i);_.b("                }\r");_.b("\n" + i);_.b("            }\r");_.b("\n" + i);_.b("            throw \"could not resolve default template\";\r");_.b("\n" + i);_.b("        }\r");_.b("\n" + i);_.b("    }\r");_.b("\n" + i);_.b("    exports.render = render;\r");_.b("\n" + i);_.b("}(typeof exports === 'undefined' ? (this.");_.b(_.v(_.f("exportName",c,p,0)));_.b(" = {}) : exports));");return _.fl();;});

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