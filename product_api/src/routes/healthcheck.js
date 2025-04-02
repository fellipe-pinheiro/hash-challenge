const router = require('express')();

router.get('/', (req, res) => {
  res.send('OK');
});

module.exports = router;
