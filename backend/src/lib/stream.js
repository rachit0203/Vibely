import { StreamChat } from "stream-chat";
import "dotenv/config";


const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    throw new Error("Stream API Key or Secret is missing ");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
    try {
        const result = await streamClient.upsertUsers([userData]);
        return result.users[userData.id];
    } catch (error) {
        console.error("Error upserting Stream User ", error);
    }
};

    
export const generateStreamToken = (userId) => {
    try {
        // ensure userId is a string 
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);

    } catch (error) {
        console.error("Error in generating stream token ", error);  
    }
};
