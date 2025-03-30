"use server";

import { headers } from "next/headers";

export const getWebsiteOriginURL = async() => {
    const headersStore = await headers();

    const origin = await headersStore.get("x-forwarded-host")?.toString();
    const protocol = await headersStore.get("x-forwarded-proto")?.toString();

    if (!protocol) {
        throw new Error("No protocol found");
    }





    if (!origin) {
        throw new Error("No origin found");
    }

    return `${protocol}://${origin}`;


}