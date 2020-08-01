const pool = require("../config/db");
const moment = require("../config/moment");


class Message {

    constructor (row) {
        this.row = row;
    }

    get id () {
        return this.row.id;
    }

    get content () {
        return this.row.content;
    }

    get created_at () {
        return moment(this.row.created_at);
    }


    static async create(content, callback) {
        let connection;
    
        try {
            connection = await pool.getConnection();
            const response = await connection.query("INSERT INTO messages SET content = ?, created_at = ?", [content, new Date()]);
            callback(response);
        } catch (error) {
            throw error;
        } finally {
            if (connection) connection.release();
        }
    }
    
    static async all(callback) {
        let connection;
    
        try {
            connection = await pool.getConnection();
            const response = await connection.query("SELECT * FROM messages");
            callback(response.map((row) => new Message(row)));
        } catch (error) {
            throw error;
        } finally {
            if (connection) connection.release();
        }
    }
    
    static async find(id, callback) {
        let connection;
    
        try {
            connection = await pool.getConnection();
            const response = await connection.query("SELECT * FROM messages WHERE id = ? LIMIT 1", [id]);
            callback(new Message(response[0]));
        } catch (error) {
            throw error;
        } finally {
            if (connection) connection.release();
        }
    }
    
}

module.exports = Message;