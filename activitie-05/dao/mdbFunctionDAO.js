class mdbDAO {
  static async queryOne(collection) {
    const query = {};
    const options = {
      sort: { "nome": -1 },

      projection: { _id: 0 },
    };
    const result = await collection.findOne(query, options);
    return result;
  }

  static async insertOne(collection, doc) {
    const result = await collection.insertOne(doc);
    return result;
  }
  
  static async insertMulti(collection, docs) {

    const options = { ordered: true };

    const result = await collection.insertMany(docs, options);

    return result;
  }

  static async queryMulti(collection) {
    const query = {};
    const cursor = await collection.find(query).toArray();

    return cursor
  }

  static async deleteOne(collection, query) {
    const result = await collection.deleteOne(query);

    return result
  }
  static async deleteMulti(collection, query) {
    const result = await collection.deleteMany(query);
    return result;
  }

  static async updateOne(collection) {
    const filter = { nome: "lettuce" };
    const updateDoc = {
      $set: {
        nome: 'problem', phone: '76478321'
      }
    };
    const options = { upsert: true };
    const result = await collection.updateOne(filter, updateDoc, options);

    return result;
  }
  static async updateMulti(collection, filter, update) {
    const options = { upsert: true };
    const result = await collection.updateMany(filter, update, options);
    return result;
  }
}

module.exports = mdbDAO