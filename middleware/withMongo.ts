import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const withMongo = (handler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const mongo = new MongoClient(process.env.mongodb);

  try {
    await mongo.connect();
    const db = mongo.db(process.env.mongodb_name);

    console.info("Mongo Connection Cpen");
    await handler(req, res, db);
  } catch (err) {
    console.error(err);
  } finally {
    console.info("Mongo Connection Closed");
    mongo.close;
  }
};

export default withMongo;
