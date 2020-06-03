import { Db, ObjectID } from "mongodb"
import { GroupTypes } from "../../classes/user"

const createGroup = async (db: Db, GroupName: string, adminID: string, groupType: GroupTypes) => {
 const otherGroups = await db.collection("Groups").find({ name: { $regex: `^${GroupName}$`, $options: 'gi' } }).count()

 db.collection("Groups").insertOne({
  name: GroupName,
  microID: otherGroups + 1,
  administrator: new ObjectID(adminID),
  type: groupType,
  members: []
 })
}

export default createGroup