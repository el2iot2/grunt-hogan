//This exports the Node.js binder template so we can bootstrap other binder templates
/*
USAGE (Node.js):
var templates = require("./somewhere/{{outputFileName}}.js");
var soleTemplateOutput = templates.render({context: "example"});
var specificTemplateOutputs = templates.render({}, "specific");

USAGE (In Browser)
<script type="text/javascript" src="./somewhere/{{outputFileName}}.js"></script>
<script type="text/javascript">
var soleTemplateOutput = {{exportName}}.render({context: "example"});
var specificTemplateOutputs = {{exportName}}.render({}, "specific");
someDiv.innerHTML = soleTemplateOutput || specificTemplateOutput;
</script>
*/
(function (exports) {
    var Hogan = require("hogan.js");
    var templates = {};
    
    //The pre-compiled template derived from view/binder/default.hogan
    templates["default"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("(function (exports) {\r");_.b("\n" + i);_.b("    var Hogan = require(\"hogan\");\r");_.b("\n" + i);_.b("    var templates = {};\r");_.b("\n" + i);_.b("\r");_.b("\n" + i);if(_.s(_.f("templates",c,p,1),c,p,0,103,172,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("    templates[\"");_.b(_.v(_.f("name",c,p,0)));_.b("\"] = new Hogan.Template(");_.b(_.v(_.f("template",c,p,0)));_.b(");\r");_.b("\n");});c.pop();}_.b("\r");_.b("\n" + i);_.b("    function render(context, templateName) {\r");_.b("\n" + i);_.b("        if (templateName) {\r");_.b("\n" + i);_.b("            return templates[templateName].render(context);\r");_.b("\n" + i);_.b("        }\r");_.b("\n" + i);_.b("        else {\r");_.b("\n" + i);_.b("            for (name in templates) {\r");_.b("\n" + i);_.b("                if (templates.hasOwnProperty(name) && typeof(name) !== 'function') {\r");_.b("\n" + i);_.b("                    return templates[name].render(context);\r");_.b("\n" + i);_.b("                }\r");_.b("\n" + i);_.b("            }\r");_.b("\n" + i);_.b("            throw \"could not resolve default template\";\r");_.b("\n" + i);_.b("        }\r");_.b("\n" + i);_.b("    }\r");_.b("\n" + i);_.b("    exports.render = render;\r");_.b("\n" + i);_.b("}(typeof exports === 'undefined' ? (this.");_.b(_.v(_.f("exportName",c,p,0)));_.b(" = {}) : exports));");return _.fl();;});

    //Render wrapper function
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
    
    //Render wrapper function export
    exports.render = render;

}(exports));