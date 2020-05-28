import { NextApiRequest, NextApiResponse } from "next";
import { Db, ObjectID } from "mongodb";
import moment from "moment"
import withMongo from "../../middleware/withMongo";
import { isNullOrUndefined } from "util";

const handler = async (req: NextApiRequest, res: NextApiResponse, db: Db) => {
 const id = req.body.id

 const session = await db.collection("UserSessions").findOne({ _id: id })

 const creationDate = session.sessionCreated

 const currentDate = moment.utc()

 if (currentDate.diff(creationDate, 'hours') <= 24) {
  res.status(200).json({ valid: true })
 } else if (!isNullOrUndefined(session)) {
  db.collection(process.env.mongo_name).deleteOne({ _id: new ObjectID(id) })
  res.status(200).json({ valid: false })
 } else {
  res.status(200).json({ valid: false })
 }
}

export default withMongo(handler)