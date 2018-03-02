var Vid = document.getElementById("backVid");
var rain = "https://storage.googleapis.com/coverr-main/mp4/Rain-On-Me.mp4";
var sun = "https://storage.googleapis.com/coverr-main/mp4/Heaven-From-Top.mp4";
var snow = "http://mazwai.com/system/posts/videos/000/000/098/original/michael_black--birds_on_feeders.mp4?1409789866";
var clouds = "https://storage.googleapis.com/coverr-main/mp4/Up.mp4";
var icon_rain = "https://png.icons8.com/windows/80/ffffff/rain.png";
var icon_sun = "https://png.icons8.com/wired/80/ffffff/sun.png";
var icon_snow = "https://png.icons8.com/ios/80/ffffff/snow.png";
var icon_clouds = "https://png.icons8.com/ios/80/ffffff/clouds.png";
var temp_Unit = "Celsius";

$( document ).ready(function(){
  if (navigator.geolocation) {//This will collect the values for longitude and latitude using geolocation function.
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      myWeather(lat, lon);
    });
  } 
  else {
    console.log("Geolocation is not supported by this browser.");
  }

  $("#newTemp").on("click", function () {// This convert the temperature from Celsius to Fahrenheit and vice versa.
    var myTempUnit = $("#tempunit").text();
    var fahTemp = Math.round((9 / 5 * tempCelsius) + 32);

    if (myTempUnit == "Celsius"){
      $("#temp").text(fahTemp + String.fromCharCode(176) + " ");
      $("#tempunit").text("Fahrenheit");
    }
    else {
      $("#temp").text(tempCelsius + String.fromCharCode(176) + " ");
      $("#tempunit").text("Celsius");
    }
    
  });
  
})

function myWeather(lat, lon) {
  var APIKey = "394a1c48d4c97fab1cae99932648a009";
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + APIKey;
  $.ajax({
    url: queryURL, success: function (data) {
      $("#city").text(data.name + ",");
      $("#country").text(data.sys.country);
      tempCelsius = Math.round(data.main.temp - 273.15);
      $("#temp").text(tempCelsius + String.fromCharCode(176) + " ");
      $("#tempunit").text(temp_Unit);
      $("#desc").text(data.weather[0].main);
      myIcon(data.weather[0].description);
    }
  });
}

function myIcon(desc) {
  var desc = desc.toLowerCase();
  if (desc == "drizzle") {
    $("#weatherIcon").attr('src',icon_rain);
    $("#backVid").attr('src',rain);
  }
  else if (desc == "clouds") {
    $("#weatherIcon").attr('src',icon_clouds);
    $("#backVid").attr('src',clouds);
  }
  else if (desc == "rain") {
    $("#weatherIcon").attr('src',icon_rain);
    $("#backVid").attr('src',rain);
  }
  else if (desc == "snow") {
    $("#weatherIcon").attr('src',icon_snow);
    $("#backVid").attr('src',snow);
  }
  else if (desc == "clear") {
    $("#weatherIcon").attr('src',icon_sun);
    $("#backVid").attr('src',sun);
  }
  else if (desc == "thunderstorm") {
    $("#weatherIcon").attr('src',icon_rain);
    $("#backVid").attr('src',rain);
  }
  else {
    $("#weatherIcon").attr('src',icon_sun);
    $("#backVid").attr('src',sun);
  }
}
