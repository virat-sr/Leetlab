import axios from 'axios';

import dotenv from 'dotenv'
dotenv.config()
const x = process.env.JUDGE0_API_KEY
export const getJudge0LanguageId = (Language) => {
    const languageMap = {
        "PYTHON":71,
        "JAVA":62,
        "JAVASCRIPT":63,
    }
    return languageMap[Language.toUpperCase()]
}

export const submitBatch = async(submissions) => {
    const options = {
        method: "POST",
        url: 'https://judge0-ce.p.sulu.sh/submissions/batch',
        params: { base64_encoded: "false" },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${x}`,  
        },
        data: { submissions },
      };
    const {data} = await axios.request(options)
    console.log('tokens data clg',data)
    return data
}
const sleep = (ms) => {
    new Promise( (resolve) => setTimeout(resolve, ms))
}
export const pollBatchResults = async(tokens) => {
    //Polling mechanism
    while(true) {
        const options = {
            method: "GET",
            url: 'https://judge0-ce.p.sulu.sh/submissions/batch',
            params: { base64_encoded: "false",tokens: tokens.join(','), },
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${x}`
            },
          };
        const {data} = await axios.request(options)
        console.log('1111',data)
        const results = data?.submissions
        const isAllDone = results.every(
            (r)=>r.status.id !== 1 && r.status.id !== 2)
        
        if (isAllDone) return results

        await sleep(1000)
    }
}

export function getLanguageName(languageId) {
    const LANGUAGE_NAMES = {
        74: "Typescript",
        63: "Javascript",
        71: "Python",
        62: "Java"
    }
    return LANGUAGE_NAMES[languageId] || 'Unknown'
}