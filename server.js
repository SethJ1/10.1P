const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Use the cors middleware to allow cross-origin requests
app.use(cors());

// Configure Nodemailer with your email service provider
const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: 'sethj4774@gmail.com',
    pass: 'xeia flur xbzr azwu',
  },
});

// API endpoint for subscribing to the newsletter
app.post('/api/subscribe', async (req, res) => {
  console.log('Received POST request to /api/subscribe');
  const { email } = req.body;

  // Send a welcome email to the user
  const mailOptions = {
    from: 'sethj4774@gmail.com',
    to: email,
    subject: 'Welcome to Our Newsletter!',
    text: 'Thank you for subscribing to our newsletter!',
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully');
    res.status(200).send('Subscribed successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to subscribe');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
