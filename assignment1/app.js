 const express = require('express');
 const {MongoClient} = require('mongodb');

 const app = express();


 app.set('view engine', 'ejs');
 app.use(express.static(__dirname + '/public'));
 app.use(express.json());
 app.use(express.urlencoded({extended: false}));

 let db;
 let todo;
 
 const client = MongoClient.connect("mongodb://localhost:27017/employeedb", 
 { useUnifiedTopology: true }, (error, client)=>{
     if(!error){
       console.log("DB Connected");
        db = client.db('employeedb')
        todo = db.collection('todo')
     } else{
       console.log("DB not connected")
     }
 });

const employees = [
    {
        employeeID: "ESC100",
        name: "Rick Sanchez",
        position: "Production manager",
        img: "images/rick.jpg",
        about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis totam laboriosam iusto commodi cupiditate accusamus veritatis ipsa incidunt distinctio voluptatum."
    },
    {
        employeeID: "ESC010",
        name: "kofi korea",
        position: "Maintenance",
        img: "images/kofi.jpg",
        about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis totam laboriosam iusto commodi cupiditate accusamus veritatis ipsa incidunt distinctio voluptatum."
    },
     {   employeeID: "ESC110",
        name: "zed navigator",
        position: "IT boss",
        img: "images/zed.jpg",
        about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis totam laboriosam iusto commodi cupiditate accusamus veritatis ipsa incidunt distinctio voluptatum."
    }
    ]

 app.get('/', (req, res) => {
     res.render('home', {employees});
 });

 app.get('/todolist', async (req, res)=>{
     const findings = await todo.find({}).toArray()
      res.render('todolist', {findings})
 });

 app.post('/todolist', async (req, res)=>{
     let info = {
       name: req.body.name,
       position: req.body.position,
       todo: req.body.todo,
     };
     const findings = await todo.insertOne(info);
     res.redirect('/todolist');
 });

 const port = 2500;
 app.listen(port, ()=>{
     console.log(`server has started on port ${port}`);
 });