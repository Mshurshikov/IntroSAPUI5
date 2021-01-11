sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/util/MockServer",
	"sap/ui/model/odata/v2/ODataModel"
], function(Controller, MockServer, ODataModel){
	"use strict";
	return Controller.extend("my.app.controller.main", {
		onInit: function() {

			var oMockServer = new MockServer({
					rootUri: "https://mymockserver/"
				});
			
			oMockServer.simulate("app/model/metadata.xml");//, "app/model/");
			oMockServer.start();
				
			var oModel = new ODataModel("https://mymockserver/", true);
			this.getView().setModel(oModel);
		}
	});
});