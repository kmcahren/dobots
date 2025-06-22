"use client";

import React, { useState } from 'react';

type NfcStatus = 'idle' | 'scanning' | 'writing' | 'success' | 'error';
type NfcWriterProps = {
  dataToWrite: string; // Prop to receive the data to write
};

const NfcWriter: React.FC<NfcWriterProps> = ({ dataToWrite }) => { // Accept dataToWrite prop
  const [status, setStatus] = useState<NfcStatus>('idle');
  const [message, setMessage] = useState<string>('Click "Start NFC Write" and tap a tag.');

  const isNfcSupported = typeof window !== 'undefined' && 'NDEFReader' in window;

  const handleWriteNfc = async () => {
    if (!isNfcSupported) {
      setStatus('error');
      setMessage('NFC is not supported in this browser.');
      return;
    }

    setStatus('scanning');
    setMessage('Scanning for NFC tag. Tap a tag to write...');

    try {
      const reader = new (window as any).NDEFReader();

      // Set up the 'reading' event handler
      reader.onreading = async (event: any) => {
        setStatus('writing');
        setMessage('Writing data to tag...');
        try { // Attempt to write the message to the tag
          // Create an NDEF URI record correctly
          // Create a simple NDEF text record
          const textRecord = {
            recordType: 'text', // Use 'text' for a text record
            data: new TextEncoder().encode('Hello, NFC!'), // Encode the text string as bytes
            lang: 'en' // Specify language for text records
          };

          // Create an NDEF message with the text record
          const ndefMessage = {
            records: [textRecord]
          };

          // Write the NDEF message to the tag
          await reader.write(ndefMessage); // Use reader.write() here, not event.target.write()

          setStatus('success');
          setMessage('Successfully wrote event URL to NFC tag!');
        } catch (writeError: any) {
          setStatus('error');
          setMessage(`Failed to write to NFC tag: ${writeError.message}`);
          console.error("NFC write error:", writeError, writeError.message); // Log the error object and message
        } finally {
          // You might want to stop scanning after writing or error
          // reader.scan.cancel(); // This might be needed depending on your workflow
        }
      };

      // Handle errors during scanning
      reader.onerror = (error: any) => {
        // Update status and message on scan error
        setStatus('error'); // Set status to error on scan error as well
        setMessage(`NFC scan error: ${error.message}`); // Provide a user-friendly message
        console.error('NFC Read Error:', error);
      };


      // Start scanning for tags
      await reader.scan();
      console.log("NDEFReader scanning started.");

    } catch (scanError: any) { // Catch any errors during the scan attempt
      setStatus('error');
      setMessage(`Failed to start NFC scan: ${scanError.message}`);
      console.error("NFC scan error:", scanError);
    }
  }; // <-- This is the correct and only closing of handleWriteNfc

  return (
    <div>
      <h2>NFC Writer</h2>
      {!isNfcSupported && <p className="text-red-500">{message || 'NFC not supported.'}</p>}
      {isNfcSupported && (
        <>
          <button
            onClick={handleWriteNfc}
            disabled={!dataToWrite || status === 'scanning' || status === 'writing'} // Disable if no data or writing is in progress
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            {status === 'scanning' ? 'Scanning...' : status === 'writing' ? 'Writing...' : 'Start NFC Write'}
          </button>
          {message && <p className="mt-2">{message}</p>}
           {status === 'scanning' && ( // Only show "Keep tag near" while scanning
             <p className="mt-2 text-sm text-gray-600">Keep the tag near your device.</p>
           )}
        </>
      )}
    </div>
  );
};

export default NfcWriter;
