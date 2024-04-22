import { useForm } from 'react-hook-form';
import ImageDropzone from '../components/micro/ImageDropzone';
import { useEffect, useState } from 'react';
import ImageCropper from '../components/micro/ImageCropper';
import { getCurrentUser, uploadImage } from '../store/slices/userSlice';
import { useAppDispatch } from '../store/configureStore';

export default function SettingsPage() {
  const [blob, setBlob] = useState<Blob | null>();
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();
  const dispatch = useAppDispatch();
  // const {uploadImage} = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit
    // formState: { errors }
  } = useForm({
    defaultValues: {
      displayName: ''
    }
  });

  function onCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blobObj) => setBlob(blobObj));
      cropper.disable();
    }
  }

  useEffect(() => {
    return () => {
      if (blob) {
        const objectUrl = URL.createObjectURL(blob);
        URL.revokeObjectURL(objectUrl);
        setBlob(null);
      }

      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [blob, files]);

  function onSubmit() {
    dispatch(uploadImage(blob as Blob)).then(() => {
      dispatch(getCurrentUser());
    });
  }

  return (
    <main className="settings-page">
      <h1>Settings Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <label htmlFor="displayName">Display Name</label>
          <input
            {...register('displayName')}
            id="displayName"
            type="text"
            placeholder="Display Name"
          />
          {/* <div className="input--helper">
            <div className="caption text__error">{errors.displayName?.message}</div>
            <div className="caption">0/100</div>
          </div> */}
        </div>
        {files && files.length > 0 && !blob && (
          <ImageCropper
            onCrop={onCrop}
            setFiles={setFiles}
            setCropper={setCropper}
            imagePreview={files[0].preview}
          />
        )}
        <ImageDropzone files={files} blob={blob as Blob} setFiles={setFiles} setBlob={setBlob} />
        <button type="submit" className="button__primary">
          Save Profile
        </button>
      </form>
    </main>
  );
}
