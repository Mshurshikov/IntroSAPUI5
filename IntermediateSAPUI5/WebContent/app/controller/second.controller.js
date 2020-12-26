sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function(Controller, UIComponent) {
	"use strict";
	return Controller.extend("my.app.controller.second", {
		onInit: function() {
			
		},
		
		onNavButtonPressed: function(oEvent) {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("firstView");
		}
	});
});