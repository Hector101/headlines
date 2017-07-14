const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');

/**
 * set port number for server connection
 */
const port = process.env.PORT || 8080;

/**
 * create instance of express
 */
const app = express();

/**
 * add history middleware
 */
app.use(history());

/**
 * setup root directory to server static asssets
 */
app.use(express.static(path.resolve(__dirname)));

/**
 * start socket connection
 */
app.listen(port, () => {
  console.log('Server Started on port 8080');
});
