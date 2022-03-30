/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
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

$( document ).ready(function() {

  jQuery("time.timeago").timeago(); // Uses timeago.yarp.com function to parse time
  jQuery.timeago.settings.allowFuture = false;

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.posts').append($tweet); 
    }
  }

  const createTweetElement = function(tweet) {
    const time = new Date(tweet.created_at);
    const markup = `
    <article class="tweet">
      <header>
        <div class="pic-name">
          <img src="${tweet.user.avatars}">
          <h4 class="display-name">${tweet.user.name}</h4>
        </div>
        <h4 class="handle">${tweet.user.handle}</h4>
      </header>
      <section class="tweet-content">
        <p>${tweet.content.text}</p>
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

  renderTweets(tweetData); // test code call
  
  $('#new-tweet-form').submit(function( event ) {
    console.log(event);
    // Block default behaviour of reloading page
    event.preventDefault(); 
    // Submit our own POST to the server
    $.post ( "/tweets", $( '#new-tweet-form' ).serialize() );
  });

});

