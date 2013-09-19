﻿requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-2.3.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'jquery': '../lib/jquery/jquery-1.9.1',
        'mods': 'mods/'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        }
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator','mods/portal','mods/state'],  
function (system, app, viewLocator, portal, state) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'LARM.fm';

    //specify which plugins to install and their configuration
    app.configurePlugins({
        router:true,
        dialog: true,
        widget: {
            kinds: ['expander']
        }
    });

    // TODO: Setup the chaos portal client and login with anonymous before
    // proceeding.
    portal.onAppReady(onAppReady);
    
    function onAppReady(){
        
    for (var i = 0; i < Settings.Search.objectTypes.length; i++)
    {
        var ot = Settings.Search.objectTypes[i];
        state.searchMetadataSchemaGuids[ot.id] = ot.metadataSchemaGuid;
    }
        
    app.start().then(function () {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        //Show the app by setting the root view model for our application.
        app.setRoot('shell');
        });
    }
    
});