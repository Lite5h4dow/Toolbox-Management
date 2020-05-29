import { NextApiRequest, NextApiResponse } from "next";
import { Db, ObjectID } from "mongodb";
import withMongo from "../../middleware/withMongo";
import { types } from "../../classes/user";

const handler = async (req: NextApiRequest, res: NextApiResponse, db: Db) => {
 const session = await db.collection("UserSessions").findOne({ _id: new ObjectID(req.body.id) })

 const user = await db.collection("Users").findOne({ _id: new ObjectID(session.userID) })

 switch (user.role) {
  case (types.Cleaner):
   const properties = await db.collection("Properties").find({})
 }

}
export default withMongo(handler)