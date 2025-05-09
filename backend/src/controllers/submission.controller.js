export const getAllSubmissions  = async(req, res) => {
    try {
        const userId = req.user.id;
        submission = await db.submission.findMany({
            where:{
                userId: userId,
            }
        })
        res.status(200).json({
            success:true,
            message:'Submission fetched Successfully.'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'Failed tp fetch submission.'
        })
    }

}

export const getSubmissionForProblem= async (req, res) => {
    try {
        const userId = req.user.id
        const problemId = req.params.problemId
        const submissions = await db.submission.findMany({
            where:{
                userId: userId,
                problemId: problemId,
            }
        })
        res.status(200).json({
            success:true,
            message:'Submission fetched successfully!!!',
            submissions
        })
    } catch (error) {
        console.log('Fetch Submissions Error: ',error)
        res.status(500).json({
            error:'Failed to fetvh submissions.'
        })
    }
}

export const getAllTheSubmissionForProblem = async(req, res) => {
    try {
        const problemId = req.params.problemId
        const submission = await db.submission.count({
            where:{
                problemId:problemId,
            }
        })
        res.status(200).json({
            success:true,
            message: 'Submissions Fetvhed Successfully.',
            count: submission
        })
    } catch (error) {
        console.log('Fetched Submission Error',error)       
        res.status(500).json({
            error:'Failed to fetch submission.'
        })
    }

}