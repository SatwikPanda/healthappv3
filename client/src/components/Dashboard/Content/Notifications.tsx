import React, { useEffect, useState } from "react";
import { databases } from "../../../utils/appwrite";
import { databaseId, collectionIdLogs } from "../../../utils/Credentials";
import { Models } from "appwrite";

const Notifications = () => {
  const [logs, setLogs] = useState<Models.Document[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const fetchLogs = async () => {
        try {
          const response = await databases.listDocuments(
            databaseId,
            collectionIdLogs
          );
          setLogs(response.documents); // Store logs in state
        } catch (err) {
          console.error("Error fetching logs:", err);
        }
      };
      fetchLogs();
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="max-h-[48rem] overflow-y-auto">
      {logs.length > 0 ? (
        <ul className="">
          {logs.slice().reverse().map((log) => (
            <li key={log.$id}
            className="border-b py-2 px-4 border-white/20">
              {log.logStatement}
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
  );
};

export default Notifications;
