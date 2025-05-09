import { db } from "../libs/db.js"
import { getJudge0LanguageId, pollBatchResults, submitBatch } from "../libs/judge0.libs.js"
export const createProblem = async(req, res) => {
    /**
     * Going to get all the data from req body
     * Going to check user role once again.
     * Loop through ref sol in diff lang.
     * Inside the loop : 1. Lang Id from judge0
     */
    
        const {title, description, difficulty, tags, examples, constraints, testcases, codeSnippets, referenceSolutions} = req.body
        if(req.user.role !== 'Admin') {
            return res.status(403).json({
                error:'You are not allowed to create a problem.'
            })
        }
        try {
            for (const [language, solutionCode] of Object.entries(referenceSolutions) ) {
                const languageId = getJudge0LanguageId(language)

                if(!languageId) {
                    return res.status(400).json({
                        error:' Language not supported. '
                    })
                }
                const submissions = testcases.map(({input, output})=>({
                    source_code: solutionCode,
                    language_id:languageId,
                    stdin: input,
                    expected_output: output,

                }))

                const submissionResults = await submitBatch(submissions)
                const tokens = submissionResults.map((res) => res.token)

                const results = await pollBatchResults(tokens)

                for(let i =0;i<results.length;i++) {
                    const res = results[i]

                    if (results.status.id !== 3 ) {
                        return res.status(400).json({
                            error:'Test cases failed'
                        })
                    }
                }

                //Save the problem in DB
                const newProblem = await db.problem.create({
                    data:{
                        title, description, difficulty, tags, examples, constraints, testcases, codeSnippets, referenceSolutions, userId: req.user.id,
                    },

                })

                return res.status(201).json(newProblem)
            }
        
        } catch (error) {
            
        }

}
export const getAllProblems = async(req, res) => {
    try {
        const problems = await db.problem.findMany()

        if(!problems){
            return res.status(404).json({
                success: true,
                message: 'Message fteched successfully.',
                problems
            })
        }


    } catch (error) {
        return res.status(500).json({
            error: ' error while Fetching problem.'
        })
    }

}

export const getProblemById = async(req, res) => {
    const {id} = req.params

    try {
        const problem = await db.problem.findUnique({
            where:{
                id
            }
        })

        if(!problem) {
            return res.status(404).json({
                error:'Problem not found.'
            })
        }

        return res.status(200).json({
            success:true,
            message:"Message Created Successfully.",
            problem
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Error while fetching by id.'
        })
        
    }
}

export const updateProblem = async(req, res) => {
    //id,
    //id-->problem
    //create problem
    //Assignment🔥
}

export const deleteProblem = async(req, res) => {

    const {id} = req.params
    try {
        const problem = await db.problem.findUnique({
            where:{id}
        })
    
        if(!problem) {
            return res.status(404).json({
                error:'Problem not found.'
            })
        }
    
        await db.problem.delete({
            where:{id}
        })
    
        res.status(200).json({
            success:true,
            message:'Problem delted successfully.'
        })//why not return here????
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:'Error while deleting Problem.'
        })
    }
}

export const getAllProblemsSolvedByUser = async(req, res) => {
    try {
        const problems = await db.problem.findMany({
            where:{
                solvedBy: {
                    some:{
                        userId: req.user.id
                    }
                }
            },
            include:{
                solvedBy:{
                    where:{
                        userId:req.user.id
                    }
                }
            }
        })
        res.status(200).json({
            success:true,
            message:'Problems fetched successfully.!',
            problems
        })
    } catch (error) {
        console.log('Error in getting all probems by user')
        res.status(500).json({
            error:'Failed to get problem.'
        })
    }
}
