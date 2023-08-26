import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import toast from 'react-hot-toast';
import { FormStyled, ButtonStyled, InputStyled } from './Searchbar.styled';

export const Searchbar = ({ onFormSubmit }) => {
  const [query, setQuery] = useState('');

  const handleQueryChange = evt => {
    setQuery(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (query.trim() === '') {
      toast.error('Input query');
      return;
    }
    onFormSubmit(query);
    setQuery('');
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <ButtonStyled type="submit">
        <ImSearch></ImSearch>
      </ButtonStyled>
      <InputStyled
        type="text"
        name="query"
        value={query}
        placeholder="Search images and photos"
        onChange={handleQueryChange}
      />
    </FormStyled>
  );
};
