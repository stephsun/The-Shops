+function() {
    $( document ).ready(function() {
        $("#menu-toggle").click(function(e) {
            e.preventDefault();
            $( "#wrapper" ).toggleClass("toggled");
            $( "#menu-toggle" ).find("span").toggleClass("glyphicon-chevron-right");
        });

        $('#tabledit').Tabledit({
            url: '/admin/edit',
            hideIdentifier: true,
            restoreButton: false,
            columns: {
                identifier: [0, 'id'],
                editable: [[1, 'name'], [2, 'longName'], [3, 'url'], [4, 'rank']]
            },
            onSuccess: function () {
                alert('Success');
            },
            onFail: function (err) {
                alert('fail');
                console.log(err);
            },
            onAlways: function (data) {
                alert('always');
                window.location.reload(true);
            },
        });
    });
}();