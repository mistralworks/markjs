/*! Copyright (c) 2015 Yoza Wiratama
 * Licensed under the MIT License (LICENSE)
 */

(function () {
    //std
    var tIdLength = 8;
    //global variable for template and Mark
    Template = {};
    Mark = {};
    //doc manipulation
    var page = document.documentElement.innerHTML; //html page 1st when iniatiated
    //    console.log(page);
    Mark.set = function (property, value) {
        Mark[property] = value;
        renderPage();
    }

    Mark.get = function (property) {
        return Mark[property];
    }

    //do anything when content loaded
    document.addEventListener('DOMContentLoaded', function () {
        renderPage();
    }, false);

    //render page
    function renderPage() {
        //init all template in page
        var tmpl = document.getElementsByTagName('template');
        for (var ii = 0; ii < tmpl.length; ii++) {
            var d = {
                HTML: tmpl[ii].innerHTML,
                Helpers: {},
                Events: {},
                Elements: {},
                Name: getTemplateName(tmpl[ii])
            };
            Template[getTemplateName(tmpl[ii])] = d;
            renderTemplate(d.Name, d.HTML);
        }
    }
    //render template
    renderTemplate = function (name, template) {
        var allElements = document.getElementsByTagName('*');
        for (var i = 0, n = allElements.length; i < n; i++) {
            if (allElements[i].getAttribute("mk") !== null) {
                if (allElements[i].getAttribute("mk") === name) {
                    allElements[i].innerHTML = template;
                    //mk-text
                    var nodeMKText = document.querySelectorAll('[mk="' + name + '"] [mk-text]');
                    for (var j = 0; j < nodeMKText.length; j++) {
                        var sName = nodeMKText[j].getAttribute('mk-text');
                        if (Mark[sName])
                            updateMKText(name, sName, Mark[sName]);
                        else updateMKText(name, sName, "");
                    }
                    //mk-value
                    var nodeMKModel = document.querySelectorAll('[mk="' + name + '"] [mk-value]');
                    for (var j = 0; j < nodeMKModel.length; j++) {
                        var sName = nodeMKModel[j].getAttribute('mk-value');
                        if (Mark[sName])
                            updateMKValue(name, sName, Mark[sName]);
                        else updateMKValue(name, sName, "");
                    }
                }

            }
        }

    }

    function updateMKText(tmplName, txtName, value) {
        var nodes = document.querySelectorAll('[mk="' + tmplName + '"] [mk-text="' + txtName + '"]');
        for (i = 0; i < nodes.length; ++i) {
            nodes[i].innerHTML = value;
        }
    };

    function updateMKValue(tmplName, txtName, value) {
        var nodes = document.querySelectorAll('[mk="' + tmplName + '"] [mk-value="' + txtName + '"]');
        for (i = 0; i < nodes.length; ++i) {
            nodes[i].value = value;
        }
    };


    //support
    function getAllElementsWithAttribute(attribute) {
        var matchingElements = [];
        var allElements = document.getElementsByTagName('*');
        for (var i = 0, n = allElements.length; i < n; i++) {
            if (allElements[i].getAttribute(attribute) !== null) {
                // Element exists with attribute. Add to array.
                matchingElements.push(allElements[i]);
            }
        }
        return matchingElements;
    }

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