const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const PORT = 3000;
app.use(bodyParser.urlencoded({
    extended: true
    }));

    const config = {
        apiKey: "test-5a94a542-653f-4713-86ff-9d71afcc24b8"
    }

    const ma = require('mojoauth-sdk')(config)

    let email = "hardik.1rn16ec036@gmail.com";
    let query = {
        "language": "javascript",
        "redirect_url":"https://www.google.com"
    };
    let state_id,OTP;

     ma.mojoAPI
            .signinWithEmailOTP(email, query)
            .then(response => {
                // console.log(response);
                state_id = response.state_id;
                const readline = require('readline').createInterface({
                    input: process.stdin,
                    output: process.stdout,
                  });

                  readline.question(`What's your otp?`, otp => {
                    OTP = otp;
                   
                    console.log(OTP,state_id, "ois");
                    ma.mojoAPI
                        .verifyEmailOTP(OTP, state_id)
                        .then(response => {
                            console.log(response,"verification")
                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                        .finally(() => readline.close());
                  });

            })
            .catch(function (error) {
                console.log(error)
            })

            .catch((err) => console.log(err));
    

//   let jwtToken ;

//   ma.mojoAPI.verifyToken(jwtToken).then(function (response) {
//     console.log(response)
//   }).catch(function (error) {
//     console.log(error)
//   });

app.listen(PORT, () => console.log('App can be accessed at localhost:' +PORT))


