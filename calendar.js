function getLang()
{
 if (navigator.languages != undefined) 
 return navigator.languages[0]; 
 else 
 return navigator.language;
}

$(document).ready(function(){

	
	var day_length = 86400; // 1 day
	var hour_length = 3600; // 1 hour
	var interval = 1800; // 30 mins



    var date = new Date();
    var day_name = date.toLocaleDateString(getLang(), { weekday: 'long' });        

	$("#day").html(day_name);

	var date_line = date.toLocaleDateString(getLang(), {day: 'numeric', year:'numeric', month:'long'})
	$("#date").html(date_line);

	var current_minutes = date.getMinutes()
	var current_hour = date.getHours()

	var n_elements = day_length/interval;

	var current_item = 0

	// Populate empty children
	window.setInterval(function(){

		var now = new Date();
		var data = $(".ei_Title").eq(current_item).attr("data");
		var t = now.getHours()*60 + now.getMinutes() - 30
		if(t > data){
			$(".ei_Title").eq(current_item).addClass("dead-item");
			current_item += 1;
		}
		
	}, 1000);

	

	for(var i = 0; i < n_elements; i++){

		var h = Math.floor(i/2);
		var half = "am";


		if(h < current_hour){
			continue;
		}else{
			if(h == current_hour){
				if((i*30)%60 + 30 < current_minutes){
					continue;
				}
			}
		}


		if (h > 12){
			half = "pm";
			if(h != 12){
				h = h%12;
			}
		}

		var hour = ("0" + h).slice(-2);
		var minute = ("0" + (i*30)%60).slice(-2);

		var node = document.createElement('div');
		node.classList.add("event_item");
		

		// Current active node: dot_active class
		 
		var d = Math.floor(i/2)*60 + (i*30)%60;

		node.innerHTML = `
	            <div class="ei_Dot"></div>
	            <div class="ei_Title" data="` + d +`">` + hour + ":" + minute + " " + half + `</div>
	            <div class="ei_Copy">Empty</div>
	          `;

		$(".calendar_events").append(node);
	}



	$('.modal-toggle').on('click', function(e) {
		e.preventDefault();
		$('.modal').removeClass('is-visible');
	});
	

	$(".cl_add").click(function(){
		if($(".active").length){
			$('.modal').toggleClass('is-visible');
		}
	});

	var end_select = function(){
		if($(".active").length){
			$(".cl_add").removeClass("cl_add_no");
		}else{
			$(".cl_add").addClass("cl_add_no");
		}
	}


	$(".cl_update").click(function(){
		
		var input = $("#input").val();
		if(input != ""){
			$(".active").each(function(index){
				$(this).find(".ei_Copy").html(input);
			});
		}
		
		$("#input").val("");
		$('.modal').removeClass('is-visible');
	})
	


	new Selectables({
		elements: '.event_item',
		zone:'.calendar_events',
		selectedClass:'active',
		stop: end_select
	})

	
	
});




