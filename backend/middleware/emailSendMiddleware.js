const {transporter} = require("../middleware/emailConfigMiddleware");
 const sendVerificationEmail=async(email,verificationCode)=>{
    try {
     const response=  await transporter.sendMail({
            from: '"College Event Management System" <i.sksingh113@gmail.com>',
            to: email, // list of receivers
            subject: "Verify your Email", // Subject line
            text: "Verify your Email", // plain text body
            html: verificationCode,
        })
        console.log('Email send Successfully',response)
    } catch (error) {
        console.log('Email error',error)
    }
}
const sendWellcomeEmail=async(email,name)=>{
    try {
     const response=   await transporter.sendMail({
            from: '"College Event Management System" <i.sksingh113@gmail.com>',

            to: email, // list of receivers
            subject: "Wellcome Email", // Subject line
            text:  `Welcome, ${name}! We are glad to have you with us.`, // plain text body
            html: `<p>Welcome, <strong>${name}</strong>! We are glad to have you with us.</p>`,
        })
        console.log('Email send Successfully',response)
    } catch (error) {
        console.log('Email error',error)
    }
}
module.exports={sendVerificationEmail,sendWellcomeEmail};