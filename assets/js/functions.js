$(function() {

  var $form = $('#mc-embedded-subscribe-form'),
      $inputs = $('.mc-field-group input, .clear input'),
      $formSuccess = $('#signup-success'),
      $overlay = $('.overlay'),
      animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

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

  $('#eyelight-logo').click(function(){
    $('#blink').addClass('blink').one(animationEnd, function(){
      $(this).removeClass('blink');
    });
  });

// Contact Us Overlay
  $('.cta').on('click', function(){
    $overlay.addClass('is-open');
  });

  $('.close-btn').on('click', function(){
    $overlay.removeClass('is-open');
    $formSuccess.fadeOut('slow');
    $inputs.fadeIn('slow');
  });

// Form submit
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
        $form[0].reset();
        $formSuccess.fadeIn();
        $inputs.hide();
      });
    }
  });

});
