const express = require('express'); 
const bodyParser = require('body-parser'); 
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require('knex')
const signin = require('./Controllers/signin.js');
const register = require('./Controllers/register.js');
const profile = require('./Controllers/profile.js');
const image = require('./Controllers/image.js')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '#test',
    database : 'smart-brain'
  }
});

db.select('*').from('users')
 
const app = express(); 


app.use(bodyParser.json());

app.use(cors())

app.get('/', (req, res) => {
	res.send(db.users);
})
 
app.post('/signin',  (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => {image.handleImage(req, res, db) })
app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res) })

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})

console.log(process.env)