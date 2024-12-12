import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// insert token
async function insertToken(token) {
    try {
        await prisma.refreshToken.create({
            data: {
                token: token
            }
        })
        console.log("Refresh token added to the DB successfully.");
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

// check if token exists
async function tokenExists(refToken) {
    try {
        const token = await prisma.refreshToken.findFirst({
            where: {
                token: refToken
            }
        })

        return token ? true : false;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

// delete token
async function deleteToken(token) {
    try {
        await prisma.refreshToken.delete({
            where: {
                token: token
            }
        })
        console.log("Token removed.");
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

export default {
    insertToken,
    tokenExists,
    deleteToken,
}