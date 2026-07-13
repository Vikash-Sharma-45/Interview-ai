const { GoogleGenAI } = require("@google/genai");
const {z} = require("zod")
const {zodToJsonSchema} = require("zod-to-json-schema")

const ai = new GoogleGenAI({
    apiKey : process.env.GOOGLE_GENAI_API_KEY


});

const interviewReportSchema = z.object({
    matchScore : z.number().describe("A score between 0 to 100 indicating how well the candidates profile is macthing the job description"),
    technicalQuestions : z.array(z.object({
        question : z.string().describe("The technical question can be asked in the interview"),
        intention : z.string().describe("The intention of the interviewer behind asking this question "),
        answer : z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical question that can be asked in the interview along with their intention and how to answer them"),

    behavioralQuestions : z.array(z.object({
        question : z.string().describe("The technical question can be asked in the interview"),
        intention : z.string().describe("The intention of the interviewer behind asking this question "),
        answer : z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral question that can be asked in the interview along with their intention and how to answer them"),

    skillGap : z.array(z.object({
        skills : z.string().describe("The skill which candidate is lacking"),
        severity : z.enum(["low", "medium", "high"]).describe("The severity of this skill gap")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),

    preparationPlan : z.array(z.object({
        day : z.number().describe("The day number in the preparation plan, starting from 1"),
        foucs : z.string().describe("The main focus of this day in the preparation plan, e.g data structures"),
        task : z.array(z.string().describe("List of task to be done on this day to follow the preparation plan"))
    })).describe("A day-wise preparation plan for the candidate in order to prepare for the interview effectively")
})

async function generateInterviewReport({resume, selfDescription, jobDescription}){

    const prompt = `Generate an interview report for a candidate with the following details : Resume : ${resume} Self Description : ${selfDescription} Job Description : ${jobDescription}`

    const response = await ai.models.generateContent({

        model: "gemini-flash-latest",
        contents : prompt,
        config : {
            responseMimeType : "application/json", 
            responseSchema : zodToJsonSchema(interviewReportSchema)
        }


    })

    return JSON.parse(response.text)
}

// async function listModels() {
//   const pager = await ai.models.list();

//   for await (const model of pager) {
//     console.log(model.name);
//   }
// }



module.exports = generateInterviewReport
// module.exports = listModels