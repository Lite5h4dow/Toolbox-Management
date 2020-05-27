import { NextApiResponse, NextApiRequest } from "next";
import { Db } from "mongodb";
import bcrypt from "bcrypt"
import newSession from "../../lib/newSession"
import withMongo from "../../middleware/withMongo";
import { isNullOrUndefined } from "util";

const handler = async (req: NextApiRequest, res: NextApiResponse, db: Db) => {
 const body = req.body

 var uname = await db.collection("Users").findOne({ username: body.uname })
 var email = await db.collection("Users").findOne({ email: body.email })

 if (isNullOrUndefined(uname) && isNullOrUndefined(email)) {
  const salt = await bcrypt.genSalt(parseInt(process.env.rounds))
  const passwordHash = await bcrypt.hash(body.pword, salt)

  const user = await db.collection("Users").insertOne({
   email: body.email,
   username: body.uname,
   password: passwordHash,
   forename: body.fname,
   surname: body.sname,
   role: body.acctype,
   verified: false
  })

  const sessionID = await newSession(db, user.ops[0]._id)

  res.status(201).json({ userID: user.ops[0]._id, sessionID: sessionID })

  console.log({ user: user.ops[0]._id, session: sessionID })
 } else {
  var messages: Array<{ type: string, message: string }> = []

  if (!isNullOrUndefined(email)) {
   messages.push({ type: "email", message: "Email already in use" })
  }

  if (!isNullOrUndefined(uname)) {
   messages.push({ type: "username", message: "Username already in use" })
  }

  res.status(208).json({ messages: messages })
 }
}

export default withMongo(handler)