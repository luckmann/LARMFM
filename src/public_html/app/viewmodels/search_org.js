define([
    'durandal/app', 'mods/state', Settings.brandModule, 'mods/xmlmanager'
    ],
    function (app, state, brand, xmlman) {

    var items = ko.observableArray();
    var name = ko.observable();

    function searchReceived(response)
    {
        //app.showMessage(response.Result.TotalCount + "");
        items.removeAll();
        for(var i = 0; i < response.Result.Count; i++)
        {
            var r = response.Result.Results[i];

            // TODO: Settings.Search.metadataSchemaGuid
            var mdsguid = brand.getSearchMetadataSchemaGuid(r);
            for (var j = 0; j < r.MetadataXmls.length; j++)
            {
                if (r.MetadataXmls[j].MetadataSchemaGuid == mdsguid)
                {
                    var xml = r.MetadataXmls[j].MetadataXml;
                    var oi = new obfac.ObjectItem();
                    brand.initObjectItem(oi, 0, r.ObjectGUID, xmlman.parseXml(xml));
                    items.push(oi);
                }
            }
        }
    }

    function getParameterByName(name, str) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec("?"+str);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    return {
        items: items,
        app: app,
        displayName: 'TEST What is your name?',
        name: name,
        nameClick: function (item, event) {
            app.showMessage("Dette er teksten.", "Title", ["OK", "Cancel"]);
        },
        activate: function (data) {
            if (data.param != undefined)
            {
                // fid=n
                // s=denmark&date=now
                // TODO: search

                //(view, query, sort, pageIndex, pageSize, serviceCaller)
                var s = getParameterByName('s', data.param);
                var ss = "";
                var ilen = Settings.Search.indexes.length;
                for (var i = 0; i < ilen; i++)
                {
                    var idx = Settings.Search.indexes[i];
                    ss += "(" + idx.key + ":(" + s + "*))";
                    if (i + 1 < ilen)
                        ss += " OR ";
                }

                if (ss.length > 0)
                    ss = "(" + ss + ")";

                //var searchtext = "((Freetext%3A(denmark*)))";
                //CHAOS.Portal.Client.View.Get(Settings.Search.viewName,ss,"",0,20).WithCallback(searchReceived);
            }
        },
        userEmail: state.userEmail
    };
});





/*
define([
    'durandal/app', 'mods/state',
    'mods/testmodule', Settings.brandModule,
    'mcm/objectfactory', 'mods/xmlmanager'
    ],
    function (app, state, testmodule, brand, obfac, xmlman) {

    var items = ko.observableArray();

    var name = ko.observable();
    var canSayHello = ko.computed(function () {
        return name() ? true : false;
    });

    console.log(app);
    console.log("testmodule undefined: " + (testmodule === undefined));

    testmodule.testTitle("Workspace App");

    function searchReceived(response)
    {
        //app.showMessage(response.Result.TotalCount + "");
        items.removeAll();
        for(var i = 0; i < response.Result.Count; i++)
        {
            var r = response.Result.Results[i];

            // TODO: Settings.Search.metadataSchemaGuid
            var mdsguid = brand.getSearchMetadataSchemaGuid(r);
            for (var j = 0; j < r.MetadataXmls.length; j++)
            {
                if (r.MetadataXmls[j].MetadataSchemaGuid == mdsguid)
                {
                    var xml = r.MetadataXmls[j].MetadataXml;
                    var oi = new obfac.ObjectItem();
                    brand.initObjectItem(oi, 0, r.ObjectGUID, xmlman.parseXml(xml));
                    items.push(oi);
                }
            }
        }
    }

    function getParameterByName(name, str) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec("?"+str);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    return {
        items: items,
        app: app,
        displayName: 'TEST What is your name?',
        name: name,
        sayHello: function () {
            app.showMessage('Hello ' + name() + '!', 'Greetings');
        },
        canSayHello: canSayHello,
        nameClick: function (item, event) {
            app.showMessage("Dette er teksten.", "Title", ["OK", "Cancel"]);
        },
        title: testmodule.testTitle,
        activate: function (data) {
            if (data.param != undefined)
            {
                // fid=n
                // s=denmark&date=now
                // TODO: search

                //(view, query, sort, pageIndex, pageSize, serviceCaller)
                var s = getParameterByName('s', data.param);
                var ss = "";
                var ilen = Settings.Search.indexes.length;
                for (var i = 0; i < ilen; i++)
                {
                    var idx = Settings.Search.indexes[i];
                    ss += "(" + idx.key + ":(" + s + "*))";
                    if (i + 1 < ilen)
                        ss += " OR ";
                }

                if (ss.length > 0)
                    ss = "(" + ss + ")";

                //var searchtext = "((Freetext%3A(denmark*)))";
                CHAOS.Portal.Client.View.Get(Settings.Search.viewName,ss,"",0,20).WithCallback(searchReceived);
            }
        },
        userEmail: state.userEmail
    };
});
*/


