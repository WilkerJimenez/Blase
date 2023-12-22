const { admin } = require("../dependencies/dependencies");
const { auth } = require("../dependencies/dependencies");
const db = admin.firestore();

const update = (req, res) => {
    const userInfo = {
        id: req.body.id,
        displayName: req.body.displayName,
        profilePic: req.body.profilePic
    }

    auth.updateProfile(auth.getAuth().currentUser, {
        photoURL: userInfo.profilePic,
        displayName: userInfo.displayName
    }).then(() => {
        db.collection("usuarios").doc(userInfo.id).update(userInfo);
        res.sendStatus(200)
    }).catch(error => {
        console.log(error)
    })

}

module.exports = {
    update
}