/* Instructions & Steps

Instructions: Implement the search box at the top of the page that filters photos based on the captions. The photos should filter in real-time as you type. Add animation effects when filtering the gallery of photos.

Step 1. Get the value from the input box

Step 2. Check that value against the photo captions

Step 3: Hide (rather than show I think?) the images whose captions don't match the input value

Step 4: Add animation (maybe using "slow" will work) when filtering

*/

$('.search-input-box').keyup(function() {
	
	// Get content from search input
	var $gallerySearch = $(this).val().toLowerCase();
	//console.log($gallerySearch);
	
	// Filter photos to show only those that match search input
	
	$('li').each(function(index) {
		if ( $( 'img', this ).attr("alt").toLowerCase().indexOf($gallerySearch) === -1 ) {
			$(this).hide("slow");
		} else {
			$(this).show();
		}
	});
});