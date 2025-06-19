"use client";

import React, { useState } from 'react';

type NfcStatus = 'idle' | 'scanning' | 'writing' | 'success' | 'error';
type NfcWriterProps = {
  dataToWrite: string; // Prop to receive the data to write
};

const NfcWriter: React.FC<NfcWriterProps> = ({ dataToWrite }) => {
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

      reader.onreading = async (event: any) => {
        setStatus('writing');
        setMessage('Writing data to tag...');
        try {
          // *** We will focus on refining this section next ***
          // Create an NDEF URI record correctly
          const encoder = new TextEncoder();
          let dataBytes = encoder.encode(dataToWrite);

           const uriIdentifierCode = 0x03; // 0x03 for https://

           if (dataToWrite.startsWith('https://')) {
             dataBytes = encoder.encode(dataToWrite.substring('https://'.length));
              const finalDataBytes = new Uint8Array([uriIdentifierCode, ...dataBytes]);
              const uriRecord = {
                recordType: 'uri',
                data: finalDataBytes,
              };
               const ndefMessage = {
                 records: [uriRecord],
               };
              await reader.write(ndefMessage);


           } else {
              const textRecord = {
                recordType: 'text',
                data: dataBytes,
                lang: 'en',
              };
               const ndefMessage = {
                 records: [textRecord],
               };
              await reader.write(ndefMessage);
           }

          setStatus('success');
          setMessage('Successfully wrote data to NFC tag!');
        } catch (writeError: any) {
          setStatus('error');
          setMessage(`Failed to write to NFC tag: ${writeError.message}`);
          console.error("NFC write error:", writeError);
        } finally {
           reader.scan().catch(() => {});
        }
      };

      reader.onerror = (error: any) => {
        setStatus('error');
        setMessage(`NFC scan error: ${error.message}`);
        console.error('NFC Read Error:', error);
      };

      await reader.scan();
      console.log("NDEFReader scanning started.");

    } catch (scanError: any) {
      setStatus('error');
      setMessage(`Failed to start NFC scan: ${scanError.message}`);
      console.error("NFC scan error:", scanError);
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
            disabled={!dataToWrite || status === 'scanning' || status === 'writing'}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            {status === 'scanning' ? 'Scanning...' : status === 'writing' ? 'Writing...' : 'Start NFC Write'}
          </button>
          {message && <p className="mt-2">{message}</p>}
           {status === 'scanning' && (
             <p className="mt-2 text-sm text-gray-600">Keep the tag near your device.</p>
           )}
        </>
      )}
    </div>
  );
};

export default NfcWriter;
