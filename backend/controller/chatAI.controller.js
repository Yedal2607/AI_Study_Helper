import AskIA from "../service/chatAi.service.js" 


export const chatIA = async (req,res)=>{

    const {message} = req.body;

    const anwser = await AskIA(message);

    res.status(200).json({response: anwser})

    


}