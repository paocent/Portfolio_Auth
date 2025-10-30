import React from 'react';
import './contact.css';

export default function Contact() {
    
return (
<>
<p className="header">My Contact Information: </p>
<p>Email: adamepaolojp@domain.com</p>
<p>Phone: (437) XXX-7890</p>

<hr />

  {/* When submitted will redirect them back to the Home Page */}
    <form className="contact-form" action="/" method="GET">
      <p>Leave a message:</p>
  <label htmlFor="first-name">First Name:</label>
  <input type="text" id="first-name" name="first-name" required />

  <label htmlFor="last-name">Last Name:</label>
  <input type="text" id="last-name" name="last-name" required />

  <label htmlFor="email">Email:</label>
  <input type="email" id="email" name="email" required />

  <label htmlFor="message">Message:</label>
  <textarea id="message" name="message" required></textarea>

  <button type="submit">Send</button>
  <br></br>
  <button type="reset">Reset</button>

</form>


</>
);
}