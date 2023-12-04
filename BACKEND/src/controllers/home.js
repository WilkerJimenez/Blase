const { admin } = require("../dependencies/dependencies");

const db = admin.firestore();

const search = async (req, res) => {
    const query = req.body.query;
    var data = [];
    await db.collection('usuarios').where("displayName", '==', query).get().then(result => {
        result.forEach(doc => {
            data.push(doc.data())
        })
    }).catch(error => {
        res.send(error)
    });
    res.send(data);

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

module.exports = {
    search,
    addFriend
}