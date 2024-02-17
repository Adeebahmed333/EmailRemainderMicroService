const dotenv=require('dotenv');

dotenv.config();

module.exports={
    PORT:process.env.PORT,
    DB_SYNC:process.env.DB_SYNC,
    EMAIL_ID:process.env.EMAIL_ID,
    EMAIL_PASS:process.env.EMAIL_PASS
}