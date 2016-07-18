/* Theme Name: The Project - Responsive Website Template
 * Author:HtmlCoder
 * Author URI:http://www.htmlcoder.me
 * Author e-mail:htmlcoder.me@gmail.com
 * Version:1.2.0
 * Created:March 2015
 * License URI:http://support.wrapbootstrap.com/
 * File Description: Place here your custom scripts
 */

$(function() {
   $('#datetimepicker12').datetimepicker({
     autoclose: true,
     todayBtn: true,
     container: '#myModal',
     pickerPosition: "center"
   }).on('changeDate', function(ev){
   $('#datetimepicker12').datetimepicker('hide');
   });
 });

var long;
var latitude;
var longitude;
var lat;

 $(document).ready(function(){

                  console.log(long);

                  $('#test').locationpicker({
                   location: {
                       latitude: long,
                       longitude: lat
                   },
                   radius: 300,
                   inputBinding: {
                       latitudeInput: $('#us3-lat'),
                       longitudeInput: $('#us3-lon'),
                       radiusInput: $('#us3-radius'),
                       locationNameInput: $('#us3-address')
                   },
                   enableAutocomplete: true,
                   onchanged: function (currentLocation, radius, isMarkerDropped) {
                       // Uncomment line below to show alert on each Location Changed event
                       //alert("Location changed. New location (" + currentLocation.latitude + ", " + currentLocation.longitude + ")");
                   }
               });


});

             function getUrlVars()
             {
                 var vars = [], hash;
                 var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                 for(var i = 0; i < hashes.length; i++)
                 {
                     hash = hashes[i].split('=');
                     vars.push(hash[0]);
                     vars[hash[0]] = hash[1];
                 }
                 return vars;
             }

             function GetLocation() {
                  var geocoder = new google.maps.Geocoder();
                  var address = getUrlVars()["address"];
                  geocoder.geocode({ 'address': address }, function (results, status) {
                      if (status == google.maps.GeocoderStatus.OK) {
                          latitude = results[0].geometry.location.lat();
                          longitude = results[0].geometry.location.lng();
                          console.log("Latitude: " + latitude + "\nLongitude: " + longitude);
                      } else {
                          //alert("Request failed.")
                      }
                  });
              };
