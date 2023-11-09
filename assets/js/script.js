var today = dayjs().format("YYYY")

$(".searchBtn").on("click", function(){
    var searchEl = $("#searchCity").val()
    $(".citynTime").text(searchEl+" "+today)
    $.ajax({
        url: `http://api.openweathermap.org/geo/1.0/direct?q=${searchEl}&limit=1&appid=27003bda8c7c57abc371f9200fd76b09`,
        success: function(results){
            $.ajax({
                url: `https://api.openweathermap.org/data/2.5/weather?lat=${results[0].lat}&lon=${results[0].lon}&appid=27003bda8c7c57abc371f9200fd76b09&units=metric`,
                success: function(results){
                    console.log(results)
                }
            }).done(function(){
                $.ajax({
                    url: `http://api.openweathermap.org/data/2.5/forecast?lat=${results[0].lat}&lon=${results[0].lon}&appid=27003bda8c7c57abc371f9200fd76b09&units=metric`,
                    success: function(results){
                        console.log(results)
                    }
                })
            })
            
        }

    })

})

