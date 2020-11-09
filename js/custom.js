/*Copyright (c) 2017 Himanshu Softtech.
------------------------------------------------------------------
[Master Stylesheet]

Project:  Damage Restoration
Version:  1.0.0
Assigned to:  ---
-------------------------------------------------------------------*/

$(document).ready(function (){
  // Declare Carousel jquery object
  var owl = $('.dr_slider_wrapper .owl-carousel');

  // Carousel initialization
  owl.owlCarousel({
      loop:true,
      margin:0,
      navSpeed:1000,
      autoplay:true,
      nav:false,
      dots:false,
      navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>' ],
      items:1
  });


  // add animate.css class(es) to the elements to be animated
  function setAnimation ( _elem, _InOut ) {
    // Store all animationend event name in a string.
    // cf animate.css documentation
    var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

    _elem.each ( function () {
      var $elem = $(this);
      var $animationType = 'animated ' + $elem.data( 'animation-' + _InOut );

      $elem.addClass($animationType).one(animationEndEvent, function () {
        $elem.removeClass($animationType); // remove animate.css Class at the end of the animations
      });
    });
  }

// Fired before current slide change
  owl.on('change.owl.carousel', function(event) {
      var $currentItem = $('.owl-item', owl).eq(event.item.index);
      var $elemsToanim = $currentItem.find("[data-animation-out]");
      setAnimation ($elemsToanim, 'out');
  });

// Fired after current slide has been changed
  owl.on('changed.owl.carousel', function(event) {

      var $currentItem = $('.owl-item', owl).eq(event.item.index);
      var $elemsToanim = $currentItem.find("[data-animation-in]");
      setAnimation ($elemsToanim, 'in');
  })


  // magnific popup
          $('.popup-gallery').magnificPopup({
          delegate: 'a',
          type: 'image',
          tLoading: 'Loading image #%curr%...',
          mainClass: 'mfp-img-mobile',
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
          },
          image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function(item) {
              return item.el.attr('title') + '<small></small>';
            }
          }
        }); 

// owl carousel 2
$('.dr_teastimonial_slider .owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    dots: true,
    navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>' ],
    autoplay:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:2
        }
    }
});


// owl carousel 3
$('.dr_blog_recent_post .owl-carousel').owlCarousel({
    loop:true,
    margin:0,
    autoplay:true,
    nav:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
});

// owl carousel 4
$('.dr_about_img .owl-carousel').owlCarousel({
    loop:true,
    autoplay:true,
    margin:0,
    nav:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1 
        }
    }
})



// ajax
  $("#submit").click(function(){
      var fname = $('#uname').val();
      var phone = $('#phone').val();
      var email = $('#email').val();
      var choice = $('#choice').val();
      var message = $('#message').val();
      var letters = /^[A-Za-z]+$/;
      var number = /^[0-9]+$/;
      var mail_letters = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


      
     
      if (fname != "" && phone != "" && email != ""  && choice != ""  && message != "") {
          if(fname.match(letters)) { 
              if(phone.match(number) && phone.length <= 10) {
                  if(email.match(mail_letters)){
                      $.ajax({
                      method : 'post',
                      url : 'ajax.php',
                      data :  {'first_name' : fname ,
                                'phone_number' : phone,
                                'email' : email,
                                'message' : message,
                                'choice' : choice,
                                },
                     }).done(function(resp){
                         if( resp == 1){
                              document.getElementById("error").style.color = "green";
                             document.getElementById("error").innerHTML = "Mail Send Successfully";
                              $('#uname').val('');
                             $('#phone').val('');
                             $('#email').val('');
                             $('#choice').val();
                             $('#message').val('');
                         }else{
                              document.getElementById("error").style.color = "red";
                              document.getElementById("error").innerHTML = "Mail not Send";
                         }
                     console.log(resp); });
                
                  }else{
                      document.getElementById("error").style.color = "red";
                      document.getElementById("error").innerHTML = "Please Fill The  Correct Mail Id";
                  }
              }else{
                  document.getElementById("error").style.color = "red";
                  document.getElementById("error").innerHTML = "Please Fill The  Correct Number";
              }
          }else
          {   document.getElementById("error").style.color = "red";
              document.getElementById("error").innerHTML = "Please Fill The Correct Name";
          }   
      }else{
          document.getElementById("error").style.color = "red";
          document.getElementById("error").innerHTML = "Please Fill All Detail";
      }
  });



      // Menu js for Position fixed
    $(window).scroll(function(){
      var window_top = $(window).scrollTop() + 2; 
        if (window_top > 500) {
          $('.dr_navigation_wrapper').addClass('menu_fixed animated fadeInDown');
        } else {
          $('.dr_navigation_wrapper').removeClass('menu_fixed animated fadeInDown');
        }
    });


