// Setup cron jobs
SyncedCron.options.collectionName = 'cronjobs';

SyncedCron.add({
    name: 'iTunes topsongs',
    schedule: function(parser) {
        return parser.text('every 10 minutes'); // parser is a later.parse object
    }, 
    job: function() {
        Meteor.call('updateTopSongs');
    }
});


// Startup
Meteor.startup(function() {

    // Start jobs
    SyncedCron.start();

});
