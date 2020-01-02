import React, { useRef, useMemo } from 'react';
import RNSearchBar from 'react-native-search-bar';

const SearchBar = ({
  textColor,
  textFieldBackgroundColor,
  showsCancelButton,
  placeholder,
  onFocus,
  onCancelButtonPress,
  onSearchButtonPress,
}) => {
  const searchBar = useRef();

  return useMemo(
    () => (
      <RNSearchBar
        ref={searchBar}
        textColor={textColor}
        textFieldBackgroundColor={textFieldBackgroundColor}
        showsCancelButton={showsCancelButton}
        placeholder={placeholder}
        onFocus={onFocus}
        onCancelButtonPress={() => {
          if (typeof onCancelButtonPress === 'function') {
            onCancelButtonPress();
          }
          searchBar.current && searchBar.current.unFocus();
        }}
        onSearchButtonPress={text => {
          if (typeof onSearchButtonPress === 'function') {
            onSearchButtonPress(text);
          }
          searchBar.current && searchBar.current.unFocus();
        }}
        hideBackground
      />
    ),
    [
      onCancelButtonPress,
      onFocus,
      onSearchButtonPress,
      placeholder,
      showsCancelButton,
      textColor,
      textFieldBackgroundColor,
    ]
  );
};

SearchBar.defaultProps = {
  textColor: '',
  textFieldBackgroundColor: '',
  showsCancelButton: false,
  placeholder: '',
};

export default SearchBar;
