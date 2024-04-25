import { useEffect, useRef, useState } from 'react';
import './ImageCropper.scss';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface Props {
  files: any[];
  setBlob: (prop: Blob | null) => void;
  setFiles: (files: any) => void;
}

export default function ImageCropper({ setFiles, setBlob, files }: Props) {
  const isUnmounting = useRef(false);
  const [cropper, setCropper] = useState<Cropper | null>(null);

  function handleCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blobObj) => {
        setBlob(blobObj);
      });
    }
  }

  // Effect to update isUnmounting on component unmount
  useEffect(() => {
    // Component is mounted
    isUnmounting.current = false;

    // Component is unmounting
    return () => {
      isUnmounting.current = true;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (isUnmounting.current) {
        if (cropper) {
          cropper.destroy();
        }
      }
    };
  }, [cropper]);

  return (
    <div className="image-cropper">
      <Cropper
        src={files.length > 0 ? files[0].preview : ''}
        initialAspectRatio={1}
        aspectRatio={1}
        preview=".img-preview"
        guides={true}
        viewMode={1}
        responsive={true}
        background={false}
        zoomOnWheel={false}
        onInitialized={(cropper) => setCropper(cropper)}
      />
      <button type="button" className="button__primary" onClick={handleCrop}>
        Save
      </button>
      <button type="button" className="button__secondary" onClick={() => setFiles([])}>
        Cancel
      </button>
    </div>
  );
}
