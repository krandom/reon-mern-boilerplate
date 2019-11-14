const mongoose = require("mongoose");
// const config = require('config');
// const mongoURI = config.get('mongoURI');

const connectDB = async () => {
	try {
		await mongoose.connect('mongodb://localhost/reon-mern-boilerplate', {
			useNewUrlParser: true,
			useCreateIndex: true,
		});

		console.log("MongoDB successfully connected");
	} catch(err) {
		console.error('Error connecting to mongoose', err);

		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
// Connect to MongoDB
// mongoose
// 	.connect(mongoURI)
//   .then(() => console.log("MongoDB successfully connected"))
//   .catch(err => console.log(err));