angular.module('myApp', ['ui']);

function MyCtrl($scope) {

    $scope.removePoint = function(index) {
        $scope.points[index].marker.setMap(null);
        $scope.points = $scope.points.slice(0, index).concat($scope.points.slice(index + 1));
    };

    $scope.addPoint = function() {
        var point = { position: { lat: $scope.lat, lng: $scope.lng } };
        var marker = new google.maps.Marker({
            map: $scope.myMap,
            position: new google.maps.LatLng($scope.lat, $scope.lng),
            animation: google.maps.Animation.DROP,
            draggable: true
        });

        point.marker = marker;

        $scope.points.push(point);
        $scope.lat = '';
        $scope.lng = '';
    };

    $scope.centerPoint = function(index) {
        $scope.myMap.panTo($scope.points[index].marker.getPosition());
    };

    $scope.mapOptions = {
        center: new google.maps.LatLng(48.6889, 6.1648),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.points = [];

    $scope.onMapIdle = function() {

        $scope.lat = $scope.myMap.getCenter().lat();
        $scope.lng = $scope.myMap.getCenter().lng();

        if (0 === $scope.points.length) {

            angular.forEach([
                { position: { lat: 48.6889, lng: 6.1648 } },
                { position: { lat: 48.6612, lng: 6.2151 } },
                { position: { lat: 48.6543, lng: 6.1234 } },
                { position: { lat: 48.6771, lng: 6.1746 } }
            ], function (point, index) {

                $scope.lat = point.position.lat;
                $scope.lng = point.position.lng;
                $scope.addPoint();
            });
        }
    };

    $scope.pointHighlight = function (point, active) {
        point.marker.setAnimation(active ? google.maps.Animation.BOUNCE : null);
    };
}
