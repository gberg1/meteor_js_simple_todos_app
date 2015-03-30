if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Feeds = new Meteor.Collection("feeds");
FeedEntries = new Meteor.Collection("feed_entries");

function feedReader() {

    // pass the created collections to Feed.collections()
    var collections = {
        feeds: Feeds,
        feed_entries: FeedEntries
    }

    Feed.collections(collections);

    var github_feed = {
        _id: Meteor.settings.github_id,
        category: Meteor.settings.github_category,
        link: Meteor.settings.github_link,
        refresh_interval: Meteor.settings.github_refresh_interval
    };

    Feed.createAtomFeed(github_feed);

    var stackoverflow_feed = {
        _id: Meteor.settings.stackoverflow_id,
        category: Meteor.settings.stackoverflow_category,
        link: Meteor.settings.stackoverflow_link,
        refresh_interval: Meteor.settings.stackoverflow_refresh_interval
    };


    Feed.createAtomFeed(stackoverflow_feed);

    var twitter_feed = {
        _id: Meteor.settings.twitter_id,
        category: Meteor.settings.twitter_category,
        link: Meteor.settings.twitter_link,
        refresh_interval: Meteor.settings.twitter_refresh_interval
    };

    Feed.createTwitterFeed(twitter_feed);

    var twitter_parameters = {
        consumer_key: Meteor.settings.twitter_consumer_key,
        consumer_secret: Meteor.settings.twitter_consumer_secret, 
        access_token: Meteor.settings.twitter_access_token,
        access_token_secret: Meteor.settings.twitter_access_token_secret,
        screen_name: Meteor.settings.twitter_screen_name
    };

    Feed.initTwitterFeed(twitter_parameters);

    // invoke Feed.read() to get real-time reactive social stream
    Feed.read();
}


