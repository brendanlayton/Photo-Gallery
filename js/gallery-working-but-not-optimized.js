/* Steps

1. Add overlay elements

2. Create a function that updates the image and the image catpion

3. Create a "fadein" transition function

4. Show the overlay when thumbnail images are clicked 

5. Create a function to update $index variable and use it to retrieve a new image and caption

6. Add click events to arrows using the prevNext function (previous step)

7. Add the ability to navigate with left and right keyboard keys

8. Close overlay


Problem

Need to replace the src url with either the image or video 


*/

var $overlay = $('<div id="overlay"></div>');
var $image = $('<img class="lb-image">');
var $video = $('<iframe class="lb-video" width="853" height="480" frameborder="0" allowfullscreen></iframe>');
var $caption = $('<p class="lb-caption"></p>');
var $arrowLeft = $('<a class="arrow previous" href="#"><i class="fa fa-chevron-left" aria-hidden="true"></i></a>');
var $arrowRight = $('<a class="arrow next" href="#"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>');
var $index = 0;
var $galleryLengthMax = $('#imageGallery li').length - 1;
var imageLocation;
var videoLocation;

//function addMedia() {
//	if ( $('#imageGallery a').hasClass('lightbox-image') ) {
//		$("body").append($overlay);
//		$overlay.append($image);
//		$overlay.append($caption);
//		$overlay.append($arrowLeft);
//		$overlay.append($arrowRight);
//	} else {
//		$("body").append($overlay);
//		$overlay.append($video);
//		$overlay.append($arrowLeft);
//		$overlay.append($arrowRight);
//	}
//}

function goToTop() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
}

// 1. Add overlay elements
  
	// 1.1 Add an overlay
  
	$("body").append($overlay);

  // 1.2 Add an image and video to overlay 

	$overlay.append($image);
	$overlay.append($video);
	$overlay.append($caption);

	// 1.4 Add arrows to overlay
	
	$overlay.append($arrowLeft);
	$overlay.append($arrowRight); 


// 2. Function that updates the image and the image caption


// 2.1 Image update function

	function updateImage(imageLocation, captionText) {

		// 2.1 Update the image or video in the overlay with the url link as the src. Set CSS to display: none to then fade in (see below).
		
				$image.attr("src", mediaLocation).css({ "display": "none" });
				
			
		// 2.2 Get the images's caption to display in overlay. Set CSS to display: none to then fade in (see below).

				$caption.text(captionText).css({ "display": "none" });
			
	}

	function updateVideo(videoLocation) {

		// 2.1 Update the image or video in the overlay with the url link as the src. Set CSS to display: none to then fade in (see below).
		
				$video.attr("src", mediaLocation);
	}


// 3. Fade transition function

function fadeTrans () {
  	$( ".lb-image" ).fadeIn( 1500 );
		$( ".lb-caption" ).fadeIn( 1700 );
} 


// 4. Show the overlay when image or video thumbnails  are clicked  

	// 4.1 Image thumbnails

		$("#imageGallery a.lightbox-image").click(function() { 
			event.preventDefault();
			var mediaLocation = $(this).attr("href");
			var captionText = $(this).children("img").attr("alt");

			// 4.1 Update index to current location

				$index = $(this).parent().index();

			// 4.2 Update overlay image including caption

				$image.attr("src", mediaLocation).css( "display", "none" );
				$caption.text(captionText).css( "display", "none" );
			
			// 4.3 Show the overlay

				$overlay.show();

			// 4.4 Show arrows

				$('a.arrow').show();

			// 4.5 Fade in image and caption

				fadeTrans();
			
				$('#overlay img').show();
				$($caption).show();
				$($video).hide();
				goToTop();

		});

	// 4.2 Video thumbnails

		$("#imageGallery a.lightbox-video").click(function() { 
			event.preventDefault();
			var mediaLocation = $(this).attr("href");

			// 4.1 Update index to current location

				$index = $(this).parent().index();

			// 4.2 Update overlay video and caption

				$video.attr("src", mediaLocation);
				
			
			// 4.3 Show the overlay

				$overlay.show();

			// 4.4 Show arrows

				$('a.arrow').show();
			
				$('#overlay img').hide();
				$($caption).hide();
				$($video).show();
				goToTop();

	}); 


// 5. Create a function to update $index variable and use it to retrieve new image and caption

function prevNext(prev) {
		// The above sets prev to true

		// if prev not true add 1 to $index, i.e. move forward else take one away from $index, i.e. move backwards
		if (!prev) {
			// increase the $index variable by one
			++$index
		} else {
			// decrease the $index variable by one 
			--$index
		}

	// Reset the value of $index if its value moves outside the index range. 
	// Variable $galleryLengthMax is used to accommaded images being added or subtracted from the gallery in the future.
	
		if ($index < 0) {
			$index = $galleryLengthMax;
		} 
		if ($index > $galleryLengthMax) {
			$index = 0;
		}
	
	// Get the new media (image or video) using the index variable to locate it
	
	var newMedia = $('#imageGallery li').get($index).getElementsByTagName("a");
	var mediaLocation = $(newMedia).attr("href");
	var imageCaption = $(newMedia).children("img").attr("alt");
	
		if ( mediaLocation.indexOf("youtube") === -1 ) {
				$image.attr("src", mediaLocation);
				$caption.text(imageCaption);
				$($image).show();
				$($caption).show();
				$($video).hide();
	} else {
			$video.attr("src", mediaLocation);
			$('#overlay img').hide();
			$('p').hide();
			$($video).show();
	}
}

//	6. Add click events to arrows using the prevNext function
	
	$('i.fa.fa-chevron-left').click(function(event) {
		prevNext(true);
		//fadeTrans();
	});
	$('i.fa.fa-chevron-right').click(function(event) {
		prevNext(); 
		//fadeTrans();
	});


// 7. Add the ability to navigate with left and right keys on keyboard

	$('body').keydown(function(event) {
		if(event.keyCode === 37) { // left
			prevNext(true);
			fadeTrans();
		} else if (event.keyCode === 39) { // right
			prevNext();
			fadeTrans();
		}
	});

	
// 8. Close overlay
 
	$overlay.click(function(event) {
		// exclude clicks on arrows and other elements
		if(event.target.id === "overlay")
			
		// close overlay	
		$(this).hide();
	}); 