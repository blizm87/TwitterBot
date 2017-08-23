console.log('Hello World!!!')

var TwitterPackage = require('twitter');

// replace the words in caps with the keys that
// we saw before on apps.twitter.com
var secret = {
  consumer_key: 'I8GSIYhz1B7bp1wtohgYqhcRI',
  consumer_secret: 'vVKKVhRlxNvHZNWXKF6wyUkC9n0M4ZaHP67nd3Tyn5OVxbEGMK',
  access_token_key: '900175373601603585-mP50MYg0aEsc8xDctzY11g7pja99Xqa',
  access_token_secret: 'Pl9lnkFdcv4pAb9hTqAZ5ANRrA2oMNpSvu82fEd0yu64s'
}

var Twitter = new TwitterPackage(secret);

var query = "alot";
Twitter.get('search/tweets', {q: query, count: 1, lang:"en"}, function(error, tweets, response) {

   var tweet_list = tweets['statuses'];

   for (var i = 0; i < tweet_list.length; i++) {
        if ('retweeted_status' in tweet_list[i]) {
            continue;
        }
        var screen_name = tweet_list[i].user.screen_name;
        var message = "@" + screen_name + " Alot confused, a lot not understand feelings";
        var tweet_id = tweet_list[i].id_str

        try {
            Twitter.post('statuses/update', {"status": message, "in_reply_to_status_id":tweet_id}, function(error, tweet, response){
                 console.log("Tweet posted successfully!")
            });
        }

        catch(err) {
            console.log(err);
        }
   }
});
