const express = require('express');
const mongoose = require('mongoose');
const assignmentSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    quizId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    gamepin:{
        type:String,
        required:true
    },
    endDate:{
        type:Date
    }


},{timestamps:true});

const Assignment = mongoose.model('Assignment',assignmentSchema);

module.exports = Assignment;