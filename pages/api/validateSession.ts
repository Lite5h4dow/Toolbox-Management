import { NextApiRequest, NextApiResponse } from "next";
import { Db, ObjectID } from "mongodb";
import moment from "moment"
import withMongo from "../../middleware/withMongo";
import { isNullOrUndefined } from "util";

const handler = async (req: NextApiRequest, res: NextApiResponse, db: Db) => {
 const id = req.body.id

 const session = await db.collection("UserSessions").findOne({ _id: new ObjectID(id) })

 const currentDate = moment.utc()

 if (isNullOrUndefined(session)) {
  res.status(200).json({ valid: false })
 } else {
  if (moment(currentDate).diff(moment(session.sessionCreated), 'hour', true) <= 24) {
   res.status(200).json({ valid: true, userID: session.userID, sessionID: session._id })
  } else {
   db.collection("UserSessions").deleteOne({ _id: new ObjectID(id) })
   res.status(200).json({ valid: false })
  }
 }
}

export default withMongo(handler)