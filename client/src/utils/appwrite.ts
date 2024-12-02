import { Client, Account, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("674182e0001c3117582f");

export const account = new Account(client);
export const createAnonymousSession = async () => {
    try {
      await account.createAnonymousSession();
      console.log("Anonymous session created successfully");
    } catch (error) {
      console.error("Error creating anonymous session:", error.message);
    }
  };
export const databases = new Databases(client);