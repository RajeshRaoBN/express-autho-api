// ./src/database/mongo.js
const {MongoMemoryServer} = require('mongodb-memory-server');
const {MongoClient} = require('mongodb');

let database = null;

async function startDatabase() {
  const mongo = await MongoMemoryServer.create();
  const mongoDBURL = mongo.getUri();
  const connection = MongoClient.connect(mongoDBURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Connection failed for some reason");
      }
      console.log("Connection established - All well");
      database = client.db(connection.database());
  });
}

async function getDatabase() {
  if (!database) await startDatabase();
  return database;
}

module.exports = {
  getDatabase,
  startDatabase,
};