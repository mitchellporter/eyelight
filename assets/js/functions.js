$(function() {

  var $form = $('#mc-embedded-subscribe-form'),
      $inputs = $('.mc-field-group input, .clear input'),
      $formSuccess = $('#signup-success'),
      $overlay = $('.overlay'),
      $modal = $('.modal'),
      animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
      $pDot = $('#pinkDot'),
      $pPath = $('#pinkPath'),
      $pFAQ = $('#pinkFAQ'),
      $cDot = $('#cyanDot'),
      $cPath = $('#cyanPath'),
      $cFAQ = $('#cyanFAQ'),
      $gDot = $('#greenDot'),
      $gPath = $('#greenPath'),
      $gFAQ = $('#greenFAQ');

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

    if(wScroll > $('.app-highlights').offset().top - ($(window).height() / 2)){
      $pDot.addClass('pulse-pink');
      $pPath.addClass('activePath');
      $pFAQ.addClass('activeFAQ');

      setTimeout(function(){
        $cDot.addClass('pulse-cyan');
        $cPath.addClass('activePath');
        $cFAQ.addClass('activeFAQ');
      }, 500);

      setTimeout(function(){
        $gDot.addClass('pulse-green');
        $gPath.addClass('activePath');
        $gFAQ.addClass('activeFAQ');
      }, 1000);
    }

    if(wScroll > $('.platform').offset().top - ($(window).height() / 1.25)){
      $('#phone').addClass('shadow-pulse');
      $('#watch').addClass('shadow-pulse-delay');
    }

  });

  $('#mobileContent img.bounceInUp').on(animationEnd, function(){
    $(this).addClass('flip');
  });

  $pDot.click(function(){
    $(this).toggleClass('pulse-pink');
    $pPath.toggleClass('activePath');
    $pFAQ.toggleClass('activeFAQ');
  });

  $gDot.click(function(){
    $(this).toggleClass('pulse-green');
    $gPath.toggleClass('activePath');
    $gFAQ.toggleClass('activeFAQ');
  });

  $cDot.click(function(){
    $(this).toggleClass('pulse-cyan');
    $cPath.toggleClass('activePath');
    $cFAQ.toggleClass('activeFAQ');
  });

// Contact Us Overlay
  $('.cta').on('click', function(){
    $overlay.addClass('is-open');
    $modal.addClass('bounceInDown').one(animationEnd, function(){
      $(this).removeClass('bounceInDown');
    });
  });

  $('.close-btn').on('click', function(){
    $overlay.removeClass('is-open');
    $formSuccess.fadeOut('slow');
    $inputs.fadeIn('slow');
    $modal.addClass('slideOutUp').one(animationEnd, function(){
      $(this).removeClass('slideOutUp');
    });
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
