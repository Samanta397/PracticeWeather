$(document).ready(function () {
	google.maps.event.addDomListener(window, 'load', init);

	function init() {
	    var input = document.getElementById('city');
	    var autocomplete = new google.maps.places.Autocomplete(input);
	}

	function mapSettings(lat, lng) {
		var coords = {lat: lat, lng: lng};
		var map = new google.maps.Map(document.getElementById('myMap'), {
			zoom: 10,
			center: coords
		});
		var marker = new google.maps.Marker({
			position: coords,
			map: map
		});
	}

	init();

	var date = new Date();
	var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	$('#dataDay').datetimepicker({
		locale: 'en',
		format: 'DD.MM.YY',
		allowInputToggle: true,
		minDate: today,
		maxDate: moment().add(4, 'd').toDate()
	});

	$(document).ready(function(){
		$("#getWeatherForecast").click(function(){
			return getForecast();
			});
		});

	function getForecast(){
		var city = $("#city").val();
		var dataDay = $("#dataDay").val();

		if(city != '' && dataDay != ''){

			$.ajax({
				url:'http://api.openweathermap.org/data/2.5/forecast?q=' + city + "&units=metric"  + "&APPID=200376b9a7a4c24b5239d4d13ae5af38",
				type: "GET",
				dataType: "jsonp",
				success: function(data){
					
					mapSettings(data.city.coord.lat, data.city.coord.lon);

					var nm = '';
					var nc = '';
					var forecast ='';

					nc+= '<p style = "font-size:28px;  color: #FFFFFF; font-family: "Kameron", sans-serif; float:left"><b>' + "&nbsp"+ " for " + 
						data.city.name + '</b></p>';
						$("#nameCity").html(nc);
					nm +=  '<p  style="font-size:24px; color:#E0FFFF">' + "Forecast for " + data.city.name + " on " + dataDay + '</p>';
				        $("#title").html(nm);

					forecast += '<table style="padding: 3px; border: 1px solid black;">';
					forecast += '<tr >';
               
                	 for(var i = 0; i < 5; i++){
                   		forecast += '<td style="padding: 3px; border-radius:20px 20px 20px 20px; background:#FDF5E6;">';

                   		forecast +='<p>' + data.list[i].dt_txt + '</p>';
						forecast += '<p style="text-align:center">' + data.list[i].main.temp + '&deg;C' + '<img src="https://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png"' +'</p>';
						forecast += '<p>Cloudiness:' + data.list[i].weather[0].main + '</p>';
						forecast += '<p>Humidity:' + data.list[i].main.humidity + '%' + '</p>';
						forecast += '<p>Pressure:' + Math.round(data.list[i].main.pressure*0.0075006375541921*100) + 'mm Hg</p>';

						forecast += '</td>'
               		  }
 			        
					forecast += '</tr>';
					forecast += '</table>';

					$("#forDayForecast").html(forecast);
					}
				})

			}else{
			$("#error").html("<div class='alert alert-danger' id='errorCity'><a href='#' class='clase' data-dismiss='alert' aria-label='clode'>&times;</a> City field or Data field cannot be empty</div>");
		}
	    $("#city").val('');
		$("#dataDay").val('');
	}
})