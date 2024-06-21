import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { getUsers } from '../store/slices/usersSlice';
import { User } from '../utils/interfaces/user';
import { updateMembers } from '../store/slices/projectSlice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import MutliSelectDropdown from './micro/MultiSelectDropdown';
import IconClose from '../assets/icons/icon_close.svg?react';

interface Props {
  members: any;
  isLoading: boolean;
  closeModal: () => void;
  setIsLoading: (arg: boolean) => void;
  getProject: () => void;
}

export default function MemberModal({
  members,
  closeModal,
  isLoading,
  setIsLoading,
  getProject
}: Props) {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      members: members.map((member: User) => member.id)
    }
  });

  function onSubmit(data: { members: string[] }) {
    setIsLoading(true);
    dispatch(updateMembers({ projectId: `${params.projectId}`, appUserIds: data.members }))
      .then(() => {
        toast.success('Members successfully updated');
        getProject();
      })
      .finally(() => {
        closeModal();
        setIsLoading(false);
      });
  }

  useEffect(() => {
    dispatch(getUsers({ pagingParams: { pageNumber: 1, pageSize: 50 }, searchTerm: '' }));
  }, [dispatch]);

  return (
    <div className="simple-modal modal-container">
      <div className="simple-modal--content">
        <IconClose onClick={closeModal} className="icon-close" />
        <h2>Update project members</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MutliSelectDropdown
            options={users}
            defaultValue={members}
            register={register}
            setValue={setValue}
            fieldName="members"
          />
          <div className="buttons-container">
            <button type="button" onClick={closeModal} className="button__cancel">
              Cancel
            </button>
            <button className="button__primary">
              {isLoading ? <div className="loading-spinner" /> : <span>Update Members</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
