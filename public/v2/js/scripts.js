var APIURL = 'https://api.im90s.org';

$(function() {
  'use strict';

  var wind = $(window);

  // scrollIt
  $.scrollIt({
    upKey: 38, // key code to navigate to the next section
    downKey: 40, // key code to navigate to the previous section
    easing: 'swing', // the easing function for animation
    scrollTime: 600, // how long (in ms) the animation takes
    activeClass: 'active', // class given to the active nav element
    onPageChange: null, // function(pageIndex) that is called when page is changed
    topOffset: -80 // offste (in px) for fixed top navigation
  });

  // navbar scrolling background
  wind.on('scroll', function() {
    var bodyScroll = wind.scrollTop(),
      navbar = $('.navbar'),
      logo = $('.navbar .logo> img');

    if (bodyScroll > 100) {
      navbar.addClass('nav-scroll');
      logo.attr('src', 'img/logo-dark.png');
    } else {
      navbar.removeClass('nav-scroll');
      logo.attr('src', 'img/logo-light.png');
    }
  });

  // progress bar
  wind.on('scroll', function() {
    $('.skills-progress span').each(function() {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      var myVal = $(this).attr('data-value');
      if (bottom_of_window > bottom_of_object) {
        $(this).css({
          width: myVal
        });
      }
    });
  });

  // sections background image from data background
  var pageSection = $('.bg-img, section');
  pageSection.each(function(indx) {
    if ($(this).attr('data-background')) {
      $(this).css(
        'background-image',
        'url(' + $(this).data('background') + ')'
      );
    }
  });

  // === owl-carousel === //

  // Blog owlCarousel

  var feed = new Instafeed({
    get: 'user',
    userId: 248624218,
    accessToken: '',
    sortBy: 'most-liked',
    template:
      '<div class="item"> <div class="post-img"> <img src="{{image}}" alt=""> </div> <div class="content">  <h5><a href="#0"><span><a href="#0">{{model.created_time}}</a></span> <span>/</span> <span><a href="{{link}}"> <em>{{model.likes.count}}</em> </a></span></a></h5> <p>{{caption}}</p> <a href="{{link}}" class="more">Continue Reading<i class="fas fa-angle-right"></i></a> </div> </div>',
    filter: function(data) {
      var date = new Date(data.created_time * 1000),
        m = date.getMonth(),
        d = date.getDate(),
        y = date.getFullYear(),
        month_names = new Array();

      month_names[month_names.length] = 'Jan';
      month_names[month_names.length] = 'Feb';
      month_names[month_names.length] = 'Mar';
      month_names[month_names.length] = 'Apr';
      month_names[month_names.length] = 'May';
      month_names[month_names.length] = 'Jun';
      month_names[month_names.length] = 'Jul';
      month_names[month_names.length] = 'Aug';
      month_names[month_names.length] = 'Sep';
      month_names[month_names.length] = 'Oct';
      month_names[month_names.length] = 'Nov';
      month_names[month_names.length] = 'Dec';

      data.created_time = month_names[m] + ' ' + d + ' ' + y;
      return true;
    },
    target: 'instagram-carousel',
    limit: 9,
    resolution: 'standard_resolution',
    after: function() {
      $('.blog .owl-carousel').owlCarousel({
        loop: true,
        margin: 30,
        mouseDrag: false,
        autoplay: true,
        smartSpeed: 500,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1
          },
          700: {
            items: 2
          },
          1000: {
            items: 3
          }
        }
      });
    }
  });
  feed.run();

  // === End owl-carousel === //

  // magnificPopup
  $('.gallery').magnificPopup({
    delegate: '.popimg',
    type: 'image',
    gallery: {
      enabled: true
    }
  });
});

// === window When Loading === //
$(window).on('load', function() {
  var wind = $(window);

  // Preloader
  $('.loading').fadeOut(500);

  // stellar
  wind.stellar();

  // isotope
  $('.gallery').isotope({
    // options
    itemSelector: '.items'
  });

  var $gallery = $('.gallery').isotope({
    // options
  });

  // filter items on button click
  $('.filtering').on('click', 'span', function() {
    var filterValue = $(this).attr('data-filter');

    $gallery.isotope({ filter: filterValue });
  });

  $('.filtering').on('click', 'span', function() {
    $(this)
      .addClass('active')
      .siblings()
      .removeClass('active');
  });

  // contact form validator

  // var APIURL = 'http://localhost:1314';
  $('#contact-form').validator();

  $.get(APIURL + '/request/reasons', function(res) {
    $.each(res.reasons, function(index, value) {
      $('#form_subject').append(
        $(
          "<option value='" +
            value.reason_id +
            "'>" +
            value.reason +
            '</option>'
        )
      );
    });
  });

  $('#contact-form').on('submit', function(e) {
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

      $.post(APIURL + '/lead/dayrlism/create', {
        name: $('#form_name').val(),
        email: $('#form_email').val(),
        reason_id: $('#form_subject').val(),
        mobile: $('#form_mobile').val(),
        message: $('#form_message').val(),
        sites_id: 6
      })
        .done(function(data) {
          console.log(data);
          var messageAlert = 'alert-success';
          // var messageAlert = 'alert-' + data.type;
          var messageText = data.message;

          var alertBox =
            '<div class="alert ' +
            messageAlert +
            ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
            messageText +
            '</div>';
          if (messageAlert && messageText) {
            $('#contact-form')
              .find('.messages')
              .html(alertBox);
            $('#contact-form')[0].reset();
          }
        })
        .fail(function(err) {
          if (err) {
            alert('Unhandled Error!');
            window.location.reload(true);
          }
        });
      return false;
    }
  });

  $('#dayrlism-phone').on('click', function() {
    window.open(' https://wa.me/60183663236', '_blank');
  });
});

im90sTr('https://api.im90s.org', 6);

// const urlParams = new URLSearchParams(window.location.search);
// const myParam = urlParams.get('halo');

// console.log(urlParams);
// console.log(myParam);