// Single page scroll menu
  var pluginName = 'ScrollIt',
    pluginVersion = '1.0.3';

  /*
   * OPTIONS
   */
  var defaults = {
    upKey: 38,
    downKey: 40,
    easing: 'linear',
    scrollTime: 600,
    activeClass: 'active',
    onPageChange: null,
    topOffset : -70
  };

  $.scrollIt = function(options) {

    /*
     * DECLARATIONS
     */
    var settings = $.extend(defaults, options),
      active = 0,
      lastIndex = $('[data-scroll-index]:last').attr('data-scroll-index');

    /*
     * METHODS
     */

    /**
     * navigate
     *
     * sets up navigation animation
     */
    var navigate = function(ndx) {
      if(ndx < 0 || ndx > lastIndex){ return; }

      var targetTop = $('[data-scroll-index=' + ndx + ']').offset().top + settings.topOffset + 1;
      $('html,body').animate({
        scrollTop: targetTop,
        easing: settings.easing
      }, settings.scrollTime);
    };

    /**
     * doScroll
     *
     * runs navigation() when criteria are met
     */
    var doScroll = function (e) {
      var target = $(e.target).closest("[href]").attr('href') ||
      $(e.target).closest("[data-scroll-goto]").attr('data-scroll-goto');
      navigate(parseInt(target,10));
    };

    /**
     * keyNavigation
     *
     * sets up keyboard navigation behavior
     */
    var keyNavigation = function (e) {
      var key = e.which;
      if($('html,body').is(':animated') && (key == settings.upKey || key == settings.downKey)) {
        return false;
      }
      if(key == settings.upKey && active > 0) {
        navigate(parseInt(active,10) - 1);
        return false;
      } else if(key == settings.downKey && active < lastIndex) {
        navigate(parseInt(active,10) + 1);
        return false;
      }
      return true;
    };

    /**
     * updateActive
     *
     * sets the currently active item
     */
    var updateActive = function(ndx) {
      if(settings.onPageChange && ndx && (active != ndx)) {settings.onPageChange(ndx); }

      active = ndx;
      $('[href]').removeClass(settings.activeClass);
      $('[href=' + ndx + ']').addClass(settings.activeClass);
    };

    /**
     * watchActive
     *
     * watches currently active item and updates accordingly
     */
    var watchActive = function() {
      var winTop = $(window).scrollTop();

      var visible = $('[data-scroll-index]').filter(function(ndx, div) {
        return winTop >= $(div).offset().top + settings.topOffset &&
        winTop < $(div).offset().top + (settings.topOffset) + $(div).outerHeight();
      });
      var newActive = visible.first().attr('data-scroll-index');
      updateActive(newActive);
    };

    /*
     * runs methods
     */
    $(window).on('scroll',watchActive).scroll();

    $(window).on('keydown', keyNavigation);

    $('.dr_single_page_menu').on('click','[href], [data-scroll-goto]', function(e){
      e.preventDefault();
      doScroll(e);
    });

  };



});