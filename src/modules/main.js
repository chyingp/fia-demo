var Backbone, Workspace, app;

Backbone = require('backbone');

Backbone.$ = require('jquery');

app = require('views/app.js');

Workspace = require('routers/router');

new Workspace();

Backbone.history.start();

new app();

var i = 2;
do{

}while (i--); return 1;
