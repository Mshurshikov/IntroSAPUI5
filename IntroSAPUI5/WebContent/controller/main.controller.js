sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";
	return Controller.extend("controller.main", {
		onInit: function() {
			//JSON Model from File
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("model/week.json", null, false); //URL, Parameters, Asynchron
			this.getView().byId("JSONTable").setModel(oModel);
			
			//JSON Model on-the-fly
			var oData = {
				value: ""
			};
			
			var oDataModel = new sap.ui.model.json.JSONModel(oData);
			oDataModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay); //Binding Mode One way --> Change will not be saved in the model
			this.getView().setModel(oDataModel);
			
			var mode = this.getView().getModel().getDefaultBindingMode();
			if (mode === sap.ui.model.BindingMode.OneWay) {
				this.getView().byId("BindMode").setText("One-Way");
			} else {
				this.getView().byId("BindMode").setText("Two-Way");
			}
			
			//XML Model from file
			var oXMLModel = new sap.ui.model.xml.XMLModel();
			oXMLModel.loadData("model/week.xml");
			this.getView().byId("XMLTable").setModel(oXMLModel);
			
			//Ressource Model
			var sLangu = sap.ui.getCore().getConfiguration().getLanguage(); //Login language from URL parameter sap-ui-language
			var oLangu = new sap.ui.model.resource.ResourceModel({
				bundleUrl: "i18n/i18n.properties",
				bundleLocale: sLangu
			});
			sap.ui.getCore().setModel(oLangu, "i18n");
			
			//Aggregation Binding -> Factory function
			var oWeekMenuTreeModel = new sap.ui.model.json.JSONModel();
			oWeekMenuTreeModel.loadData("model/weekmenu_tree.json");
			this.getView().byId("Tree").setModel(oWeekMenuTreeModel);
					
			this.getView().byId("Tree").bindAggregation(
				"items", 													//sName
				{															//oBindingInfo
					path: "/weekdays",
					factory: this.weekMenuTreeNodeFactory,
					parameters: {
						numberOfExpandedLevels: 2
					}
				}												
			);
			
			//Element Binding
			var oWeekMenuModel = new sap.ui.model.json.JSONModel();
			oWeekMenuModel.loadData("model/weekmenu.json");
			this.getView().byId("master").setModel(oWeekMenuModel);
			
			var oWeekMenuModelSlave = new sap.ui.model.json.JSONModel();
			oWeekMenuModelSlave.loadData("model/weekmenu.json");
			this.getView().byId("slave").setModel(oWeekMenuModelSlave);
			
			//Custom Data Binding
			var oUserModel = new sap.ui.model.json.JSONModel();
			oUserModel.loadData("model/user.json");
			this.getView().byId("userList").setModel(oUserModel);
		},
		
		weekMenuTreeNodeFactory: function(sId, oContext) {
			var treePath = oContext.getPath();
			var bindTextName, bindIcon;
			var newTreeNode = new sap.m.StandardTreeItem(sId);
			
			if (treePath.indexOf("food") !== -1 ) {
				bindTextName = "detail_description";
				bindIcon = "detail_icon";
			} else {
				bindTextName = "description";
				bindIcon = "icon";
			}
			
			newTreeNode.bindProperty( "title", bindTextName);
			newTreeNode.bindProperty( "icon", bindIcon );
			return newTreeNode;	
		},
		
		onSelectWeekDay: function(oEvent) {
			var oContext = oEvent.getSource().getSelectedItem().getBindingContext();
			var sBindingPath = oContext.getPath();
			this.getView().byId("slave").bindElement(sBindingPath);
		},
		
		onSelectLine: function(oEvent) {
			console.log(oEvent.getSource().data("UserID"));
		},
		
		onButtonPressed: function(oEvent) {
			MessageToast.show("Button pressed");

			//Button Instance
			oEvent.getSource().setText("Enough");
			oEvent.getSource().setEnabled(false);
			
			//Text-Control from View
			var oText = this.getView().byId("output");
			oText.setText("Thank you");
			
			//Access by Absolute ID -->  undefined
			/*
			oText = sap.ui.getCore().byId("output");
			alert(oText); */
			
			//Access by Absolute ID --> works
			/*
			oText = sap.ui.getCore().byId(this.getView().createId("output"));
			alert(oText.getId()); */
		}
	});
});