import './ImageDropzone.scss';
import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import IconUpload from '../../assets/icons/icon_upload.svg?react';

interface Props {
  files: any;
  blobUrl: string;
  image: string;
  hasImage: boolean;
  customPreview?: string;
  setHasImage: (param: boolean) => void;
  setFiles: (files: any) => void;
  setBlob: (param: null) => void;
  setBlobUrl: (param: string) => void;
}

export default function ImageDropzone({
  files,
  blobUrl,
  setFiles,
  setBlob,
  setBlobUrl,
  image,
  hasImage,
  customPreview,
  setHasImage
}: Props) {
  function handleReset() {
    setHasImage(false);
    setFiles([]);
    if (blobUrl) {
      URL.revokeObjectURL(blobUrl);
      setBlob(null);
      setBlobUrl('');
    }
  }
  function preventEvent(event: React.MouseEvent<HTMLDivElement>) {
    if (blobUrl || hasImage) {
      event.stopPropagation();
    }
  }

  const onDrop = useCallback(
    (acceptedFiles: object[]) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    [setFiles]
  );

  useEffect(() => {
    if (image) setHasImage(true);
  }, [image, setHasImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps({ onClick: (event) => preventEvent(event) })}
      className={isDragActive ? 'dropzone dropzone__active' : 'dropzone'}
    >
      <input {...getInputProps()} />
      {(blobUrl || hasImage) && (
        <img
          className={`img-preview ${customPreview}`}
          src={blobUrl || image}
          alt="Uploaded Image"
        />
      )}
      {/* {files.length > 0 && !blobUrl && <div className="img-preview" />} */}
      {files.length > 0 || hasImage ? (
        <div onClick={handleReset}>
          <IconUpload />
          Cancel Image
        </div>
      ) : (
        <div>
          <IconUpload />
          Upload Image
        </div>
      )}
    </div>
  );
}
