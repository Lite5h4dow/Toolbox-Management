import { NextApiRequest, NextApiResponse } from "next";
import { Db } from "mongodb";
import moment from "moment";

const handler = async (db: Db, userID: string) => {
 const session = await db.collection('UserSessions').insertOne({ userID: userID, sessionCreated: moment.utc() })

 return session.ops[0]._id
}

export default handler