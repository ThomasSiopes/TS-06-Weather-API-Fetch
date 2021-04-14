var inputText = document.querySelector("#input-text");
var inputForm = document.querySelector("#input-form");
var historyButtons = document.querySelector("#local-storage-buttons");
var forecast = document.querySelector("#today-forecast");
var futureForecast = document.getElementsByClassName("forecast-day");
var label = document.querySelector("#label-5-day");
var dateNum = new Date();
var currentDate;

function getApi(event) {
    event.preventDefault();
    generateWeatherData(inputText.value);
}

function generateWeatherData(inputValue) {
    var newElement;

    while (historyButtons.firstChild) {
        historyButtons.removeChild(historyButtons.lastChild);
    }
    while (forecast.firstChild) {
        forecast.removeChild(forecast.lastChild);
    }
    for(var i = 0; i < futureForecast.length; ++i) {
        while(futureForecast[i].firstChild) {
            futureForecast[i].removeChild(futureForecast[i].lastChild);
        }
    }

    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputValue + '&units=imperial&appid=62fc4b9361922696dc4c18ebfc0a82b3';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //Creates buttons from local storage
            var history = [];
            history = JSON.parse(localStorage.getItem("history"));
            if(history != null) {
                var match = 0;
                for(var i = 0; i < history.length; ++i) {
                    if(history[i] === inputValue) {
                        match = 1;
                    }
                }
                if(match == 0) {
                    history.push(inputValue);
                }
            }
            else {
                history = [inputValue];
            }
            for(var i = 0; i < history.length; ++i) {
                createHistoryButton(history[i]);
            }
            localStorage.setItem("history", JSON.stringify(history));

            //Generates date and other forecast information
            currentDate = moment(dateNum.getFullYear() + "-" + (dateNum.getMonth()+1) + "-" + (dateNum.getDate()+1)).format("MM/DD/YYYY");
            newElement = document.createElement("h1");
            newElement.textContent = data.name + " (" + currentDate + ")";
            newElement.classList.add("fw-bold");
            forecast.appendChild(newElement);
            newElement.classList.remove("fw-bold");
            
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+ data.coord.lat +'&lon=' + data.coord.lon + '&units=imperial&appid=62fc4b9361922696dc4c18ebfc0a82b3')
                .then(function (response) {
                    return response.json();
                })
                .then(function(data) {
                    console.log(data);
                    forecast.classList.add("border");
                    forecast.classList.add("border-dark");

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
                    newElement.classList.add("text-white");
                    if(data.current.uvi <= 2) {
                        newElement.classList.add("bg-success");
                    }
                    else if(data.current.uvi <= 5) {
                        newElement.classList.add("bg-warning");
                    } else {
                        newElement.classList.add("bg-danger");
                    }
                    forecast.appendChild(newElement);
                
                    //5-Day Forecast
                    label.textContent = "5-Day Forecast:";

                    for(var i = 0; i < futureForecast.length; ++i){
                        futureForecast[i].classList.add("bg-dark");
                        
                        //Date
                        newElement = document.createElement("h5");
                        currentDate = moment(dateNum.getFullYear() + "-" + (dateNum.getMonth()+1) + "-" + (dateNum.getDate()+2+i)).format("MM/DD/YYYY");
                        newElement.textContent = currentDate;
                        futureForecast[i].appendChild(newElement);

                        //Temp
                        newElement = document.createElement("p");
                        newElement.textContent = "Temp: " + data.daily[i].temp.day + " °F";
                        futureForecast[i].appendChild(newElement);

                        //Wind
                        newElement = document.createElement("p");
                        newElement.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
                        futureForecast[i].appendChild(newElement);

                        //Humidity
                        newElement = document.createElement("p");
                        newElement.textContent = "Humidity: " + data.daily[i].humidity + " %";
                        futureForecast[i].appendChild(newElement);
                    }
                });
        })
}

function createHistoryButton(inputValue) {
    newElement = document.createElement("button");
    newElement.classList.add("btn");
    newElement.classList.add("btn-secondary");
    newElement.classList.add("mb-2");
    newElement.textContent = inputValue;
    newElement.addEventListener("click", function(event) {
        event.preventDefault();
        generateWeatherData(inputValue);
    });
    historyButtons.appendChild(newElement);
}

function clearHistory(event) {
    event.preventDefault();
    localStorage.clear();
}