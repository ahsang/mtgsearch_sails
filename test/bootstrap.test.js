var sails = require('sails');

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(5000);

  sails.lift({
    port: process.env.PORT || 80,
    environment: process.env.NODE_ENV || 'test',
    models: {
      connection: 'localDiskDb',
      migrate: 'alter'
    }
  }, function(err, server) {
    if (err) return done(err);
    // here you can load fixtures, etc.
    done(err, sails);
  });
});

after(function(done) {
  var fs = require('fs');
  fs.unlinkSync('.tmp/localDiskDB.db');
  sails.lower(done);
});
