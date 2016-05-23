/* Steps

Instructions: Implement the search box at the top of the page that filters photos based on the captions. The photos should filter in real-time as you type. Add animation effects when filtering the gallery of photos.

Step 1. Get the value from the input box --- in real time?

Step 2. Check that value against the photo captions

Step 3: Hide (rather than show I think?) the images whose captions don't match the input value

Step 4: Add animation (maybe fadeout or reshuffle image order) when filtering

*/

var $captionsArray = [];
var $galleryLength = $('#imageGallery li').length;
var $imageCaption = $('#imageGallery img').attr("alt");

/*function createArray() {
	for (var i = 0; i <= $galleryLength; i += 1) {
   var $captionsArrayEntry = $('#imageGallery li').index[i].attr("alt");
		$captionsArray.push( $captionsArrayEntry );
  }
} */

//var $caption = $('.lightbox-image').attr("alt");
//$captionsArray.push($caption);


/*$('.search-input-box').keyup(function() {
	
	// Get content from search input
	var $gallerySearch = $(this).val();
	
	
	// Filter photos to show only those that match search input
	
	$('li').filter(function( index ) {
		return $( '#imageGallery img', this ).attr("alt") != $gallerySearch; 
	}).hide();
	
});*/
/*
$('.search-input-box').keyup(function() {
	
	// Get content from search input
	var $gallerySearch = $(this).val();
	console.log($gallerySearch);
	
	// Filter photos to show only those that match search input
	
	$('li').filter(function( index ) {
		return $( 'img', this ).attr("alt") !== $gallerySearch; 
		
	}).hide();
	
});*/


$('.search-input-box').keyup(function() {
	
	// Get content from search input
	var $gallerySearch = $(this).val();
	//console.log($gallerySearch);
	
	// Filter photos to show only those that match search input
	
	$('li').each(function(index) {
		if ( $( 'img', this ).attr("alt").indexOf($gallerySearch) === -1 ) {
			$(this).hide("slow");
		} else {
			$(this).show();
		}
	});
});





/*$('li').filter(function( index ) {
	
	$('.search-input-box').keyup(function() {
	
	// Get content from search input
	var $gallerySearch = $(this).val();
	
	});
															 
	// Filter photos to show only those that match search input	
		return $( 'img', this ).attr("alt") !== $gallerySearch ; 
	}).hide();*/
	

