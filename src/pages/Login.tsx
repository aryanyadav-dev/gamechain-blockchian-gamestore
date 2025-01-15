import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated === 'true') {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (email && password) {
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/home');
            } else {
                setError('Please fill in all fields');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    // Inline Logo component
    const Logo = () => (
        <div className="flex items-center gap-2 text-white">
            <span className="text-2xl font-bold">GAMECHAIN - Blockchain Gaming Store</span>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0A0A0B] flex items-stretch">
            {/* Left Section - Illustration */}
            <div className="relative hidden lg:flex flex-col flex-1 p-8 bg-gradient-to-br from-blue-900/20 to-transparent overflow-hidden">
                {/* Background stars */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 2px)`,
                        backgroundSize: '50px 50px',
                    }}
                />

                {/* Planet Illustrations */}
                <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-blue-600/30 blur-xl" />
                <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-blue-400/20 blur-lg" />

                {/* New Planet Illustration */}
                <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-blue-500/30 blur-lg" />

                <div className="relative z-10">
                    <Logo />
                </div>
            </div>

            {/* Right Section - Login Form */}
            <div className="flex-1 flex flex-col items-stretch p-8 lg:max-w-lg">
                <div className="flex justify-between items-center">
                    <div className="lg:hidden">
                        <Logo />
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-400">NEED AN ACCOUNT?</span>
                        <button className="text-white font-medium hover:text-blue-400 transition-colors">
                            SIGN IN
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
                    <h2 className="text-4xl font-bold text-white mb-4">LOGIN</h2>
                    <p className="text-gray-400 mb-8">Login with email address</p>

                    {error && (
                        <div className="bg-red-500/10 text-red-500 p-3 rounded-lg mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                                className="w-full h-12 rounded-xl bg-gray-800/50 border-0 px-4 text-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                autoComplete="email"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                                className="w-full h-12 rounded-xl bg-gray-800/50 border-0 px-4 text-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                autoComplete="current-password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full h-12 rounded-xl font-medium transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
