/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
/*
const tweetData = [
  {
  "user": {
    "name": "Mitsuha",
    "avatars": "/images/profile-hex-mitsuha.png",
      "handle": "@notTakiKun"
    },
  "content": {
      "text": "If we see each other, we'll know. That you were the one who was inside me. That I was the one who was inside you."
    },
  "created_at": 1648667050000
  }, 
  {
  "user": {
    "name": "Mitsuha",
    "avatars": "/images/profile-hex-mitsuha.png",
      "handle": "@notTakiKun"
    },
  "content": {
      "text": "I want to graduate and go to Tokyo!"
    },
  "created_at": 1648487203000
  }, 
  {
  "user": {
    "name": "Mitsuha",
    "avatars": "/images/profile-hex-mitsuha.png",
      "handle": "@notTakiKun"
    },
  "content": {
      "text": "This feeling has possessed me, I think, from that day..."
    },
  "created_at": 1647450403000
  }, 
  {
  "user": {
    "name": "Mitsuha",
    "avatars": "/images/profile-hex-mitsuha.png",
      "handle": "@notTakiKun"
    },
  "content": {
      "text": "But... the sensation that I've lost something lingers for a long time after I wake up."
    },
  "created_at": 1646759203000
  }, 
  {
  "user": {
    "name": "Mitsuha",
    "avatars": "/images/profile-hex-mitsuha.png",
      "handle": "@notTakiKun"
    },
  "content": {
      "text": "The only thing that does last when I wake up is a sense of loss."
    },
  "created_at": 1644944803000
  }, 
  {
  "user": {
    "name": "Mitsuha",
    "avatars": "/images/profile-hex-mitsuha.png",
      "handle": "@notTakiKun"
    },
  "content": {
      "text": "Once in a while when I wake up. I find myself crying."
    },
  "created_at": 1644512803000
  }, 
  {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants."
    },
  "created_at": 1583687203000
  }, 
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rened" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];
*/

// <script>alert('uh-oh');</script>

$( document ).ready(function() {
  // Use timeago.yarp.com function to parse time
  jQuery("time.timeago").timeago(); 
  jQuery.timeago.settings.allowFuture = false;
  
  // Set up function to render all tweets from GET
  const renderTweets = function(tweets) {
    $('.posts').empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.posts').append($tweet); 
    }
  }

  // Sanitizer for text
  const sanitize = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Set up function to generate HTML for a tweet object
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
  
  // Custom submit behaviour for new-tweet-form
  $('#new-tweet-form').submit(function( event ) {
    // console.log(event);
    // console.log($('#new-tweet-form'));
    const tweetText = $(this).children('#tweet-text')[0].value;
    console.log(tweetText);
    // Block default behaviour of reloading page
    event.preventDefault(); 
    // Data validation of tweet (not empty OR <= 140 chars)
    if (tweetText.length > 140) {
      alert(`Error: tweet length is ${tweetText.length} — exceeds max of 140 chars.`);
      return;
    } else if (tweetText.length <= 0) {
      alert("Error: tweet message is empty.");
      return;
    } 
    // Submit our own POST to the server
    // $.post ( "/tweets", $( '#new-tweet-form' ).serialize(), loadTweets );
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $( '#new-tweet-form' ).serialize(),
      success: loadTweets
    });
  });

  // GET method to retrieve tweet database from server
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (tweetdb) {
      // console.log('Success: ', tweetdb); // debug console.log
      renderTweets(tweetdb);
    });
  }

  loadTweets(); // test code to load tweets; loads tweets on page load.

});

