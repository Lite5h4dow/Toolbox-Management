import { NextApiRequest, NextApiResponse } from "next";
import { Db, ObjectID } from "mongodb";
import withMongo from "../../middleware/withMongo";
import { AccessLevels } from "../../classes/user";

const handler = async (req: NextApiRequest, res: NextApiResponse, db: Db) => {

}
export default withMongo(handler)