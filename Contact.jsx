import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('Sending... ⏳');

    // AAPKE CREDENTIALS YAHAN HAIN:
    const SERVICE_ID = "YOUR_SERVICE_ID"; // <--- Yahan apna Service ID likhein (e.g., service_abc123)
    const TEMPLATE_ID = "template_ixnvxts"; // Aapka Template ID (ixnv se shuru hone wala)
    const PUBLIC_KEY = "8Hk_Ty80IEqkUEVzf"; // Aapka Public Key

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
          setStatus('Message Sent Successfully! ✅');
          form.current.reset(); // Form ko khali karne ke liye
          
          // 3 second baad button text wapis normal ho jayega
          setTimeout(() => setStatus(''), 3000);
      }, (error) => {
          console.log(error.text);
          setStatus('Failed to send message. ❌');
      });
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        {/* Left Side: Info */}
        <div className="contact-info">
          <h2>Let's Talk!</h2>
          <p>Have a question or just want to say hi? We'd love to hear from you.</p>
          
          <div className="info-item">
            <span>📍</span>
            <p>Rawalpindi, Pakistan</p>
          </div>
          
          <div className="info-item">
            <span>📞</span>
            <p>+92 307 1114753</p>
          </div>
          
          <div className="info-item">
            <span>✉️</span>
            <p>parvezyy786@gmail.com</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <form className="contact-form-pro" ref={form} onSubmit={sendEmail}>
          <div className="input-group">
            {/* 'name' attributes EmailJS template ke variables se match karne chahiye */}
            <input type="text" name="user_name" placeholder="Your Name" required />
            <input type="email" name="user_email" placeholder="Your Email" required />
          </div>
          <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
          
          <button type="submit" className="send-btn" disabled={status === 'Sending... ⏳'}>
            {status ? status : "Send Message 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;