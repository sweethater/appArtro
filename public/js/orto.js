idleTimer = null;
idleState = false;

// How much it will to take to close opened modal while user is idle
idleWait = 50000;

bgPlaying = true;
bodyModalVisible = true

$(window).load(function() {
	// !!!!!!! ODKOMENTOVAT !!!!!!!
	// !!!!!!! ODKOMENTOVAT !!!!!!!
	// !!!!!!! ODKOMENTOVAT !!!!!!!
	hide_body_parts();
	$("#loader").fadeOut("slow");
	$('.mejs-controls').hide();
});

$(document).ready(function() {

	$( "img" ).mousedown(function(){return false;});
	$( "a" ).mousedown(function(){return false;});

	var fullDate = new Date()
	var twoDigitMonth = 0

	if ( (fullDate.getMonth()+1) > 9 ) {
		twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : (fullDate.getMonth()+1);
	} else {
		twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
	}

	var currentDate = fullDate.getDate() + "." + twoDigitMonth + ".";
	$('#calendar').text(currentDate)

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

  // $('form#survey input').keyup(function() {

  //     var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  //     var email = $('form#survey input#mail').val();
  //     var valid_email = emailReg.test(email);

  //     var usernameReg = new RegExp(/^[a-zA-Z]+[\s]+[a-zA-Z]+/i);
  //     var username = $('form#survey input#user-name').val();
  //     var valid_username = usernameReg.test(username);

  //     if ( valid_email && valid_username ) {
  //     	$('button#submit').removeAttr('disabled');

  //     } else {
  //       $('button#submit').attr('disabled', 'disabled');
  //     }
  // });

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


	// var player = new MediaElementPlayer('video#presentation-vid');

	// $(".nav.nav-pills.ortotech .contacts, .nav.nav-pills.ortotech .about").on('click',function(){
	// 	pause_video(player);
	// });

	// $('#ortotechModal').on('hidden.bs.modal',function(){
	// 	stop_video(player);
	// });

	// $('#ortotechModal .close, #ortotechModal .btn-close').on('click',function(){
	// 	stop_video(player);
	// });

	$("#bgvid").bind("ended", function() {
		bgPlaying = false;

		$("#krk").fadeIn(300);
			$("#rameno").fadeIn(300,function(){
		  		$("#laket").fadeIn(300,function(){
		  			$("#panva").fadeIn(300);
		  				$("#zapastie").fadeIn(300,function(){
		  					$("#koleno").fadeIn(300,function(){
									hideBodyModal();
		  					});
		  				});
					});
				});
	});

	$('.body-part').on('click',function(){
		var modal_name = $(this).attr("modal_src");
		$('#partModal-' + modal_name).modal('show');
		showBodyModal();
	});


	$('#partModal-clenok').on('hidden.bs.modal',function(){
		hideBodyModal();
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

	$('#partModal-chrbat').on('hidden.bs.modal',function(){
		hideBodyModal();
	});

	$('#partModal-krk').on('hidden.bs.modal',function(){
		hideBodyModal();
	});

	// $('#trafficModal').on('hidden.bs.modal',function(){
	// 	$(this).find('.traffic-info > li.active').removeClass('active').removeClass('in');;
	// 	$(this).find('.tab-content > .active').removeClass('active').removeClass('in');
	// 	$(this).find('.nav-global > li.active').removeClass('active');

	// 	$(this).find('.traffic-info > li.first').addClass('active');
	// 	$(this).find('.tab-content > #bus').addClass('active').addClass('in');
	// 	$(this).find('.nav-global > li:first').addClass('active');
	// 	$(this).find('#bus1').addClass('active').addClass('in');
	// });


	$('#ortotechModal').on('hidden.bs.modal',function(){
		$(this).find('.nav-pills.ortotech > li.active').removeClass('active');
		$(this).find('.tab-content > .active').removeClass('active').removeClass('in');

		$(this).find('.nav-pills.ortotech > li.about').addClass('active');
		$(this).find('.tab-content > #about').addClass('active').addClass('in');
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
        console.log("You've been idle for 20 sec.");
        // stop_video(player)
        jsKeyboard.hide();
        $('.close').click();
        idleState = true;
	      }, idleWait);
	});

  	$("body").trigger("mousemove");

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
	$("#clenok").hide();
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
	$("#clenok").fadeOut(300);
}

function fadein_body_parts(){
	// $("#lebka").fadeIn(300);
	$("#krk").fadeIn(300);
	$("#rameno").fadeIn(600);
	// $("#chrbat").fadeIn(300);
	$("#laket").fadeIn(1200);
	$("#panva").fadeIn(1500);
	$("#zapastie").fadeIn(1800);
	$("#koleno").fadeIn(2100);
	$("#clenok").fadeIn(2400);
}


// function pause_video(player){
// 	player.pause();
// }

// function stop_video(player){
// 	player.pause();
// 	player.setCurrentTime(0);
// }