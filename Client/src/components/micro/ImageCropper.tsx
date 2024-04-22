import './ImageCropper.scss';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
// import { useEffect, useRef } from 'react';

interface Props {
  imagePreview: string;
  setCropper: (cropper: Cropper) => void;
  onCrop: () => void;
  setFiles: (files: any) => void;
}

export default function ImageCropper({ onCrop, setFiles, imagePreview, setCropper }: Props) {
  return (
    <div className="image-cropper">
      <Cropper
        src={imagePreview}
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
      <button type="button" className="button__primary" onClick={onCrop}>
        Save
      </button>
      <button type="button" className="button__secondary" onClick={() => setFiles([])}>
        Cancel
      </button>
    </div>
  );
}
