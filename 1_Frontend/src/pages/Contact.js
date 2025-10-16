import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); alert('Message sent (simulation)'); };

  return (
    <div className="min-h-screen bg-transparent text-white py-10">
      <div className="container mx-auto max-w-lg">
        <h1 className="text-4xl font-bold mb-6">Contact</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="name" placeholder="Your Name" className="p-3 rounded bg-gray-800 text-white" required />
          <input name="email" type="email" placeholder="Your Email" className="p-3 rounded bg-gray-800 text-white" required />
          <textarea name="message" placeholder="Your Message" className="p-3 rounded bg-gray-800 text-white" rows="5" required />
          <button className="bg-yellow-400 text-black py-3 rounded font-bold">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
