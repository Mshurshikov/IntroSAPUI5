sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/util/MockServer",
	"sap/ui/model/odata/v2/ODataModel",
	"my/app/localService/mockserver"
], function(Controller, MockServer, ODataModel, MyMockServer) {
	"use strict";
	return Controller.extend("my.app.controller.main", {
		onInit: function() {

		}
	});
});