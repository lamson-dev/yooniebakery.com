/* javascript for yoonie bakery site */

var numImgs = 0;
var infoFileUrl = "http://www.yooniebakery.com/admin/info.json";
var rootUrl = "https://googledrive.com/host/0B3WChHj3XJ_GM1JQZzgyUkpTY28/";
var rootImgUrl = '';
var rootThumbUrl = '';

$(document).ready(function () {
    $('input, textarea').bind('focus', function () {
        $(this).addClass('focused');
    });
    $('input, textarea').bind('blur', function () {
        $(this).removeClass('focused');
    });

//    set up lightboxes
//    $('a.lbox, a.cbox').lightBox();


//    infoFileUrl = document.URL + "info.txt";

    var chop = "http://www.yooniebakery.com/";
    var current = document.URL.replace(chop, "");

    rootImgUrl = rootUrl + current;
    rootThumbUrl = rootImgUrl + "thumbnails/";

    $.getJSON(infoFileUrl,function (json) {

        for (var key in json) {
            if ((key+'/') == current) {
                numImgs = json[key].count;
                addImages();
                addEffects();
                break;
            }
        }

    }).fail(function () {
            alert("FAIL!");
        });

});

function addImages() {
    var main = $('#gallery');
    var imgTag = $('<img>');
    var aTag = $('<a>');
    for (var i = numImgs; i >= 1; i--) {
        var a = aTag.clone();
        var img = imgTag.clone();

        a.addClass("fancybox");
        a.addClass("gallery-image cbox");

        if (i % 3 == 0)
            a.addClass("third");

        a.attr("href", rootImgUrl + "img" + i + ".jpg");
        a.attr("rel", "lightbox");

        img.attr("src", rootThumbUrl + "img" + i + ".jpg");
        a.append(img);

        main.append(a);
    }
}

function addEffects() {

    /* 	apply fancybox for all images */
    /* 	$("a[href$='.jpg'],a[href$='.png'],a[href$='.gif']").attr('rel', 'gallery').fancybox(); */
    $(".fancybox").fancybox({
        openEffect: 'elastic',
        closeEffect: 'fade',
        /* 		prevEffect : 'fade', */
        /* 		nextEffect : 'fade', */
        arrows: false,
        nextClick: true,
        helpers: {
            title: {
                type: 'outside'
            },
            thumbs: {
                width: 50,
                height: 50
            }
        }
    });

    /* 	$('.fancybox').fancybox(); */
    /*
     *  Different effects
     */
    // Change title type, overlay closing speed
    $(".fancybox-effects-a").fancybox({
        helpers: {
            title: {
                type: 'outside'
            },
            overlay: {
                speedOut: 0
            }
        }
    });

    // Disable opening and closing animations, change title type
    $(".fancybox-effects-b").fancybox({
        openEffect: 'none',
        closeEffect: 'none',

        helpers: {
            title: {
                type: 'over'
            }
        }
    });

    // Set custom style, close if clicked, change title type and overlay color
    $(".fancybox-effects-c").fancybox({
        wrapCSS: 'fancybox-custom',
        closeClick: true,

        openEffect: 'none',

        helpers: {
            title: {
                type: 'inside'
            },
            overlay: {
                css: {
                    'background': 'rgba(238,238,238,0.85)'
                }
            }
        }
    });

    // Remove padding, set opening and closing animations, close if clicked and disable overlay
    $(".fancybox-effects-d").fancybox({
        padding: 0,

        openEffect: 'elastic',
        openSpeed: 150,

        closeEffect: 'elastic',
        closeSpeed: 150,

        closeClick: true,

        helpers: {
            overlay: null
        }
    });

    /*
     *  Button helper. Disable animations, hide close button, change title type and content
     */

    $('.fancybox-buttons').fancybox({
        openEffect: 'none',
        closeEffect: 'none',

        prevEffect: 'none',
        nextEffect: 'none',

        closeBtn: false,

        helpers: {
            title: {
                type: 'inside'
            },
            buttons: {}
        },

        afterLoad: function () {
            this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
        }
    });


    /*
     *  Thumbnail helper. Disable animations, hide close button, arrows and slide to next gallery item if clicked
     */

    $('.fancybox-thumbs').fancybox({
        prevEffect: 'none',
        nextEffect: 'none',

        closeBtn: false,
        arrows: false,
        nextClick: true,

        helpers: {
            thumbs: {
                width: 50,
                height: 50
            }
        }
    });

    /*
     *  Media helper. Group items, disable animations, hide arrows, enable media and button helpers.
     */
    $('.fancybox-media')
        .attr('rel', 'media-gallery')
        .fancybox({
            openEffect: 'none',
            closeEffect: 'none',
            prevEffect: 'none',
            nextEffect: 'none',

            arrows: false,
            helpers: {
                media: {},
                buttons: {}
            }
        });

    /*
     *  Open manually
     */

    $("#fancybox-manual-a").click(function () {
        $.fancybox.open('1_b.jpg');
    });

    $("#fancybox-manual-b").click(function () {
        $.fancybox.open({
            href: 'iframe.html',
            type: 'iframe',
            padding: 5
        });
    });

    $("#fancybox-manual-c").click(function () {
        $.fancybox.open([
            {
                href: '1_b.jpg',
                title: 'My title'
            },
            {
                href: '2_b.jpg',
                title: '2nd title'
            },
            {
                href: '3_b.jpg'
            }
        ], {
            helpers: {
                thumbs: {
                    width: 75,
                    height: 50
                }
            }
        });
    });

}

