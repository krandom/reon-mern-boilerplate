var nodemailer = require('nodemailer');

transporter.verify((err, success) => {
	if (error) {
		console.log(error);
	} else {
		console.log('Server is ready to take our messages');
	}
});

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8fe6489bcd18b7", //generated by Mailtrap
    pass: "c0f9812da77bc4" //generated by Mailtrap
  }
});