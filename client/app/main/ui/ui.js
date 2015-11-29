'use strict';

angular.module('travlogrApp')
  .config(function (panelsProvider) {
		panelsProvider
			.add({
			    id: "right_panel",
			    position: "right",
			    size: "200px",
			    templateUrl: "app/main/ui/right_panel.html",
			    controller: "rightpanelCtrl"
			})
			// .add({
			//     id: "testpanel",
			//     position: "right",
			//     size: "80%",
			//     templateUrl: "../resources/template/testpanel.html",
			//     controller: "testpanelCtrl",
			//     closeCallbackFunction: "testpanelClose"
			// });
  });