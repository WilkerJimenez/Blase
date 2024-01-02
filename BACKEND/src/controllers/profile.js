const { admin } = require("../dependencies/dependencies");
const db = admin.firestore();


const update = async (req, res) => {
    const userInfo = {
        id: req.body.id,
        displayName: req.body.displayName,
        profilePic: req.body.profilePic
    }

    admin.auth().updateUser(userInfo.id, {
        displayName: userInfo.displayName,
        photoURL: userInfo.profilePic
    }).then(() => {
        db.collection("usuarios").doc(userInfo.id).update(userInfo);
        res.sendStatus(200)
    }).catch(error => {
        console.log(error)
    })


    /*
    auth.updateProfile(auth.getAuth().currentUser.getIdToken(), {
        photoURL: userInfo.profilePic,
        displayName: userInfo.displayName
    }).then(() => {
        db.collection("usuarios").doc(userInfo.id).update(userInfo);
        res.sendStatus(200)
    }).catch(error => {
        console.log(error)
    })*/

}

module.exports = {
    update
}