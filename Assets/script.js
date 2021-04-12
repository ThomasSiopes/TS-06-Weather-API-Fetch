var inputText = document.querySelector("#input-test");
var inputForm = document.querySelector("#input-form");

function getApi() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid=62fc4b9361922696dc4c18ebfc0a82b3';

    fetch(requestUrl)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        console.log(data);
        });
}

inputForm.addEventListener('submit', getApi);