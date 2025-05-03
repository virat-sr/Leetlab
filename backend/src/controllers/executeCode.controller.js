import { pollBatchResults, submitBatch } from "../libs/judge0.libs.js";

export const executeCode =  async(req, res) => {

    try {
        const {sourceCode, language_id, stdin, expected_output, problemId} = req.body;
        const userId = req.user.id;

        //Validate the test cases
        if (!Array.isArray(stdin) || std.length === 0 || 
            !Array.isArray(expected_output) ||
            expected_output.length !== stdin.length
            )
            {
                return res.status(400).json({
                    error: "Invalid or missing Test Cases."
                })
            }

         // 2. prepare each test cases for judge0 batch submission
         const submission = stdin.map( (input) => ({
            sourceCode,
            language_id,
            stdin: input,
         }))   

         // 3. Send this batch to judge 0
         const submitResponse = await submitBatch(submission)

         const tokens = submitResponse.map((res) => res.tokens)

         // 4. Poll judge0 for results of all submitted test cases
         const results = await pollBatchResults(tokens)

         console.log('Reuslts -------')
         console.log(results)

         res.status(200).json({
            message: 'Code Exceuted!'
         })
    } catch (error) {
        res.status(401).json({
            message:"Error in executed code"
        })   
    }
}