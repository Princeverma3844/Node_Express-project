const mongoose = require("mongoose");
const connectionString = 'mongodb+srv://princev3844:Prince14%40@princecluster.zsdovyq.mongodb.net/contact_backend?retryWrites=true&w=majority';

const connectDb = async () => {
    try {
        const connection = await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database Connected ", connection.connection.name);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDb;
