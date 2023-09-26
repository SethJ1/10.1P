import React, { useState } from 'react';
import { Input, Button } from 'semantic-ui-react';
import axios from 'axios';
import './SubscriptionForm.css'

const SubscriptionForm = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your server to subscribe the user
      await axios.post('http://localhost:3000/api/subscribe', { email });
      console.log('Subscribed successfully:', email);
      setEmail('');
      setSubscribed(true);
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  };

  return (
    <div className="subscription-form-container">
      <div className="subscription-form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <h2 className="form-title">Sign up for our Daily Insider</h2>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" color="teal">
              Subscribe
            </Button>
          </div>
        </form>
        {subscribed && (
          <p className="success-message">Thank you for subscribing!</p>
        )}
      </div>
    </div>
  );
};

export default SubscriptionForm;
