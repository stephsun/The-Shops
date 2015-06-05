+function() {
    $( document ).ready(function() {
        $("#menu-toggle").click(function(e) {
            e.preventDefault();
            $( "#wrapper" ).toggleClass("toggled");
            $( "#menu-toggle" ).find("span").toggleClass("glyphicon-chevron-right");
        });

        $(".brand-delete").click(function (e) {
            e.preventDefault();
            var that = this;
            var url = $(this).closest('td').prev('td').text();
            var data = { url: url };
            $.ajax({
                url: '/admin',
                data: data,
                type: 'DELETE',
                success: function(result) {
                    if (result === true)
                        $(that).closest('tr').remove();
                }
            });
        })
    });
}();