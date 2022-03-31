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

  // Observer on header (when it scrolls out of viewport)
  // https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport
  const scrollHelper = document.querySelector('.scroll-helper');
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
  },{
    root: null,
    threshold: 0.1, // set offset 0.1 means trigger if atleast 10% of element in viewport
  })

  // Start Intersection Observer and hide return-top button
  observer.observe(scrollHelper);
  $('.btn-return-top').hide();

  // Button behaviour for return-to-top button visible when header scrolled out of view
  $('.btn-return-top').on("click", function() {
    // Delete error and hide error box
    $(".new-tweet-error").text("");
    $(".new-tweet-error").hide();
    // Open new tweet field
    $('.new-tweet').slideDown('fast');
    // Scroll to top of page
    document.getElementsByTagName('html')[0].scrollIntoView({ behavior: "smooth" })
    // Cursor focus on new tweet text area
    $('#tweet-text').focus();
  });
  // https://stackoverflow.com/questions/1144805/scroll-to-the-top-of-the-page-using-javascript

});

