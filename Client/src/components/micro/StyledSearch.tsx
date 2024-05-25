import './StyledSearch.scss';
import IconSearch from '../../assets/icons/icon_search.svg?react';

interface Props {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function StyledSearch({ handleChange }: Props) {
  return (
    <div className="search-container">
      <IconSearch />
      <input type="text" onChange={handleChange} placeholder="Search" />
    </div>
  );
}
