const { admin } = require("../dependencies/dependencies");

const db = admin.firestore();
const search = async (userId, friendName) => {
    var data = [];
    await db.collection('usuarios').where("uid", '!=', userId).where(
        admin.firestore.Filter.or(
            admin.firestore.Filter.where("uid", '==', friendName),
            admin.firestore.Filter.where("displayName", '==', friendName)
        )
    ).get().then(result => {
        result.forEach(doc => {
            data.push(doc.data())
        })
    }).catch(error => {
        console.log(error)
    });

    return data;

}

const addFriend = async (req, res) => {
    userId = req.body.userId
    const user = {
        displayName: req.body.displayName,
        email: req.body.email,
        uid: req.body.uid,
        profilePic: req.body.profilePic,
    }

    await db.collection('usuarios').doc(userId).collection('friends').doc(user.uid).set(user).then(() => {
        res.sendStatus(200);
    }).catch(error => {
        res.send(error);
    })

}

const getFriends = async (req, res) => {
    userId = req.body.userId
    var data = [];

    await db.collection('usuarios').doc(userId).collection('friends').get().then(result => {
        result.forEach(doc => {
            data.push(doc.data())
        })
    }).catch(error => {
        res.send(error);
    })

    res.send(data)
}

const getFriendsDB = async (userId) => {
    var data = [];
    await db.collection('usuarios').doc(userId).collection('friends').get().then(result => {
        result.forEach(doc => {
            data.push(doc.data())
        })
    }).catch(error => {
        console.log(error);
    })

    return data;
}

module.exports = {
    search,
    addFriend,
    getFriends,
    getFriendsDB
}