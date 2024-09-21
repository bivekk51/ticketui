"use client";
import { useState, useEffect } from 'react';
import Popup from './components/Popup';

export default function Home() {
  const [eventId, setEventId] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [securityKey, setSecurityKey] = useState<string | null>(null);
  const [popupStatus, setPopupStatus] = useState<string | null>(null);


  const handleSubmit = async () => {
    //popup check garna fake api call 
    // params: success,fail,duplicate
    const res = await new Promise((resolve) =>
      setTimeout(() => resolve('success'), 1000)
    );
    setPopupStatus(res as string);
  };

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


    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  useEffect(() => {
    if (eventId && ticketId && securityKey) {
      handleSubmit();
    }
  }, [eventId, ticketId, securityKey]);


  const closePopup = () => {
    setPopupStatus(null);
  };

  useEffect(() => {
    if (popupStatus) {
      const timer = setTimeout(() => closePopup(), 3000);
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

      {popupStatus && <Popup status={popupStatus} />}
    </div>
  );
}
