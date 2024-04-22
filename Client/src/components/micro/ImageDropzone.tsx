import './ImageDropzone.scss';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import IconUpload from '../../assets/icons/icon_upload.svg?react';

interface Props {
  files: any;
  blob: Blob;
  setFiles: (files: any) => void;
  setBlob: (prop: null) => void;
}

export default function ImageDropzone({ files, blob, setFiles, setBlob }: Props) {
  function handleReset() {
    setFiles([]);
    if (blob) {
      const objectUrl = URL.createObjectURL(blob);
      URL.revokeObjectURL(objectUrl); // Revoke the object URL associated with the Blob
      setBlob(null); // Reset the Blob state
    }
  }
  function preventEvent(event: React.MouseEvent<HTMLDivElement>) {
    if (blob) {
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
      {files && files.length > 0 ? (
        <>
          <div className="img-preview" />
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
