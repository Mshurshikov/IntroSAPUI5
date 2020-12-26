sap.ui.define([
	"sap/ui/core/UIComponent"
], function (UIComponent) {
	"use strict";
	return UIComponent.extend("my.Component", {
		
		//metadata: { },
		
		//init: function() {},
		
		createContent: function() {
			return this.view = sap.ui.view({
				id: "main",
				viewName: "my.app.view.main",
				type: sap.ui.core.mvc.ViewType.XML
			});
		}
	});
});