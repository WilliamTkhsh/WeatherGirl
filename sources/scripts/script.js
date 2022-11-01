$(document).ready(function(){
    const api = {
        key: "89557875d5399337ae6612ca052789a6",
        base_url: "https://api.openweathermap.org/data/2.5/",
        lang: "pt_br",
        units: "metric"
    }

    $('.modal_open').on("click", (function() {
        $('#modalSearch').modal('show');
    }))

    $('.search_input').bind('keypress', function(e){
        key = e.keyCode;
        if(key == 13){
            searchCurrentWeather($('.search_input').val());
            $('#modalSearch').modal('hide');
        }
    })
    $('.search_button').on("click", (function() {
        searchCurrentWeather($('.search_input').val());
        $('#modalSearch').modal('hide');
    }))

    function searchCurrentWeather(city) {
        fetch(`${api.base_url}weather?q=${city}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`http error: status ${response.status}`)
                }
                return response.json();
            })
            .catch(error => {
                alert(error.message)
            })
            .then(response => {
                displayResults(response)
            });

    }
    function displayResults(result) {
        console.log(result);
        var temperature = `${parseInt(result.main.temp)}`;
        $('.city').text(`${result.name}`);
        $('.temperature').text(temperature + '°C');
        if (temperature > 25){
            $("#girl").attr("src","sources/img/Girl/girl_sunny.png");
        } else {
            $("#girl").attr("src","sources/img/Girl/girl_rain.gif");
        }
        
    }
})