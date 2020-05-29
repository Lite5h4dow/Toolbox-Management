import { NextApiResponse, NextApiRequest } from "next";
import { Db, ObjectID } from "mongodb";
import withMongo from "../../middleware/withMongo";
import { isNullOrUndefined } from "util";

const handler = async (req: NextApiRequest, res: NextApiResponse, db: Db) => {
 const data = req.body
 const session = await db.collection("UserSessions").findOne({ _id: new ObjectID(data.sessionID) })
 console.log(session)
 if (isNullOrUndefined(session)) {
  res.status(200).json({ success: false })
 } else if (data.userID == session.userID) {
  await db.collection("UserSessions").deleteOne({ _id: new ObjectID(data.sessionID) })
  res.status(200).json({ success: true })
 } else {
  res.status(200).json({ success: false })
 }
}

export default withMongo(handler)