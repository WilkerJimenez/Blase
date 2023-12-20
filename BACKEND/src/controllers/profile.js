const { admin } = require("../dependencies/dependencies");
const { auth } = require('../dependencies/dependencies')
const db = admin.firestore();

const updateUser = (req, res) => {
    const userInfo = {
        displayName: req.body.displayName,
        profilePic: req.body.profilePic
    }

    if (userInfo.displayName === '' && userInfo.profilePic !== '') {
        auth.updateProfile(auth.getAuth().currentUser, {
            photoURL: user.profilePic
        }).then(()=>{
            
        })
        .catch(error => {
            console.log(error)
        })
    } else if (userInfo.displayName !== '' && userInfo.profilePic === '') {
        auth.updateProfile(auth.getAuth().currentUser, {
            displayName: user.displayName
        }).catch(error => {
            console.log(error)
        })
    } else {
        auth.updateProfile(auth.getAuth().currentUser, {
            displayName: user.displayName,
            photoURL: user.profilePic
        }).catch(error => {
            console.log(error)
        })
    }
}

module.exports = {
    updateUser
}