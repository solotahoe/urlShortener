const express =require ('express');

const mongoose = require('mongoose');
const app= express();
const shortUrl = require('./models/shortUrls')

 
app.set('view engine', 'ejs')
//the middle wear
app.use(express.urlencoded({extended:false}))

//home page view
app.get('/', async(req, res)=> {
   const shortUrls = await shortUrl.find()
    res.render('index', {shortUrls: shortUrls})
})
//handling the form click to post
   app.post('/shortUrls',async(req, res)=>{
   await shortUrl.create({
       full: req.body.fullUrl
    
   })
   res.redirect('/')
   })
//connecting the localhost mongoDb connection 
 mongoose.connect('mongodb://localhost/urlshortener',{
     useNewUrlParser:true, UseUnifiedTopology:true
 })
 //redicrecting the clicked links to actual links
   app.get('/:shortUrl', async(req,res)=> {
      const shortUrlf= await shortUrl.findOne({short: req.params.shortUrl})
       if(shortUrlf == null) return res.sendStatus(404)
        

     //increamenting the clicks on clicking      
           shortUrlf.clicks++
    //saving the clicks on a database.
           shortUrlf.save()
           res.redirect(shortUrlf.full)

   })


// starting the servers
app.listen (process.env.PORT || 5000)


//atlas connection start
// const connectionLink2='mongodb+srv://solo:Solo@0702591509@cluster0.hbzex.mongodb.net/fetchData?retryWrites=true&w=majority';
// mongoose.connect(connectionLink2,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   () => {
//     console.log("connection was successful");
//   }
// );

// mongoose.connection.on("connected", () => {
//   console.log("you are cnn haki ya nanai");
// });
//cheking to see if you are really connected to the database;
// mongoose.connection
//   .once("open", () => {
//     console.log("and yes you are connected sio mchezo!!!");
//   })
//   .on("error", (error) => {
//     console.log(`connection error: ${error}`);
//   });

//atlas connection end


