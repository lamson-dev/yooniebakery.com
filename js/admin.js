/* javascript for yoonie bakery site */

var infoFileUrl = "http://www.yooniebakery.com/admin/info.json";
var info = $('#info');

$(document).ready(function () {

    $.getJSON(infoFileUrl,function (json) {

        for (var key in json) {
            if (json.hasOwnProperty(key)) {

                var div = $('<div>');
                var span = $('<div>');
                var input = $('<input>');
                var button = $('<button>');

                div.addClass('input-append');
                span.html(key + ' - ' + json[key].count + ' images');
                input.attr('type', 'text').attr('name', key).attr('value', json[key].count).addClass('input-mini');
                button.attr('type', 'submit').html('<i class="icon-thumbs-up"></i>').addClass('btn');

                div.append(input).append(button);

                info.append(span).append(div);
            }
        }

    }).fail(function () {
            alert("FAIL!");
        });

});