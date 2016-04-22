var scale = "&units=imperial"
var APIurl = "http://api.openweathermap.org/data/2.5/weather/?q=bronx"+scale+"&APPID=83d6719e650c42ea895b646ab6e68481";
var toCelsius = $(".toCelsius");
var toFahrenheit = $(".toFahrenheit");
//images array. going to cycle through and replace background image depending on weather
var bgimages = [
	"url(https://images.unsplash.com/16/unsplash_5252b10dacd20_1.JPG?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=ecd6ee35d63f55fb3c56ef184568264a)",
	"url(https://images.unsplash.com/photo-1456441240751-2a368527053f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=5618586b062af8112a2cbb0074488d2d)",
	"url(https://images.unsplash.com/photo-1433863448220-78aaa064ff47?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=7cc309ab48976b4fdf3ebcb49b368465)",
	"url(https://images.unsplash.com/reserve/m6rT4MYFQ7CT8j9m2AEC_JakeGivens%20-%20Sunset%20in%20the%20Park.JPG?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=ca11afbdc71bbaa6a141448b60879047)",
	"url(https://images.unsplash.com/photo-1448032279986-c25cf997c38e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=4c34d74f5aac6657ae12686e0888a003)",
	"url(https://images.unsplash.com/photo-1415695989345-dcf757ebb173?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=d8e0db636d8345b68a216f1bf65b28cb)"
];

//setting default entry and event listener for new entries
var entry = "New York";
$('input').on("keyup", function (e){
	if (e.keyCode === 13) {
	   entry = $(this).val();
	   APIurl =  "http://api.openweathermap.org/data/2.5/weather?zip=" + entry + scale + "&APPID=83d6719e650c42ea895b646ab6e68481";
	   getWeather();
	   $(this).val("");
	}
});

//conversion functions on click event
toCelsius.on("click", function(){
	scale = "&units=metric";
	APIurl = "http://api.openweathermap.org/data/2.5/weather?zip=" +entry + scale+ "&APPID=83d6719e650c42ea895b646ab6e68481";
	getWeather();
});
toFahrenheit.on("click", function(){
	scale = "&units=imperial";
	APIurl = "http://api.openweathermap.org/data/2.5/weather?zip=" + entry + scale + "&APPID=83d6719e650c42ea895b646ab6e68481";
	getWeather();
});


var getWeather = function(){
	$.ajax({
		type: 'GET',
		url: APIurl,
		success: function(response){
			processWeather(response);
			console.log(response)
		},
		error: function(err){
			console.log("something went wrong");
			console.log(err);
		}
	});
};

var processWeather = function(param){
	var scaleFormat;
	if (scale === "&units=metric"){
		scaleFormat = "&deg;C";
	}else{
		scaleFormat = "&deg;F";
	}
	//check current weather description and cycle bg image accordingly
	if (/thunder/gi.test(param.weather[0].main)){
		$("body").css("background-image", bgimages[0]);
	} else if (/snow/gi.test(param.weather[0].main)){
		$("body").css("background-image", bgimages[1]);
	} else if(/rain/gi.test(param.weather[0].main)){
		$("body").css("background-image", bgimages[2]);
	} else if(/sunny/gi.test(param.weather[0].main)){
		$("body").css("background-image", bgimages[3]);
	} else if(/cloud/gi.test(param.weather[0].main)){
		$("body").css("background-image", bgimages[4]);
	} else if(/clear/gi.test(param.weather[0].main)){
		$("body").css("background-image", bgimages[5]);
	}
	$(".temp").html(Math.floor(param.main.temp) + scaleFormat);
	$(".city").html(param.name);
	$(".desc").html(param.weather[0].main);
	$(".pressure").html(param.main.pressure + ' hPa');
	$(".humidity").html(param.main.humidity + "%");
	//Weather was coming back in degrees. had to convert into direction.
	var wind = param.wind.speed;
	if (wind > 11.25 && wind<33.75){
	    wind = "NNE";
	  }else if (wind>33.75 && wind<56.25){
	    wind = "ENE";
	  }else if (wind>56.25 && wind<78.75){
	    wind = "E";
	  }else if (wind>78.75 && wind<101.25){
	    wind = "ESE";
	  }else if (wind>101.25 && wind<123.75){
	    wind = "ESE";
	  }else if (wind>123.75 && wind<146.25){
	    wind = "SE";
	  }else if (wind>146.25 && wind<168.75){
	    wind = "SSE";
	  }else if (wind>168.75 && wind<191.25){
	    wind = "S";
	  }else if (wind>191.25 && wind<213.75){
	    wind = "SSW";
	  }else if (wind>213.75 && wind<236.25){
	    wind = "SW";
	  }else if (wind>236.25 && wind<258.75){
	    wind = "WSW";
	  }else if (wind>258.75 && wind<281.25){
	    wind = "W";
	  }else if (wind>281.25 && wind<303.75){
	    wind = "WNW";
	  }else if (wind>303.75 && wind<326.25){
	    wind = "NW";
	  }else if (wind>326.25 && wind<348.75){
	    wind = "NNW";
	  }else{
	    wind = "N"; 
	  }
	$(".wind").html(wind);
};


getWeather();