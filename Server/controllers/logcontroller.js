let Express = require("express");
let router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
//Import the Log Model
const { LogModel } = require("../models");

router.get("/practice", validateJWT, (req, res) => {
    res.send("practice route")
});

/*

Log Create

*/
router.post("/create", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log;
    const { id } = req.user;
    const log = {
        description,
        definition,
        result,
        owner: id
    }
    try {
        const newLog = await LogModel.create(LogEntry);
        res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({ error: err});
    }
    LogModel.create(logEntry)

});

/*

Get all Logs

*/
router.get("/", async (req, res) => {
    try {
        const entries = await LogModel.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err })
    }
});

/*

Get Logs by User

*/
router.get("/mine", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const userLogs = await LogModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userLogs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


/*

Update a Log

*/
router.put("/update/:entryID", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log;
    const logId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
            id: logId,
            Owner: userId
        }
    };
    
    const updatedLog = {
        description: description,
        definition: definition,
        result: result
    };
    
    try {
        const update = await LogModel.update(updatedLog, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});

/*

Delete a Log

*/
router.delete("/delete/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const LogId = req.params.id;

    try {
        const query = {
            where: {
                id: LogId,
                owner: ownerId
            }
        };

        await LogModel.destroy(query);
        res.status(200).json({ message: "Log Removed" });
    } catch (err) {
        res.status(500).json({ message: "Log Removed" });
    }
});
module.exports = router;