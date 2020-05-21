const Clarifai = require('clarifai');


const app = new Clarifai.App({
  apiKey: 'e5503f5aa8014a509587faf4137f2085'
}); 
const handleApiCall = (req, res) => {
app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input) 
  .then(data => {
  	res.json(data);
  })
  .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body; 
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entires =>{
    	console.log(entires);
    })
} 



 module.exports = {
  handleImage, handleApiCall
 }