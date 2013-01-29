/*USAGE (Node.js):*/
/*var templates = require("./somewhere/nodejs.js");*/
/*var soleTemplateOutput = templates.render({context: "example"});*/
/*var specificTemplateOutputs = templates.render({}, "specific");*/
/**/
/*USAGE (In Browser)*/
/*<script type="text/javascript" src="./somewhere/nodejs.js"></script>*/
/*<script type="text/javascript">
/*var soleTemplateOutput = nodejs.render({context: "example"});*/
/*var specificTemplateOutputs = nodejs.render({}, "specific");*/
/*someDiv.innerHTML = soleTemplateOutput || specificTemplateOutput;*/
/*</script>*/


(function (exports) {
    var Hogan = require("hogan.js");
    var templates = {};

    templates["nodejs"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("var Hogan = require(\"hogan.js\"),\r");_.b("\n" + i);_.b("    templates = {};\r");_.b("\n" + i);_.b("\r");_.b("\n" + i);_.b("exports.templates = templates;\r");_.b("\n" + i);_.b("\r");_.b("\n" + i);if(_.s(_.f("templates",c,p,1),c,p,0,105,168,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("templates[\"");_.b(_.v(_.f("name",c,p,0)));_.b("\"] = new Hogan.Template(");_.b(_.t(_.f("template",c,p,0)));_.b(");\r");_.b("\n");});c.pop();}_.b("\r");_.b("\n" + i);_.b("exports.render = function(context, templateName) {\r");_.b("\n" + i);_.b("    if (templateName) {\r");_.b("\n" + i);_.b("        return templates[templateName].render(context);\r");_.b("\n" + i);_.b("    }\r");_.b("\n" + i);_.b("    else {\r");_.b("\n" + i);_.b("        for (name in templates) {\r");_.b("\n" + i);_.b("            if (templates.hasOwnProperty(name) && typeof(name) !== 'function') {\r");_.b("\n" + i);_.b("                return templates[name].render(context);\r");_.b("\n" + i);_.b("            }\r");_.b("\n" + i);_.b("        }\r");_.b("\n" + i);_.b("        throw \"could not resolve default template\";\r");_.b("\n" + i);_.b("    }\r");_.b("\n" + i);_.b("}");return _.fl();;});

    function render(context, templateName) {
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
    exports.render = render;
}(typeof exports === 'undefined' ? (this.nodejs = {}) : exports));