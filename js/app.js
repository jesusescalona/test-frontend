var appHome = angular.module('appHome', ['ngMap']);

appHome.factory('getDataJson', function( $http )
{
    var dataJson =
    {
        getData: function()
        {
            //return $http.get('http://socialh4ck.com/dev/jobs/test/frontend/data.json').then(function(response)
            return $http.get('datos.json').then(function( response )
            {
                return response.data;
            },
            function()
            {
                throw 'Error al consultar la data';
            });
        }
    };
    return dataJson;
});

appHome.controller('appCtrlClients', function( $scope, getDataJson )
{
    $scope.clients = null;
    getDataJson.getData().then( function( listClients )
    {   
        var countFriends = 0;
        var list = new Array();
        var listFull = new Array();
        var myMarkersAct = new Array();
        var myMarkersInc = new Array();
        var listClientsActive = new Array();
        var listClientsInactive = new Array();
        var listFriendsActive = new Array();
        var listFriendsInactive = new Array();
        $scope.clients = listClients;
        //console.log( $scope.clients);

        for(var z in listClients)
        {
            clientsActive = listClients[z].isActive;
            //console.log(clientsActive);
            if(clientsActive==true)
            {
                listClientsActive.push(listClients[z]);

                myMarkersAct.push(
                {   
                    latitude: listClients[z].latitude,
                    longitude: listClients[z].longitude,
                    zoom : 4
                });

                $scope.markersAct  = myMarkersAct;

                //console.log("markers");
                //console.log(myMarkers);

                for(var i in listClientsActive)
                {
                    countFriends = listClientsActive[i].friends.length;
                    console.log("countFriends: "+countFriends);

                    
                    if (countFriends>0)
                    {
                        console.log("ENTRO");
                        for(var m=0;m<countFriends;m++)
                        {
                            //console.log("ENTRO2");
                            listFriendsActive.push(
                            {
                                id: listClientsActive[i].friends[m].id,
                                name: listClientsActive[i].friends[m].name
                            });
                            console.log("*******************************");
                            console.log("********* listFriendsActive *********");
                            console.log(listFriendsActive);
                            console.log("*******************************");
                        }
                    }
                }
            }
            else
            {
                listClientsInactive.push(listClients[z]);
               
                myMarkersInc.push(
                {   
                    latitude: listClients[z].latitude,
                    longitude: listClients[z].longitude,
                    zoom : 4
                });

                $scope.markersInc  = myMarkersInc;


                for(var i in listClientsInactive)
                {
                    countFriends = listClientsInactive[i].friends.length;
                    console.log("countFriends: "+countFriends);

                    if (countFriends>0)
                    {
                        console.log("ENTRO");
                        for(var m=0;m<countFriends;m++)
                        {
                            //console.log("ENTRO2");
                            listFriendsInactive.push(
                            {
                                id: listClientsInactive[i].friends[m].id,
                                name: listClientsInactive[i].friends[m].name
                            });
                            console.log("*******************************");
                            console.log("********* listFriendsInactive *********");
                            console.log(listFriendsInactive);
                            console.log("*******************************");
                        }
                    }
                }
            }
        }
        $scope.clientsAct = listClientsActive;
        console.log("listClientsActive");
        console.log($scope.clientsAct);
        $scope.clientsAct.friends = listFriendsActive.splice(3,6);
        $scope.clientsInc = listClientsInactive;
        $scope.clientsInc.friends = listFriendsInactive.splice(3,9);
        //console.log($scope.clients.friends);
        });
});