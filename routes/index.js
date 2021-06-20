var express = require('express');
var router = express.Router();
var request = require('sync-request');

const url = 'http://musicbrainz.org/ws/2/artist';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/search-artist', async (req, res) => {
  const artistsRaw = await request('GET', `${url}/?query=artist:${req.body.name}&fmt=json`, {
    headers: {
      'user-agent': 'Test/1.2.0 ( capsule@testtest.com )',
    },
  });
  const artists = await JSON.parse(artistsRaw.body).artists;

  res.render('artists', { artists });
});

router.get('/discographie', async (req, res) => {
  const discographieRaw = await request('GET', `${url}/${req.query.id}?inc=releases&fmt=json`, {
    headers: {
      'user-agent': 'Test/1.2.0 ( capsule@testtest.com )',
    },
  });
  console.log(discographieRaw);
  console.log(`${url}/${req.query.id}?inc=releases&fmt=json`);
  const discographie = await JSON.parse(discographieRaw.body);
  console.log(discographie);

  res.render('discographie', { discographie });
});

module.exports = router;
