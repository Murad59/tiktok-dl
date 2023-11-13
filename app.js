const { TiktokDL } = require("@tobyg74/tiktok-api-dl")
const path = require('path')
const fs = require("fs");
const https = require('http');
const express = require('express');
const app = express();
const port = 3000;

// Parse URL-encoded data (form data)
app.use(express.urlencoded({ extended: true }));

// set the view engine to ejs
app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const data = {
    author: 'antohin_qoutes',
    description: "আমি নিজেই নিজেকে খুঁজি না 🙂 #foryou #foryoupage #statusvideo #sadquotes #indianmovie #indianbangla #jahidhasan ",
    dynamicCover: 'https://p16-sign-va.tiktokcdn.com/obj/tos-maliva-p-0068/0542d9af0bc545b4a92d1ff33f6ab4c9_1699600574?x-expires=1699909200&x-signature=A0UhhUjf5jRXJcI9entcjc3d%2Bd8%3D&s=FEED&se=false&sh=&sc=dynamic_cover&l=2023111221235550CB415B8F64CBA52950',
    video: '#',
    music: '#' }
  
  res.render("index", data)
})

app.post('/', (req, res) => {
  const tiktok_url = req.body.url;

  TiktokDL(tiktok_url, {
    version: "v1" 
  }).then((result) => {
    console.log(result)

    
    if (result.status == 'success') {
      let data = {
        author: result.result.author.username,
        description: result.result.description,
        dynamicCover: result.result.dynamicCover[0],
        video: result.result.video[1],
        music: result.result.music.playUrl[0]
       }
      
      res.render("index", data)
    }
    else {
      res.redirect('/');
    }
    
    
  })

});


// URL of the image
const url = "http://www.tutorialspoint.com/cg/images/cgbanner.jpg";

app.get('/d', (req, res) => {
 console.log(`${__dirname}/files`)

})

app.post('/api/v1', (req, res) => {
    const tiktok_url = req.body.url;

    TiktokDL(tiktok_url, {
      version: "v1" 
    }).then((result) => {
      console.log(result)
      
      if (result.status == 'success') {
        let data = {
          author: result.result.author.username,
          description: result.result.description,
          dynamicCover: result.result.dynamicCover[0] }
        
        res.render("index", data)
      }
      
      
      
       res.redirect('http://localhost:3000');
      
    })
  
});

app.get('/api/v2', (req, res) => {
    const tiktok_url = "https://vt.tiktok.com/ZSNfescfG/"

    TiktokDL(tiktok_url, {
      version: "v2" 
    }).then((result) => {
      console.log(result)
    })
  res.send('SSSTik Api Response!');
});

app.get('/api/v3', (req, res) => {
    const tiktok_url = "https://vt.tiktok.com/ZSNfescfG/"

    TiktokDL(tiktok_url, {
      version: "v3" 
    }).then((result) => {
      console.log(result)
    })
  res.send('MusicalDown Api Response!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});