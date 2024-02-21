const cron = require("node-cron");
const {
  sendBasicEmail,
  fetchPendingEmails,
  updateTicket
} = require("../services/email-service");
const sender=require('../config/email-config');
const setupJobs = () => {
  cron.schedule("*/1 * * * *", async () => {
    //console.log('Task Running Every Fifth Mins');
    const response = await fetchPendingEmails();
    response.forEach((email) => {
      // sendBasicEmail(
      //   "reminderService@gmail.com",
      //   email.recipientEmail,
      //   email.subject,
      //   email.content
      // );
      sender.sendMail({
        to:email.recipientEmail,
        subject:email.subject,
        text:email.content
      },async(err,data)=>{
           if(err)
           {
            console.log(err);
           }else
           {
            console.log(data);
            await updateTicket(email.id,{status:"SUCCESS"});
           }
      }
      );
    });
    console.log(response);
  });
};
module.exports = setupJobs;
