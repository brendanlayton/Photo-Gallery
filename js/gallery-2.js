/* Steps

1. Add overlay elements

2. Create a function that updates the image and the image catpion

3. Create a "fadein" transition function

4. Show the overlay when thumbnail images are clicked 

5. Create a function to update $index variable and use it to retrieve a new image and caption

6. Add click events to arrows using the prevNext function (previous step)

7. Add the ability to navigate with left and right keyboard keys

8. Close overlay

*/

var $overlay = $('<div id="overlay"></div>');
var $image = $('<img class="lb-image">');
var $caption = $('<p class="lb-caption"></p>');
var $arrowLeft = $('<a class="arrow previous" href="#"><i class="fa fa-chevron-left" aria-hidden="true"></i></a>');
var $arrowRight = $('<a class="arrow next" href="#"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>');
var $index = 0;
var $galleryLengthMax = $('#imageGallery li').length - 1;

// 1. Add overlay elements
  
	// 1.1 Add an overlay
  
	$("body").append($overlay);

  // 1.2 Add an image to overlay
  
	$overlay.append($image);

  // 1.3 Add a caption to the overlay
  
	$overlay.append($caption);

	// 1.4 Add arrows to overlay
	
	$overlay.append($arrowLeft);
	$overlay.append($arrowRight);


// 2. Function that updates the image and the image caption

function updateImage(imageLocation, captionText) {
	
	// 2.1 Update the image in the overlay with the url link as the src. Set CSS to display: none to then fade in (see below).
	
		$image.attr("src", imageLocation).css({ "display": "none" });
	
		
	// 2.2 Get the images's caption to display in overlay. Set CSS to display: none to then fade in (see below).
	
		$caption.text(captionText).css({ "display": "none" });
}

// 3. Fade transition function

function fadeTrans () {
  	$( ".lb-image" ).fadeIn( 1500 );
		$( ".lb-caption" ).fadeIn( 1700 );
} 


// 4. Show the overlay when thumbnail images are clicked  

$("#imageGallery a").click(function(event) { 
  event.preventDefault();
	var imageLocation = $(this).attr("href");
	var captionText = $(this).children("img").attr("alt");
			
	// 4.1 Update index to current location
	
		$index = $(this).parent().index();
	
	// 4.2 Update overlay image including caption
	
		updateImage(imageLocation, captionText);
	
	// 4.3 Show the overlay
	
		$overlay.show();
  
	// 4.4 Show arrows
	
		$('a.arrow').show();
	
	// 4.5 Fade in image and caption
		
		fadeTrans();
	
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
	
	// Get the new image using the index variable to locate it
	
		var newImage = $("#imageGallery li").get($index).getElementsByTagName("a");
		
	// Get the href for the new image and add to imageLocation. Get new img attribute as well.
		
		var imageLocation = $(newImage).attr("href");
		var captionText = $(newImage).children("img").attr("alt");
	
	// Update the overlay with the new image
		
		updateImage(imageLocation, captionText);
	
}


//	6. Add click events to arrows using the prevNext function
	
	$('i.fa.fa-chevron-left').click(function(event) {
		prevNext(true);
		fadeTrans();
	});
	$('i.fa.fa-chevron-right').click(function(event) {
		prevNext();
		fadeTrans();
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