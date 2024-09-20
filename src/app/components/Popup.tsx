

import React from 'react';

interface PopupProps {
    status: string;

}

const Popup: React.FC<PopupProps> = ({ status }) => {
    let message = '';
    let bgColor = '';

    if (status === 'success') {
        message = 'Ticket is valid!';
        bgColor = 'bg-green-500';
    } else if (status === 'fail') {
        message = 'Ticket is invalid!';
        bgColor = 'bg-red-500';
    } else if (status === 'duplicate') {
        message = 'Ticket is already checked!';
        bgColor = 'bg-yellow-500';
    }

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className={`p-14 rounded-xl max-w-3xl w-full text-center shadow-lg text-white ${bgColor}`}>
                <h2 className="text-4xl font-bold mb-6">{message}</h2>

            </div>
        </div>
    );
};

export default Popup;
