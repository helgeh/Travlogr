'use strict';

angular.module('travlogrApp')
  .factory('Modal', function ($rootScope, $modal) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal(scope, modalClass) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';

      angular.extend(modalScope, scope);

      return $modal.open({
        templateUrl: 'components/modal/modal.html',
        windowClass: modalClass,
        scope: modalScope
      });
    }

    // Public API here
    return {

      input: {
        getName: function (add) {
          add = add || angular.noop;

          return function () {
            var args = Array.prototype.slice.call(arguments),
                key = args.shift(),
                // img = args.shift(),
                // defaults = {title: 'Image Title', src: '/dummy.jpg', alt: 'Dummy alt'},
                getNameModal;
            // img = angular.extend(defaults, img);

            var scope = {
              modal: {
                dismissable: true,
                title: 'Add new ' + key,
                input: true,
                inputPlaceholder: 'type here...',
                buttons: [{
                  classes: 'btn-primary',
                  text: 'OK',
                  click: function(e) {
                    args.push(scope.input.title);
                    getNameModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    getNameModal.dismiss(e);
                  }
                }]
              },
              input: {
                title: ''
              }
            };

            getNameModal = openModal(scope);
            getNameModal.result.then(function(event) {
              // args.push(scope.input.title);
              add.apply(event, args);
            });
          }
        }
      },

      /* Confirmation modals */
      confirm: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete: function(del) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed straight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                name = args.shift(),
                deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm Delete',
                html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Delete',
                  click: function(e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            deleteModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        }
      }
    };
  })

.controller('TitleModalCtrl', function TitleModalController ($scope, $modalInstance) {
                  console.log("TitleModalController instantiated");
                  $scope.inputChanged = function (event) {
                    inputTitle = $scope.titleInput;
                  };
                });
