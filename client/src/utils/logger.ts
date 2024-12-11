import { databaseId, collectionIdLogs } from "./Credentials"
import { databases } from "./appwrite"

const log = async (message) => {
    try {
        const response = await databases.createDocument(
            databaseId,
            collectionIdLogs,
            "unique()",
            {
                logStatement: message,
            }
        );
    } catch (error) {
        console.error(error);
    }
}

export default log;