"use server";

import { chatAxios } from "@/axios/chataxios";
import { handleError } from "@/utils/errorHandler";

export const sendMessageDef = async (message: string, chatId: string) => {
    try {
        const response = await chatAxios.post<{
            data?: {
                chatId: string;
                messages: string;
                starting: boolean;
            };
            error?: string;
        }>(`chats/${chatId}/messages`, { message });

        if (response.data.error) {
            throw new Error(response.data.error);
        }

        if (!response.data.data) {
            throw new Error("No chat id found");
        }

        return {
            data: response.data.data!,
            error: undefined,
        };
    } catch (e) {
        return handleError(e, "unable to send message");
    }
}