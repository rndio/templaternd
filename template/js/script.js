// Loading Animation
$(document).ready(function () {
    $(".preloader").fadeOut();
});

// Scroll To Top
$(".RNDToUp").click(function () {
    $("html, body").animate({
        scrollTop: 0
    }, "slow");
});

// Scroll To Top Button
$(window).on("scroll", function () {
    const scrollPos = $(window).scrollTop();
    if (scrollPos < 30) {
        $(".RNDToUp").fadeOut();
    } else {
        $(".RNDToUp").fadeIn();
    }
});