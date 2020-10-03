
var APIkey = "0b6df3c6402adfe49bfc48a44c15bfc8";
var imgBaseURl = "https://openweathermap.org/img/w/";


function fiveday(city) {
  var apiURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey;
  var searchValue = document.getElementById("search-value");
  console.log(apiURL);
  $.ajax({
    url: apiURL,
    method: "GET"
  }).then(function (response) {
    for (var i = 0; i < 5; i++) {
      var resDate = moment(response.list[i * 8].dt_txt).format("LL"); var icon = imgBaseURl + response.list[i * 8].weather[0].icon + ".png";
      var resTemp = response.list[i * 8].main.temp;
      var resHum = response.list[i * 8].main.humidity;
      var cardImage = $("<img>").attr("src", icon).attr("class", "card-img-top").attr("alt", "forecast");
      var d1 = $("<div>").attr("class", "card fiveDay");
      var d2 = $("<div>").attr("class", "card-body bg-light");
      var date = $("<p>").attr("class", "card-text").text("Date: " + resDate);
      var temp = $("<p>").attr("class", "card-text").text("Temperature: " + resTemp);
      var hum = $("<p>").attr("class", "card-text").text("Humidity: " + resHum);
      //       <div class="card" style="width: 18rem;">
      //         <img src="..." class="card-img-top" alt="...">
      //           <div class="card-body">
      //             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      //           </div>
      // </div>

      $("#forecast").append(d1);
      d1.append(cardImage);
      d1.append(d2);
      d2.append(date);
      d2.append(temp);
      d2.append(hum);
    }
  })
}

function oneDay(city) {
  var apiURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;
  console.log(apiURL)
  $.ajax({
    url: apiURL,
    method: "GET"
  }).then(function (response) {

    console.log(response)

    // city 
    console.log(response.name)
    // date 
    console.log(moment().format("LL"))
    // temp 
    console.log(response.main.temp)
    // hum 
    console.log(response.main.humidity)
    // win 
    console.log(response.wind.speed)

    var lon = response.coord.lon
    var lat = response.coord.lat
    console.log(imgBaseURl + response.weather[0].icon + ".png");

    // uv(lon and lat)
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey;
    console.log(uvURL)


    $.ajax({
      url: uvURL,
      method: "GET"
    }).then(function (uvresponse) {
      console.log(uvresponse.value)
    })

    /*
    <div class="card">
  <div class="card-body">
   
  </div>
  </div>
    */


  })
}

//onclick with #search-button
//call oneday with the city
//call5day with the city
//push that city into local storage and make a btn for it

document.querySelector("#search-button").onclick = function () {
  console.log(document.querySelector("#search-value").value)
  oneDay(document.querySelector("#search-value").value);
  fiveday(document.querySelector("#search-value").value);
};



// 5day: date icon temp hum 1day: city date temp hum win uv(lon and lat)



// function getWeatherInfo() {
//   var place = document.getElementById("place").value.trim();
//   if (isNaN(place)) {
//     ajax(apiURL + "&q=" + place);
//   } else {
//     ajax(apiURL + "&zip=" + place);
//   }
//   console.log(place);
// }

// // if the object creation is successful, proceed w/ sending data to the server
// function ajax(url) {
//   var request = new XMLHttpRequest();
//   if (request) {
//     request.open("GET", URL, true);
//     request.send();

//     // receive response from server
//     request.onreadystatechange = function () {
//       if (this.readyState == 4) {
//         var response = JSON.parse(this.responseText);
//         var errorMessage = document.getElementById("errorMessage");

//         if (this.status == 200) {
//           generateCard(response);
//         } else {
//           errorMessage.textContent = response.message;
//         }
//       }
//     };
//   }
// }

// function generateCard(response) {
//   weatherInfo.querySelector("#city").textContent =
//     "Weather in " + response.name + " , " + response.sys.country;
// }
