var map, myloc, latlngbounds, infowindow;
var markers = [];

var salons = [
    ['Jean Yip Hub', '68 Orchard Rd, Singapore 238839', 1.301000, 103.845418],
    ['Mazu By Hairplus', '2 Handy Road, #04-06 Cathay Building, 229233', 1.299382, 103.847407],
    ['Aventa', '61 Stamford Rd, #01-02 Stamford Court, 178892', 1.293931, 103.850013],
    ['Poise Hair Studio', '20 Handy Road, #01-01, 229236', 1.299706, 103.846678]
];

function initMap() {
    var myLatLng = {lat: 1.28397439, lng: 103.8462086};

    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 15
    });

    myloc = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'You are here!',
        animation: google.maps.Animation.DROP
    });

    infowindow = new google.maps.InfoWindow();

    myloc.addListener('click', toggleBounce);

    latlngbounds = new google.maps.LatLngBounds();

    drop();

    map.setCenter(latlngbounds.getCenter());
    map.fitBounds(latlngbounds);


}

function toggleBounce() {
    if (myloc.getAnimation() !== null) {
        myloc.setAnimation(null);
    } else {
        myloc.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function addMarkerWithTimeout(detail, timeout) {
    var img = {
        url: 'image/salon.png',
        scaledSize: new google.maps.Size(40, 40), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };

    window.setTimeout(function() {
        var pin = new google.maps.Marker({
            position: {lat: detail[2], lng: detail[3]},
            map: map,
            animation: google.maps.Animation.DROP,
            icon: img,
            title: detail[0]
        });
        markers.push(pin);
        latlngbounds.extend(pin.position);

        google.maps.event.addListener(pin, 'click', function(){
            infowindow.close(); // Close previously opened infowindow
            infowindow.setContent("<div id='infowindow'><h3>"+ detail[0] +"</h3><hr><h4>Address:</h4><p>" + detail[1] + "</p><h4>Estimated Distance:</h4><p>" + (Math.round(getDistance(pin) * 100) / 100) + "km</p><input type='button' value='Book Appointment' onclick='bookappt()' /></div>");
            infowindow.open(map, pin);
        });

        google.maps.event.addListener(map, 'click', function(){
            infowindow.close(); // Close previously opened infowindow
        });

    }, timeout);
}

function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

function drop() {
    clearMarkers();
    for (var i = 0; i < salons.length; i++) {
        addMarkerWithTimeout(salons[i], i * 200);
    }
    latlngbounds.extend(myloc.position);
}

function rad(x) {
    return x * Math.PI / 180;
}

function getDistance(salon) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(myloc.position.lat() - salon.position.lat());
  var dLong = rad(myloc.position.lng() - salon.position.lng());
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(myloc.position.lat())) * Math.cos(rad(salon.position.lat())) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d/1000; // returns the distance in meter
}

function bookappt() {
    alert('booking in progress...');
}
