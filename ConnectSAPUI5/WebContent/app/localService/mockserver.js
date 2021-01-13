sap.ui.define([
	"sap/ui/core/util/MockServer"
], function(MockServer) {
	"use strict";

	return {
		oMockServer: MockServer,
		
		init: function() {
			this.oMockServer = new MockServer({
				rootUri: "https://mymockserver/"
			});

			this.oMockServer.simulate("../localService/metadata.xml", "../localService/mockData");
			this.oMockServer.start();
		}
	}
});