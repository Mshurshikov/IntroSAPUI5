sap.ui.define([
	"sap/ui/core/util/MockServer"
], function(MockServer) {
	"use strict";

	return {
		oMockServer: MockServer,
		
		init: function() {
			this.oMockServer = new MockServer({
				rootUri: "https://my-sap-server:8080/sap/opu/odata/sap/employee_portal/"
			});

			this.oMockServer.simulate("../localService/metadata.xml");
			this.oMockServer.start();
		}
	}
});