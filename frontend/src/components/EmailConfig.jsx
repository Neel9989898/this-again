import React, { useState } from 'react';
import axios from 'axios';


function EmailConfig({ onClose ,url}) {
    const [email, setEmail] = useState('');
    // eslint-disable-next-line
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line
    const [error, setError] = useState(false);
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            // Send email configuration data to backend
            const response = await axios.post('http://localhost:5000/configure-email', { url,email });
            console.log('Email configuration successful:', response.data);
            onClose(); // Close the EmailConfig component
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };


    return (
        <div className="email-config-container">
            <h3>Configure Email Notifications</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default EmailConfig;
