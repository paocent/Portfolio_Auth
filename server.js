import config from './config/config.js'
import app from './server/express.js' // This uses the revised express.js below
import mongoose from 'mongoose'

mongoose.Promise = global.Promise

mongoose.connect(config.mongoUri, {
    //useNewUrlParser: true,
    //useCreateIndex: true,
    //useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to the database!");
    });

mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my Portfolio Application, Now Connected to MongoDB" });
});

app.listen(config.port, (err) => { // Uses config.port which should be process.env.PORT
    if (err) {
        console.log(err);
    }
    console.info('Server started on port %s.', config.port);
});