sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	
	return Controller.extend("my.app.controller.BaseController", {
		getRouter:function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		
		getModel: function(sName) {
			var oModel = this.getView().getModel(sName);
			if(!oModel) {
				oModel = this.getComponent().getModel(sName);
			}
			return oModel;
		},
		
		getComponent: function() {
			var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());
			if (sComponentId) {
				return sap.ui.component(sComponentId);
			}
		}
	});
});