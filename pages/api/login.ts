import { NextApiRequest, NextApiResponse } from "next";
import { Db } from "mongodb";
import withMongo from "../../middleware/withMongo";
import bcrypt from "bcrypt"
import newSession from "../../lib/Server/newSession"

const handler = async (req: NextApiRequest, res: NextApiResponse, db: Db) => {
 console.log(req.body)
 const user = await db.collection("Users").findOne({ username: req.body.uname })

 console.log(user)
 if (await bcrypt.compare(req.body.pword, user.password)) {
  const sessionID = await newSession(db, user._id)
  res.status(201).json({ userID: user._id, sessionID: sessionID })
 } else {
  res.status(209)
 }
}


export default withMongo(handler)