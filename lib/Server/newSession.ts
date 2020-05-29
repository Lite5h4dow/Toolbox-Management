import { NextApiRequest, NextApiResponse } from "next";
import { Db, ObjectID } from "mongodb";
import moment from "moment";

const handler = async (db: Db, userID: string) => {
 await db.collection("UserSessions").deleteMany({ userID: new ObjectID(userID) })
 const session = await db.collection('UserSessions').insertOne({ userID: new ObjectID(userID), sessionCreated: moment.utc() })

 return session.ops[0]._id
}

export default handler