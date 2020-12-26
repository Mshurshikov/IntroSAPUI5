sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function(Controller, UIComponent) {
	"use strict";
	return Controller.extend("my.app.controller.first", {
		onInit: function() {
			
		},
		
		onSlide: function(oEvent) {
			if(oEvent.getParameter("value") == "100") {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("secondView"); 						//route name
			}
		}
	});
});