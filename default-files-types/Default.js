(function(){
	var myObject = {
		init: function(){
			console.log('We have init');
			$this = this;
			cycle = setInterval($this.galController, 2000);
			$(function(){
				$this.eventListeners();
			});
			$(window).load(function(){
				$this.svg();
				$this.lazy();
			});
		},
		lazy: function(){
			console.log('We have lazy');
			$('img.lazy').each(function(){
				$(this).css({'opacity':'0'}).attr('src', $(this).attr('data-src')).delay(300).animate({"opacity":"1"}, 2500);
			});
		},
		eventListeners: function(){
			console.log('We have event listening');
			$('.toggle-menu').on('click', myObject.customMethod);		
		},
		svg: function(){ 
			console.log('We have svg');
			if( !Modernizr.svg ){
				svgs = myObject.svgs;
				$('img.svg').each(function(){
					svgs = $(this).attr('src');
					svgs = svgs.replace('svg', 'jpg');
					$(this).attr('src', svgs);
				});
			}
		},		
		galController: function(direction){ // controls the gallery
			console.log('We have gallery');
			galDir = direction; // direction given to func (prev, next, slide# or empty)
			galTo = 1; // where the gal will go to
			galCurrent = parseInt( $('#gallery').attr('data-slide') ); // current slide position
			galTotal= $('#gallery .hero .slides li').length; // total slides
			if(galDir == 'prev'){ // if prev, then move left by going down 1
				galTo = galCurrent - 1;
				if( galTo < 1 ){ // but if the previous position doesn't exist, go to the last slide
					galTo = galTotal;
				}
			} else if(galDir == 'next' || galDir == undefined){ // if next or empty, then move right by going up 1
				galTo = galCurrent + 1;
			} else if ( typeof direction == 'number'){ // if a number is passed in (via the filmstrip), go there
				galTo = galDir;
			}
			if(galTo <= galTotal){ // lets go! but only if you're not going too far...
				$('#gallery .slides').animate({"margin-left":-( galTo -1 ) * 100 + '%'}, 750);
				$('#gallery').attr('data-slide', galTo).removeAttr('class').addClass('slide' + galTo);
			} else { // if too far, go back to 0
				$('#gallery .slides').animate({"margin-left":"0"}, 1000);
				$('#gallery').attr('data-slide', 1).removeAttr('class').addClass('slide1');
			}
		},
	}
	myObject.init();
})();