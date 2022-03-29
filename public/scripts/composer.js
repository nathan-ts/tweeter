$(document).ready(function() {
  $("textarea[name^='text']").on("input", function() {
    // Calculate remaining chars
    const remain = 140 - $(this).val().length;
    // Set text to red if negative; otherwise white
    if (remain < 0) {
      $(this).next().children('output').css("color", "#ff0000");
    } else {
      $(this).next().children('output').css("color", "#ffffff");
    }
    // Push value
    $(this).next().children('output').html(remain);
  })
});

