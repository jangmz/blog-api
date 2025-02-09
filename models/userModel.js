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

// find user by username
async function findUserByUsername(username) {
    try {
        const user = await prisma.user.findMany({
            where: {
                username: username
            }
        })

        return user;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to find user with user ID (${userId}): ${error.message}`);
    }
}

// find user by email
async function findUserByEmail(email) {
    try {
        const user = await prisma.user.findMany({
            where: {
                email: email
            }
        })

        return user;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to find user with user ID (${userId}): ${error.message}`);
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
async function deleteUser(userId) {
    try {
        const deletedUser = await prisma.user.delete({
            where: {
                id: userId
            }
        })

        console.log(`User (id: ${deletedUser.id}) ${deletedUser.username} and all of the associated posts/comments deleted successfully.`);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to delete a user:", error);
    }
}

async function updateUser(user) {
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                username: user.username,
                email: user.email,
                role: user.role
            }
        })

        return updatedUser
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update a user: ", error);
    }
}

export default {
    createUser,
    findUserByUsername,
    findUserByEmail,
    findUserById,
    changeUserRole,
    deleteUser,
    updateUser,
}