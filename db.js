const mongoose = require('mongoose')
const config = require('config')

const db = config.get('mongoURI')

//mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

const connectDB = async () => {
    try {
        await mongoose.connect(db)
        console.log('MongoDB Connected...')
    } catch (error) {
        console.error(error.message)
        // exit process with faillure
        process.exit(1)
    }
}

module.exports = connectDB