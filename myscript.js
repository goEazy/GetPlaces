var map;

var info = [];
var schools = [];
var parks = [];
var hospitals = [];
var hotels = [];
var markers = [];
$(document).ready(function(){
    var flag1 = 1;
    var flag2 = 1;
    var flag3 = 1;
    var flag4 = 1;
    
    var butId = document.getElementById('srch');
    var lats = 28.61, longs = 77.20;
    var infoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        lats = 28.61;
        longs = 77.20;
    }
    function showPosition(position) {
        lats = position.coords.latitude;
        longs = position.coords.longitude;
    }
    /*navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
        lat1: position.coords.latitude,
        long1: position.coords.longitude
    };*/
    google.maps.event.addDomListener(window, 'load', initialize);
    function initialize(){
        var center = new google.maps.LatLng(lats, longs);
        mapDiv = document.getElementById('map');
        map = new google.maps.Map(mapDiv,{
            center:center,
            zoom:10
        });
        infoWindow = new google.maps.InfoWindow();
    }
    google.maps.event.addDomListener(butId, 'click', again);
    function again(){
        var user_lat = parseFloat($('input#srch-lat').val());
        var user_lon = parseFloat($('input#srch-lon').val());
        var center = new google.maps.LatLng(user_lat, user_lon);
        map = new google.maps.Map(mapDiv, {
            zoom: 13,
            center: center
        });
        var city = {
            location: center,
            radius: 2000,
            types: ['political']
        };
        var school = {
            location: center,
            radius: 2000,
            types: ['school']
        };
        var hospital = {
            location: center,
            radius: 2000,
            types: ['hospital']
        };
        var hotel = {
            location: center,
            radius: 2000,
            types: ['restaurant']
        };
        var park = {
            location: center,
            radius: 2000,
            types: ['park']
        }
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(hospital, callback_hsp);
        service.nearbySearch(school, callback_scl);
        service.nearbySearch(hotel, callback_htl);
        service.nearbySearch(park, callback_prk);
        service.nearbySearch(city, callback);
    }
    function callback_hsp(results, status){
        if(status == google.maps.places.PlacesServiceStatus.OK){
            hospitals = results;
        }
    }
    function callback_prk(results, status){
        if(status == google.maps.places.PlacesServiceStatus.OK){
            parks = results;
        }
    }
    function callback_scl(results, status){
        if(status == google.maps.places.PlacesServiceStatus.OK){
            schools = results;
        }
    }
    function callback_htl(results, status){
        if(status == google.maps.places.PlacesServiceStatus.OK){
            hotels = results;
        }
    }
    function callback(results, status){
        if(status == google.maps.places.PlacesServiceStatus.OK){
            info = results;
            for(var i = 0; i < results.length; i++){                            
                markers.push(createMarker(results[i]));
            }
            var s = "";
            for(var i = 0; i < info.length; i++){
                s = s + "<h2>"+info[i].name+"</h2>"+
                    "<h3>Co-ordinates: " + info[i].geometry.location+"</h3><br>";
            }
            $('#city_name-div').html(s);
        }
    }
    function createMarker(place){
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map:map,
            position:placeLoc
        });
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent(place.name + "<br>" + placeLoc);
            infoWindow.open(map, this);
        });
        return marker;
    }
    function clearMarker(markers){
        for(var m in markers){
            markers[m].setMap(null);
        }
        markers = [];
    }
    $('#hsp-btn').on('click', function(){

        clearMarker(markers);
        var s = "";
        flag1= flag1*(-1);
        flag2 = 1;
        flag3 = 1;
        flag4 = 1;
        $('#hotel-div-desc').html(s);
        $('#school-div-desc').html(s);
        $('#park-div-desc').html(s);
        for(var i = 0; i < hospitals.length; i++){
            markers.push(createMarker(hospitals[i]));
            s = s + "<Strong>"+ (i + 1)+". " + hospitals[i].name + "</strong><br>Addr: " + hospitals[i].vicinity + "<br><br>";
        }
        if(flag1 == -1){
            if(s != ""){
                $('#hospital-div-desc').html(s);
            }
            else{
                $('#hospital-div-desc').html("No Hospitals Nearby");
            }
        }
        else{
            
            $('#hospital-div-desc').html("");
        }
    });
    $('#prk-btn').on('click', function(){
        clearMarker(markers);
        var s = "";
        
        flag2= flag2*(-1);
        flag1 = 1;
        flag3 = 1;
        flag4 = 1;
        $('#hotel-div-desc').html(s);
        $('#hospital-div-desc').html(s);
        $('#school-div-desc').html(s);
        for(var i = 0; i < parks.length; i++){
            markers.push(createMarker(parks[i]));
            s = s + "<Strong>"+ (i + 1)+". " + parks[i].name + "</strong><br>" + parks[i].vicinity + "<br><br>";
        }
        if(flag2 == (-1)){
            if(s != ""){
                $('#park-div-desc').html(s);
            }
            else{
                $('#park-div-desc').html("No Parks Nearby");
            }
        }
        else{
            $('#park-div-desc').html("");
        }
        
    });

    $('#scl-btn').on('click', function(){
        clearMarker(markers);
        var s = "";
        
        flag3= flag3*(-1);
        flag2 = 1;
        flag1 = 1;
        flag4 = 1;
        $('#hotel-div-desc').html(s);
        $('#hospital-div-desc').html(s);
        $('#park-div-desc').html(s);
        $('#school-div-desc').html("No Schools Nearby");
        for(var i = 0; i < schools.length; i++){
            markers.push(createMarker(schools[i]));
            s = s + "<Strong>"+ (i + 1)+". " + schools[i].name + "</strong><br>" + schools[i].vicinity + "<br><br>";
        }
        if(flag3 == -1){
            if(s != ""){
                $('#school-div-desc').html(s);    
            }
            else{
                $('#school-div-desc').html("no Schools Nearby");
            }
        }
        else{
            $('#school-div-desc').html("");
        }

    });

    $('#htl-btn').on('click', function(){
        clearMarker(markers);
        var s = "";
        flag4 = flag4*(-1);
        
        flag1= 1;
        flag2 = 1;
        flag3 = 1;
        $('#school-div-desc').html(s);
        $('#hospital-div-desc').html(s);
        $('#park-div-desc').html(s);
        for(var i = 0; i < hotels.length; i++){
            markers.push(createMarker(hotels[i]));
            s = s + "<Strong>"+ (i + 1)+". " + hotels[i].name + "</strong><br>" + hotels[i].vicinity + "<br><br>";
        }
        if(flag4 == -1){
            if(s != ""){
                $('#hotel-div-desc').html(s);
            }
            else{
                $('#hotel-div-desc').html("No Hotels Nearby");        
            }
        }
        else{
            $('#hotel-div-desc').html('');
        }
        
    });

});