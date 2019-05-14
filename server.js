// const express = require('express');
// const path = require('path');
// const PORT = process.env.PORT || 5000;

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   // .set('view engine', 'ejs')
//   .get('/test', (req, res) => res.json({"test": "hello world!"}))
//   // .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const express = require('express');
// const bodyParser = require('body-parser')
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
  // connectionString: '',
  connectionString: process.env.DATABASE_URL,
  // ssl: true
});

const app = express();
app.use(express.static(path.join(__dirname, 'build')));

// app.get('/ping', function (req, res) {
//  return res.send('pong');
// });

app.get('/venues', async (req, res) => {
  const client = await pool.connect()
  const result = await client.query('SELECT * FROM venue');
  const results = { venues: result ? result.rows : null };
  res.json(results);
  // res.send('hello world');
  // res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);