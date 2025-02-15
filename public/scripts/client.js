/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */

$( document ).ready(function() {
  // Hide error box on load
  $(".new-tweet-error").hide();

  // Use timeago.yarp.com function to parse time
  jQuery("time.timeago").timeago(); 
  jQuery.timeago.settings.allowFuture = false;
  
  // Set up function to render all tweets from GET
  const renderTweets = function(tweets) {
    $('.posts').empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.posts').prepend($tweet); 
    }
  }

  // Sanitize text submitted by user
  const sanitize = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Generate HTML for a tweet object
  const createTweetElement = function(tweet) {
    const time = new Date(tweet.created_at);
    const markup = `
    <article class="tweet">
      <header>
        <div class="pic-name">
          <img src="${sanitize(tweet.user.avatars)}">
          <h4 class="display-name">${sanitize(tweet.user.name)}</h4>
        </div>
        <h4 class="handle">${sanitize(tweet.user.handle)}</h4>
      </header>
      <section class="tweet-content">
        <p>${sanitize(tweet.content.text)}</p>
      </section>
      <footer>
        <a><time>${jQuery.timeago(new Date(tweet.created_at))}</time></a>
        <section class="footer-icons">
          <a class="fa-solid fa-flag"></a>
          <a class="fa-solid fa-retweet"></a>
          <a class="fa-solid fa-heart"></a>
        </section>
      </footer>
    </article>`;
    return markup;
  };
  
  // Custom submit behaviour (POST) for new-tweet-form
  $('#new-tweet-form').submit(function( event ) {
    // Block default behaviour of reloading page
    event.preventDefault(); 
    // Get tweet text from form
    const tweetText = $(this).children('#tweet-text')[0].value;
    $(".new-tweet-error").text("");
    $(".new-tweet-error").slideUp('fast'); // hide error message on submit, and show if required

    // Data validation of tweet (not empty OR <= 140 chars)
    if (tweetText.length > 140) {
      const err = `Error: tweet length is ${tweetText.length} — exceeds max of 140 chars.`;
      $(".new-tweet-error").text(err);
      $(".new-tweet-error").slideDown('fast');
      return;
    } else if (tweetText.length <= 0) {
      const err = "Error: tweet message is empty.";
      $(".new-tweet-error").text(err);
      $(".new-tweet-error").slideDown('fast');
      return;
    } 

    // Submit our own POST to the server
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $( '#new-tweet-form' ).serialize(),
      success: loadTweets
    });
  });

  // GET method to retrieve tweet database from server
  const loadTweets = function() {
    cleanNewTweet();
    $.ajax('/tweets', { method: 'GET' })
    .then(function (tweetdb) {
      // console.log('Success: ', tweetdb); // debug console.log
      renderTweets(tweetdb);
    });
  }

  // Helper function to reset new-tweet box
  const cleanNewTweet = function() {
    // Hide new-tweet box (reveals through nav-bar button)
    $('.new-tweet').hide();
    // Delete error and hide error box
    $(".new-tweet-error").text("");
    $(".new-tweet-error").hide();
    // Remove any text in the submission field
    $('#tweet-text').val('');
    // Reset counter to 140
    $('.counter').text("140");
  }

  loadTweets(); // loads tweets on page load

  // Button behaviour for new tweet in nav-bar
  $('.new-link').on("click", function() {
    // Delete error and hide error box
    $(".new-tweet-error").text("");
    $(".new-tweet-error").hide();
    // Toggle new-tweet compose area
    $('.new-tweet').slideToggle('fast');
    $('#tweet-text').focus(); // Put cursor on text box
  });

});

