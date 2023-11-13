$(".searchBtn").on("click", function () {
  var searchEl = $("#searchCity").val();
  $.ajax({
    // Parsing city name to a Lon and Lat
    url: `https://api.openweathermap.org/geo/1.0/direct?q=${searchEl}&limit=1&appid=27003bda8c7c57abc371f9200fd76b09`,
    success: function (results) {
      // Getting current weather info from the city
      $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${results[0].lat}&lon=${results[0].lon}&appid=27003bda8c7c57abc371f9200fd76b09&units=metric`,
        success: function (results) {
            $("#citynTime")[0].innerText = searchEl + " " + dayjs().format("MM-DD-YYYY")
            $("#cityTemp")[0].innerText = "Temp: " + Math.round(results.main.temp) + "C"
      
            var iconURL = "https://openweathermap.org/img/w/" + results.weather[0].icon + ".png"
            $("#icon")[0].setAttribute("src", iconURL)
            $("#windVel")[0].innerText = "Wind Speed: "+ (results.wind.speed)*3.6 +" km/h"
            $("#humidity")[0].innerText = "Humidity: "+ results.main.humidity +"%"
        },
        // Getting current weather info from the city 
      }).done(function () {
        $.ajax({
          url: `https://api.openweathermap.org/data/2.5/forecast?lat=${results[0].lat}&lon=${results[0].lon}&appid=27003bda8c7c57abc371f9200fd76b09&units=metric`,
          success: function (results) { 
            console.log(results)
            for (var i = 0; i < 40; i++){
                if (i === 7){
                    $(".date1")[0].innerText = (results.list[i].dt_txt) 
                    $(".tempCast1")[0].innerText = "Temp: "+Math.round(results.list[i].main.temp)+"C"
                    $(".windCast1")[0].innerText = "Wind Speed: "+Math.round((results.list[i].wind.speed)*3.6)+"km/h"
                    $(".humidity1")[0].innerText = "Humidity: "+ results.list[i].main.humidity+"%"
                }
                else if (i === 15 ){
                    $(".date2")[0].innerText = (results.list[i].dt_txt) 
                    $(".tempCast2")[0].innerText = "Temp: "+Math.round(results.list[i].main.temp)+"C"
                    $(".windCast2")[0].innerText = "Wind Speed: "+Math.round((results.list[i].wind.speed)*3.6)+"km/h"
                    $(".humidity2")[0].innerText = "Humidity: "+ results.list[i].main.humidity+"%"
                }
                else if (i === 23){
                    $(".date3")[0].innerText = (results.list[i].dt_txt) 
                    $(".tempCast3")[0].innerText = "Temp: "+Math.round(results.list[i].main.temp)+"C"
                    $(".windCast3")[0].innerText = "Wind Speed: "+Math.round((results.list[i].wind.speed)*3.6)+"km/h"
                    $(".humidity3")[0].innerText = "Humidity: "+ results.list[i].main.humidity+"%"
                }
                else if (i === 31){
                    $(".date4")[0].innerText = (results.list[i].dt_txt) 
                    $(".tempCast4")[0].innerText = "Temp: "+Math.round(results.list[i].main.temp)+"C"
                    $(".windCast4")[0].innerText = "Wind Speed: "+Math.round((results.list[i].wind.speed)*3.6)+"km/h"
                    $(".humidity4")[0].innerText = "Humidity: "+ results.list[i].main.humidity+"%"
                }
                else if (i === 39){
                    $(".date5")[0].innerText = (results.list[i].dt_txt) 
                    $(".tempCast5")[0].innerText = "Temp: "+Math.round(results.list[i].main.temp)+"C"
                    $(".windCast5")[0].innerText = "Wind Speed: "+Math.round((results.list[i].wind.speed)*3.6)+"km/h"
                    $(".humidity5")[0].innerText = "Humidity: "+ results.list[i].main.humidity+"%"
                    
                }
            }
          },
        });
      });
    },
  });
});
