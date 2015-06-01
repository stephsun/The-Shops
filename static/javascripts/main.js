+function() {
    $( document ).ready(function() {
        $("#menu-toggle").click(function(e) {
            e.preventDefault();
            $( "#wrapper" ).toggleClass("toggled");
            $( "#menu-toggle" ).find("span").toggleClass("glyphicon-menu-right");
        });
    });
}();