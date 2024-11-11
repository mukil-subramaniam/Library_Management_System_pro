const express = require('express');
const nodemailer = require('nodemailer');
const BookRequest = require('../models/BookRequest'); // Import the BookRequest model
const cron = require('node-cron'); // Import node-cron to schedule tasks

const router = express.Router();

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to another email service if needed
    auth: {
        user: 'kecguesthouse24@gmail.com', // Your email
        pass: 'mwuifougiqfbaksy', // Your email password or app password
    },
});

// Cron job to check overdue books and send emails
cron.schedule('0 0 * * *', async () => { // Runs at midnight every day
    try {
        const today = new Date();
        const overdueRequests = await BookRequest.find({
            action: 'approved', // Only look for approved books
            endDate: { $lt: today }, // Check if the end date is before today
        });

        overdueRequests.forEach(async (request) => {
            const overdueDays = Math.floor((today - new Date(request.endDate)) / (1000 * 60 * 60 * 24)); // Calculate overdue days
            const fineAmount = overdueDays * 1; // Fine is 1 rupee per day

            const mailOptions = {
                from: 'kecguesthouse24@gmail.com', // Sender address
                to: request.email, // Recipient email from fetched data
                subject: `Your book request due date is over`,
                text: `Hello ${request.username},\n\nYour book titled "${request.bookTitle}" was due on ${new Date(request.endDate).toLocaleDateString()}. It is now overdue by ${overdueDays} days, and you owe a fine of ₹${fineAmount}.\n\nPlease return the book as soon as possible.\n\nThank you!`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending overdue email:', error);
                } else {
                    console.log('Overdue email sent:', info.response);
                }
            });
        });
    } catch (error) {
        console.error('Error checking overdue books:', error);
    }
});

// Route to get all book requests
router.get('/data', async (req, res) => {
    try {
        const bookRequests = await BookRequest.find(); // Retrieve all book requests
        res.status(200).json(bookRequests);
    } catch (error) {
        console.error('Error fetching book requests:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to create a new book request
router.post('/req', async (req, res) => {
    const { bookId, username, bookTitle, email } = req.body; // Include email in request

    if (!bookId || !username || !bookTitle) { // Ensure all fields are present
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Create a new book request document
        const newRequest = new BookRequest({
            bookId,
            username,
            bookTitle,
            email, // Store email for notification purposes
            action: 'pending', // Set initial action status
            startDate: new Date(), // Set the start date as current date
            endDate: new Date(new Date().setDate(new Date().getDate() + 15)), // Set end date 15 days from now
        });

        // Save the request to the database
        await newRequest.save();

        console.log(`Request received for Book ID: ${bookId}, Username: ${username}, Book Title: ${bookTitle}`);
        res.status(200).json({ message: 'Request sent to admin successfully' });
    } catch (error) {
        console.error('Error saving book request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to update the action status of a book request (Approve or Reject)
router.put('/update/:id', async (req, res) => {
    const { action } = req.body; // Extract the action from the request body

    if (!['approved', 'rejected'].includes(action)) {
        return res.status(400).json({ message: 'Invalid action. Must be "approved" or "rejected".' });
    }

    try {
        // Find the request by ID and update the action status
        const updatedRequest = await BookRequest.findByIdAndUpdate(
            req.params.id,
            { action }, // Update the action field
            { new: true } // Return the updated document
        );

        if (!updatedRequest) {
            return res.status(404).json({ message: 'Book request not found' });
        }

        // Fetch user data from the database using the ID
        const userData = await BookRequest.findById(req.params.id); // Fetch the same request for user data
        
        // Check if userData contains an email
        if (!userData.email) {
            return res.status(404).json({ message: 'User email not found' });
        }

        // Prepare the email content
        let mailOptions;
        if (action === 'approved') {
            // Calculate the date 15 days from today
            const currentDate = new Date();
            const approvedDate = new Date(currentDate);
            approvedDate.setDate(currentDate.getDate() + 15); // Add 15 days

            // Format the date to a readable string
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedApprovedDate = approvedDate.toLocaleDateString('en-US', options);

            // Prepare email options for approved action
            mailOptions = {
                from: 'kecguesthouse24@gmail.com', // sender address
                to: userData.email, // recipient email from fetched data
                subject: `Your book request has been ${action}`,
                text: `Hello ${userData.username},\n\nYour book request titled "${userData.bookTitle}" has been ${action}. Starting date is ${new Date().toLocaleString()} and the end date is ${formattedApprovedDate}.\n\nThank you!`,
            };
        } else {
            // Prepare email options for rejected action
            mailOptions = {
                from: 'kecguesthouse24@gmail.com', // sender address
                to: userData.email, // recipient email from fetched data
                subject: `Your book request has been ${action}`,
                text: `Hello ${userData.username},\n\nYour book request titled "${userData.bookTitle}" has been ${action}.\n\nThank you!`,
            };
        }

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Internal server error while sending email' });
            }
            console.log('Email sent:', info.response);
        });

        res.status(200).json({ message: 'Request status updated successfully', updatedRequest });
    } catch (error) {
        console.error('Error updating book request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router; // Export the router
