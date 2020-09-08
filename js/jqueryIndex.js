$(document).on("pagecreate", "#mainpage", function () {
    $('.ui-flipswitch').on('click', function () {
        valueKnownFlipSwitch = document.getElementById('valueKnownFlipSwitch')
        if (valueKnownFlipSwitch.checked) {
            $('#valueIsKnownBox').hide();
            $('#valueIsUnknownBox').show();
        }
        else {
            $('#valueIsKnownBox').show();
            $('#valueIsUnknownBox').hide();
        };
    });
});