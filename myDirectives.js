var app = angular.module('myDirectives', []);

app.directive('pendingDir', function($q) {
    return {
        restrict: 'A',
        scope: {
            request: '&'
        },
        link: function(scope, elem, attrs) {

            var spinnerIcon = angular.element('<span class="fa fa-spinner"></span>');
            spinnerIcon.hide();
            elem.after(spinnerIcon);

            var invokeRequest = function() {
                var dfd = $q.defer();

                dfd.resolve(scope.request());

                return dfd.promise;
            }

            elem.on('click', function() {
                elem.hide();
                spinnerIcon.show();
                invokeRequest.then(function() {
                    setTimeout(function() {
                        elem.show();
                        spinnerIcon.hide();
                    }, 3000);
                });
            });
        }
    }
});

app.directive('notify', function() {
    return {
        restrict: 'A',
        scope: {
            title: '=',
            body: '=',
            icon: '='
        },
        link: function(scope, elem, attrs) {
            var Notification = window.Notification || window.mozNotification || window.webkitNotification;

            Notification.requestPermission(function(permission) {
                console.log(permission);
            });

            elem.on('click', function() {

                var notif = new Notification(scope.title, {
                    'body': scope.body,
                    'icon': scope.icon
                });

                notif.onshow = function() {
                    setTimeout(notif.close.bind(notif), 7000);
                }

            });

            //the code below will close the notification automatically after a set amount of time


        }
    }
});
