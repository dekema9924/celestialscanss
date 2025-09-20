const dotenv = require("dotenv");
dotenv.config();
const port = 3001
const express = require('express')
const apiRouter = require('./routes/apiRouter')
const userRouter = require('./routes/userRouter')
const app = express()
const cors = require('cors')
const runBatch = require('./scripts/fetchAlldetails');
require('./config/mongoose')



//cors config
const allowedOrigins = [
    "http://localhost:5173", // dev
    "https://celestialscans.netlify.app" // prod
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps, curl, postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true // allow cookies to be sent
}));
app.use('/manga', apiRouter)
app.use('/auth', userRouter)




//test route
app.get('/', (req, res) => {

    if (process.env.NODE_ENV === "production") {
        dotenv.config({ path: ".env.production" });
    } else {
        dotenv.config({ path: ".env.development" });


    }
    res.send('celestualScans backend')

})



app.get("/admin/run-batch", async (req, res) => {
    try {
        console.log("Batch started");

        // Run batch in background (don't await it)
        runBatch()
            .then(() => console.log("Batch finished"))
            .catch(err => console.error("Batch failed:", err));

        // Respond immediately
        res.json({ success: true, message: "Batch job started in background" });
    } catch (err) {
        console.error("Failed to trigger batch:", err);
        res.status(500).json({ error: err.message });
    }
});


//start server
app.listen(port, () => {
    console.log(`server open on http://localhost:${port}`)
})
