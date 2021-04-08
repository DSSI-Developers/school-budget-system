const Notification = require('../models/notification');

exports.pushNotification = (req, res, next) => {
    // const { type, status, detail, note } = req.body;
    const notic = new Notification({
        type: req.body.type,
        status: req.body.status,
        detail: req.body.detail,
        note: req.body.note,
        userId: req.body.userId,
        readStatus: false,
        creator: req.userData.userId
    });
    console.log(notic);
    if (!notic) {
        res.status(401).json({
            message: "Don't have data"
        });
    }
    notic.save().then((data) => {
        // res.send(data);
        res.status(201).json({
            message: data
        });
    }).catch(err => {
        res.status(401).json({
            message: err.message || "ไม่สามารถสร้างการเเจ้งเตือนได้ Notification"
        });
    });
}

exports.getOneNotification = (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    // res.end(id);
    Notification.findById(id).then(data => {
        if (!data) {
            res.status(404).json({ message: "Not found Notification" })
        } else res.status(201).json({ response: data });
    }).catch(err => {
        res.status(500).json({ message: "Error get notification" + err })
    });
}

exports.getAllNotification = (req, res, next) => {
    var mysort = { dateTime: -1 };
    Notification.find().sort(mysort).then(data => {
        res.status(201).json({
            message: "All notification",
            notification: data
        });
    }).catch(err => {
        msg: err.msg || "Some error occurred while retrieving data. "
    });
}

exports.deleteOneNotification = (req, res, next) => {
    const id = req.params.id;
    Notification.findByIdAndDelete(id).then(data => {
        if (!data) {
            res.status(404).send({
                msg: "Cannot delete Notification with =" + id
            });
        } else {
            res.send({
                msg: "Notification was deleted successfully"
            });
        }
    }).catch(err => {
        res.status(500).send({ msg: err.msg || "Could not delete Notitfication" + id });
    });
}

exports.deleteAllNotification = (req, res, next) => {
        Notification.deleteMany({}).then(data => {
            res.status(201).send({
                msg: `${data.deleteCount} Notification were deleteed successfully`
            });
        }).catch(err => {
            res.status(500).send({
                msg: err.msg || "Some error occurred while removeing all Notifications"
            });
        });
    }
    // }

exports.editNotification = (req, res, next) => {
    const id = req.params.id;
    const notific = req.body;
    console.log(id)
    console.log(notific);
    Notification.findByIdAndUpdate(id, notific, { useFindAndModify: false }, function(err, docs) {
        if (err) {
            res.send({ msg: err.msg })
        } else {
            res.status(201).send({
                msg: docs
            });
        }
    })
}