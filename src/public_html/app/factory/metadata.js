﻿define(['knockout', 'mods/portal', 'mods/xmlmanager', 'mods/metadataschema'], function (ko, portal, xmlman, metadataschema) {

    var MetadataEditor = function () {
        this.editor = ko.observable();
        this.data = null;
    };

    MetadataEditor.prototype = function () {

        var seteditor = function (editorname, data) {
            this.data = data;
            if (editorname.indexOf('.html', editorname.length - 5) !== -1) {
                this.editor("editors/" + editorname);
            } else {
                this.editor("views/editors/" + editorname);
            }
        }

        return {
            seteditor: seteditor
        };
    }();

    return {
        MetadataEditor: MetadataEditor
    };
});



