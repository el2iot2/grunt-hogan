/*USAGE (Node.js):*/
/*var templates = require("./somewhere/hulk.js");*/
/*var soleTemplateOutput = templates.render({context: "example"});*/
/*var specificTemplateOutputs = templates.render({}, "specific");*/
/**/
/*USAGE (In Browser)*/
/*<script type="text/javascript" src="./somewhere/hulk.js"></script>*/
/*<script type="text/javascript">
/*var soleTemplateOutput = hulk.render({context: "example"});*/
/*var specificTemplateOutputs = hulk.render({}, "specific");*/
/*someDiv.innerHTML = soleTemplateOutput || specificTemplateOutput;*/
/*</script>*/


(function (exports) {
    var Hogan = require("hogan.js");
    var templates = {};

    templates["hulk"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("var templates = {};\r");_.b("\n" + i);if(_.s(_.f("templates",c,p,1),c,p,0,35,98,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("templates[\"");_.b(_.v(_.f("name",c,p,0)));_.b("\"] = new Hogan.Template(");_.b(_.t(_.f("template",c,p,0)));_.b(");\r");_.b("\n");});c.pop();}return _.fl();;});

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
}(typeof exports === 'undefined' ? (this.hulk = {}) : exports));