idleTimer = null;
idleState = false;

// How much it will to take to close opened modal while user is idle
idleWait = 210000; // NASTAVIT NA 210000 = 3.5min

bgPlaying = true;
bodyModalVisible = true

$(window).load(function() {
	// !!!!!!! ODKOMENTOVAT !!!!!!!
	// !!!!!!! ODKOMENTOVAT !!!!!!!
	// !!!!!!! ODKOMENTOVAT !!!!!!!

	$('*').css({
       'cursor' : 'url("../images/transparentCursor.cur"), auto'
    });
	// $("#loader").fadeOut("slow");
	hide_body_parts();
	document.getElementById("bgvid").playbackRate = 1.5;
	$('.mejs-controls').hide();
});

$(document).ready(function() {

	$('*').css({
       'cursor' : 'url("../images/transparentCursor.cur"), auto'
    });

	document.addEventListener("contextmenu", function(e) {
	    e.preventDefault();
	});
	if($('#pulsing_text').is(':visible')) {
		setInterval(function(){$('#pulsing_text').toggleClass('active')}, 1100);
	}

	$('#loader').on('click',function(){
		$("#loader").fadeOut("slow");
	})

	$('#show-pw-btn').on('click', function(){
		show_pw();
	});

	$( "img" ).mousedown(function(){return false;});
	$( "a" ).mousedown(function(){return false;});

	var months = ["Január","Február","Marec","Apríl","Máj","Jún","Júl","August","September","Október","November","December"];
	var date = new Date();
	var month_int = date.getMonth();
	var month = months[month_int];
	var day_int = date.getDate();
	var year_int = date.getFullYear();

	$('.calendar .month').text(month)
	$('.calendar .year').text(year_int)
	$('.calendar .day-window').text(day_int)


	$('.container .list-group-item').on('click',function(){
		if ( $(this).hasClass("activ") ) {
		} else {
			$('.container .list-group-item.activ').removeClass('activ');
			$(this).addClass('activ');

			var city = $(this).attr('city');
			var street = $(this).attr('street');
			var optional = $(this).attr('optional');
			var psc = $(this).attr('psc');
			var phone = $(this).attr('phone');
			var opening = $(this).attr('opening').split('/');

			$('.office-info').fadeOut(300,function(){
				$(this).find('.city').text(city);
				$(this).find('.street').text(street);
				$(this).find('.optional').text(optional);
				$(this).find('.psc').text(psc);
				$(this).find('.phone').text(phone);

				var opening_hours = $(this).find('.opening .hours');

				opening_hours.each(function(index){
					$(this).text(opening[index]);
				});
				$(this).fadeIn(300);
			});
		}
	});

	$('#userInfoModal .btn-close, #userInfoModal button.close').on('click',function(){
		hide_pw();
		infoModal = $('#userInfoModal');
		infoModal.find('.nav-pills > li.active').removeClass('active');
		infoModal.find('.tab-content > .active').removeClass('active').removeClass('in');

		infoModal.find('.nav-pills > li:first').addClass('active');
		infoModal.find('#wifi-taxi').addClass('active').addClass('in');
	});


	$('#surveyModal.modal .btn-close').on('click',function(){
		clearForm();
	});
	$('#surveyModal.modal button.close').on('click',function(){
		clearForm();
	});

	$('ul.insurance li').on('click', function(){
		var insurance_tab = $(this).find('a').attr('href');
		goToDefault(insurance_tab);
	});


	$("#bgvid").bind("ended", function() {
		bgPlaying = false;


		fadein_body_parts();
		hideBodyModal();
		// $("#krk").fadeIn(300);
		// 	$("#rameno").fadeIn(300,function(){
		//   		$("#laket").fadeIn(300,function(){
		//   			$("#panva").fadeIn(300);
		//   				$("#zapastie").fadeIn(300,function(){
		//   					$("#koleno").fadeIn(300,function(){
		// 							hideBodyModal();
		//   					});
		//   				});
		// 			});
		// 		});
	});

	$('.body-part').on('click',function(){
		var modal_name = $(this).attr("modal_src");
		$('#partModal-' + modal_name).modal('show');
		showBodyModal();
	});

	$('.play-video').on('click',function(){
		var modal_name = $(this).attr("modal_src");
		var video_name = $(this).attr("video_src");
		player = new MediaElementPlayer(video_name);
		$(modal_name).modal('show');
	});

	$('.video-modals').on('hide',function(){
		stop_video(player);
	});



	$('#partModal-koleno').on('hidden.bs.modal',function(){
		hideBodyModal();
	});

	$('#partModal-panva').on('hidden.bs.modal',function(){
		hideBodyModal();
	});

	$('#partModal-zapastie').on('hidden.bs.modal',function(){
		hideBodyModal();
	});

	$('#partModal-laket').on('hidden.bs.modal',function(){
		hideBodyModal();
	});

	$('#partModal-rameno').on('hidden.bs.modal',function(){
		hideBodyModal();
	});


	$('.bodyPartModal').on('hidden.bs.modal',function(){
		$(this).find('.nav-pills > li.active').removeClass('active');
		$(this).find('.tab-content > .active').removeClass('active').removeClass('in');

		$(this).find('.nav-pills > li:first').addClass('active');
		$(this).find('.tab-content > .tab-pane:first').addClass('active').addClass('in');
	});

	$('.commonModal').on('hide',function(){
		$(this).find('.nav-pills > li.active').removeClass('active');
		$(this).find('.tab-content > .active').removeClass('active').removeClass('in');

		$(this).find('.nav-pills > li:first').addClass('active');
		$(this).find('.tab-content > .tab-pane:first').addClass('active').addClass('in');
	});
	

	// $('*').bind('click', function () {
	$('*').bind('mousemove keydown scroll click', function () {
	

      clearTimeout(idleTimer);

      if (idleState == true) {
          // Reactivated event
          console.log("Welcome Back");
      }

      idleState = false;

      idleTimer = setTimeout(function () {
          // Idle event
        console.log("You've been idle for 210 sec.");
        // stop_video(player)
        jsKeyboard.hide();
        hide_pw();
        $('.close').click();
        $("#loader").fadeIn("slow");
        idleState = true;
	      }, idleWait);
	});

  	$("body").trigger("mousemove");

  	$(".survey-close-btn").on('click',function(){
  		jsKeyboard.hide();
  	});

	$('#surveyModal button.close').on('click',function(){
		jsKeyboard.hide();
	});

	$(function () {
       jsKeyboard.init("virtualKeyboard");
       $("#feedback").val();
    });

})

