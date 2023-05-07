const express = require('express');
var cors = require('cors');
const app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
// let gtts = require('node-gtts')('id');
let gtts = require('gtts');

// const LANGUAGES = {
//   af: 'Afrikaans',
//   sq: 'Albanian',
//   ar: 'Arabic',
//   hy: 'Armenian',
//   ca: 'Catalan',
//   zh: 'Chinese',
//   'zh-cn': 'Chinese (Mandarin/China)',
//   'zh-tw': 'Chinese (Mandarin/Taiwan)',
//   'zh-yue': 'Chinese (Cantonese)',
//   hr: 'Croatian',
//   cs: 'Czech',
//   da: 'Danish',
//   nl: 'Dutch',
//   en: 'English',
//   'en-au': 'English (Australia)',
//   'en-uk': 'English (United Kingdom)',
//   'en-us': 'English (United States)',
//   eo: 'Esperanto',
//   fi: 'Finnish',
//   fr: 'French',
//   de: 'German',
//   el: 'Greek',
//   ht: 'Haitian Creole',
//   hi: 'Hindi',
//   hu: 'Hungarian',
//   is: 'Icelandic',
//   id: 'Indonesian',
//   it: 'Italian',
//   ja: 'Japanese',
//   ko: 'Korean',
//   la: 'Latin',
//   lv: 'Latvian',
//   mk: 'Macedonian',
//   no: 'Norwegian',
//   pl: 'Polish',
//   pt: 'Portuguese',
//   'pt-br': 'Portuguese (Brazil)',
//   ro: 'Romanian',
//   ru: 'Russian',
//   sr: 'Serbian',
//   sk: 'Slovak',
//   es: 'Spanish',
//   'es-es': 'Spanish (Spain)',
//   'es-us': 'Spanish (United States)',
//   sw: 'Swahili',
//   sv: 'Swedish',
//   ta: 'Tamil',
//   th: 'Thai',
//   tr: 'Turkish',
//   vi: 'Vietnamese',
//   cy: 'Welsh',
// };

app.post('/speech', function (req, res) {
  let text = req.body.text;
  let language = req.body.language;
  let path = require('path');
  let fileName = `${Date.now()}-${language}-output.mp3`;
  let filepath = path.join(__dirname + '/public/', fileName);

  // const regex = /[/\\@#$%^&*()"':{}|<>\-;_]/g.test(text);

  // if (regex) {
  //   return res.status(400).json({
  //     message:
  //       'Check senteces, it should be no [!@#$/%^&*()":{}|<>] in sentences',
  //   });
  // }

  if (text !== '') {
    const countWord = text.split(' ');

    if (countWord.length > 100) {
      return res.status(100).json({
        message: 'Senteces has more than 100 word',
      });
    }
  }

  let voice = new gtts(text, language);
  voice.save(filepath, function () {
    console.log('save done');
  });

  return res.status(200).json({ file: fileName });
});

app.get('/download/:file', function (req, res) {
  const file = `${__dirname}/public/${req.params.file}`;
  res.download(file);
});

app.listen(5000, () => {
  console.log('server running on port 5000');
});
