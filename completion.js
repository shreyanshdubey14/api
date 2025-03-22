// api/completions.js
     const axios = require('axios');

     module.exports = async (req, res) => {
       try {
         // Extract the request body
         const { model, prompt, max_tokens } = req.body;

         // Call your existing API
         const response = await axios.post('https://api-provider-b5s7.onrender.com/api/answer', {
           prompt,
           model
         });

         // Transform the response to match OpenAI's format
         const openaiResponse = {
           id: "cmpl-12345",
           object: "text_completion",
           created: Math.floor(Date.now() / 1000),
           model: model,
           choices: [{
             text: response.data.answer,
             index: 0,
             logprobs: null,
             finish_reason: "length"
           }],
           usage: {
             prompt_tokens: prompt.split(' ').length,
             completion_tokens: response.data.answer.split(' ').length,
             total_tokens: prompt.split(' ').length + response.data.answer.split(' ').length
           }
         };

         // Send the transformed response
         res.status(200).json(openaiResponse);
       } catch (error) {
         console.error(error);
         res.status(500).json({ error: error.message });
       }
     };
