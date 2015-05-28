+function() {
	$( document ).ready(function() {
    	console.log('main.js');
		$("#menu-toggle").click(function(e) {
        	e.preventDefault();
        	$("#wrapper").toggleClass("toggled");
    	});
	});
}();