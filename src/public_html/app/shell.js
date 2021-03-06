define(['plugins/router'], function (router) {
    return {
        router: router,
        activate: function () {
            return router.map([
                { route: ['', '!search', '!search/:param'], moduleId: Settings.Search.UIViews.search, title: 'Search', nav: true },
                { route: '!object/:param', moduleId: 'viewmodels/object', title: 'Object', nav: false },
                { route: '!objectvideo/:param', moduleId: 'viewmodels/objectvideo', title: 'ObjectVideo', nav: false },
                { route: 'login', moduleId: 'viewmodels/login', title: 'Login', nav: false }
            ]).buildNavigationModel()
              .mapUnknownRoutes('hello/index', 'not-found')
              .activate();

              //.mapUnknownRoutes('hello/index', 'not-found')

        }
    };
});
/*
﻿define(['plugins/router'], function (router) {
    return {
        router: router,
        activate: function () {
            return router.map([
                { route: ['', 'home'],                  moduleId: 'samples/hello/index',            title: 'Hello World',       nav: true },
                { route: 'view-composition',            moduleId: 'samples/viewComposition/index',  title: 'View Composition',  nav: true },
                { route: 'modal',                       moduleId: 'samples/modal/index',            title: 'Modal Dialogs',     nav: true },
                { route: 'event-aggregator',            moduleId: 'samples/eventAggregator/index',  title: 'Events',            nav: true },
                { route: 'widgets',                     moduleId: 'samples/widgets/index',          title: 'Widgets',           nav: true },
                { route: 'master-detail',               moduleId: 'samples/masterDetail/index',     title: 'Master Detail',     nav: true },
                { route: 'knockout-samples*details',    moduleId: 'samples/ko/index',               title: 'Knockout Samples',  nav: true, hash: '#knockout-samples' }
            ]).buildNavigationModel()
              .mapUnknownRoutes('views/search', 'not-found')
              .activate();

              //.mapUnknownRoutes('hello/index', 'not-found')

        }
    };
});
*/