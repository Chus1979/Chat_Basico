const express =  require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const MongoClient = require('mongodb').MongoClient;
/** Para usar _id de MongoDB */
const ObjectId = require('mongodb').ObjectId;
//
const mongoURL = 'mongodb://localhost:27017/chatBasico';
const collName = 'textos';

var collection;

async function conectadb () {
	var client = await MongoClient.connect(mongoURL);
	collection = await client.db().collection(collName);
}

conectadb();

port = 3000;

app.get('/nuevo/', async (req,res)=>{
	var nuevoTexto = req.query.texto; 
	var documento = {
		txt: nuevoTexto,	
	};
	var mongoRes = await collection.insertOne(documento);
	var textos = await collection.find().toArray();
	var json = JSON.stringify(textos)
	res.send(json);
})

app.get('/listado/', async (req,res)=>{
	/**
	* Endpoint: http://localhost:3000/listado/
	*/
	var textos = await collection.find().toArray();
	var json = JSON.stringify(textos)
		res.send(json);
			
})

app.get('/borrar/', async (req,res)=>{
	/**
	* Endpoint: http://localhost:3000/borrar/?id=AAAAAAA
	*/
	var id = req.query.id; 
	var filtro = {
		_id: ObjectId(id)
	}
	await collection.deleteOne(filtro);

	var textos = await collection.find().toArray();
	var json = JSON.stringify(textos)
	res.send(json);
})

app.listen(port,()=>{
	console.log(`Todo listo y escuchando en http://localhost:${port}/`);
})
