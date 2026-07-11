const mongoose = require("mongoose")


/**
 * - Jon Description Schema : String
 * - resume Text : String
 * - Self Description : String
 * 
 * - Match Score : Number
 * 
 * - Technical Questions : 
 *   [
 *      {
 *          question : "",
 *          intention : "",
 *          answer : ""
 *      }
 *    ]
 * - Behavioral Questions :
 *    [
 *        {
 *          question : "",
 *          intention : "",
 *          answer : ""
 *      }
 *     ]
 * - Skill Gaps : [{
 *          skills : "",
 *          severity {
 *              type : String,
 *              enum : ["log", "medium", "high"]
 *          }
 *      }]
 * - Preparation Plan : [{
 *          day : Number,
 *          focus : String,
 *          task : [String]
 *      }]
 */


const technicalQuestionSchema = new mongoose.Schema({
    question : {
        type : String,
        required : [true, "Question is required"]
    },
    intention : {
        type : String,
        required : [true, "Intention is required"]
    },
    answer : {
        type : String,
        required : [true, "Answer is required"]
    }
}, {_id : false})

const behavioralQuestionSchema = new mongoose.Schema({
    question : {
        type : String,
        required : [true, "Question is required"]
    },
    intention : {
        type : String,
        required : [true, "Intention is required"]
    },
    answer : {
        type : String,
        required : [true, "Answer is required"]
    }
}, {
    _id : false
})

const skillGapSchema = new mongoose.Schema({
    skill : {
        type : String,
        required : [true, "Skill is required"]
    },
    severity : {
        type : String,
        enum : ["Low", "Medium", "High"],
        required : [true, "Severity is required"]
    }
}, {
    _id : false
})

const preparationPlanSchema = new mongoose.Schema({
    day : {
        type : String,
        required : [true, "Day is required"]
    },
    focus : {
        type : String,
        required : [true, "Focus is required"]
    },
    topic : [{
        type : String,
        required : [true, "Topic is required"]
    }
    ]
})

const inerviewReportSchema = new mongoose.Schema({
    jobDescription : {
        type : String,
        required : [true, "Job Description is required"]
    },
    resumeText : {
        type : String,
        
    },
    selfDescription : {
        type : String,
        
    },
    matchScore : {
        type : Number,
        min : 0,
        max : 100
    },
    technicalQuestions : [technicalQuestionSchema],
    behavioralQuestions : [behavioralQuestionSchema],
    skillGap : [skillGapSchema],
    preparationPlan : [preparationPlanSchema]
}, {
    timestamps : true
})

const interviewReportModel = mongoose.model("InterviewReport", inerviewReportSchema)

module.exports = interviewReportModel;