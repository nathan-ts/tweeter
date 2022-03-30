$(document).ready(function() {
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
});

