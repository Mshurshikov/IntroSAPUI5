sap.ui.define([
	"sap/m/Button"
], function(Button) {
	"use strict";
	return Button.extend("my.app.control.Button", {
		metadata: {
			properties: {
				iconVAlign: {
					type: "string",
					group: "Appearance"
				}
			}
		},
		
		onAfterRendering: function() {
			if(this.getIconVAlign() == "Top") {
				if(	this.getType() === sap.m.ButtonType.Back || 
					this.getType() === sap.m.ButtonType.Up) {
						return;
				} else {
					this.$("img").removeClass("sapMBtnIconLeft");
					this.$("content").removeClass("sapMBtnContentRight");
					this.$("inner").removeClass("sapMBtnPaddingRight");
					
					this.$("").addClass("myMBtn");
					this.$("img").addClass("myMBtnIcon");
					this.$("content").addClass("myMBtnContentRight");
					this.$("inner").addClass("myMBtnPaddingRight");
					this.$("inner").addClass("myMBtnInner");
				} 
			} else if(this.getIconVAlign() == "Bottom") {
				if(	this.getType() === sap.m.ButtonType.Back || 
					this.getType() === sap.m.ButtonType.Up) {
						return;
				} else {
					this.$("img").removeClass("sapMBtnIconLeft");
					this.$("content").removeClass("sapMBtnContentRight");
					this.$("inner").removeClass("sapMBtnPaddingRight");
					
					this.$("").addClass("myMBtn");
					this.$("img").addClass("myMBtnIcon");
					this.$("img").addClass("myMBtnIconLeft");
					this.$("content").addClass("myMBtnContentLeft");
					this.$("inner").addClass("myMBtnPaddingRight");
					this.$("inner").addClass("myMBtnInner");
				} 
			}
		}
	});
});