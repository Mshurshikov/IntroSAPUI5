sap.ui.define([
	"sap/ui/core/util/MockServer"
], function(MockServer) {
	"use strict";

	return {
		init: function() {
			var oMockServer = new MockServer({
				rootUri: "https://mymockserver/"
			});

			MockServer.config({
				autoRespond: true,
			});

			oMockServer.simulate("../localService/metadata.xml"); //), "../localService/mockData");
			oMockServer.start();
		}
	}
});