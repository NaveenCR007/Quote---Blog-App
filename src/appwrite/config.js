
/*  ------- This holds the logic of database and file Upload -------- */

import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class StorageService {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    // 'slug' will be our ID in all the methods
    // All these function(except get functions) will return an object, which has unique id -> '$id'

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument({
                databaseId: conf.appwriteDatabseId,
                collectionId: conf.appwriteTableId,
                documentId: slug,

                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            });

        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            const result = await this.databases.updateDocument({
                databaseId: conf.appwriteDatabseId,
                collectionId: conf.appwriteTableId,
                documentId: slug,

                data: {
                    title,
                    content,
                    featuredImage,
                    status
                }
            })

            console.log("Successfully updated!");
            return result;
        } catch (error) {
            throw error
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument({
                databaseId: conf.appwriteDatabseId,
                collectionId: conf.appwriteTableId,
                documentId: slug
            })

            return true
        } catch (error) {
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument({
                databaseId: conf.appwriteDatabseId,
                collectionId: conf.appwriteTableId,
                documentId: slug
            })

        } catch (error) {
            console.log("No such post exists");
        }
    }

    // We will get the posts, whose status is 'active'
    // You can only do queries if you created 'index' in your DB
    // It returns an array of obj
    async getAllPost() {
        try { 
            return await this.databases.listDocuments({
                databaseId: conf.appwriteDatabseId,
                collectionId: conf.appwriteTableId,
                queries: [
                    Query.equal('status', 'active')
                ]
            })

        } catch (error) {
            throw error
        }
    }


    /* ------------------ File upload services --------------------------- */

    // Give full 'file' to upload
    async uploadFile(file) {
        try {
            return await this.storage.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file
            })
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteFile(id) {
        try {
            return this.storage.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId: id
            })
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    // Get preview of file
    // This will not return any 'promise', so no need of async function
    getFilePreview(id) {
        try {
            const result = this.storage.getFileView({
                bucketId: conf.appwriteBucketId,
                fileId: id
            })

            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

const storageService = new StorageService();
export default storageService;