var historyCity = JSON.parse(localStorage.getItem("storedCities")) || [];

var displayHistory = function () {
  $(".cityBtnContainer").empty();
  for (var x = 0; x < historyCity.length; x++) {
    $(".cityBtnContainer").append(
      `<button class="searchAnotherBtn col-12" value="${historyCity[x]}"> ${historyCity[x]}</button>`
    );
  }
};
var searchWeather = function (searchEl) {
  $.ajax({
    // Parsing city name to a Lon and Lat
    url: `https://api.openweathermap.org/geo/1.0/direct?q=${searchEl}&limit=1&appid=27003bda8c7c57abc371f9200fd76b09`,
    success: function (results) {
      // Getting current weather info from the city
      $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${results[0].lat}&lon=${results[0].lon}&appid=27003bda8c7c57abc371f9200fd76b09&units=metric`,
        success: function (results) {
          $("#citynTime")[0].innerText =
            searchEl + " " + dayjs().format("MM-DD-YYYY");
          $("#cityTemp")[0].innerText =
            "Temp: " + Math.round(results.main.temp) + "C";

          var iconURL =
            "https://openweathermap.org/img/w/" +
            results.weather[0].icon +
            ".png";
          $("#icon")[0].setAttribute("src", iconURL);
          $("#weatherIcon")[0].setAttribute("class", "visible");
          $("#windVel")[0].innerText =
            "Wind Speed: " + results.wind.speed * 3.6 + " km/h";
          $("#humidity")[0].innerText =
            "Humidity: " + results.main.humidity + "%";
        },
        // Getting current weather info from the city
      }).done(function () {
        $.ajax({
          url: `https://api.openweathermap.org/data/2.5/forecast?lat=${results[0].lat}&lon=${results[0].lon}&appid=27003bda8c7c57abc371f9200fd76b09&units=metric`,
          success: function (results) {
            console.log(results);
            // A loop that goes through till 40 and only selects every 8 interval to take the time 24 hours from when the api was called
            for (var i = 0; i < 40; i++) {
              if (i === 7) {
                $(".date1")[0].innerText = results.list[i].dt_txt;
                $(".tempCast1")[0].innerText =
                  "Temp: " + Math.round(results.list[i].main.temp) + "C";
                $(".windCast1")[0].innerText =
                  "Wind Speed: " +
                  Math.round(results.list[i].wind.speed * 3.6) +
                  "km/h";
                $(".humidity1")[0].innerText =
                  "Humidity: " + results.list[i].main.humidity + "%";
              } else if (i === 15) {
                $(".date2")[0].innerText = results.list[i].dt_txt;
                $(".tempCast2")[0].innerText =
                  "Temp: " + Math.round(results.list[i].main.temp) + "C";
                $(".windCast2")[0].innerText =
                  "Wind Speed: " +
                  Math.round(results.list[i].wind.speed * 3.6) +
                  "km/h";
                $(".humidity2")[0].innerText =
                  "Humidity: " + results.list[i].main.humidity + "%";
              } else if (i === 23) {
                $(".date3")[0].innerText = results.list[i].dt_txt;
                $(".tempCast3")[0].innerText =
                  "Temp: " + Math.round(results.list[i].main.temp) + "C";
                $(".windCast3")[0].innerText =
                  "Wind Speed: " +
                  Math.round(results.list[i].wind.speed * 3.6) +
                  "km/h";
                $(".humidity3")[0].innerText =
                  "Humidity: " + results.list[i].main.humidity + "%";
              } else if (i === 31) {
                $(".date4")[0].innerText = results.list[i].dt_txt;
                $(".tempCast4")[0].innerText =
                  "Temp: " + Math.round(results.list[i].main.temp) + "C";
                $(".windCast4")[0].innerText =
                  "Wind Speed: " +
                  Math.round(results.list[i].wind.speed * 3.6) +
                  "km/h";
                $(".humidity4")[0].innerText =
                  "Humidity: " + results.list[i].main.humidity + "%";
              } else if (i === 39) {
                $(".date5")[0].innerText = results.list[i].dt_txt;
                $(".tempCast5")[0].innerText =
                  "Temp: " + Math.round(results.list[i].main.temp) + "C";
                $(".windCast5")[0].innerText =
                  "Wind Speed: " +
                  Math.round(results.list[i].wind.speed * 3.6) +
                  "km/h";
                $(".humidity5")[0].innerText =
                  "Humidity: " + results.list[i].main.humidity + "%";
              }
            }
          },
        });
      });
    },
  });
  // Adds buttons dynamically after search button is clicked
};
$(".searchBtn").on("click", function () {
  var searchEl = $("#searchCity").val();
  console.log($(this));
  if ($.inArray(searchEl, historyCity) == -1 && searchEl ) {
    // found it
    historyCity.push(searchEl);
    localStorage.setItem("storedCities", JSON.stringify(historyCity));
  }

  displayHistory();
  searchWeather(searchEl);
});

$(".cityBtnContainer").on("click", function (event) {
  if (event.target.matches(".searchAnotherBtn")) {
    var city = event.target.value;
    searchWeather(city);
  }
});

displayHistory();
