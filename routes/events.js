const express = require('express');
const router = express.Router();
const Event = require('../database/events');

// This route returns all events stored in database
router.get('/allevents', async (req, res)=>{
    try{
        const events = await Event.find({}).exec(); 
        res.status(200).json({ events });
    }catch(error){
        res.json({
            success: false,
            error: error,
            message: "Couldn't retrieve details"
        })
    }
});

// Adds a new event to the database.
router.post('/addevent', async(req,res)=>{
    try{   
        const { start, end, title } = await req.body;
        const eventDetails = new Event({
            start: start,
            end: end,
            title: title
        })        
        const savedEventDetails = await eventDetails.save();
        res.status(200).json({
            success: true,
            results: savedEventDetails,
            message: "Insertion success"
        })    
    }catch(err){
        console.log(err);
        res.status(200).json({
            success: false,
            error: err,
            message: "Insertion failed"
        })
    }
})

// Updates an existing event in database
router.post('/updateevent', async(req,res)=>{
    try{   
        const { eventid, start, end, title } = await req.body;
        // Find event by _id.
        const eventDetails = await Event.findOne({_id: eventid}).exec();
        // Update start, end and title values and save in database
        eventDetails.start = start;
        eventDetails.end = end;
        eventDetails.title = title;
        const savedEventDetails = await eventDetails.save();
        res.status(200).json({
            success: true,
            results: savedEventDetails,
            message: "Update success"
        })        
    }catch(err){
        console.log(err);
        res.status(200).json({
            success: false,
            error: err,
            message: "Update failed"
        })
    }
})

// Delete event from database based on _id
router.post('/deleteevent', async(req,res)=>{
    try{   
        const { eventid } = await req.body;
        const deletedEventDetails = await Event.findByIdAndDelete({ _id: eventid}).exec();
        res.status(200).json({
            success: true,
            results: deletedEventDetails,
            message: "Delete success"
        })       
    }catch(err){
        console.log(err);
        res.status(200).json({
            success: false,
            error: err,
            message: "Delete failed"
        })
    }
})

module.exports = router;