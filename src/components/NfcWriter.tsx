"use client";

import React, { useState, useCallback, useMemo } from 'react';

type NfcStatus = 'idle' | 'scanning' | 'writing' | 'success' | 'error';

type NfcWriterProps = {
  dataToWrite: string;
};

const createNdefMessage = (url: string) => ({
  records: [
    {
      recordType: 'url',
      data: url,
    },
  ],
});


const NfcWriter: React.FC<NfcWriterProps> = ({ dataToWrite }) => {
  const [status, setStatus] = useState<NfcStatus>('idle');
  const [message, setMessage] = useState<string>('Click "Start NFC Write" and tap a tag.');

  const isNfcSupported = useMemo(
    () => typeof window !== 'undefined' && 'NDEFReader' in window,
    []
  );

  const handleWriteNfc = useCallback(async () => {
    if (!isNfcSupported) {
      setStatus('error');
      setMessage('NFC is not supported in this browser.');
      return;
    }

    setStatus('scanning');
    setMessage('Scanning for NFC tag. Tap a tag to write...');

    try {
      const reader = new (window as any).NDEFReader();

      reader.onreading = async () => {
        setStatus('writing');
        setMessage('Writing data to tag...');
        try {
          const ndefMessage = createNdefMessage(dataToWrite);
          await reader.write(ndefMessage);
          setStatus('success');
          setMessage('Successfully wrote to NFC tag!');
        } catch (writeError: any) {
          setStatus('error');
          setMessage(`Failed to write to NFC tag: ${writeError.message}`);
          console.error('Write error:', writeError);
        }
      };

      reader.onerror = (event: any) => {
        setStatus('error');
        setMessage(`NFC scan error: ${event.message}`);
        console.error('NFC Scan Error:', event);
      };

      await reader.scan();
    } catch (scanError: any) {
      setStatus('error');
      setMessage(`Failed to start scan: ${scanError.message}`);
      console.error('Scan error:', scanError);
    }
  }, [dataToWrite, isNfcSupported]);

  return (
    <div>
      <h2>NFC Writer</h2>
      {!isNfcSupported && <p className="text-red-500">NFC is not supported in this browser.</p>}
      {isNfcSupported && (
        <>
          <button
            onClick={handleWriteNfc}
            disabled={!dataToWrite || status === 'scanning' || status === 'writing'}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            {status === 'scanning'
              ? 'Scanning...'
              : status === 'writing'
              ? 'Writing...'
              : 'Start NFC Write'}
          </button>
          <p className="mt-2">{message}</p>
          {status === 'scanning' && (
            <p className="text-sm text-gray-500">Keep the tag near your device.</p>
          )}
        </>
      )}
    </div>
  );
};

export default NfcWriter;
