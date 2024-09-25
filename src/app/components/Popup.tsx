import React from 'react';
import Image from 'next/image';

interface PopupProps {
    status: string;
}

const Popup: React.FC<PopupProps> = ({ status }) => {
    let message = '';
    let bgColor = '';
    let imageSrc = '';

    if (status === 'Checked In!') {
        message = 'Ticket is valid!';
        bgColor = 'bg-green-500';
        imageSrc = '/assets/images/accepted.svg';
    } else if (status === 'Security code is not valid!') {
        message = 'Ticket is invalid!';
        bgColor = 'bg-red-500';
        imageSrc = '/assets/images/failed.svg';
    } else if (status === 'Already checked in!') {
        message = 'Ticket is already checked!';
        bgColor = 'bg-yellow-500';
        imageSrc = '/assets/images/alreadycheckedin.svg';
    }

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div
                className={`w-96 h-96 flex flex-col justify-center items-center p-8 shadow-2xl ${bgColor} rounded-lg border-2 border-white`}>
                {imageSrc && (
                    <Image
                        src={imageSrc}
                        alt={status}
                        width={100}
                        height={100}
                        className="mb-4"
                    />
                )}
                <h2 className="text-4xl font-bold text-white text-center">
                    {message}
                </h2>
            </div>
        </div>
    );
};

export default Popup;
