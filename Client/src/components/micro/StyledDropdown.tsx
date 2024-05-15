import Select, { StylesConfig } from 'react-select';
import { ColorOption } from '../../utils/interfaces/color-options';
import { colorOptionsData } from '../../utils/data/colorOptions';
import './StyledDropdown.scss';

const dot = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10
  }
});

const colorStyles: StylesConfig<ColorOption> = {
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) })
};

interface Props {
  value: ColorOption;
  onChange: (value: ColorOption) => void;
  isReadOnly?: boolean;
}

export default function StyledDropdown({ value, onChange, isReadOnly = false }: Props) {
  return (
    <div className="styled-dropdown">
      <p className="select--label">Severity</p>
      <Select
        isSearchable={false}
        value={value}
        onChange={(selectedOption) => onChange(selectedOption as ColorOption)}
        defaultValue={colorOptionsData[2]}
        options={colorOptionsData}
        styles={colorStyles}
        classNamePrefix="select"
        className={isReadOnly ? 'styled-dropdown__readonly' : ''}
      />
    </div>
  );
}
