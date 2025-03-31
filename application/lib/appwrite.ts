import { Client, Databases, Account, ID } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('YOUR_PROJECT_ID'); // Replace with your Appwrite project ID

export const account = new Account(client);
export const databases = new Databases(client);

export const MESSAGES_DATABASE_ID = 'messages';
export const MESSAGES_COLLECTION_ID = 'messages_collection';

export const subscribeToMessages = (onMessage: (message: any) => void) => {
  return client.subscribe(`databases.${MESSAGES_DATABASE_ID}.collections.${MESSAGES_COLLECTION_ID}.documents`, (response) => {
    onMessage(response.payload);
  });
};

export const sendMessage = async (text: string) => {
  try {
    const response = await databases.createDocument(
      MESSAGES_DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      ID.unique(),
      {
        text,
        timestamp: new Date().toISOString(),
      }
    );
    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};