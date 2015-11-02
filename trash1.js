(function () {
    //std
    var tIdLength = 8;
    //global variable for template and session
    Template = {};
    Session = {};
    //doc manipulation
    var
        oReg = '{{\s*[@@@]+\s*}}', //regex for object
        tReg = '{{>\s*[@@@]+\s*}}', //regex for template
        trReg = '{{&gt;\s*[@@@]+\s*}}',
        eReg = '{{#\s*[@@@]+\s*}}', //regex for template
        MK = [],
        MK_TEXT = [],
        MK_REPEAT = [],
        page = document.documentElement.innerHTML; //html page 1st when iniatiated
    //    console.log(page);
    Session.set = function (property, value) {
            Session[property] = value;
            renderValue(property, value);
            //            console.log(property);
            //            console.log(value);
            Session.mark(property, function (id, oldval, newval) {
                console.log('vm.' + id + ' changed from ' + oldval + ' to ' + newval);
                renderValue(id, newval);
                return newval;
            });
        }
        // object.mark
    if (!Object.prototype.mark) {
        Object.defineProperty(Object.prototype, "mark", {
            value: function (p, h) {
                var sReg = oReg.replace(new RegExp('@@@', 'g'), p);
                var
                    oldval = this[p],
                    newval = oldval,
                    getter = function () {
                        return newval;
                    },
                    setter = function (val) {
                        //console.log('in setter : ' + val);
                        oldval = newval;
                        var reg = page.replace(new RegExp(sReg, 'g'), newval);
                        //console.log(reg);
                        return newval = h.call(this, p, oldval, val);
                    };
                if (delete this[p]) { // can't mark constants
                    Object.defineProperty(this, p, {
                        get: getter,
                        set: setter,
                        enumerable: true,
                        configurable: true
                    });
                }
            }
        });
    }

    // object.unmark
    if (!Object.prototype.unmark) {
        Object.defineProperty(Object.prototype, "unmark", {
            value: function (p) {
                var val = this[o];
                delete this[p];
                this[p] = val;
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        var els = document.getElementsByTagName('*');
        for (var ii = 0; ii < els.length; ii++) {
            if (els[ii].attributes.length > 0)
                for (var jj = 0; jj < els[ii].attributes.length; jj++) {
                    //                    console.log(els[ii].attributes[jj].name);
                    if (els[ii].attributes[jj].name === "mk")
                        MK.push(els[ii]);
                    else {
                        if (els[ii].attributes[jj].name === "mk-text")
                            MK_TEXT.push(els[ii]);
                        if (els[ii].attributes[jj].name === "mk-repeat")
                            MK_REPEAT.push(els[ii]);
                    }
                }

        }
        console.log(MK);
        console.log(MK_TEXT);
        console.log(MK_REPEAT);
        //        console.log(els);
        page = document.documentElement.innerHTML;
        //init all template in page
        var tmpl = document.getElementsByTagName('template');
        //console.log(tmpl);
        for (var ii = 0; ii < tmpl.length; ii++) {
            //            console.log(tmpl);
            var d = {
                HTML: tmpl[ii].innerHTML,
                Object: {},
                Each: {},
                If: {},
                Template: {},
                Name: getTemplateName(tmpl[ii])
            };
            Template[getTemplateName(tmpl[ii])] = d;
            for (var jj = 0; jj < MK.length; jj++) {
                console.log(MK[jj]);
            }
            //            console.log(MK[0].outerHTML);
            //            page = page.replace(MK[0].outerHTML, d.HTML);
            var sReg = trReg.replace(new RegExp('@@@', 'g'), d.Name);
            //            var mktmpl = document.querySelectorAll(MK[0].tagName + '[mk=' + d.Name + ']')[0];
            //            console.log(mktmpl);
            //            console.log(sReg);
            //            console.log(d.HTML);
            //            console.log(page.match(new RegExp(sReg, 'g')));
            //            console.log(page.replace(newRegExp(sReg, 'g'), d.HTML));
            //            page = page.replace(new RegExp(sReg, 'g'), makeTemplate(d.Name, d.HTML));
            //            document.documentElement.innerHTML = page;
            //            document.body.innerHTML = document.body.innerHTML.replace(new RegExp(sReg 'g'), d.HTML);
        }




    }, false);

    function makeTemplate(tName, inner) {
        var attr = ' mk="' + tName + '" ';
        return '<div ' + attr + '>' + inner + '</div>';
    }

    //render value in session to html for every template
    function renderValue(o, v) {
        console.log(Template);
    }
    //render all session
    function renderAllSession() {}

    //render a template by name
    renderTemplate = function (name) {

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