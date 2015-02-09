Meteor.publish('topsongs', function() {
    return TopSongs.find();
});
