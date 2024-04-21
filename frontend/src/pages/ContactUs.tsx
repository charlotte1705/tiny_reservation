import React, { useState } from 'react';
import { message } from 'antd';


export default function ContactUs() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const [error, setError] = useState('')

    function onSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        fetch("https://formcarry.com/s/XHgsXmOQQ3N", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message })
        })
            .then(response => response.json())
            .then(response => {
                if (response.code === 200) {
                    alert("We received your submission, thank you!");
                }
                else if (response.code === 422) {
                    // Field validation failed
                    setError(response.message)
                }
                else {
                    // other error from formcarry
                    setError(response.message)
                }
            })
            .catch(error => {
                // request related error.
                setError(error.message ? error.message : error);
            });
    }


    return (
        <form onSubmit={(e) => onSubmit(e)} className="max-w-md mx-auto border border-gray-300 shadow-lg rounded-lg p-6">
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="Your first and last name" className="mt-1 p-2 w-full border rounded-md" />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Your Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="john@doe.com" className="mt-1 p-2 w-full border rounded-md" />
            </div>

            <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700">Your message</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} id="message" placeholder="Enter your message..." className="mt-1 p-2 w-full border rounded-md"></textarea>
            </div>

            <div className="mb-4">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Send</button>
            </div>
        </form>


    )
}