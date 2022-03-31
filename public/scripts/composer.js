$(document).ready(function() {
  // Update character counter on new-tweet 
  $("textarea[name^='text']").on("input", function() {
    // Calculate remaining chars
    const remain = 140 - $(this).val().length;
    // Set colour to red if negative; otherwise re-inherit parent colour
    if (remain < 0) {
      $(this).next().children('output').css("color", "#ff0000");
    } else {
      $(this).next().children('output').css("color", $(this).next().css('color'));
    }
    // Push value
    $(this).next().children('output').html(remain);
  })

  // $(window).scroll(
  //   function (event) {
  //     var scrolled_val = window.scrollY;
  //     console.log("Scroll:",scrolled_val);
  //   }
  // );

  // Observer on header (when it scrolls out of viewport)
  const pageHeader = document.querySelector('.page-header')
  const observer = new window.IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) {
      // CODE TO EXECUTE when header scrolls out of view
      $('nav').fadeOut('slow');
      $('.btn-return-top').fadeIn('slow');
      return
    }
    // CODE TO EXECUTE when header enters view
    $('nav').fadeIn('slow');
    $('.btn-return-top').fadeOut('slow');
  }, {
    root: null,
    threshold: 0.05, // set offset 0.1 means trigger if atleast 10% of element in viewport
  })
  // https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport

  // Start Intersection Observer and hide return-top button
  observer.observe(pageHeader);
  $('.btn-return-top').hide();

  // Button behaviour for return-to-top button visible when header scrolled out of view
  $('.btn-return-top').on("click", function() {
    $('.new-tweet').slideDown('fast');
    document.getElementsByTagName('html')[0].scrollIntoView({ behavior: "smooth" })
    $('#tweet-text').focus();
  });
  // https://stackoverflow.com/questions/1144805/scroll-to-the-top-of-the-page-using-javascript

});

