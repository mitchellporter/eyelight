$(function(){var e=$("#mc-embedded-subscribe-form"),i=$(".mc-field-group input, .clear input"),n=$("#signup-success"),t=$(".overlay"),a=$(".modal"),o="webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";$("#toTop").click(function(){if(location.pathname.replace(/^\//,"")===this.pathname.replace(/^\//,"")&&location.hostname===this.hostname){var e=$(this.hash);if(e=e.length?e:$("[name="+this.hash.slice(1)+"]"),e.length)return $("html,body").animate({scrollTop:e.offset().top},1e3),!1}}),$("#eyelight-logo").click(function(){$("#blink").addClass("blink").one(o,function(){$(this).removeClass("blink")})}),$(window).scroll(function(){var e=$(this).scrollTop(),i=$("main .container p"),n=$("main .container p span");e>i.offset().top-$(window).height()/1.25&&(i.animate({opacity:"1"},500),n.each(function(e){setTimeout(function(){n.eq(e).css({opacity:"1",transition:"all 600ms ease-in-out"})},2250*Math.exp(.25*e)-1700)})),e>$(".app-highlights").offset().top-$(window).height()/1.33&&$("#hint").addClass("fadeInUp"),e>$(".platform").offset().top-$(window).height()/1.25&&($("#phone").addClass("shadow-pulse"),$("#watch").addClass("shadow-pulse-delay"))}),$("#mobileContent img.bounceInUp").on(o,function(){$(this).addClass("flip")}),$(".dot").click(function(){$(this).toggleClass("activeHighlight"),$("p#hint").addClass("hide")}),$("#pinkDot").click(function(){$("#pinkPath").toggleClass("activePath"),$("#pinkFAQ").toggleClass("activeFAQ")}),$("#greenDot").click(function(){$("#greenPath").toggleClass("activePath"),$("#greenFAQ").toggleClass("activeFAQ")}),$("#cyanDot").click(function(){$("#cyanPath").toggleClass("activePath"),$("#cyanFAQ").toggleClass("activeFAQ")}),$(".cta").on("click",function(){t.addClass("is-open"),a.addClass("bounceInDown").one(o,function(){$(this).removeClass("bounceInDown")})}),$(".close-btn").on("click",function(){t.removeClass("is-open"),n.fadeOut("slow"),i.fadeIn("slow"),a.addClass("slideOutUp").one(o,function(){$(this).removeClass("slideOutUp")})}),e.validate({rules:{EMAIL:{required:!0,email:!0}},messages:{EMAIL:{required:"* A valid email is required",email:"* A valid email is required"}},errorPlacement:function(e){e.appendTo("#errorMessages").addClass("flash")},submitHandler:function(){$.post(document.location.url,$(this).serialize(),function(){e[0].reset(),n.fadeIn(),i.hide()})}})});