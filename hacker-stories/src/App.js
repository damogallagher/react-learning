import React from 'react';
import axios from 'axios';
import styles from './App.module.css';

import styled from 'styled-components';

const StyledContainer = styled.div` height: 100vw;
padding: 20px;
background: #83a4d4;
background: linear-gradient(to left, #b6fbff, #83a4d4);
color: #171212; `;
const StyledHeadlinePrimary = styled.h1` font-size: 48px;
font-weight: 300;
letter-spacing: 2px;
`;

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};
const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state, isLoading: true, isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false, isError: false, data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state, isLoading: false, isError: true,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          story => action.payload.objectID !== story.objectID),
      };
    default:
      throw new Error();
  }
};
const App = () => {
  // do something in between

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);

  const handleSearchInput = event => { setSearchTerm(event.target.value); };

  const handleSearchSubmit = event => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    event.preventDefault();
  };

  const [stories, dispatchStories] = React.useReducer(storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    try {
      const result = await axios.get(url);
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS', payload: result.data.hits,
      });

    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }
  }, [url]);


  React.useEffect(() => {
    handleFetchStories(); // C
  }, [handleFetchStories]); // D

  const handleRemoveStory = item => {
    dispatchStories({
      type: 'REMOVE_STORY', payload: item,
    });
  };

  return (
    <StyledContainer>
    <StyledHeadlinePrimary>My Hacker Stories</StyledHeadlinePrimary>
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

      <hr />
      {stories.isError && <p>Something went wrong ...</p>}
      {stories.isLoading ? (
        <p>Loading ...</p>) : (
          <List
            list={stories.data}
            onRemoveItem={handleRemoveStory}
          />)}
    </StyledContainer>
  );
};


const InputWithLabel = ({
  id,
  label,
  value,
  type = 'text',
  onInputChange,
  isFocused,
  children,
}) => (
    <>
      <label htmlFor={id} className={styles.label}>
        {children}
      </label>
      <input
        id={id}
        type={type}
        autoFocus={isFocused}
        onChange={onInputChange}
        value={value}
        className={styles.input} />
    </>
  );


const List = ({ list, onRemoveItem }) =>
  list.map(item => <Item
    key={item.objectID}
    item={item}
    onRemoveItem={onRemoveItem}
  />);

const Item = ({ item, onRemoveItem }) => (
  <div className={styles.item}>
    <span style={{ width: '40%' }}>
      <a href={item.url}>{item.title}</a>
    </span>
    <span style={{ width: '30%' }}>{item.author}</span>
    <span style={{ width: '10%' }}>{item.num_comments}</span>
    <span style={{ width: '10%' }}>{item.points}</span>
    <span style={{ width: '10%' }}>
      <button
        type="button"
        onClick={() => onRemoveItem(item)} className={`${styles.button} ${styles.buttonSmall}`}
      > Dismiss
          </button>
    </span>
  </div>);

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
}) => (
    <form onSubmit={onSearchSubmit} className={styles.searchForm}>
      <InputWithLabel
        id="search" value={searchTerm}
        isFocused onInputChange={onSearchInput}
      >
        <strong>Search:</strong>
      </InputWithLabel>
      <button
        type="submit"
        disabled={!searchTerm}
        className={`${styles.button} ${styles.buttonLarge}`}>
        Submit
      </button>
    </form>
  );

export default App;
