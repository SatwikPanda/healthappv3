import { useState } from "react";

import { databases } from "./appwrite";
import { databaseId, collectionIdLogs } from "./Credentials";
import { Query } from "appwrite";

const logNumber = async () => {
  try {
    const response = await databases.listDocuments(
      databaseId,
      collectionIdLogs,[Query.notEqual("seen", "seen")]
    );
    return response.total;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export default logNumber;
