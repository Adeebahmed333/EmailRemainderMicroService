const express = require("express");
const { PORT, DB_SYNC } = require("./config/server-config");
const bodyParser = require("body-parser");
const { sendBasicEmail } = require("./services/email-service");
const node_cron = require("node-cron");
const TicketController = require("./controllers/ticket-controller");
const jobs = require("./utils/job");
// const apiRoutes=require('./routes/index');
// const db=require('./models/index');
const {createChannel,subscribeMessage}=require('./utils/messageQueue');
const {REMINDER_BINDING_KEY}=require('./config/server-config');
const EmailService=require('./services/email-service');
const app = express();

const prepareAndStartServer = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // app.use('/api',apiRoutes);
  const channel =await createChannel();
  subscribeMessage(channel,EmailService,REMINDER_BINDING_KEY);
  app.post("/api/v1/tickets", TicketController.create);

  app.listen(PORT, () => {
    console.log(`Server Started on PORT: ${PORT}`);
    if (DB_SYNC == true) {
      db.sequelize.sync({ alter: true });
    }
    // jobs();
    // sendBasicEmail('support@admin.com',
    // 'adeebahmed337@gmail.com',
    // 'This is a testing Email',
    // 'Hey,How are you?'
    // );
  });
};

prepareAndStartServer();
