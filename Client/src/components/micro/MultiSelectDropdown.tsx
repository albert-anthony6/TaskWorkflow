import './MultiSelectDropdown.scss';
import Select from 'react-select';
import { components, OptionProps, MultiValueProps } from 'react-select';
import IconAvatar from '../../assets/icons/icon_avatar.svg?react';

interface Props {
  fieldName: string;
  options: any;
  defaultValue: any;
  register: any;
  setValue: any;
  isReadOnly?: boolean;
}

interface SelectProps {
  id: string;
  displayName: string;
  avatar: { id: string; url: string };
}

// Custom option component
const CustomOption = (props: OptionProps<SelectProps>) => (
  <components.Option {...props}>
    {props.data.avatar ? (
      <img
        src={props.data.avatar.url}
        alt={props.data.displayName}
        className="multiselect--avatar"
      />
    ) : (
      <IconAvatar className="multiselect--avatar" />
    )}
    {props.data.displayName}
  </components.Option>
);

// Custom multi value component
const CustomMultiValue = (props: MultiValueProps<SelectProps>) => (
  <components.MultiValue {...props}>
    {props.data.avatar ? (
      <img
        src={props.data.avatar.url}
        alt={props.data.displayName}
        className="multiselect--avatar"
      />
    ) : (
      <IconAvatar className="multiselect--avatar" />
    )}
    {props.data.displayName}
  </components.MultiValue>
);

export default function MutliSelectDropdown({
  fieldName,
  options,
  defaultValue,
  register,
  setValue,
  isReadOnly = false
}: Props) {
  const handleChange = (selectedOptions: any) => {
    const selectedIds = selectedOptions.map((option: any) => option.id);
    setValue(fieldName, selectedIds);
  };

  return (
    <Select
      isMulti
      placeholder="Users..."
      defaultValue={defaultValue}
      className={isReadOnly ? 'multiselect__readonly' : ''}
      options={options ? options : null}
      classNamePrefix="select"
      onChange={handleChange}
      isSearchable={true}
      getOptionLabel={(option) => option.displayName}
      getOptionValue={(option) => option.displayName}
      components={{
        Option: CustomOption,
        MultiValue: CustomMultiValue
      }}
      styles={{
        multiValue: (base) => ({
          ...base,
          padding: 5,
          borderRadius: 5,
          background: '#56b2c250'
        })
      }}
      {...(register(fieldName), { name: 'userName' })}
    />
  );
}
