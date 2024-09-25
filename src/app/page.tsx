"use client";
import { useState, useEffect, useCallback } from 'react';
import Popup from './components/Popup';

export default function Home() {
  const [eventId, setEventId] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [securityKey, setSecurityKey] = useState<string | null>(null);
  const [popupStatus, setPopupStatus] = useState<string | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  console.log('API Key:', process.env.NEXT_PUBLIC_API_KEY);


  const url = 'https://tixort.au/?event_qr_code=1&ticket_id=10614&event_id=10601&security_code=69b3ab0bd3&path=wp-json%2Ftribe%2Ftickets%2Fv1%2Fqr';


  useEffect(() => {
    const parsedUrl = new URL(url);
    const params = new URLSearchParams(parsedUrl.search);

    const extractedEventId = params.get('event_id');
    const extractedTicketId = params.get('ticket_id');
    const extractedSecurityKey = params.get('security_code');

    const delay = setTimeout(() => {
      setEventId(extractedEventId);
      setTicketId(extractedTicketId);
      setSecurityKey(extractedSecurityKey);
    }, 2000);

    return () => clearTimeout(delay);
  }, [url]);


  const handleSubmit = useCallback(async () => {
    const apiUrl = `/api/v1/tickets/qr?ticket_id=${ticketId}&event_id=${eventId}&security_code=${securityKey}&api_key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        console.log(`Message: ${data.msg}`);
        setPopupStatus(data.msg);
      } else {
        const data = await response.json();
        setPopupStatus(data.msg)
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
    setEventId(null);
    setTicketId(null);
    setSecurityKey(null);
    setPopupStatus(null);

  };


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleNextScan();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);


  useEffect(() => {
    if (popupStatus) {
      const timer = setTimeout(() => setPopupStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [popupStatus]);


  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Tixort Ticket Validation</h1>

      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventId">
            Event ID
          </label>
          <input
            id="eventId"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={eventId || ''}
            onChange={(e) => setEventId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ticketId">
            Ticket ID
          </label>
          <input
            id="ticketId"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={ticketId || ''}
            onChange={(e) => setTicketId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="securityKey">
            Security Key
          </label>
          <input
            id="securityKey"
            type="text"
            className="shadow appearance-none border rounded w-full mb-6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={securityKey || ''}
            onChange={(e) => setSecurityKey(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={handleNextScan}
          className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg"
        >
          Next Scan
        </button>
      </form>

      {/* Display popup if available */}
      {popupStatus && <Popup status={popupStatus} />}


    </div>
  );
}
