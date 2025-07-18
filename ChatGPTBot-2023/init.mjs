import Authenticator from "openai-authenticator";
import { ChatGPTUnofficialProxyAPI, ChatGPTAPI } from 'chatgpt';
import bot from './bot.mjs';

process.on("unhandledRejection", (err) => console.error(err));
process.on("uncaughtException", (err) => console.error(err));

export default async() => {
    console.log('started');
    
    const authenticator = new Authenticator();
    
    /*
    const auth = await authenticator.login('mail@proton.me', 'xxxxxxxxxxxxxx');
    const api = new ChatGPTUnofficialProxyAPI({
        accessToken: auth.accessToken,
        apiReverseProxyUrl: 'https://gpt.pawan.krd/backend-api/conversation'
    });
    */
    const api = new ChatGPTAPI({
        apiKey: 'sk-',
        completionParams: {
            model: 'gpt-4'
        }
    });
    bot(api);
    /*
    console.log('sending')
    const res = await api.sendMessage('Какого быть ботом?', {
        conversationId: 'fb41735b-4fc6-41e3-a674-48531879d50a',
        parentMessageId: '6b3d270d-cf65-4592-b9be-bf2e4b78af27',
        onProgress: async(res) => {
            console.log(res.text);
            console.log('-----');
        }
    })
    console.log(res.text)
    console.log('sending')
    const res2 = await api.sendMessage('2+2=6', {
        conversationId: res.conversationId,
        parentMessageId: res.parentMessageId
    })
    console.log(res2.text)
    console.log(res2.conversationId)
    console.log(res2.parentMessageId)
    */
};