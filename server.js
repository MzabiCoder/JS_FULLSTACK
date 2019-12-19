const express = require("express");
const app = express();
const connectDB = require('./db')


app.use(express.json({
    extended: false
}))

// Connect Databa
connectDB()



// define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/post', require('./routes/api/post'))
app.use('/api/profile', require('./routes/api/profile'))


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is up and runnign on ${PORT}...`);
});