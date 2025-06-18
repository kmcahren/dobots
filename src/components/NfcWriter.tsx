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
      // Request NFC permission
      // Note: This permission request is often implicit when calling NDEFReader constructor or methods,
      // but explicitly requesting is good practice if your workflow requires it earlier.
      // The standard way is to just proceed and the browser will prompt on first interaction.
      const reader = new (window as any).NDEFReader();

      reader.onreading = async (event: any) => {
        setStatus('writing');
        setMessage('Writing data to tag...');
        try {
          // Prepare the NDEF message with the provided dataToWrite
          const messageToWrite = {
            records: [
              {
                recordType: 'uri',
                data: new TextEncoder().encode(dataToWrite),
              },
            ],
          };

          await event.target.write(messageToWrite);

          setStatus('success');
          setMessage('Successfully wrote to NFC tag!');
        } catch (writeError: any) {
          setStatus('error');
          setMessage(`Failed to write to NFC tag: ${writeError.message}`);
          console.error('NFC Write Error:', writeError); // Log the error for debugging
        } finally {
          // Stop scanning after attempting to write to avoid writing multiple times to the same tag
          try {
             // This might not be necessary as `write` might stop the session,
             // but explicitly calling `cancel` can ensure it.
            await reader.cancel();
          } catch (cancelError: any) {
             console.error("Error canceling NFC reader:", cancelError);
          }
        }
      };
      // Handle errors during scanning
       reader.onerror = (error: any) => {
         // Update status and message on scan error
         console.error('NFC Read Error:', error);
       };


      await reader.scan(); // Start scanning

    } catch (error: any) {
      setStatus('error');
      // Update status and message on failure to start scan
      setMessage(`Failed to start NFC scan: ${error.message}`);
      console.error('NFC Scan Start Error:', error);
    }
  };

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