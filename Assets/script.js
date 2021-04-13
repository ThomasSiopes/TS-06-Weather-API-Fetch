var inputText = document.querySelector("#input-text");
var inputForm = document.querySelector("#input-form");
var forecast = document.querySelector("#today-forecast");

function getApi(event) {
    event.preventDefault();
    var inputValue = inputText.value;
    var newElement;
    var newObject;

    while (forecast.firstChild) {
        forecast.removeChild(forecast.lastChild);
      }

    // var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid=62fc4b9361922696dc4c18ebfc0a82b3';
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputValue + '&units=imperial&appid=62fc4b9361922696dc4c18ebfc0a82b3';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            // newElement = document.createElement("h1");
            // newElement.textContent = data.name;
            // forecast.appendChild(newElement);

            // //Temp
            // newElement = document.createElement("p");
            // newElement.textContent = "Temp: " + data.main.temp + " °F";
            // forecast.appendChild(newElement);

            // //Wind
            // newElement = document.createElement("p");
            // newElement.textContent = "Wind: " + data.wind.speed + " MPH";
            // forecast.appendChild(newElement);

            // //Humidity
            // newElement = document.createElement("p");
            // newElement.textContent = "Humidity: " + data.main.humidity + " %";
            // forecast.appendChild(newElement);
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+ data.coord.lat +'&lon=' + data.coord.lon + '&units=imperial&appid=62fc4b9361922696dc4c18ebfc0a82b3')
                .then(function (response) {
                    return response.json();
                })
                .then(function(data) {
                    console.log(data);
                    newElement = document.createElement("h1");
                    newElement.textContent = data.name;
                    forecast.appendChild(newElement);

                    //Temp
                    newElement = document.createElement("p");
                    newElement.textContent = "Temp: " + data.current.temp + " °F";
                    forecast.appendChild(newElement);

                    //Wind
                    newElement = document.createElement("p");
                    newElement.textContent = "Wind: " + data.current.wind_speed + " MPH";
                    forecast.appendChild(newElement);

                    //Humidity
                    newElement = document.createElement("p");
                    newElement.textContent = "Humidity: " + data.current.humidity + " %";
                    forecast.appendChild(newElement);

                    //UV Index
                    newElement = document.createElement("p");
                    newElement.textContent = "UV Index: " + data.current.uvi;
                    forecast.appendChild(newElement);
                });
        })
}