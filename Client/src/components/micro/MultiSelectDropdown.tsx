// import { useState, useEffect } from 'react';
import Select from 'react-select';
import { components, OptionProps, MultiValueProps } from 'react-select';

interface Props {
  label: string;
  imageSrc: string;
}

// Custom option component
const CustomOption = (props: OptionProps<Props>) => (
  <components.Option {...props}>
    <img
      src={props.data.imageSrc}
      alt={props.data.label}
      className="multiselect--avatar"
      style={{ marginRight: '10px', width: '24px', height: '24px' }}
    />
    {props.data.label}
  </components.Option>
);

// Custom multi value component
const CustomMultiValue = (props: MultiValueProps<Props>) => (
  <components.MultiValue {...props}>
    <img
      src={props.data.imageSrc}
      alt={props.data.label}
      className="multiselect--avatar"
      style={{ marginRight: '5px', width: '20px', height: '20px' }}
    />
    {props.data.label}
  </components.MultiValue>
);

// Example data
const options = [
  {
    value: 'test1',
    label: 'Test 1',
    imageSrc:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmEqXU_P4ZLA-75L01HAlYVQAGyvyLOYExxw&usqp=CAU'
  },
  {
    value: 'test2',
    label: 'Test 2',
    imageSrc:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmEqXU_P4ZLA-75L01HAlYVQAGyvyLOYExxw&usqp=CAU'
  }
];

export default function MutliSelectDropdown() {
  //   const [options, setOptions] = useState([]);

  //   useEffect(() => {
  //     // Fetch options data from server
  //     const fetchData = async () => {
  //       try {
  //         // Replace 'api/endpoint' with your actual API endpoint
  //         const response = await fetch('api/endpoint');
  //         const data = await response.json();
  //         // Assuming the data from the server is an array of objects with 'value', 'label', and 'imageSrc' properties
  //         setOptions(data);
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  return (
    <Select
      isMulti
      name="colors"
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
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
    />
  );
}
