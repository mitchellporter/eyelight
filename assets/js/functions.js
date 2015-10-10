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

  $(window).scroll(function(){
    var wScroll = $(this).scrollTop(),
        $statement = $('main .container p'),
        $statementSpan = $('main .container p span');

    if(wScroll > $statement.offset().top - ($(window).height() / 1.25)){
      $statement.animate({'opacity':'1'}, 500);
      $statementSpan.each(function(i){
        setTimeout(function(){
          $statementSpan.eq(i).css({'opacity':'1', 'transition':'all 600ms ease-in-out'});
        }, (2250 * (Math.exp(i * 0.25))) - 1700);
      });
    }

    if(wScroll > $('.platform').offset().top - ($(window).height() / 1.25)){
      $('#phone').addClass('shadow-pulse');
      $('#watch').addClass('shadow-pulse-delay');
    }

  });

  $('#mobileContent img.bounceInUp').on(animationEnd, function(){
    $(this).addClass('flip');
  });

  $('.dot').click(function(){
    $(this).toggleClass('activeHighlight');
  });

  $('#pinkDot').click(function(){
    $('#pinkPath').toggleClass('activePath');
    $('#pinkFAQ').toggleClass('activeFAQ');
  });

  $('#greenDot').click(function(){
    $('#greenPath').toggleClass('activePath');
    $('#greenFAQ').toggleClass('activeFAQ');
  });

  $('#cyanDot').click(function(){
    $('#cyanPath').toggleClass('activePath');
    $('#cyanFAQ').toggleClass('activeFAQ');
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
        required: "* A valid email is required",
        email: "* A valid email is required"
      }
    },
    errorPlacement: function(error){
      error.appendTo('#errorMessages').addClass('flash');
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
