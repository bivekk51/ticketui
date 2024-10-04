'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Popup from '@/app/components/popup/Popup';

export default function TicketScan() {
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [eventId, setEventId] = useState<string | null>(null);
    const [ticketId, setTicketId] = useState<string | null>(null);
    const [securityKey, setSecurityKey] = useState<string | null>(null);
    const [popupStatus, setPopupStatus] = useState<string | null>(null);
    const [scannedUrl, setScannedUrl] = useState('');
    const [canScan, setCanScan] = useState(true);
    const [attendeeName, setAttendeeName] = useState("");
    const [attendeeTicket, setAttendeeTicket] = useState("");
    const [debugUrlOutput, setDebugUrlOutput] = useState<string | null>(null); // For debugging URL output
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    let timeout: NodeJS.Timeout;

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            router.push('/');
        } else {
            setIsCheckingAuth(false);
        }
    }, [router]);

    const handleSubmit = useCallback(async () => {
        const apiUrl = `/api/v1/tickets/qr?ticket_id=${ticketId}&event_id=${eventId}&security_code=${securityKey}&api_key=${apiKey}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.mssg === "Checked In!") {
                const attendeeName = data.attendee.title;
                const attendeeTicket = data.attendee.ticket.title;
                setAttendeeName(attendeeName);
                setAttendeeTicket(attendeeTicket);
                setPopupStatus(data.msg);
            } else {
                setPopupStatus(data.msg);
            }
        } catch (error) {
            console.error('Error fetching the API:', error);
        }
    }, [ticketId, eventId, securityKey, apiKey]);

    useEffect(() => {
        if (eventId && ticketId && securityKey) {
            handleSubmit();
        }
    }, [eventId, ticketId, securityKey, handleSubmit]);

    const handleNextScan = () => {
        setEventId('');
        setTicketId('');
        setSecurityKey('');
        setPopupStatus(null);
        setScannedUrl('');
        setCanScan(true);
        setDebugUrlOutput(null); // Clear debug output
        const inputField = document.getElementById('qrInput');
        if (inputField) {
            inputField.focus();
        }
    };

    useEffect(() => {
        const inputField = document.getElementById('qrInput');
        if (inputField) {
            inputField.focus();
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === ' ') {
                e.preventDefault();
                handleNextScan();
            } else if (e.key === 'Enter') {
                // Prevent the form from submitting or reloading the page
                e.preventDefault();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (canScan) {
            const inputField = document.getElementById('qrInput');
            if (inputField) {
                inputField.focus();
            }
        }
    }, [canScan]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputUrl = e.target.value;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            try {
                const parsedUrl = new URL(inputUrl);
                const params = new URLSearchParams(parsedUrl.search);

                const extractedTicketId = params.get('ticket_id');
                const extractedEventId = params.get('event_id');
                const extractedSecurityKey = params.get('security_code');

                // Only update the state if the new value is different from the current state
                if (extractedEventId && extractedTicketId && extractedSecurityKey) {
                    if (extractedSecurityKey.length === 10) {
                        if (extractedEventId !== eventId) {
                            setEventId(extractedEventId);
                        }
                        if (extractedTicketId !== ticketId) {
                            setTicketId(extractedTicketId);
                        }
                        if (extractedSecurityKey !== securityKey) {
                            setSecurityKey(extractedSecurityKey);
                        }
                        setCanScan(false);
                    }
                } else {
                    setPopupStatus('Invalid!');
                }
            } catch (error) {
                console.error('Invalid URL:', error);
                setScannedUrl(inputUrl); // Set this to the state to show the invalid URL for debugging
            }
        }, 5000); // Process the URL after 5 seconds
    };


    if (isCheckingAuth) {
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full transition-all duration-300">
                <h1 className="text-2xl font-bold text-center mb-6 text-[#0A1B4D]">Ticket Scan</h1>

                <input
                    id="qrInput"
                    type="text"
                    onChange={handleChange}
                    autoFocus
                    value={scannedUrl}
                    disabled={!canScan}
                />

                {canScan && <p className='text-lg'>Ready for Scan</p>}

                {debugUrlOutput && (
                    <div className="mt-4 p-2 bg-gray-100 text-red-500 rounded-lg">
                        Debug Output: {debugUrlOutput}
                    </div>
                )}

                <div className="mb-4">
                    <label htmlFor="eventId" className="block text-sm font-medium text-gray-700">
                        Event ID
                    </label>
                    <input
                        id="eventId"
                        type="text"
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1B4D] shadow-sm transition duration-200 ease-in-out"
                        value={eventId || ''}
                        readOnly
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="ticketId" className="block text-sm font-medium text-gray-700">
                        Ticket ID
                    </label>
                    <input
                        id="ticketId"
                        type="text"
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1B4D] shadow-sm transition duration-200 ease-in-out"
                        value={ticketId || ''}
                        readOnly
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="securityKey" className="block text-sm font-medium text-gray-700">
                        Security Key
                    </label>
                    <input
                        id="securityKey"
                        type="text"
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1B4D] shadow-sm transition duration-200 ease-in-out"
                        value={securityKey || ''}
                        readOnly
                    />
                </div>

                <button
                    type="button"
                    onClick={handleNextScan}
                    className="w-full bg-[#0A1B4D] text-white font-bold py-2 px-4 rounded-md hover:bg-[#08133a] transition"
                >
                    Next Scan
                </button>
            </div>

            {popupStatus && <Popup status={popupStatus} attendeeName={attendeeName} attendeeTicket={attendeeTicket} />}
        </div>
    );
}
