$(function() {

  var $form = $('#mc-embedded-subscribe-form'),
      $inputs = $('.mc-field-group input, .clear input'),
      $formSuccess = $('#signup-success'),
      $overlay = $('.overlay'),
      $modal = $('.modal'),
      $modalContent = $('.modal .container'),
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

  $('#eyelight-logo, #eyelight-text').click(function(){
    $('#blink').addClass('blink').one(animationEnd, function(){
      $(this).removeClass('blink');
    });
  });

  $(window).scroll(function(){
    var wScroll = $(this).scrollTop(),
        $statement = $('main .container p'),
        $statementSpan = $('main .container p span'),
        $hero = $('#hero').height(),
        $heroContent = $('#hero .content'),
        $heroBlur = $('#hero #blur'),
        $winWidth = $(window).width(),
        isMobile = false,
        range = 250;

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      isMobile = true;
    }

    if(wScroll <= $hero){
      var blurVal = ($(this).scrollTop() / 550),
          hOffset = $heroContent.offset().top,
          opacityCalc = 1 - (wScroll - hOffset + range) / range;

      if(blurVal > '1'){
        blurVal = 1;
      }

      if(isMobile === false){
        $heroBlur.css({
          'opacity' : blurVal
        });

        $heroContent.css({
          'opacity' : opacityCalc
        });
      }

      if(isMobile === false){
        if($winWidth >= 815){
          $heroContent.css({
            'transform' : 'translate(0px, '+ wScroll /3.5 +'%)'
          });
        }
        if($winWidth < 815) {
          $heroContent.css({
            'transform' : 'translate(0px, '+ wScroll /4.5 +'%)'
          });
        }
        if($winWidth < 668) {
          $heroContent.css({
            'transform' : 'translate(0px, '+ wScroll /5.4 +'%)'
          });
        }
      }
    }

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

// Contact Us Overlay
  $('.cta').on('click', function(){
    $overlay.addClass('is-open');
    $modal.addClass('bounceInDown').one(animationEnd, function(){
      $(this).removeClass('bounceInDown');
    });
    $modalContent.addClass('bounceInDown2').one(animationEnd, function(){
      $(this).removeClass('bounceInDown2');
    });
  });

  $('.close-btn').on('click', function(){
    $overlay.removeClass('is-open');
    $formSuccess.fadeOut('slow');
    $inputs.fadeIn('slow');
    $('#errorMessage').remove();
    $("input[type='email']").css('border', 'none');
    $modal.addClass('slideOutUp').one(animationEnd, function(){
      $(this).removeClass('slideOutUp');
    });
    $modalContent.addClass('slideOutUp2').one(animationEnd, function(){
      $(this).removeClass('slideOutUp2');
    });
  });

  $form.submit(function(e){
    e.preventDefault();
    if(!isValidEmail($form)){
      $('#errorMessage').remove();
      $('#errors').append("<p id='errorMessage'>A valid email is required.</p>");
      $("input[type='email']").css({'border': '2px solid red', 'border-radius': '5px'});
    } else {
      submitSubscribeForm($form);
    }
  });

  function isValidEmail($form) {
    var email = $form.find("input[type='email']").val();
    if (!email || !email.length) {
        return false;
    } else if (email.indexOf("@") === -1) {
        return false;
    }
    return true;
  }

  function submitSubscribeForm($form) {
    $.ajax({
      type: 'GET',
      url: $form.attr('action'),
      data: $form.serialize(),
      cache: false,
      dataType: 'jsonp',
      jsonp: 'c',
      contentType: 'application/json; charset=utf-8',

      // error: function(error){
      //   console.log(error, ' err err err');
      // },

      success: function(data){
        var resultMessage = data.msg || "Sorry, unable to subscribe. Please try again later.";

        if(data.result !== "success"){
          if(data.msg && data.msg.indexOf('already subscribed') >= 0){
            resultMessage = "Looks like you've already subscribed. Thanks!";
            $('#errorMessage').remove();
            $('#errors').append("<p id='errorMessage'>"+ resultMessage +"</p>");
          }
        } else {
          $form[0].reset();
          $formSuccess.fadeIn();
          $inputs.hide();
        }
      }
    });
  }

});
