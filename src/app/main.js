requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-3.1.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'jquery': '../lib/jquery/jquery-1.9.1',
        'bluebird': '../lib/bluebird/bluebird.min',
        'pouchdb':'../lib/pouchdb/pouchdb-3.3.1.min',
        'helpers': './helpers',
        'domain':'./data/domain',
        'services': './data/services',
        'model': './data/model'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
       },
       'pouchdb':{
         exports: 'PouchDB'
       }
    }
});

define(['bluebird','helpers/kohelpers','durandal/system', 'durandal/app', 'durandal/viewLocator'],
 function (Promise,ko,system, app, viewLocator) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'InfoApp Application';

    app.configurePlugins({
        router:true,
        dialog: true
    });

    app.start().then(function() {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell', 'entrance');
    });
});
