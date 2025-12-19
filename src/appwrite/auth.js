import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

/* This file holds the entire authentication logic */

export class AuthService {
    client = new Client();
    account;

    // This constructor is called when 'authService' object created
    constructor() {
        // set endpoint(url) and project id in 'client' object
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client)
    }

    // create an account
    async createAccount({ name, email, password }) {
        try {
            // pass arguments directly, not an object
            const userAccount = await this.account.create({
                userId: ID.unique(),
                email: email,
                password: password,
                name: name
            });

            // if the userAccount created, then login
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }

        } catch (error) {
            throw error;
        }
    }

    // This is for login
    async login({ email, password }) {
        try {
            //pass arguments directly, not an object
            const session = await this.account.createEmailPasswordSession({
                email: email,
                password: password
            });
            
            return session;
            // Login success → returns a session object
        } catch (error) {
            throw error;
        }
    }

    // Logout function
    async logout() {
        try {
            // const result = await account.deleteSession({sessionId: id}); This deletes a particular session

            // This deletes/logouts all the sessions
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }

    // Get the user(logged in user)
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            return null;
        }
    }
}

// This is an object
const authService = new AuthService();

export default authService;