const express = require("express");
const router = express.Router();
const Subscriber = require("../model/subscriber");
// Definition of All Routes

// Get all subscribers
router.get("/", async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get One Subscriber
router.get("/get/:id", getSubscriberbyId, (req, res) => {
    res.json(res.subscriber_);
});

// Create One Subscriber
router.post("/create", async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedChannel: req.body.subscribedChannel
    });
    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
});

// Update One Subscriber
// Put => All update where Patch just limited update
router.patch("/update/:id", getSubscriberbyId, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber_.name = req.body.name;
    }
    if (req.body.subscribedChannel != null) {
        res.subscriber_.subscribedChannel = req.body.subscribedChannel;
    }
    try {
        const updateScriber = await res.subscriber_.save();
        res.json(updateScriber);
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
});

// Delete One Subscriber
router.delete("/delete/:id", getSubscriberbyId, async (req, res) => {
    try {
        await res.subscriber_.remove();
        res.json({ message: "Deleted This Subscriber" });
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware Function
async function getSubscriberbyId(req, res, next) {
    try {
        subscriberf = await Subscriber.findById(req.params.id);
        if (subscriberf == null) {
            return res.status(404).json({ message: "Cant find Subscriber" });
        }
    } catch (error) {
        return res.status(500).json({ message: err.message });
    }
    res.subscriber_ = subscriberf;
    next();
}

// Exporting the Router
module.exports = router;
