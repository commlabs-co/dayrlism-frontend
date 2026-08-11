var APIURL = "https://cms.im90s.org";
// var APIURL = 'https://api.im90s.org';
const MAIL_URL = "https://mailer.im90s.org";

$(function () {
  "use strict";

  var wind = $(window);

  // scrollIt
  $.scrollIt({
    upKey: 38, // key code to navigate to the next section
    downKey: 40, // key code to navigate to the previous section
    easing: "swing", // the easing function for animation
    scrollTime: 600, // how long (in ms) the animation takes
    activeClass: "active", // class given to the active nav element
    onPageChange: null, // function(pageIndex) that is called when page is changed
    topOffset: -80, // offste (in px) for fixed top navigation
  });

  // navbar scrolling background
  wind.on("scroll", function () {
    var bodyScroll = wind.scrollTop(),
      navbar = $(".navbar"),
      logo = $(".navbar .logo> img");

    if (bodyScroll > 100) {
      navbar.addClass("nav-scroll");
      logo.attr("src", "img/logo-dark.png");
    } else {
      navbar.removeClass("nav-scroll");
      logo.attr("src", "img/logo-light.png");
    }
  });

  // progress bar
  wind.on("scroll", function () {
    $(".skills-progress span").each(function () {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      var myVal = $(this).attr("data-value");
      if (bottom_of_window > bottom_of_object) {
        $(this).css({
          width: myVal,
        });
      }
    });
  });

  // sections background image from data background
  var pageSection = $(".bg-img, section");
  pageSection.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css(
        "background-image",
        "url(" + $(this).data("background") + ")"
      );
    }
  });

  // === owl-carousel === //

  // Blog owlCarousel

  var feed = new Instafeed({
    get: "user",
    // userId: 248624218,
    accessToken: "",
    sortBy: "most-liked",
    template:
      '<div class="item"> <div class="post-img"> <img src="{{image}}" alt="{{caption}}"> </div> <div class="content">  <h5><a href="#0"><span><a href="#0">{{created_time}}</a></span> <span>/</span> <span><a href="{{link}}"> <em>{{model.likes.count}}</em> </a></span></a></h5> <p>{{caption}}</p> <a href="{{link}}" class="more">Continue Reading<i class="fas fa-angle-right"></i></a> </div> </div>',
    filter: function (data) {
      data.created_time = formatGMTDate(data.timestamp);
      return true;
    },
    target: "instagram-carousel",
    limit: 9,
    resolution: "standard_resolution",
    after: function () {
      $(".blog .owl-carousel").owlCarousel({
        loop: true,
        margin: 30,
        mouseDrag: false,
        autoplay: true,
        smartSpeed: 500,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
          },
          700: {
            items: 2,
          },
          1000: {
            items: 3,
          },
        },
      });
    },
  });
  feed.run();

  // === End owl-carousel === //

  // magnificPopup
  $(".gallery").magnificPopup({
    delegate: ".popimg",
    type: "image",
    gallery: {
      enabled: true,
    },
  });
});

const formatGMTDate = (gmtDate) => {
  // e.g. 27/12/2018, 10:00:00am
  const date = new Date(gmtDate);
  return `${date.toLocaleDateString("en-GB")}, ${date.toLocaleTimeString(
    "en-US"
  )}`;
};

// === window When Loading === //
$(window).on("load", function () {
  var wind = $(window);

  // Preloader
  $(".loading").fadeOut(500);

  // stellar
  wind.stellar();

  // isotope
  $(".gallery").isotope({
    // options
    itemSelector: ".items",
  });

  var $gallery = $(".gallery").isotope({
    // options
  });

  // filter items on button click
  $(".filtering").on("click", "span", function () {
    var filterValue = $(this).attr("data-filter");

    $gallery.isotope({ filter: filterValue });
  });

  $(".filtering").on("click", "span", function () {
    $(this).addClass("active").siblings().removeClass("active");
  });

  // contact form validator

  // var APIURL = 'http://localhost:1314';
  $("#contact-form").validator();

  $.get(APIURL + "/dayrlism-reasons", function (res) {
    $.each(res, function (index, value) {
      $("#form_subject").append(
        $(
          "<option style='text-transform:capitalize' value='" +
            value.id +
            "'>" +
            value.text +
            "</option>"
        )
      );
    });
  });

  $("#contact-form").on("submit", function (e) {
    if (!e.isDefaultPrevented()) {
      // $.ajax({
      //     type: "POST",
      //     url: APIURL + "/lead/create",
      //     data: $(this).serialize(),
      //     success: function (data) {
      //         var messageAlert = 'alert-' + data.type;
      //         var messageText = data.message;

      //         var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
      //         if (messageAlert && messageText) {
      //             $('#contact-form').find('.messages').html(alertBox);
      //             $('#contact-form')[0].reset();
      //         }
      //     }
      // });

      $.post(APIURL + "/dayrlism-leads", {
        name: $("#form_name").val(),
        email: $("#form_email").val(),
        dayrlism_reason: $("#form_subject").val(),
        mobile: $("#form_mobile").val(),
        message: $("#form_message").val(),
      })
        .done(function (data) {
          console.log(data);
          var messageAlert = "alert-success";
          // var messageAlert = 'alert-' + data.type;
          var messageText =
            "Hey thanks for reaching out, will reply you shortly.";

          var alertBox =
            '<div class="alert ' +
            messageAlert +
            ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
            messageText +
            "</div>";
          if (messageAlert && messageText) {
            $("#contact-form").find(".messages").html(alertBox);
            $("#contact-form")[0].reset();
          }

          $.post(MAIL_URL + "/send-mail", {
            host: `https://${window.location.hostname}`,
            provider: "Dayrlism",
            id: data.id,
          });
        })
        .fail(function (err) {
          if (err) {
            alert("Unhandled Error!");
            window.location.reload(true);
          }
        });
      return false;
    }
  });

  $("#dayrlism-phone").on("click", function () {
    window.open(" https://wa.me/60183663236", "_blank");
  });
});

im90sTr("https://api.im90s.org", 11);

// const urlParams = new URLSearchParams(window.location.search);
// const myParam = urlParams.get('halo');

// console.log(urlParams);
// console.log(myParam);
