import './ImageDropzone.scss';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import IconUpload from '../../assets/icons/icon_upload.svg?react';

interface Props {
  files: any;
  blobUrl: string;
  setFiles: (files: any) => void;
  setBlob: (param: null) => void;
  setBlobUrl: (param: string) => void;
}

export default function ImageDropzone({ files, blobUrl, setFiles, setBlob, setBlobUrl }: Props) {
  function handleReset() {
    setFiles([]);
    if (blobUrl) {
      URL.revokeObjectURL(blobUrl);
      setBlob(null);
      setBlobUrl('');
    }
  }
  function preventEvent(event: React.MouseEvent<HTMLDivElement>) {
    if (blobUrl) {
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps({ onClick: (event) => preventEvent(event) })}
      className={isDragActive ? 'dropzone dropzone__active' : 'dropzone'}
    >
      <input {...getInputProps()} />
      {files.length > 0 ? (
        <>
          {blobUrl ? (
            <img className="img-preview" src={blobUrl} alt="Uploaded Image" />
          ) : (
            <div className="img-preview" />
          )}
          <div onClick={handleReset}>
            <IconUpload />
            Cancel Image
          </div>
        </>
      ) : (
        <div>
          <IconUpload />
          Upload Image
        </div>
      )}
    </div>
  );
}
