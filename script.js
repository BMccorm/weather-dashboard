
var APIkey = "0b6df3c6402adfe49bfc48a44c15bfc8";
var imgBaseURl = "https://openweathermap.org/img/w/";

function oneDay(city) {
  var apiURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIkey;
  var searchValue = document.getElementById("search-value");
  // console.log(apiURL)
  $.ajax({
    url: apiURL,
    method: "GET"
  }).then(function (response) {
    // console.log(response)
    var resName = response.name;
    // date
    var resDate1 = moment().format("LL");
    // temp 
    var resTemp1 = Math.round(response.main.temp);
    // console.log(response.main)
    // hum 
    var resHum1 = response.main.humidity;
    // win 
    var resWind = response.wind.speed;
    var lon = response.coord.lon
    var lat = response.coord.lat
    var resIcon1 = imgBaseURl + response.weather[0].icon + ".png";
    // uv(lon and lat)
    var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey;
    // console.log(uvURL)
    $.ajax({
      url: uvURL,
      method: "GET"
    }).then(function (uvresponse) {
      var resUV = uvresponse.value
      // console.log(resUV)

      var cardImage = $("<img>").attr("src", resIcon1).attr("alt", "forecast").attr("class", "align-self-center");
      var d2 = $("<div>").attr("class", "mx-auto");
      var d1 = $("<div>").attr("class", "card-body bg-light col-3 oneDay");
      var city = $("<p>").attr("class", "card-text font-weight-bold mx-auto").text(resName);
      var date = $("<p>").attr("class", "card-text mx-auto font-weight-bold").text(resDate1);
      var temp = $("<p>").attr("class", "card-text").text("Temperature: " + resTemp1 + "°F");
      var hum = $("<p>").attr("class", "card-text").text("Humidity: " + resHum1 + "%");
      var wind = $("<p>").attr("class", "card-text").text("Wind Speed: " + resWind + "  m/s");
      var uvDiv = $("<div>").attr("class", "uvIcon");
      var uv = $("<p>").attr("class", "card-text").text("UV Index: " + resUV);
      var low = $("<img>").attr("src", "assets/low.png").attr("alt", "uv Icon");
      var lowMD = $("<img>").attr("src", "assets/low_md.png").attr("alt", "uv Icon");
      var md = $("<img>").attr("src", "assets/md.png").attr("alt", "uv Icon");
      var mdHigh = $("<img>").attr("src", "assets/md_high.png").attr("alt", "uv Icon");
      var high = $("<img>").attr("src", "assets/highest.png").attr("alt", "uv Icon");

      var todayID = $("#today");
      todayID.empty();
      todayID.append(d1);
      d1.append(d2);
      d2.append(cardImage);
      d1.append(city);
      d1.append(date);
      d1.append(temp);
      d1.append(hum);
      d1.append(wind);
      d1.append(uvDiv);
      uvDiv.append(uv);
      if (resUV <= 2) {
        uvDiv.append(low);
      } else if (resUV <= 5) {
        uvDiv.append(lowMD);
      } else if (resUV <= 7) {
        uvDiv.append(md);
      } else if (resUV <= 10) {
        uvDiv.append(mdHigh);
      } else if (resUV >= 10.1) {
        uvDiv.append(high);
      }
    })
  })
}

function fiveday(city) {
  var apiURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIkey;
  var searchValue = document.getElementById("search-value");
  // console.log(apiURL);
  $.ajax({
    url: apiURL,
    method: "GET"
  }).then(function (response) {
    var forecast = $("#forecast");
    forecast.empty();

    for (var i = 0; i <= 5; i++) {
      var resDate = moment(response.list[i * 8].dt_txt).format("LL"); var icon = imgBaseURl + response.list[i * 8].weather[0].icon + ".png";
      var resTemp = Math.round(response.list[i * 8].main.temp);
      var resHum = response.list[i * 8].main.humidity;
      var d1 = $("<div>").attr("class", "mx-auto");
      var cardImage = $("<img>").attr("src", icon).attr("alt", "forecast");
      var d2 = $("<div>").attr("class", "card-body bg-light fiveDay");
      var date = $("<p>").attr("class", "card-text font-weight-bold").text(resDate);
      var temp = $("<p>").attr("class", "card-text").text("Temperature: " + resTemp + "°F");
      var hum = $("<p>").attr("class", "card-text").text("Humidity: " + resHum + "%");
      $("#forecast").append(d2);
      d2.append(d1);
      d1.append(cardImage);
      d2.append(date);
      d2.append(temp);
      d2.append(hum);
    }
  })
}

$("#search-button").click(function () {
  var searchValue = $("#search-value").val();
  localStorage.setItem("lastCity", searchValue);
  $(".history").prepend($("<button>").addClass("list-group-item").text(searchValue).css('text-transform', 'capitalize'));
  oneDay(searchValue);
  fiveday(searchValue);
});

$(document).on("click", ".list-group-item", function () {
  var searchValue = $(this).text();
  localStorage.setItem("lastCity", searchValue);
  oneDay(searchValue);
  fiveday(searchValue);
});

var lastCity = localStorage.getItem("lastCity");
if (lastCity != undefined) {
  oneDay(lastCity);
  fiveday(lastCity);
}