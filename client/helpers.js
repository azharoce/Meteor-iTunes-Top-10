// Global helpers
Template.registerHelper('topsongs', function() {
    return TopSongs.find({}, { sort: ['sort'] });
});
