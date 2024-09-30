"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from 'react-icons/gi'; // Import hamburger icon
import { MdClose } from 'react-icons/md'; // Import close icon

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <nav className="bg-[#0A1B4D] py-4 flex justify-between items-center px-4 md:px-8">
            <div className="flex items-center">
                <Image
                    src="/assets/images/tixort-logo-light.png"
                    alt="Tixort Logo"
                    width={150}
                    height={50}
                />
            </div>
            <div className="hidden md:flex space-x-8 text-white font-bold">
                <Link href="#">EVENTS</Link>
                <Link href="#">CONTACT</Link>
                <Link href="#">LIST AN EVENT</Link>
                <Link href="#">FAQS</Link>
                <Link href="/login">LOGIN</Link>
            </div>
            {/* Hamburger Menu for Mobile */}
            <div className="md:hidden">
                <button
                    className="text-white focus:outline-none"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? <MdClose size={30} /> : <GiHamburgerMenu size={30} />} {/* Toggle between icons */}
                </button>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-[#0A1B4D] md:hidden flex flex-col items-center space-y-4 py-4">
                    <Link href="#" className="text-white font-bold" onClick={toggleMenu}>
                        EVENTS
                    </Link>
                    <Link href="#" className="text-white font-bold" onClick={toggleMenu}>
                        CONTACT
                    </Link>
                    <Link href="#" className="text-white font-bold" onClick={toggleMenu}>
                        LIST AN EVENT
                    </Link>
                    <Link href="#" className="text-white font-bold" onClick={toggleMenu}>
                        FAQS
                    </Link>
                    <Link href="/login" className="text-white font-bold" onClick={toggleMenu}>
                        LOGIN
                    </Link>
                </div>
            )}
        </nav>
    );
};

const HomePage = () => {
    const words = {
        upcoming: "Upcoming",
        live: "Live",
        events: "Events",
    };

    return (
        <div className="min-h-screen bg-[#0A1B4D]">
            <Navbar />

            <style jsx>{`
                @keyframes fadeInFromBottom {
                    0% {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .fade-in-letter {
                    display: inline-block;
                    opacity: 0;
                    animation: fadeInFromBottom 0.5s ease forwards;
                }

                .letter-upcoming {
                    animation-delay: calc(var(--index) * 0.1s);
                }

                .letter-live {
                    animation-delay: calc(var(--index) * 0.1s + 1s);
                }

                .letter-events {
                    animation-delay: calc(var(--index) * 0.1s + 2s);
                }

                .subtitle {
                    opacity: 0;
                    animation: fadeIn 1s ease forwards;
                    animation-delay: 3.5s;
                }

                @keyframes fadeIn {
                    0% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }

                @keyframes upDown {
                    0%,
                    100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }

                .crosses {
                    animation: upDown 2s infinite;
                }
            `}</style>

            <div className="flex flex-col justify-center items-start h-screen text-white px-4 md:px-8">
                <div className="space-y-8">
                    <div className="crosses flex gap-2">
                        <Image
                            src="/assets/images/filcross.svg"
                            alt="Filled Cross"
                            width={25}
                            height={25}
                            className="cross-1"
                        />
                        <Image
                            src="/assets/images/transparentcross.svg"
                            alt="Transparent Cross"
                            width={25}
                            height={25}
                            className="cross-2 mb-6"
                        />
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold uppercase text-left">
                        <div>
                            {words.upcoming.split("").map((letter, index) => (
                                <span
                                    key={index}
                                    className="fade-in-letter letter-upcoming"
                                    style={{ "--index": index } as React.CSSProperties}
                                >
                                    {letter}
                                </span>
                            ))}
                        </div>
                        <div>
                            {words.live.split("").map((letter, index) => (
                                <span
                                    key={index}
                                    className="fade-in-letter letter-live"
                                    style={{ "--index": index } as React.CSSProperties}
                                >
                                    {letter}
                                </span>
                            ))}
                        </div>
                        <div>
                            {words.events.split("").map((letter, index) => (
                                <span
                                    key={index}
                                    className="fade-in-letter letter-events"
                                    style={{ "--index": index } as React.CSSProperties}
                                >
                                    {letter}
                                </span>
                            ))}
                        </div>
                    </h1>

                    <p className="text-base md:text-xl font-light subtitle">
                        We enjoy live music with local artists
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
