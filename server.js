const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

app.use(express.static("public"));


// Génère un pseudo 4 caractères
function generatePseudo() {

    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";

    let pseudo = "";

    for(let i = 0; i < 4; i++) {

        pseudo += chars[Math.floor(Math.random() * chars.length)];

    }

    return pseudo;

}


// Vérification
async function checkTikTok(username) {

    try {

        const url = `https://www.tiktok.com/@${username}`;


        const response = await axios.get(url, {

            headers: {

                "User-Agent":
                "Mozilla/5.0"

            },

            timeout:5000

        });



        const html = response.data;



        // Page inexistante / compte absent
        if(
            html.includes("Couldn't find this account") ||
            html.includes("Couldn't find this page")
        ){

            return "available";

        }


        return "taken";


    }

    catch(error) {


        return "unknown";


    }

}




app.get("/check", async (req,res)=>{


    const pseudo = generatePseudo();


    const status = await checkTikTok(pseudo);



    res.json({

        pseudo:pseudo,

        url:`https://www.tiktok.com/@${pseudo}`,

        status:status

    });


});




app.listen(3000,()=>{

    console.log("Serveur lancé sur http://localhost:3000");

});