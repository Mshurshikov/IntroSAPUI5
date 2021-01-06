sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function(Controller, UIComponent) {
	"use strict";
	return Controller.extend("my.app.controller.meals", {
		onInit: function() {
			UIComponent.getRouterFor(this).getRoute("mealsView")
				.attachPatternMatched(this._onObjectMatched, this);	
		},
		
		_onObjectMatched: function(oEvent) {
			var sBindingPath = 	"/" + oEvent.getParameter("arguments").context +
								"/" + oEvent.getParameter("arguments").id;
			this.getView().byId("meals").bindElement(sBindingPath);
			
			this.getView().byId("mealsPage").setTitle(oEvent.getParameter("arguments").day);
		},
		
		onNavButtonPressed: function() {
			UIComponent.getRouterFor(this).navTo("firstView");
		}
	});
});