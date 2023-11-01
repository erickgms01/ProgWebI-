require('dotenv').config();

const express = require("express");
const app = express();
const mdbFunc = require("./dao/mdbFunctionDAO.js");
const MongoClient = require("mongodb").MongoClient;

const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;

console.log(USER);
console.log(PASSWORD);

const uri = 'mongodb+srv://$(USER):$(PASSWORD)@cluster0franciscoerick.xg8sef1.mongodb.net/';
const client = new MongoClient(uri);
const collection = client.db("db").collection("contacts");

app.get("/queryone", async (req, res) => {
  try {
    var result = await mdbFunc.queryOne(collection);
    if (result) {
      const nome = result.nome;
      const email = result.email;
      const phone = result.phone;
      const mensagem = `Nome: ${nome}, Email: ${email}, Phone: ${phone}`;
      res.send(mensagem);
    } else {
      res.send("Nenhum registro encontrado.");
    }
  } catch (error) {
    res.status(500).send("Ocorreu um erro ao executar a consulta: " + error.message);
  }
});

app.get("/querymulti", async (req, res) => {
  try {
    var results = await mdbFunc.queryMulti(collection);
    if (results.length > 0) {
      const mensagens = results.map((result, index) => {
        const nome = result.nome;
        const email = result.email;
        const phone = result.phone;

        return `Registro ${index + 1}: Nome: ${nome}, Email: ${email}, Phone: ${phone}\n`;
      });

      res.send(mensagens.join("\n"));
    } else {
      res.send("Nenhum registro encontrado.");
    }
  } catch (error) {
    res.status(500).send("Ocorreu um erro ao executar a consulta multi: " + error.message);
  }
});

app.get("/insertone", async (req, res) => {
  const doc = {
    nome: "erick",
    email: "erick@example.com",
    phone: "9875754822"
  };

  try {
    var result = await mdbFunc.insertOne(collection, doc);

    if (result.acknowledged) {
      res.send("Documento inserido com sucesso.");
    } else {
      res.send("Falha ao inserir o documento.");
    }
  } catch (error) {
    res.status(500).send("Ocorreu um erro ao executar a inserção: " + error.message);
  }
});


app.get("/insertmulti", async (req, res) => {
  const docs = [
    { nome: "cake", email: 'c@d', phone: '111' },
    { nome: "lettuce", email: 'l@g', phone: '222' },
    { nome: "donut", email: 'd@f', phone: '3333' }
  ];

  var result = await mdbFunc.insertMulti(collection, docs);

  if (result.acknowledged) {
    var msg = `${result.insertedCount}` + " documentos inseridos";
  }
  else {
    var msg = "Falha ao inserir os documentos";
  }

  res.send(msg);
});


app.get("/deleteone", async (req, res) => {
  const query = { nome: "cake" };

  var result = await mdbFunc.deleteOne(collection, query);

  if (result.deletedCount === 1) {
    res.send("Um documento excluído.");
  } else {
    res.send("Nenhum documento encontrado para exclusão.");
  }
});
app.get("/deletemulti", async (req, res) => {
  const query = { nome: "donut" };

  const result = await mdbFunc.deleteMulti(collection, query);
  if (result.deletedCount > 0) {
    res.send(`${result.deletedCount} documento(s) excluído(s).`);
  } else {
    res.send("Nenhum documento encontrado para exclusão.");
  }
});

app.get("/updateone", async (req, res) => {
  const result = await mdbFunc.updateOne(collection);
  res.send(`${result.matchedCount} documento(s) encontrados, atualizados ${result.modifiedCount} documento(s)`);
});

app.get("/updatemulti", async (req, res) => {
  const filter = { nome: "greg" }; 
  const update = {
    $set: {
      nome: "caruso",
      email: "lucassdaaavii@gmail.com",
      phone: "438652441"
    }
  }; 

  const result = await mdbFunc.updateMulti(collection, filter, update);
  if (result.modifiedCount > 0) {
    res.send(`${result.modifiedCount} documento(s) atualizado(s).`);
  } else {
    res.send("Nenhum documento encontrado para atualização.");
  }
});


app.listen(3000, () => {
  console.log("Servidor iniciado...")
});