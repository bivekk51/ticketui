"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="bg-[#0A1B4D] py-4 flex justify-between items-center px-8">
            <div className="flex items-center">
                <Image
                    src="/assets/images/tixort-logo-light.png"
                    alt="Tixort Logo"
                    width={150}
                    height={50}
                />
            </div>
            <div className="flex space-x-8 text-white font-bold">
                <Link href="#">EVENTS</Link>
                <Link href="#">CONTACT</Link>
                <Link href="#">LIST AN EVENT</Link>
                <Link href="#">FAQS</Link>
                <Link href="/login">LOGIN</Link>
            </div>
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


            <div className="flex flex-col justify-center items-start h-screen text-white px-8">
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

                    <h1 className="text-6xl md:text-8xl font-extrabold uppercase">

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


                    <p className="text-xl font-light subtitle">
                        We enjoy live music with local artists
                    </p>



                </div>
            </div>
        </div>
    );
};

export default HomePage;
