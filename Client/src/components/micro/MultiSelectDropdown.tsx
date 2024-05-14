// import { useState, useEffect } from 'react';
import Select from 'react-select';
import { components, OptionProps, MultiValueProps } from 'react-select';
import IconAvatar from '../../assets/icons/icon_avatar.svg?react';

interface Props {
  options: any;
  defaultValue: any;
  register: any;
  setValue: any;
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

export default function MutliSelectDropdown({ options, defaultValue, register, setValue }: Props) {
  //   const [options, setOptions] = useState([]);

  //   useEffect(() => {
  //     // Fetch options data from server
  //     const fetchData = async () => {
  //       try {
  //         // Replace 'api/endpoint' with your actual API endpoint
  //         const response = await fetch('api/endpoint');
  //         const data = await response.json();
  //         // Assuming the data from the server is an array of objects with 'value', 'displayName', and 'avatar' properties
  //         setOptions(data);
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  const handleChange = (selectedOptions: any) => {
    const selectedIds = selectedOptions.map((option: any) => option.id);
    setValue('assignees', selectedIds);
  };

  return (
    <Select
      isMulti
      defaultValue={defaultValue}
      options={options ? options : null}
      className="basic-multi-select"
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
      {...(register('assignees'), { name: 'userName' })}
    />
  );
}
