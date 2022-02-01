sap.ui.define([
    'TableTask/controller/BaseController'
], function(BaseController) {
    'use strict';
    return BaseController.extend("TableTask.controller.App",{
        onInit: function(){
            console.log("Hey folks!! the App Controller is ready Now");
        }
    });
});