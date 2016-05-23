/* Steps

1. Add overlay elements

2. Create a function that updates the image and video and their catpions

3. Show the overlay when thumbnail images are clicked 

4. Create a function to update $index variable and use it to retrieve a new image/video and caption

5. Add click events to arrows using the function in the previous step

6. Add the ability to navigate with left and right keyboard keys

7. Close overlay

*/

// Variables

var $overlay = $('<div id="overlay"></div>');
var $image = $('<img class="lb-image">');
var $video = $('<iframe class="lb-video" frameborder="0" allowfullscreen></iframe>');
var $caption = $('<p class="lb-caption"></p>');
var $arrowLeft = $('<a class="arrow previous" href="#"><i class="fa fa-chevron-left" aria-hidden="true"></i></a>');
var $arrowRight = $('<a class="arrow next" href="#"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>');
var $index = 0;
var $galleryLengthMax = $('#imageGallery li').length - 1;


// 1. Add overlay elements
  
	// 1.1 Add an overlay
  
	$("body").append($overlay);

  // 1.2 Add an image, video and caption to overlay 

	$overlay.append($image);
	$overlay.append($video);
	$overlay.append($caption);

	// 1.4 Add arrows to overlay
	
	$overlay.append($arrowLeft);
	$overlay.append($arrowRight); 


// 2. Function that updates the image and video src, the corresponding caption and shows/hides the relevant elements


// 2.1 Media update function

	function updateImage($mediaLocation, $captionText) {

		//Update the overlay image with the url link as the src and the attr as the caption. 
		
				$image.attr("src", $mediaLocation);
				$caption.text($captionText);
				
		// Show image elements while hiding video elements. 
			
				$('#overlay img').show();
				$($caption).show();
				$($video).hide();
		
		// Show remaining overlay elements
		
				$overlay.show();
				$('a.arrow').show();	
	}

	function updateVideo($mediaLocation, $captionText) {

		// Update the overlay video with the url link as the src and the attr as the caption. 
		
				$video.attr("src", $mediaLocation);
				$caption.text($captionText);
		
		// Show video elements while hiding image elements. 
		
				$('#overlay img').hide();
				$($caption).show();
				$($video).show();
		
		// Show remaining overlay elements
		
				$overlay.show();
				$('a.arrow').show();	
	} 


// 3. Show the overlay when image or video thumbnails are clicked  

	// 3.1 Function to scroll to the top of the page when thumbnails are clicked
		
		function goToTop() {
			$("html, body").animate({ scrollTop: 0 }, "slow");
			return false;
		}

	// 3.2 Show overlay on image thumbnail click

		$("#imageGallery a.lightbox-image").click(function(event) { 
			event.preventDefault();
			var $mediaLocation = $(this).attr("href");
			var $captionText = $(this).children("img").attr("alt");

			// 3.2.1 Update $index variable to current location

				$index = $(this).parent().index();

			// 3.2.2 Update overlay image and caption and show relevant overlay elements
			
				updateImage($mediaLocation, $captionText);

			// 3.2.4 Scroll to top of page on click
			
				goToTop();
		});

	// 3.3 Show overlay on video thumbnail click

		$("#imageGallery a.lightbox-video").click(function(event) { 
			event.preventDefault();
			var $mediaLocation = $(this).attr("href");
			var $captionText = $(this).children("img").attr("alt");

			// 3.3.1 Update index to current location

				$index = $(this).parent().index();

			// 3.3.2 Update overlay video and caption and show relevant overlay elements
			
				updateVideo($mediaLocation, $captionText);
				
			// 3.3.3 Scroll to top of page on click
			
					goToTop();
	}); 


// 4. Create a function to update the $index variable and use it to retrieve new image and caption

function prevNext(prev) {
	// The above sets prev to true

	// if prev not true add 1 to $index, i.e. move forward, else take one away from $index, i.e. move backwards
	if (!prev) {
		// increase the $index variable by one
		++$index;
	} else {
		// decrease the $index variable by one 
		--$index;
	}

// Reset the value of $index if its value moves outside the index range. 
// Variable $galleryLengthMax is used to accommodate images/video being added or subtracted from the gallery in the future.

	if ($index < 0) {
		$index = $galleryLengthMax;
	} 
	if ($index > $galleryLengthMax) {
		$index = 0;
	}

// Get the new media (image or video) using the index variable to locate it

	var $newMedia = $('#imageGallery li').get($index).getElementsByTagName("a");
	var $mediaLocation = $($newMedia).attr("href");
	var $captionText = $($newMedia).children("img").attr("alt");

	if ( $mediaLocation.indexOf("youtube") === -1 ) {
		updateImage($mediaLocation, $captionText);
	} else {
		updateVideo($mediaLocation, $captionText);
	}
}

// 5. Add click events to arrows using the prevNext function
	
	$('i.fa.fa-chevron-left').click(function(event) {
		prevNext(true);
	});
	$('i.fa.fa-chevron-right').click(function(event) {
		prevNext(); 
	});


// 6. Add the ability to navigate with left and right keys on keyboard

	$('body').keydown(function(event) {
		if(event.keyCode === 37) { // left
			prevNext(true);
		} else if (event.keyCode === 39) { // right
			prevNext();
		}
	});

	
// 7. Close overlay
 
	$overlay.click(function(event) {
		// exclude clicks on arrows and other elements
		if(event.target.id === "overlay")
			
		// close overlay	
		$(this).hide();
	}); 