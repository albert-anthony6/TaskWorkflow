import { useEffect, useState } from 'react';
import './SettingsPage.scss';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ImageDropzone from '../components/micro/ImageDropzone';
import ImageCropper from '../components/micro/ImageCropper';
import { editProfile, getCurrentUser, uploadImage } from '../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { EditUserFormValues } from '../utils/interfaces/user';
import useBlobCleanup from '../utils/hooks/useBlobCleanup';

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);

  const {
    blob: avatarBlob,
    setBlob: setAvatarBlob,
    blobUrl: avatarBlobUrl,
    setBlobUrl: setAvatarBlobUrl,
    files: avatarFiles,
    setFiles: setAvatarFiles
  } = useBlobCleanup();

  const {
    blob: coverBlob,
    setBlob: setCoverBlob,
    blobUrl: coverBlobUrl,
    setBlobUrl: setCoverBlobUrl,
    files: coverFiles,
    setFiles: setCoverFiles
  } = useBlobCleanup();

  const [hasAvatarImage, setHasAvatarImage] = useState(false);
  const [hasCoverImage, setHasCoverImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      displayName: '',
      bio: '',
      facebookLink: '',
      twitterLink: '',
      instagramLink: '',
      linkedinLink: ''
    }
  });

  function validateFacebook(data: EditUserFormValues) {
    if (data.facebookLink) {
      const fbRegex = /((http|https):\/\/|)(www\.|)(facebook\.com)\/([a-z0-9.]+)/i;
      const match = data.facebookLink.match(fbRegex);
      if (match) {
        const [, , , , , username] = match;
        setValue('facebookLink', `https://www.facebook.com/${username}`);
        data.facebookLink = `https://www.facebook.com/${username}`;
        return true;
      } else {
        setError('facebookLink', {
          type: 'custom',
          message: 'Please provide a valid Facebook URL.'
        });
        return false;
      }
    }
    return true;
  }

  function validateTwitter(data: EditUserFormValues) {
    if (data.twitterLink) {
      const twitterRegex =
        /(^(http|https):\/\/|)(www\.|)(twitter\.com|x\.com)\/([a-z0-9_.]{1,30})\/?|^(@?(\w{1,30}))$/i;
      const match = data.twitterLink.match(twitterRegex);
      if (match) {
        twitterRegex.lastIndex = 0;
        const [, , , , , username, , id] = match;
        if (username) {
          setValue('twitterLink', `@${username}`);
          data.twitterLink = `@${username}`;
          return true;
        }
        if (id) {
          setValue('twitterLink', `@${id}`);
          data.twitterLink = `@${id}`;
          return true;
        }
        setError('twitterLink', {
          type: 'custom',
          message: 'Please provide a valid Twitter URL or ID'
        });
        return false;
      }
      setError('twitterLink', {
        type: 'custom',
        message: 'Please provide a valid Twitter URL or ID'
      });
      return false;
    }
    return true;
  }

  function validateInstagram(data: EditUserFormValues) {
    if (data.instagramLink) {
      const igRegex =
        /(^https?:\/\/)?(www\.)?(instagram\.com)\/([a-z0-9_.]{1,30})\/?|^(@?(\w{1,30}))$/i;
      const match = data.instagramLink.match(igRegex);
      if (match) {
        igRegex.lastIndex = 0;
        const [, , , , username, , id] = match;
        if (username) {
          setValue('instagramLink', `@${username}`);
          data.instagramLink = `@${username}`;
          return true;
        }
        if (id) {
          setValue('instagramLink', `@${id}`);
          data.instagramLink = `@${id}`;
          return true;
        }
        setError('instagramLink', {
          type: 'custom',
          message: 'Please provide a valid Instagram URL or ID'
        });
        return false;
      }
      setError('instagramLink', {
        type: 'custom',
        message: 'Please provide a valid Instagram URL or ID'
      });
      return false;
    }
    return true;
  }

  function validateLinkedin(data: EditUserFormValues) {
    if (data.linkedinLink) {
      const liRegex = /((http|https):\/\/|)(www\.|)(linkedin\.com\/in)\/([a-z0-9._-]+)/i;
      const liRegexCompany =
        /((http|https):\/\/|)(www\.|)(linkedin\.com\/company)\/([a-z0-9._-]+)/i;
      const match = data.linkedinLink.match(liRegex);
      const matchCompany = data.linkedinLink.match(liRegexCompany);
      if (match) {
        const [, , , , , username] = match;
        setValue('linkedinLink', `https://www.linkedin.com/in/${username}`);
        data.linkedinLink = `https://www.linkedin.com/in/${username}`;
        return true;
      }
      if (matchCompany) {
        const [, , , , , username] = matchCompany;
        setValue('linkedinLink', `https://www.linkedin.com/company/${username}`);
        data.linkedinLink = `https://www.linkedin.com/company/${username}`;
        return true;
      }
      setError('linkedinLink', {
        type: 'custom',
        message: 'Please provide a valid LinkedIn URL.'
      });
      return false;
    }
    return true;
  }

  async function onSubmit(data: EditUserFormValues) {
    if (
      !validateFacebook(data) ||
      !validateTwitter(data) ||
      !validateInstagram(data) ||
      !validateLinkedin(data)
    ) {
      return;
    }
    try {
      setIsLoading(true);
      const promises = [];
      if (avatarBlob || (currentUser?.avatar && !avatarBlob && !hasAvatarImage)) {
        const uploadAvatarPromise = dispatch(
          uploadImage({ file: avatarBlob as Blob, type: 'avatar' })
        );
        promises.push(uploadAvatarPromise);
      }

      if (coverBlob || (currentUser?.coverImage && !coverBlob && !hasCoverImage)) {
        const uploadCoverImagePromise = dispatch(
          uploadImage({ file: coverBlob as Blob, type: 'coverImage' })
        );
        promises.push(uploadCoverImagePromise);
      }

      const editUserProfile = dispatch(editProfile(data));
      promises.push(editUserProfile);

      await Promise.all(promises).then(() => {
        toast.success('User profile info saved!');
      });

      await dispatch(getCurrentUser());
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error('Error during submission:', err);
    }
  }

  // Set input values with currentUser data
  useEffect(() => {
    if (currentUser) {
      setValue('displayName', currentUser.displayName || '');
      setValue('bio', currentUser.bio || '');
      setValue('facebookLink', currentUser.facebookLink || '');
      setValue('twitterLink', currentUser.twitterLink || '');
      setValue('instagramLink', currentUser.instagramLink || '');
      setValue('linkedinLink', currentUser.linkedinLink || '');
    }
  }, [currentUser, setValue]);

  return (
    <main className="settings-page">
      <h1>Settings Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <label htmlFor="displayName">Display Name*</label>
          <input
            {...register('displayName', {
              required: 'Please provide a display name.',
              maxLength: {
                value: 25,
                message: 'Name cannot exceed 25 characters.'
              }
            })}
            id="displayName"
            type="text"
            placeholder="Display Name"
          />
          <div className="input--helper">
            <div className="caption text__error">{errors.displayName?.message}</div>
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="bio">Bio</label>
          <input
            {...register('bio', {
              maxLength: {
                value: 25,
                message: 'Bio cannot exceed 25 characters.'
              }
            })}
            id="bio"
            type="text"
            placeholder="Display Name"
          />
          <div className="input--helper">
            <div className="caption text__error">{errors.bio?.message}</div>
          </div>
        </div>
        {/* Avatar Upload */}
        {avatarFiles.length > 0 && !avatarBlob && (
          <ImageCropper files={avatarFiles} setFiles={setAvatarFiles} setBlob={setAvatarBlob} />
        )}
        <label>Avatar</label>
        <ImageDropzone
          files={avatarFiles}
          blobUrl={avatarBlobUrl}
          image={currentUser?.avatar?.url as string}
          hasImage={hasAvatarImage}
          setHasImage={setHasAvatarImage}
          setFiles={setAvatarFiles}
          setBlob={setAvatarBlob}
          setBlobUrl={setAvatarBlobUrl}
        />
        {/* Cover Image Upload */}
        {coverFiles.length > 0 && !coverBlob && (
          <ImageCropper
            aspectRatio={5.15}
            files={coverFiles}
            setFiles={setCoverFiles}
            setBlob={setCoverBlob}
          />
        )}
        <label>Cover Image</label>
        <ImageDropzone
          files={coverFiles}
          blobUrl={coverBlobUrl}
          image={currentUser?.coverImage?.url as string}
          hasImage={hasCoverImage}
          setHasImage={setHasCoverImage}
          setFiles={setCoverFiles}
          setBlob={setCoverBlob}
          setBlobUrl={setCoverBlobUrl}
          customPreview="img-preview__cover"
        />
        {/* Social Links */}
        <div className="input-container">
          <label htmlFor="facebookLink">Facebook</label>
          <input
            {...register('facebookLink')}
            id="facebookLink"
            type="text"
            placeholder="Facebook"
          />
          <div className="input--helper">
            <div className="caption text__error">{errors.facebookLink?.message}</div>
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="twitterLink">Twitter</label>
          <input {...register('twitterLink')} id="twitterLink" type="text" placeholder="Twitter" />
          <div className="input--helper">
            <div className="caption text__error">{errors.twitterLink?.message}</div>
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="instagramLink">Instagram</label>
          <input
            {...register('instagramLink')}
            id="instagramLink"
            type="text"
            placeholder="Instagram"
          />
          <div className="input--helper">
            <div className="caption text__error">{errors.instagramLink?.message}</div>
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="linkedinLink">LinkedIn</label>
          <input
            {...register('linkedinLink')}
            id="linkedinLink"
            type="text"
            placeholder="LinkedIn"
          />
          <div className="input--helper">
            <div className="caption text__error">{errors.linkedinLink?.message}</div>
          </div>
        </div>
        <button type="submit" className="button__primary">
          {isLoading ? <div className="loading-spinner" /> : <span>Save Profile</span>}
        </button>
        <button type="submit" className="button__primary">
          <div className="loading-spinner" />
        </button>
      </form>
    </main>
  );
}