function clearForm(){
	$('input#user-name').val('');
	$('input#mail').val('');
	$('textarea#feedback').val('');
	$('.check-name').hide();
	$('.check-email').hide();
}

function goToDefault(element){
	$(element).find('.activ').removeClass('activ');
	$(element).find('.list-group-item:first').addClass('activ');
}

function showBodyModal(){
	if (typeof bgWaiting != 'undefined'){
		clearTimeout(bgWaiting);
	}
}

function hideBodyModal()	{
	bgWaiting = setTimeout(function(){
		fadeout_body_parts();
		setTimeout(function () {
			$("#bgvid")[0].play();
			bgPlaying = true;
		}, 600);
	},30000);
}


function hide_body_parts(){
	$("#lebka").hide();
	$("#krk").hide();
	$("#rameno").hide();
	$("#chrbat").hide();
	$("#laket").hide();
	$("#panva").hide();
	$("#zapastie").hide();
	$("#koleno").hide();
}

function fadeout_body_parts(){
	$("#lebka").fadeOut(300);
	$("#krk").fadeOut(300);
	$("#rameno").fadeOut(300);
	$("#chrbat").fadeOut(300);
	$("#laket").fadeOut(300);
	$("#panva").fadeOut(300);
	$("#zapastie").fadeOut(300);
	$("#koleno").fadeOut(300);
}

function fadein_body_parts(){
	// $("#lebka").fadeIn(300);
	$("#krk").fadeIn(300);
	$("#rameno").fadeIn(300);
	// $("#chrbat").fadeIn(300);
	$("#laket").fadeIn(300);
	$("#panva").fadeIn(300);
	$("#zapastie").fadeIn(300);
	$("#koleno").fadeIn(300);
}

// function pause_video(player){
// 	player.pause();
// }

function stop_video(player){
	player.pause();
	player.setCurrentTime(0);
}

function show_pw(){
	$('#wifi-connection #password').text("inocode5")
}

function hide_pw(){
	$('#wifi-connection #password').text("********")
}

