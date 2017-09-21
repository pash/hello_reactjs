// check react-slingshot version for other options/samples

import fs from 'fs';            // comes with node and is useful for interacting with file system
import cheerio from 'cheerio';  // handy way to interact with in-memory DOM
import colors from 'colors';    // for pretty console logs

/* eslint-disable no-console */

fs.readFile('src/index.html', 'utf8', (err, markup) => {
  if(err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);

  // since a separate spreadsheet is only utilized for the production build, need to dynamically add link to stylesheet
  $('head').prepend('<link rel="stylesheet" href="styles.css">');

  fs.writeFile('dist/index.html', $.html(), 'utf8', function(err) {
    if(err) {
      return console.log(err);
    }
    console.log('index.html written to /dist'.green);
  });
});
