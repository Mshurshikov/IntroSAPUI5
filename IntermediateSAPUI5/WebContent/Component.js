sap.ui.define([
	"sap/ui/core/UIComponent"
], function (UIComponent) {
	"use strict";
	return UIComponent.extend("my.Component", {
		
		metadata: { 
			rootView: {
				viewName: "my.app.view.main",
				type: sap.ui.core.mvc.ViewType.XML
			}
		},
		
		init: function() {
			sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
		},
		
		//createContent: function() {

		//}
	});
});