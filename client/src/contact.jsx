import React, { useState } from 'react';
import '../src/src-CSS/general.css';

export default function Contact() {
  // 1. Use 'state' to keep track of the form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  // 2. Function to update the 'state' when the user types
  const handleChange = (e) => {
    // [e.target.name] matches the input's 'name' attribute (e.g., 'firstName')
    setFormData({
      ...formData, // Keep the existing data
      [e.target.name]: e.target.value, // Update the specific field
    });
  };

  // 3. Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the browser from refreshing the page (default form behavior)

    try {
      // Send the form data to your backend API
      const response = await fetch('/api/contact', {
        method: 'POST', // Use POST to send new data
        headers: {
          'Content-Type': 'application/json', // Tell the server we are sending JSON
        },
        body: JSON.stringify(formData), // Convert the JavaScript object to a JSON string
      });

      // Check if the server responded successfully
      if (response.ok) {
        alert('Message sent successfully!');
        // Clear the form after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: '',
        });
      } else {
        // Handle server errors (like a 500 error)
        alert('Failed to send message. Please try again.');
        console.error('Server response was not ok:', response.statusText);
      }
    } catch (error) {
      // Handle network errors (like no internet connection)
      console.error('Error submitting form:', error);
      alert('A network error occurred.');
    }
  };

  return (
    <>
      <p className="header">My Contact Information: </p>
      <p>Email: adamepaolojp@domain.com</p>
      <p>Phone: (437) XXX-7890</p>

      <hr />

      {/* 4. Attach the new 'handleSubmit' function to the form */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <p>Leave a message:</p>
        
        {/* 5. Update inputs: use 'name', 'value' from state, and 'onChange' */}
        <label htmlFor="firstName">First Name:</label>
        <input 
          type="text" 
          id="firstName" 
          name="firstName" // Important: matches the key in formData state
          value={formData.firstName}
          onChange={handleChange}
          required 
        />

        <label htmlFor="lastName">Last Name:</label>
        <input 
          type="text" 
          id="lastName" 
          name="lastName" // Important
          value={formData.lastName}
          onChange={handleChange}
          required 
        />

        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          name="email" // Important
          value={formData.email}
          onChange={handleChange}
          required 
        />

        <label htmlFor="message">Message:</label>
        <textarea 
          id="message" 
          name="message" // Important
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Send</button>
        <br></br>
        {/* The Reset button now uses the state setter to clear the form */}
        <button type="button" onClick={() => setFormData({ firstName: '', lastName: '', email: '', message: '' })}>
          Reset
        </button>
      </form>
    </>
  );
}