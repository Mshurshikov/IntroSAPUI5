sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/m/routing/Router"
], function(UIComponent, Router) {
	"use strict";
	return UIComponent.extend("my.Component", {

		metadata: {
			"rootView": {
				"viewName": "my.app.view.main",
				"type": sap.ui.core.mvc.ViewType.XML
			},

			"routing": {
				"config": {
					"routerClass": "sap.m.routing.Router",
					"viewPath": "my.app.view", 					//Path for view folder
					"viewType": sap.ui.core.mvc.ViewType.XML,
					"controlId": "App",
					"controlAggregation": "pages"				//Aggregation object
				},

				"routes": [
					{
						"pattern": "second",					//second page URL-pattern
						"name": "secondView",					//route name
						"target": "goToSecond"
					},
					{
						"pattern": "",
						"name": "firstView",
						"target": "goToFirst"
					},
					{
						"pattern": ":all*:",
						"name": "CatchAll",
						"target": "notFound"
					}
				],

				"targets": {
					"goToSecond": {
						"viewName": "second",
						"viewId": "Second",
						"transition": "flip"					//transition animation
					},
					"goToFirst": {
						"viewName": "first",
						"viewId": "First"
					},
					"notFound": {
						"viewName": "notFound",
						"viewId": "NotFound"
					}
				}
			}
		},

		init: function() {
			sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

			this.getRouter().initialize();
		}

		//createContent: function() {

		//}
	});
});