const prompt = require("prompt-sync")()
const axios = require("axios")

const url = 'http://localhost:3000/post'



const word = prompt("Enter english word for translation:");
let args = {
    word: word
};


axios.post(url,args).then( response => {
    console.log(response.data)
})