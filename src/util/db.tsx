/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import { PrismaClient } from "@prisma/client"

const prismaClientSingleton = () => {
	return PrismaClient();
}

declare const globalThis: {
	prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if(process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;