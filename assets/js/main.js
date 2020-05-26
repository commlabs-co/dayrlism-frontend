var APIURL = "https://cms.im90s.org";
const MAIL_URL = "https://mailer.im90s.org";
// var APIURL = 'https://api.im90s.org';

const service = [
  {
    title: "Developments",
    des: `I develop products from a proper planning, and ensure it's
                delivery is up to the standard.`,
  },
  {
    title: "Web Design",
    des: `Requirement is always the key of the projects, gathering
                information from the client and understand their prospect, is
                what i care the most.`,
  },
  {
    title: "Consultation & Solution",
    des: `Providing consulation to ensure both way have clear messages
                delivered and work out the best solution improve the outcome.`,
  },
  {
    title: "Delivery",
    des: `A 100% of delivery is always my goal, to ensure both party
                acheive a win win situation, and yet my requirement is strict, I
                wouldn't take job that I can't promise.`,
  },
  {
    title: "Fully Responsive",
    des: `My solution is been following closely with the trending
                technology, and yet to developed a maintainable and sustainable
                workmanship.`,
  },
  {
    title: "Trusted Support",
    des: `I provide free consulation to my client to ensure it wouldn't
                have any error along the journey.`,
  },
];

service.map(({ title, des }, index) => {
  $("#drl-services").append(
    $(`
    <div class="col-lg-4 col-md-6 text-center">
        <div class="port_services_box_wrapper">
            <div class="port_services_box">
                <img src="assets/images/services/port_services0${
                  index + 1
                }.png" alt="service-image">
                <h2 class="project_heading">${title}</h2>
                <p class="project_pera">${des}</p>
            </div>
        </div>
    </div>
`)
  );
});
//<div class="item"> <div class="post-img"> <img src="{{image}}" alt="{{caption}}"> </div> <div class="content">  <h5><a href="#0"><span><a href="#0">{{model.created_time}}</a></span> <span>/</span> <span><a href="{{link}}"> <em>{{model.likes.count}}</em> </a></span></a></h5> <p>{{caption}}</p> <a href="{{link}}" class="more">Continue Reading<i class="fas fa-angle-right"></i></a> </div> </div>
// var feed = new Instafeed({
//   get: "user",
//   userId: 248624218,
//   accessToken: "248624218.a3a0a43.1e2a725cc2144f778281179f3714841f",
//   sortBy: "most-liked",
//   template: `

//     <div class="swiper-slide">
//         <div class="port_testimonial_box">
//             <div class="testimonial_top_box">
//                 <div class="testimonial_img">
//                     <img src="{{image}}"
//                         alt={{caption}} class="img-fluid" />
//                 </div>
//                 <div class="testimonial_icon">
//                     <a class="video" rel="external"
//                         href="https://www.youtube.com/embed/fpQcEiwxzQE"
//                         title="Play"><svg xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 191.255 191.255">
//                             <path
//                                 d="M162.929,66.612c-2.814-1.754-6.514-0.896-8.267,1.917s-0.895,6.513,1.917,8.266c6.544,4.081,10.45,11.121,10.45,18.833
//                                 s-3.906,14.752-10.45,18.833l-98.417,61.365c-6.943,4.329-15.359,4.542-22.512,0.573c-7.154-3.97-11.425-11.225-11.425-19.406
//                                 V34.262c0-8.181,4.271-15.436,11.425-19.406c7.153-3.969,15.569-3.756,22.512,0.573l57.292,35.723
//                                 c2.813,1.752,6.513,0.895,8.267-1.917c1.753-2.812,0.895-6.513-1.917-8.266L64.512,5.247c-10.696-6.669-23.661-7-34.685-0.883
//                                 C18.806,10.48,12.226,21.657,12.226,34.262v122.73c0,12.605,6.58,23.782,17.602,29.898c5.25,2.913,10.939,4.364,16.616,4.364
//                                 c6.241,0,12.467-1.754,18.068-5.247l98.417-61.365c10.082-6.287,16.101-17.133,16.101-29.015S173.011,72.899,162.929,66.612z" />
//                         </svg></a>

//                     <div class="btn-wave"></div>
//                 </div>
//             </div>

//             <div class="testimonial_details_box">
//                 <p>{{caption}}</p>
//                 <h3>Charles David</h3>
//                 <h4>PHP Developer</h4>
//                 <div class="port_testi_quote">
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
//                         width="512px" height="512px" class="">
//                         <g id="right_x5F_quote_x5F_alt">
//                             <g>
//                                 <polygon points="0,4 0,28 12,16 12,4    "
//                                     data-original="#030104" class="active-path"
//                                     data-old_color="#f4f4f4" fill="#f4f4f4" />
//                                 <polygon points="20,4 20,28 32,16 32,4    "
//                                     data-original="#030104" class="active-path"
//                                     data-old_color="#f4f4f4" fill="#f4f4f4" />
//                             </g>
//                         </g>
//                     </svg>
//                 </div>
//             </div>
//         </div>
//     </div>

//     `,
//   filter: function (data) {
//     var date = new Date(data.created_time * 1000),
//       m = date.getMonth(),
//       d = date.getDate(),
//       y = date.getFullYear(),
//       month_names = new Array();

//     month_names[month_names.length] = "Jan";
//     month_names[month_names.length] = "Feb";
//     month_names[month_names.length] = "Mar";
//     month_names[month_names.length] = "Apr";
//     month_names[month_names.length] = "May";
//     month_names[month_names.length] = "Jun";
//     month_names[month_names.length] = "Jul";
//     month_names[month_names.length] = "Aug";
//     month_names[month_names.length] = "Sep";
//     month_names[month_names.length] = "Oct";
//     month_names[month_names.length] = "Nov";
//     month_names[month_names.length] = "Dec";

//     data.created_time = month_names[m] + " " + d + " " + y;
//     return true;
//   },
//   target: "drl-ig",
//   limit: 9,
//   resolution: "standard_resolution",
//   after: function () {
//     // $(".blog .owl-carousel").owlCarousel({
//     //   loop: true,
//     //   margin: 30,
//     //   mouseDrag: false,
//     //   autoplay: true,
//     //   smartSpeed: 500,
//     //   responsiveClass: true,
//     //   responsive: {
//     //     0: {
//     //       items: 1,
//     //     },
//     //     700: {
//     //       items: 2,
//     //     },
//     //     1000: {
//     //       items: 3,
//     //     },
//     //   },
//     // });
//   },
// });
// feed.run();
