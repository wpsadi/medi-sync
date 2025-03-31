"use server";

import { chatAxios } from "@/axios/chataxios";
import { handleError } from "@/utils/errorHandler";

export const getChatHistoryDef = async (chatId: string) => {
    try {
        const response = await chatAxios.get<{
            data?: {
                chatId: string;
                messages: {
                    role: "user" | "assistant" ;
                    content: string;
                    timestamp: string;
                    _id: string;
                }[];
                starting: boolean;
            };
            error?: string;
        }>(`chats/${chatId}`);

        if (!response.data) {
            throw new Error("Failed to fetch chat history");
        }

        const data = await response.data.data!;

        return {
            data: data,
            error: undefined,
        };
    } catch (e) {
        return handleError(e, "unable to fetch chat history");
    }
}