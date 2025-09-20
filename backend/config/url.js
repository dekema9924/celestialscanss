
const dotenv = require('dotenv');

// Load .env file depending on NODE_ENV
const envFile =
    process.env.NODE_ENV === "production"
        ? ".env.production"
        : ".env.development";

dotenv.config({ path: envFile });

module.exports = {
    PORT: process.env.PORT || 3001,
    MongooseUrl: process.env.MONGOOSE_URI,
    APIURL: process.env.APIURL,
    BASE_URL: process.env.BASE_URL,
    NODE_ENV: process.env.NODE_ENV,
};
