import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';

const ContactSupport = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo, just show a mailto link
    window.location.href = `mailto:support@fiature.com?subject=Support Request from ${name}&body=${encodeURIComponent(message)}`;
    setSuccess('Support request sent!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-2">Contact Support</h2>
      <Input
        label="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <Input
        label="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
        required
      />
      {success && <div className="text-green-600 text-sm">{success}</div>}
      <Button type="submit" variant="primary" className="w-full">
        Send
      </Button>
    </form>
  );
};

export default ContactSupport; 