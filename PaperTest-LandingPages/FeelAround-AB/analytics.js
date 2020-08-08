$(function () {
  $('#brand').on('click', function () {
    gtag('event', 'brand-click');
    console.log('brand');
  });
  $('#description').on('click', function () {
    gtag('event', 'description-click');
    console.log('description');
  });
  $('#flyer').on('click', function () {
    gtag('event', 'flyer-click');
    console.log('flyer');
  });
  $('.apple-badge-link').on('click', function () {
    gtag('event', 'apple-badge-click');
    console.log('apple');
    $('.subscribe-modal').modal();
  });
  $('.google-badge-link').on('click', function () {
    gtag('event', 'google-badge-click');
    console.log('google');
    $('.subscribe-modal').modal();
  });
  $('#mc-embedded-subscribe').on('click', function () {
    gtag('event', 'submit-click');
    console.log('submit');
  });

  $('#twitter-link').on('click', function () {
    gtag('event', 'twitter-click');
    console.log('twitter');
  });
  $('#instagram-link').on('click', function () {
    gtag('event', 'instagram-click');
    console.log('instagram');
  });
});
