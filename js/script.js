
$(document).ready( function() {

	var currentMove = 0;
	var frontCard = "pics/front.png";
	 			
				
	previous_image = null;
	previous_image_index = null;
	// max_tries = 12;
	// current_tries = max_tries;
	cardNumbers = $(".board .cards .card").length;
	numSlots = $(".board .row .col li").length;
		
	setBoard();
		
	var touch = 0;

    var start = new Date;

	var timer = setInterval(function() {
    $('.Timer').text((new Date - start) / 1000 + " Seconds");
	}, 1000);


	$(".board .row .col li").click( function() {
	 touch++;
	var card = $(this);
	if( touch === 2 )
		{
		  touch--;
		}
		else
		{
		   image_index = card.parents(".board").find(".row .col li").index(card);
		   this_image = card.find("img.card-back").attr("src");
			card.find("img.card-front").animate({opacity:0}, 600);
				card.find("img.card-back").animate({opacity:1}, 600, function()
		{
					
		 currentMove++;
		 if( currentMove === 1 )
			{
				previous_image = this_image;
				previous_image_index = image_index;
			}
		 else if ( currentMove === 2 ) 
			{
				if( this_image === previous_image )
			{
				$("li").eq( previous_image_index ).removeClass("hidden");
				$("li").eq( image_index ).removeClass("hidden");
							
				swal({title:"Match!", imageUrl:"pics/match.jpg"});

				num_matches = $(".board .row .col li.hidden").length;
				
				if( num_matches === 0) {
					 swal("You Are a Winner!");
					clearInterval(timer);
					}
					}
						else //No Match
						{
							
							$(".board .row .col li").eq( previous_image_index ).find("img.card-back").animate({opacity:0}, 500);
							$(".board .row .col li").eq( image_index ).find("img.card-back").animate({opacity:0}, 500);
							
							$(".board .row .col li").eq( previous_image_index ).addClass("hidden");
							$(".board .row .col li").eq( image_index ).addClass("hidden");
							
							$(".board .row .col li").eq( previous_image_index ).find("img.card-front").animate({opacity:1}, 500);
							$(".board .row .col li").eq( image_index ).find("img.card-front").animate({opacity:1}, 500);
		
						}
						currentMove = 0;
					}
					touch--;

				});
			}
				 	
		});
		
	function setBoard()
	{
		$(".board .row .col li").html("<img src='" + frontCard + "' class = 'card-front'>");
				
		for( index = 0; index < cardNumbers; index++ )
		 {
			for( card_iteration = 0; card_iteration < 2; card_iteration++ )
			  {
				 var randNum = Math.floor(Math.random() * numSlots);
						
				while( $(".board .row .col li").eq(randNum).find(".card-back").length > 0 )
				  {
					 randNum = Math.floor(Math.random() * numSlots);
				   }
						
				$(".board .cards .card").eq( index ).find("img").clone().appendTo($(".board .row .col li").eq(randNum).addClass("hidden"));
						
		    }
		}
			
	}

	
});

