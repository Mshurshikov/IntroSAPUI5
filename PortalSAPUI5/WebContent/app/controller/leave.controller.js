sap.ui.define([
	"my/app/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/unified/DateTypeRange"
], function(Controller, JSONModel, DateTypeRange) {
	"use strict";
	return Controller.extend("my.app.controller.leave", {
		onInit: function() {
			this.getModel("portal").attachRequestCompleted(this.onRequestCompleted, this);
			
			this.getModel("portal").read("/StatusTypesSet", {
				success: function(oEvent) {
					var aData = oEvent.results,
						oIndexedData = [];
					jQuery.each(aData, function(i, oItem) {
						oIndexedData[oItem.StatusKey] = oItem.StatusText;
					});
					this.getView().setModel(new JSONModel(oIndexedData), "statusTypes");
				}.bind(this)
			});
			
			this.getModel("portal").read("/AbsenceTypesSet", {
				success: function(oEvent) {
					var aData = oEvent.results,
						oIndexedData = [];
					jQuery.each(aData, function(i, oItem) {
						oIndexedData[oItem.AbsKey] = oItem.AbsText;
					});
					this.getView().setModel(new JSONModel(oIndexedData), "types");
				}.bind(this)
			});
		},

		onRequestCompleted: function(oEvent) {
			if (oEvent.getParameter("url").indexOf("AbsenceSet") === -1 ||
				oEvent.getParameter("url").indexOf("$count") !== -1 ||
				oEvent.getParameter("method") !== "GET") {
				return;
			}
			var aLeaveData = JSON.parse(oEvent.getParameter("response").responseText).d.results,
				rDateRegExp = new RegExp(/\/Date\(([0-9]*)\)\//),
				oCalendar = this.getView().byId("Calendar");

			oCalendar.removeAllSpecialDates();
			jQuery.each(aLeaveData, function(i, oLeave) {
				var sCalDayType = "None";
				switch (oLeave.Type) {
					case "01": sCalDayType = "Type01"; break;
					case "02": sCalDayType = "Type02"; break;
					case "03": sCalDayType = "Type03"; break;
					case "04": sCalDayType = "Type04"; break;
					case "05": sCalDayType = "Type05"; break;
					case "06": sCalDayType = "Type06"; break;
				}

				oCalendar.addSpecialDate(new DateTypeRange({
					type: sCalDayType,
					startDate: new Date(parseInt(oLeave.StartDate.match(rDateRegExp)[1], 10)),
					endDate: new Date(parseInt(oLeave.EndDate.match(rDateRegExp)[1], 10))
				}));
			});
		},


		// User Input
		onBackPressed: function() {
			this.getRouter().navTo("home");
		},

		onNewPressed: function() {

		},

		onNewCancelled: function() {

		},

		onNewSaved: function(oEvent) {

		},

		//Formatter Section
		formatStatusGroupHeader: function(oContext) {

		},

		formatType: function(iStatus, oTypes) {

		}

		// Private Section
	});
});