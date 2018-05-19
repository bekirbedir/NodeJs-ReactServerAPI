import express from 'express';
import bodyParser from 'body-parser';
import AppRoutes from './routes/index';
const app  = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

AppRoutes(app);

app.get('/', ( req , res)=>{
res.send("REst API");
})

app.post('/' , (req,res) => {

    console.log(req.body    )

    res.send({durum:true});

})

app.listen(3300,  () => console.log("Çalıştı.") );