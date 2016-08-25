var weatherDescription = "Waiting for Description";
var locationName = "Singapore";
var tempF = 0;
var tempC = 0;
var pressure = 0;
var humidity = 0;
var windSpeed = 0;
var tempStatus = "F";

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

function toggleTemp() {
  if (tempStatus == "F") {
    tempF = ((tempF - 32) * 5 / 9).toFixed(3);
    tempStatus = "C";
    $("#temperatureIcon").removeClass("wi-fahrenheit").addClass("wi-celsius");
  } else {
    tempF = (tempF * (9 / 5) + 32).toFixed(3);
    tempStatus = "F";
    $("#temperatureIcon").removeClass("wi-celsius").addClass("wi-fahrenheit");
  }
  $("#temperature").html(tempF);
}

function changeWeatherIcon() {
  var cssClasses = "wi wi-day-sunny";
  $("#descriptionIcon").removeClass();
  var description = $("#description").text();
  if (description.match(/rain/ig)) {
    cssClasses = "wi wi-day-rain";
  } else if (description.match(/sunny/ig)) {
    cssClasses = "wi wi-day-sunny";
  } else if (description.match(/cloud/ig)) {
    cssClasses = "wi wi-day-cloudy";
  } else if (description.match(/wind/ig)) {
    cssClasses = "wi wi-day-cloudy-windy";
  } else if (description.match(/hot/ig)) {
    cssClasses = "wi wi-hot";
  } else if (description.match(/overcast/ig)) {
    cssClasses = "wi wi-day-sunny-overcast";
  } else if (description.match(/snow/ig)) {
    cssClasses = "wi wi-snow";
  } else if (description.match(/haze/ig)) {
    cssClasses = "wi wi-day-haze";
  } else if (description.match(/thunderstorm/ig)) {
    cssClasses = "wi wi-day-thunderstorm";
  } else {
    cssClasses = "wi wi-day-sunny";
  }
  $("#descriptionIcon").addClass(cssClasses);
}

function displayPage() {
  $("#location").html(locationName);
  $("#temperature").html(tempF);
  $("#pressure").html(pressure);
  $("#humidity").html(humidity);
  $("#description").html(weatherDescription.capitalize());
  $("#windspeed").html(windSpeed);
}

function getWeather(latitude, longitude) {
  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=e0d35159eeefa8f1b48f6d5050391dab",
    type: 'get',
    headers: {
      "Accept": "application/json"
    },
    dataType: 'json',
    success: function(data, status) {
      if (status == "success") {
        weatherDescription = data.weather[0].description;
        locationName = data.name;
        tempF = data.main.temp;
        pressure = data.main.pressure;
        humidity = data.main.humidity;
        windSpeed = data.wind.speed;
        displayPage();
      }
      changeWeatherIcon();
    }
  });
}

$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      getWeather(latitude, longitude);
    });
  } else {
    console.log('Geolocation is not supported for this Browser/OS version yet.');
  }

  $("#toggleTemp").on("click", function() {
    toggleTemp();
  });

});
