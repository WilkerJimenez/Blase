const { admin } = require("../dependencies/dependencies");

const db = admin.firestore();

const search = async (req, res) => {
    const query = req.body.query;
    var data;
    await db.collection('usuarios').where("name", '==', query).get().then(result => {
        result.forEach(doc => {
            data = doc.data();
        })
    }).catch(error => {
        res.send(error)
    });
    res.send(data);
}

module.exports = {
    search
}