app.controller("mainController", function($scope, $http){
 
    $scope.apiKey = "[2570b1bc1a12b222f700fc67b507b8bf]";
    $scope.results = [];
    $scope.init = function() {
        //creates requires a start date
        var today = new Date();
        //Create the date string and ensure leading zeros if required
        var apiDate = today.getFullYear() + ("0" + (today.getMonth() + 1)).slice(-2) + "" + ("0" + today.getDate()).slice(-2);
        $http.jsonp('http://api.trakt.tv/calendar/premieres.json/' + $scope.apiKey + '/' + apiDate + '/' + 30 + '/?callback=JSON_CALLBACK').success(function(data) {
         
            angular.forEach(data, function(value, index){
              
                var date = value.date;
                //For each episodes, add it to the results array
                angular.forEach(value.episodes, function(tvshow, index){
                    //Create a date string from the timestamp so we can filter on it based on user text input
                    tvshow.date = date; //Attach the full date to each episode
                    $scope.results.push(tvshow);
                });
            });
        }).error(function(error) {
 
        });
    };
});