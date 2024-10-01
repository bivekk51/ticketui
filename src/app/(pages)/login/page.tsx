"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image'; // Import Image component

const LoginPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false); // State for showing success message

    const validCredentials = [
        {
            username: process.env.NEXT_PUBLIC_USER_1_USERNAME,
            email: process.env.NEXT_PUBLIC_USER_1_EMAIL,
            password: process.env.NEXT_PUBLIC_PASSWORD,
        },
        {
            username: process.env.NEXT_PUBLIC_USER_2_USERNAME,
            email: process.env.NEXT_PUBLIC_USER_2_EMAIL,
            password: process.env.NEXT_PUBLIC_PASSWORD,
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const isValidUser = validCredentials.some(
            (cred) =>
                (cred.username === username || cred.email === username) && cred.password === password
        );

        if (isValidUser) {
            setSuccess(true);
            setError('');

            localStorage.setItem('isLoggedIn', 'true');

            setTimeout(() => {
                router.push('/ticketscan');
            }, 2000);
        } else {
            setSuccess(false);
            setError('Invalid username/email or password');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A1B4D]">

            {/* Logo Section on the dark background */}
            <div className="mb-8">
                <Image
                    src="/assets/images/tixort-logo-light.png" // Use the correct image path
                    alt="Tixort Logo"
                    width={200}
                    height={80}
                />
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h1 className="text-2xl font-bold text-center mb-6 text-[#0A1B4D]">Login</h1>

                {error && (
                    <div className="mb-4 text-red-500 font-semibold">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 text-green-500 font-semibold">
                        Successfully logged in! Redirecting to Ticket Scan...
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username / Email
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1B4D]"
                            placeholder="Enter your username or email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1B4D]"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-[#0A1B4D] text-white font-bold py-2 px-4 rounded-md hover:bg-[#08133a] transition"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
