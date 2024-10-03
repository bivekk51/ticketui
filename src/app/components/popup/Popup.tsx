import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface PopupProps {
    status: string;
    attendeeName?: string;
    attendeeTicket?: string;
}

const Popup: React.FC<PopupProps> = ({ status, attendeeName, attendeeTicket }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (status) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [status]);

    let message = '';
    let bgColor = '';
    let imageSrc = '';

    if (status === 'Checked In!') {
        message = 'Success Checked In!';
        bgColor = 'bg-green-500';
        imageSrc = '/assets/images/accepted.svg';
    } else if (status === 'Invalid!' || status === 'Security code is not valid!') {
        message = 'Invalid Ticket!';
        bgColor = 'bg-red-500';
        imageSrc = '/assets/images/failed.svg';
    } else if (status === 'Already checked in!') {
        message = 'Already Checked In!';
        bgColor = 'bg-yellow-500';
        imageSrc = '/assets/images/alreadycheckedin.svg';
    }

    if (!isVisible) return null;

    return (
        <div
            className={`fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-70 z-50 transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            <div
                className={`w-[22rem] h-auto flex flex-col justify-center items-center p-8 shadow-lg rounded-lg ${bgColor} transform transition-all duration-500 ease-out ${isVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-10 opacity-0'}`}
            >
                {imageSrc && (
                    <Image
                        src={imageSrc}
                        alt={status}
                        width={120}
                        height={120}
                        className="mb-6"
                        style={{
                            animation: 'upDown 2s ease-in-out infinite',
                        }}
                    />
                )}
                <h2 className="text-3xl font-bold text-white text-center mb-4 tracking-wide">
                    {message}
                </h2>
                {attendeeName && attendeeTicket && (
                    <div className="text-white text-center">
                        <p className="text-xl font-semibold mb-1">Attendee:</p>
                        <p className="text-lg">{attendeeName}</p>
                        <p className="text-xl font-semibold mt-3">Ticket:</p>
                        <p className="text-lg">{attendeeTicket}</p>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes upDown {
                    0% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                    100% {
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default Popup;
