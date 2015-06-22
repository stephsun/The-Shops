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
            onSuccess: function (data) {
                alert('Success');
            },
            onFail: function (err) {
                alert('fail');
                // console.log(err.responseText);
                var container = $(err.responseText);
                console.log(container);
                // console.log(err);
                // $('#tabledit_alert')
                // .html(err.responseText)
                // .addClass('alert-danger')
                // .toggle(true);
            },
            onAlways: function (data) {
                alert('always');
                // console.log(data);
            },
        });
    });
}();