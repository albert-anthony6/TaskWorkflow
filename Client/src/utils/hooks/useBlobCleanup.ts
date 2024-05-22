import { useEffect, useRef, useState } from 'react';

function useBlobCleanup(initialBlob: Blob | null = null, initialBlobUrl: string = '') {
  const isUnmounting = useRef(false);
  const [blob, setBlob] = useState<Blob | null>(initialBlob);
  const [blobUrl, setBlobUrl] = useState<string>(initialBlobUrl);
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    isUnmounting.current = false;

    return () => {
      isUnmounting.current = true;
    };
  }, []);

  useEffect(() => {
    if (blob && !blobUrl) {
      setBlobUrl(URL.createObjectURL(blob));
    }

    return () => {
      if (isUnmounting.current) {
        if (blob) {
          URL.revokeObjectURL(blobUrl);
          setBlob(null);
        }

        files.forEach((file: any) => URL.revokeObjectURL(file.preview));
      }
    };
  }, [blob, blobUrl, files]);

  return { blob, setBlob, blobUrl, setBlobUrl, files, setFiles };
}

export default useBlobCleanup;
