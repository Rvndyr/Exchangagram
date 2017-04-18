const db = require('sqlite');
const DB_NAME = './database.sqlite';

const handler = {};

handler.getUsers = () => {
    return db.all(`SELECT * FROM users 
                    INNER JOIN activities ON activities.user_id = users.id`)
};

handler.getUser = (user_id) => {
    return db.all(`SELECT * FROM users 
            INNER JOIN activities ON activities.user_id = users.id
            WHERE users.id = ${user_id}`)
};

handler.getFollowed = (follower_id) => {
    return db.all(`SELECT FROM users INNER JOIN followers ON followers.user_id = users.id 
                INNER JOIN activities ON activities.user_id = users.id
            WHERE followers.follower_id = ${follower_id}`)
};

module.export = handler;
