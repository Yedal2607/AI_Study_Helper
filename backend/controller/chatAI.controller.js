import AskAI from "../service/chatAi.service.js" 


export const chatAI = async (req,res)=>{

    const {message} = req.body;

    const anwser = await AskAI(message);

    res.status(200).json({response: anwser})

    


}