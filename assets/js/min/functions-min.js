$(function(){var e=$("#mc-embedded-subscribe-form"),i=$(".mc-field-group input, .clear input"),a=$("#signup-success"),n=$(".overlay");$("#toTop").click(function(){if(location.pathname.replace(/^\//,"")===this.pathname.replace(/^\//,"")&&location.hostname===this.hostname){var e=$(this.hash);if(e=e.length?e:$("[name="+this.hash.slice(1)+"]"),e.length)return $("html,body").animate({scrollTop:e.offset().top},1e3),!1}}),$(".cta").on("click",function(){n.addClass("is-open")}),$(".close-btn").on("click",function(){n.removeClass("is-open"),a.fadeOut("slow"),i.fadeIn("slow")}),e.validate({rules:{EMAIL:{required:!0,email:!0}},messages:{EMAIL:{required:"A valid email is required",email:"A valid email is required"}},errorPlacement:function(e){e.appendTo("#errorMessages")},submitHandler:function(){$.post(document.location.url,$(this).serialize(),function(){e[0].reset(),a.fadeIn(),i.hide()})}})});