/*! Copyright (c) 2015 Yoza Wiratama
 * Licensed under the MIT License (LICENSE)
 * mark.js v0.0.1.5
 */

(function () {
    //global variable for template and Mark
    MarkNodes = [];
    Template = {};
    Mark = {};

    Mark.set = function (property, value) {

        Mark[property] = value;
        renderMark(property);
        renderTemplates();
    }

    Mark.get = function (property) {
        return Mark[property];
    }

    //do anything when content loaded
    document.addEventListener('DOMContentLoaded', function () {
        initMark();
        renderMarks();
        renderTemplates();
    }, false);

    function initMark() {
        var nodes = document.querySelectorAll('[mk]');
        for (var ii = 0; ii < nodes.length; ++ii) {
            var marks = nodes[ii].getAttribute('mk').split(';');
            var Marks = [];
            for (var jj = 0; jj < marks.length; jj++) {
                var nv = marks[jj].split('=');
                Marks.push({
                    Name: nv[0],
                    Value: nv[1]
                });
            }

            nodes[ii].addEventListener('keypress', function (e) {
                var value = this.value;
                if (String.fromCharCode(e.keyCode) != "")
                    value = this.value + String.fromCharCode(e.keyCode);
                marks = this.getAttribute('mk').split(';');
                for (var jj = 0; jj < marks.length; jj++) {
                    var nv = marks[jj].split('=');
                    if (nv[0] === 'value') {
                        Mark.set(nv[1], value);
                    }
                }
            });

            MarkNodes.push({
                Node: nodes[ii],
                Marks: Marks
            });
        };

        var templates = document.getElementsByTagName('template');
        for (var ii = 0; ii < templates.length; ii++) {
            var c = templates[0].content.children;
            var t = {
                Name: templates[ii].getAttribute('name'),
                Node: templates[ii],
                ChildNodes: [],
                Events: {},
                Helpers: {}
            };
            for (var jj = 0; jj < c.length; jj++) {
                if (c[jj].getAttribute('mk'))
                    t.ChildNodes.push(c[jj]);
            }

            Template[templates[ii].getAttribute('name')] = t;
        }
    }

    function renderMarks() {
        var markkey = Object.keys(Mark);
        for (var ii = 0; ii < markkey.length; ii++) {
            renderMark(markkey[ii]);
        }
    }

    // name : mark's name
    function renderMark(name) {
        for (var ii = 0; ii < MarkNodes.length; ii++) {
            for (var jj = 0; jj < MarkNodes[ii].Marks.length; jj++) {
                var mark = MarkNodes[ii].Marks[jj];
                if (mark.Name === 'text' && mark.Value === name) {
                    MarkNodes[ii].Node.innerHTML = Mark.get(name);
                } else if (mark.Name === 'value' && mark.Value === name) {
                    MarkNodes[ii].Node.value = Mark.get(name);
                } else if (mark.Name === 'check' && mark.Value === name) {
                    MarkNodes[ii].Node.checked = Mark.get(name);
                }

            }
        }
    }

    function renderTemplates() {
        var key = Object.keys(Template);
        for (var ii = 0; ii < key.length; ii++) {
            renderTemplate(key[ii]);
        }
    }

    function renderTemplate(name) {
        for (var ii = 0; ii < MarkNodes.length; ii++) {
            for (var jj = 0; jj < MarkNodes[ii].Marks.length; jj++) {
                var mark = MarkNodes[ii].Marks[jj];
                if (mark.Name === 'template' && mark.Value === name) {
                    var t = Template[name].ChildNodes;
                    for (var kk = 0; kk < t.length; kk++) {
                        var m = t[kk].getAttribute('mk').split(';');
                        for (var ll = 0; ll < m.length; ll++) {
                            t[kk].innerHTML = Mark.get('Name');
                        }
                    }
                    MarkNodes[ii].Node.innerHTML = getTemplate(name);
                }

            }
        }
    }

    function getTemplate(name) {
        return Template[name].Node.innerHTML;
    }


    //support
    function makeid(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    function getTemplateName(node) {
        for (var ii = 0; ii < node.attributes.length; ii++) {
            if (node.attributes[ii].nodeName === "name") return node.attributes[ii].value;
        }
    }
})();