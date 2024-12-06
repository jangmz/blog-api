import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// create new user
async function createUser(user) {
    try {
        const newUser = await prisma.user.create({
            data: {
                username: user.username,
                password: user.password,
                email: user.email,
                role: user.role
            }
        })

        console.log(`New user created: ${newUser.username}.`);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create a user:", error);
    }
}

// find user by ID
async function findUserById(userId) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        return user;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to find user with user ID (${userId}): ${error.message}`);
    }
}

// change user role
async function changeUserRole(user) {
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                role: user.role
            }
        })

        console.log(`User's ${updatedUser.username} role changed to ${updatedUser.role}.`);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to change user role:", error);
    }
}

// delete user account
async function deleteUser(user) {
    try {
        const deletedUser = await prisma.user.delete({
            where: {
                id: user.id
            }
        })

        console.log(`User (id: ${deletedUser.id}) ${deletedUser.username} deleted successfully.`);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to delete a user:", error);
    }
}

export default {
    createUser,
    findUserById,
    deleteUser
}