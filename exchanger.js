const db = require('sqlite');
const DB_NAME = './database.sqlite';

const exchanger = {};

// filter out user key
const filterOutKey = (data, keyToFilter) => {
    return data.map((user) => Object.assign({},
        ...Object.keys(user).filter(userKey => userKey !== keyToFilter)
        .map(key => ({
            [key]: user[key]
        }))
    ));
}

// get only users list
exchanger.getUsers = () => {
    return db.all(`SELECT * FROM users`).then((data) => filterOutKey(data, 'PASSWORD'));
};


// Get all users + their activity
exchanger.getActivities = (user_id) => {
    return db.all(`SELECT activity_payload FROM activities 
                    WHERE activities.user_id =${user_id}`);
};

// get single user activity
// exchanger.getActivity = (user_id, activity_payload) => {
//     return db.run(`SELECT activity_payload From activities
//                     WHERE activities.user_id = ${user_id} and activity_payload =${activity_payload}`);
// }

// Get a specified user via user.id + their activity
exchanger.getUser = (user_id) => {
    return db.all(`SELECT * FROM users 
            INNER JOIN activities ON activities.user_id = users.id
            WHERE users.id = ${user_id}`).then((data) => filterOutKey(data, 'PASSWORD'));
};

// Get users that $user_id follows
exchanger.getFollowed = (user_id) => {
    return db.all(`SELECT 
                users.name AS name,
                users.email AS email,
                activities.activity_type_id AS activity_type_id,
                activities.activity_payload AS payload
            FROM users
                INNER JOIN followers ON followers.followed_id = users.id 
                INNER JOIN activities ON activities.user_id = users.id
            WHERE followers.user_id = ${user_id}`)
};

// Get a specified payload via activities.activity_type_id
exchanger.getPost = (activity_type_id) => {
    return db.all(`SELECT
                    users.name AS name,
                    activities.activity_payload AS payload
                FROM activities
                    INNER JOIN users ON activities.user_id = users.id
                WHERE activities.activity_type_id = ${activity_type_id}`)
};


// create User
exchanger.createUser = (req) => {
    return db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, req.name, req.email, req.password)
};

// Create a activity
exchanger.createActivity = (user_id, request) => {
    return db.run(`INSERT INTO activities (user_id, activity_payload) values (${user_id}, ${activity_payload})`, request)
};

// Follow a user
exchanger.followUser = (user_id, followed_id) => {
    return db.run(`INSERT INTO followers (user_id, follower_id) VALUES (${user_id}, ${followed_id})`)
};

// Edit a activity payload
exchanger.updatePost = (user_id, activity_type_id, updatedText) => {
    return db.run(`UPDATE activities SET activity_payload = "${updatedText}" WHERE activity_type_id = ${activity_type_id} and user_id = ${user_id}`)
};

// Delete a acitivity paylaod
exchanger.deletePost = (user_id, activity_id) => {
    return db.run(`DELETE FROM activities WHERE activity_id = ${activity_id} and user_id = ${user_id}`)
};

// Unfollow a user
exchanger.unfollow = (user_id, followed_id) => {
    return db.run(`DELETE FROM followers WHERE user_id = ${user_id} AND followed_id = ${followed_id}`)
};

module.exports = exchanger;