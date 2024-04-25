import { useForm } from 'react-hook-form';
import ImageDropzone from '../components/micro/ImageDropzone';
import { useEffect, useRef, useState } from 'react';
import ImageCropper from '../components/micro/ImageCropper';
import { getCurrentUser, uploadImage } from '../store/slices/userSlice';
import { useAppDispatch } from '../store/configureStore';

export default function SettingsPage() {
  const isUnmounting = useRef(false);
  const dispatch = useAppDispatch();

  const [avatarBlob, setAvatarBlob] = useState<Blob | null>();
  const [avatarBlobUrl, setAvatarBlobUrl] = useState<string>('');
  const [avatarFiles, setAvatarFiles] = useState<any>([]);

  const [coverBlob, setCoverBlob] = useState<Blob | null>();
  const [coverBlobUrl, setCoverBlobUrl] = useState<string>('');
  const [coverFiles, setCoverFiles] = useState<any>([]);

  const {
    register,
    handleSubmit
    // formState: { errors }
  } = useForm({
    defaultValues: {
      displayName: ''
    }
  });

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
    if (avatarBlob && !avatarBlobUrl) {
      setAvatarBlobUrl(URL.createObjectURL(avatarBlob));
    }
    if (coverBlob && !coverBlobUrl) {
      setCoverBlobUrl(URL.createObjectURL(coverBlob));
    }

    // Cleanup function (runs on component unmount)
    return () => {
      if (isUnmounting.current) {
        // Cleanup avatarBlob
        if (avatarBlob) {
          URL.revokeObjectURL(avatarBlobUrl);
          setAvatarBlob(null);
        }

        // Cleanup coverBlob
        if (coverBlob) {
          URL.revokeObjectURL(coverBlobUrl);
          setCoverBlob(null);
        }

        // Cleanup previews in avatarFiles
        avatarFiles.forEach((file: any) => URL.revokeObjectURL(file.preview));
        // Cleanup previews in coverFiles
        coverFiles.forEach((file: any) => URL.revokeObjectURL(file.preview));
      }
    };
  }, [avatarBlob, coverBlob, avatarFiles, coverFiles, avatarBlobUrl, coverBlobUrl]);

  async function onSubmit() {
    try {
      const uploadAvatarPromise = dispatch(
        uploadImage({ file: avatarBlob as Blob, type: 'avatar' })
      );
      const uploadCoverImagePromise = dispatch(
        uploadImage({ file: coverBlob as Blob, type: 'coverImage' })
      );

      await Promise.all([uploadAvatarPromise, uploadCoverImagePromise]);

      await dispatch(getCurrentUser());
    } catch (err) {
      console.error('Error during dispatch:', err);
    }
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
        {/* Avatar Upload */}
        {avatarFiles.length > 0 && !avatarBlob && (
          <ImageCropper files={avatarFiles} setFiles={setAvatarFiles} setBlob={setAvatarBlob} />
        )}
        <ImageDropzone
          files={avatarFiles}
          blobUrl={avatarBlobUrl}
          setFiles={setAvatarFiles}
          setBlob={setAvatarBlob}
          setBlobUrl={setAvatarBlobUrl}
        />
        {/* Cover Image Upload */}
        {coverFiles.length > 0 && !coverBlob && (
          <ImageCropper files={coverFiles} setFiles={setCoverFiles} setBlob={setCoverBlob} />
        )}
        <ImageDropzone
          files={coverFiles}
          blobUrl={coverBlobUrl}
          setFiles={setCoverFiles}
          setBlob={setCoverBlob}
          setBlobUrl={setCoverBlobUrl}
        />
        <button type="submit" className="button__primary">
          Save Profile
        </button>
      </form>
    </main>
  );
}
