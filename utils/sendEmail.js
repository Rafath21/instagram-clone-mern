const nodemailer=require("nodemailer");

const sendEmail=(options)=>{
    const transporter=nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        //service: process.env.EMAIL_SERVICE,
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS,
      }
    })
    const mailOptions={
        from: '"Book-sharing app 📔"<rafathsweb@gmail.com>',
        to:options.to,
        subject:options.subject,
        html:options.text,
    }
    transporter.sendMail(mailOptions,function(err,info){
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }
    })
}
module.exports=sendEmail;