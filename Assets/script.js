var inputText = document.querySelector("#input-text");
var inputForm = document.querySelector("#input-form");

// var cities = [
//     {
//         "name": "Austin",
//         "lat": 30.266666,
//         "long": -97.733330 
//     },
//     {
//         "name": "Chicago",
//         "lat": 	41.881832,
//         "long": -87.623177
//     },
//     {
//         "name": "New York",
//         "lat": 	40.785091,
//         "long": -73.968285
//     },
//     {
//         "name": "Orlando",
//         "lat": 	28.474386,
//         "long": -81.468193
//     },
//     {
//         "name": "San Francisco",
//         "lat": 	37.773972,
//         "long": -122.431297
//     },
//     {
//         "name": "Seattle",
//         "lat": 47.443546,
//         "long": -122.301659
//     },
//     {
//         "name": "Denver",
//         "lat": 39.742043,
//         "long": -104.991531
//     },
//     {
//         "name": "Atlanta",
//         "lat": 	33.640411,
//         "long": -84.419853
//     },
// ]

function getApi(event) {
    event.preventDefault();
    var inputValue = inputText.value;
    alert("Value: " + inputValue);

    // var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid=62fc4b9361922696dc4c18ebfc0a82b3';
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputValue + '&appid=62fc4b9361922696dc4c18ebfc0a82b3'

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
}