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
    const user = {
        requestTo: req.body.requestTo,
        requestFrom: req.body.requestFrom
    }

    await db.collection('usuarios').doc(user.requestTo).collection('requests').doc(user.requestFrom).set(user).then(() => {
        res.sendStatus(200)
    }).catch(error => {
        res.sendStatus(502);
    })

}

const addFriend = async (req, res) => {
    const user = {
        userId: req.body.userId
    }
    const userF = {
        userId: req.body.userIdF
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

const getRequestsDB = async (request) => {
    var data = [];
    var uids = [];
    await db.collection('usuarios').doc(request).collection('requests').get().then(result => {
        result.forEach(doc => {
            uids.push(doc.data());
        })
    }).then(async () => {
        for (let uid of uids) {
            await db.collection('usuarios').doc(uid.requestFrom).get().then(req => {
                data.push(req.data());
            })
        }
    }).catch(error => {
        console.log(error);
    })

    return data;
}

const getFriendsDB = async (userId) => {
    var data = [];
    var uids = [];
    await db.collection('usuarios').doc(userId).collection('friends').get().then(result => {
        result.forEach(doc => {
            uids.push(doc.data().userId);
        })
    }).then(async () => {
        for (let uid of uids) {
            await db.collection('usuarios').doc(uid).get().then(friend => {
                data.push(friend.data());
            })
        }
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