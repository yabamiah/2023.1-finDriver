const { createClient } = require("@supabase/supabase-js");
const { User } = require("../model/userModel")
var bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

require("dotenv").config();

const supabase = createClient(
  process.env.DATABASE_URL,
  process.env.DATABASE_KEY
);

async function loginUserWithToken(User) {
    try {
        userEmail = User.email;
        userPassword = User.password;

        if (!(userEmail && userPassword)) {
            return "Todos os campos são necessários";
        }

        const { data } = await supabase
            .from("Users")
            .select("id, email, password")
            .eq('email', userEmail);
        
            if (bcrypt.compareSync(User.password, (data[0].password).toString())) {
                const token = jwt.sign(
                    { user: data },
                    secret,
                    { expiresIn: 86400},
                    process.env.TOKEN_KEY,
                )
            const config = {
                headers: {
                'Authorization': `Bearer ${token}`
                }
            }

            return config;
    } else {
        return "Credenciais inválidas"
    }

    } catch(error) {
        console.log(error);
    }
}

async function logoutUserWithToken(token) {
    const { data, error } = await supabase
        .from("Users")
        .select("token")
        .eq('token', token)

    if (error) {
        console.log("Token não encontrado");
        throw error;
    }

    const decodedToken = jwt.verify(data[0].token , process.env.TOKEN_KEY);
    decodedToken.exp = Math.floor(Date.now() / 1000) - 60;

    const newPayload = {
        user: decodedToken.user,
    };
    
    const newToken = jwt.sign(newPayload, process.env.TOKEN_KEY);

    const config = {
        headers: {
        'Authorization': `Bearer ${newToken}`
        }
    }

    return config;
}



module.exports = { loginUserWithToken, logoutUserWithToken };