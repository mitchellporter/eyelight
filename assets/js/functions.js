$(function() {

  $('#toTop').click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

// Contact Us Overlay
  $('.cta').on('click', function(){
    $('.overlay').addClass('is-open');
  });

  $('.close-btn').on('click', function(){
    $('.overlay').removeClass('is-open');
    $('#signup-success').fadeOut('slow');
  });

// Form submit
  var $form = $('#mc-embedded-subscribe-form');

  $form.validate({
    rules: {
      EMAIL: {
        required: true,
        email: true
      }
    },
    messages: {
      EMAIL: {
        required: "A valid email is required",
        email: "A valid email is required"
      }
    },
    errorPlacement: function(error){
      error.appendTo('#errorMessages');
    },
    submitHandler: function(){
      $.post(document.location.url, $(this).serialize(), function(){
        $('#mc-embedded-subscribe-form')[0].reset();
        $('#signup-success').fadeIn();
      });
    }
  });

});
