Meteor.methods({

    updateTopSongs: function() {
        // Get top songs from iTunes server
        HTTP.get('https://itunes.apple.com/nl/rss/topsongs/limit=10/json', function(error, topsongsResponse) {
            var topsongs = [];
            var entries = topsongsResponse.data.feed.entry;
            var sort = 0;
            _.each(entries, function(entry) {
                var topsong = {};
                topsong._id = entry.id.attributes['im:id'];
                topsong.sort = sort;
                topsong.title = entry.title.label;
                topsong.image = entry['im:image'][0].label;
                topsong.link = entry.link[0].attributes.href;
                topsong.preview = entry.link[1].attributes.href;
                // Add song to list
                topsongs.push(topsong);
                // Increase sort
                sort++;
            }, this);

            // Delete all existing songs from database
            TopSongs.find().forEach(function(topsong) {
                TopSongs.remove(topsong._id);
            });

            // Insert new songs into database
            _.each(topsongs, function(topsong) {
                TopSongs.upsert(topsong._id, topsong);
            }, this);
        });
    }

});
