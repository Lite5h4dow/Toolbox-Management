import { Db, ObjectID } from "mongodb";

const validateSession = async (db: Db, id: string) => {
 const session = await db.collection("UserSessions").findOne({ _id: new ObjectID(id) })

 if (session === null || session === undefined) return false;

 return true;
}

export default validateSession