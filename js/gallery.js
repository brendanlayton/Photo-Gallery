/* Instructions

1. Create a web page using HTML and CSS. The page should have a title, a search box, and a place where a photo gallery will be placed. Make sure it is responsive.

2. Add the provided images to the gallery using the design in the gallery_mockup.png file.

3. Find a jQuery plugin for creating a photo gallery or write your own script. The gallery must include the ability to click on photos and view them in a lightbox (see the photo_lightbox.png file for the design). The gallery should also include support for additional media types like YouTube videos.

4. Add text captions to the images when viewed in the lightbox. See the photo_lightbox.png file for the design.

5. Add back and forward buttons when the lightbox is visible to switch between photos. Also, add keyboard navigation for browsing photos.

6. Implement the search box at the top of the page that filters photos based on the captions. The photos should filter in real-time as you type. Add animation effects when filtering the gallery of photos.

7. Make sure to check your code is valid by running it through an HTML and CSS validator.

8. You should also check for issues with your JavaScript code using JSHint, linked in the Project Resources.

*/

var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $caption = $("<p></p>");
var $arrowLeft = $('<a class="arrow previous" href="#"><i class="fa fa-chevron-left" aria-hidden="true"></i></a>');
var $arrowRight = $('<a class="arrow next" href="#"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>');
var $close = $('<i class="fa fa-times" aria-hidden="true"></i>');
var $position = 0;
var $galleryLength = $('#imageGallery li').length;

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

// 1.5 Add close button to overlay

	$overlay.append($close);

// 2. Capture the click event on a link to an image

$(".lightbox-image").click(function(event) { 
  event.preventDefault();
	var imageLocation = $(this).attr("href");
	var nextImageLocation = $(this).parent().next('li').children('a').attr("href");
	var prevImageLocation = $(this).parent().prev('li').children('a').attr("href");
	
  // Updated overlay with the imaged linked to in the link
  $image.attr("src", imageLocation);
  
  // Show the overlay
  $overlay.show();
  
  // Get child's alt attribute and set caption
  var captionText = $(this).children("img").attr("alt");
  $caption.text(captionText);
	
	// Show arrows
	$('a.arrow').show();
	
	// Make arrows functional
	
	$('i.fa.fa-chevron-left').click(function(event) {
		event.preventDefault();
		$image.attr("src", prevImageLocation);
	});
	$('i.fa.fa-chevron-right').click(function(event) {
		event.preventDefault();
		$image.attr("src", nextImageLocation);
	});
});

		

// 3. Navigate left & right with arrows

// Need to change the img src for the overlay image
// Left arrow would replaced the img src with the next img src up the DOM tree
// Right arrow would replaced the img src with the next img src down the DOM tree

/*
$('.next').click(function(event) {
	var $currentImage = $('#overlay img').attr("src");
	var $currentImageSelector = "a[href='" + $currentImage + "']";
	var $nextImage = $('a[href="$currentImage"]').next("href");
	$('#overlay').html('<img src="' + $nextImage '">');
	$('#overlay img').html('<img src="' + prevImageLocation + '">');
});
*/
	

// 4. Close overlay
 
$close.click(function() {
  $overlay.hide();
}); 