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

const sendRequest = async (req, res) => {
    const requestTo = req.body.userIdF;
    const user = {
        userId: req.body.userId,
        displayName: req.body.displayName,
        profilePic: req.body.profilePic,
        email: req.body.email,
    }

    await db.collection('usuarios').doc(requestTo).collection('requests').doc(user.userId).set(user).then(() => {
        res.sendStatus(200)
    }).catch(error => {
        res.sendStatus(502);
    })

}

const addFriend = async (req, res) => {
    const user = {
        displayName: req.body.displayName,
        email: req.body.email,
        userId: req.body.userId,
        profilePic: req.body.profilePic,
    }

    const userF = {
        displayName: req.body.displayNameF,
        email: req.body.emailF,
        userId: req.body.userIdF,
        profilePic: req.body.profilePicF,
    }
    await db.collection('usuarios').doc(user.userId).collection('requests').doc(userF.userId).delete().then(() => {
        db.collection('usuarios').doc(user.userId).collection('friends').doc(userF.userId).set(userF).then(() => {
            db.collection('usuarios').doc(userF.userId).collection('friends').doc(user.userId).set(user).then(() => {
                res.sendStatus(200);
            })
        })
    }).catch(error => {
        res.sendStatus(502);
    })

}

/*
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
*/

const getRequestsDB = async (userId) => {
    var data = [];
    await db.collection('usuarios').doc(userId).collection('requests').get().then(result => {
        result.forEach(doc => {
            data.push(doc.data())
        })
    }).catch(error => {
        console.log(error);
    })

    return data;
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
    //getFriends,
    getFriendsDB,
    sendRequest,
    getRequestsDB
}