import React, { useState, useCallback, useMemo } from 'react';
import { View, SafeAreaView, Dimensions, Platform, FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import { colors, fonts } from '../config';
import SearchBar from '../components/SearchBar';
import { ButtonGroup } from 'react-native-elements';
import { connect, useDispatch } from 'react-redux';
import { LoadingContainer } from '../components/LoadingContainer';
// import { RestClient } from '../api';

const SearchBarWrapper = styled.View`
  flex-direction: row;
`;

const SearchContainer = styled.View`
  width: ${Dimensions.get('window').width};
  background-color: ${colors.white};
  flex: 1;
  height: 55;
  justify-content: center;
`;

const ListContainer = styled.View`
  border-top-color: ${colors.greyLight};
  border-top-width: ${props => (props.noBorderTopWidth ? 0 : 1)};
  margin-bottom: 105;
`;

const StyledButtonGroup = styled(ButtonGroup).attrs({
  textStyle: { ...fonts.fontPrimaryBold },
  selectedTextStyle: { color: colors.black },
  containerStyle: {
    height: 30,
    ...Platform.select({
      ios: {
        marginTop: 0,
        marginBottom: 10,
      },
      android: {
        marginTop: 5,
        marginBottom: 12,
      },
    }),
  },
  selectedButtonStyle: {
    backgroundColor: '#868686',
  },
})``;

const SearchTypes = {
  REPOS: 0,
  USERS: 1,
};
const NAV_QUERY_PARAM = 'q';

const HomeScreen = ({
  reposSearchResultsPagination,
  reposSearchResults,
  usersSearchResultsPagination,
  usersSearchResults,
  searchQuery,
  searchRepos,
  searchUsers,
}) => {
  const [searchFocus, setSearchFocus] = useState(false);
  const [searchStart, setSearchStart] = useState(false);
  const [query, setQuery] = useState(false);
  const [searchType, setSearchType] = useState(SearchTypes.REPOS);
  const [currentQuery, setCurrentQuery] = useState({});

  const search = useCallback((text, selectedType) => {
    console.log('text', text);
  }, []);

  const switchQueryType = useCallback(
    selectedType => {
      if (searchType !== selectedType) {
        setSearchType(selectedType);
        if (currentQuery[selectedType] !== query) {
          search(query, selectedType);
        }
      }
    },
    [currentQuery, query, search, searchType]
  );

  const getSearchResults = useCallback(
    (type = searchType) => {
      switch (type) {
        case SearchTypes.REPOS:
          return reposSearchResults;
        case SearchTypes.USERS:
          return usersSearchResults;
        default:
          return null;
      }
    },
    [reposSearchResults, searchType, usersSearchResults]
  );

  const getSearchPagination = useCallback(
    (type = searchType) => {
      switch (type) {
        case SearchTypes.REPOS:
          return reposSearchResultsPagination;
        case SearchTypes.USERS:
          return usersSearchResultsPagination;
        default:
          return null;
      }
    },
    [reposSearchResultsPagination, searchType, usersSearchResultsPagination]
  );

  const getSearcher = useCallback(
    (type = searchType) => {
      switch (type) {
        case SearchTypes.REPOS:
          return searchRepos;
        case SearchTypes.USERS:
          return searchUsers;
        default:
          return null;
      }
    },
    [searchRepos, searchType, searchUsers]
  );

  const renderFooter = useCallback(() => {
    if (isPendingSearch) {
      return null;
    }
    if (getSearchPagination().nextPageUrl === null) {
      return null;
    }
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }, [getSearchPagination, isPendingSearch]);

  const isPendingSearch = useMemo(() => getSearchResults().length === 0 && getSearchPagination().isFetching, [
    getSearchPagination,
    getSearchResults,
  ]);

  const noResults = useMemo(() => getSearchResults().length === 0 && !getSearchPagination().isFetching, [
    getSearchPagination,
    getSearchResults,
  ]);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView />

      {useMemo(
        () => (
          <SearchBarWrapper>
            <SearchContainer>
              <SearchBar
                textColor={colors.primaryDark}
                textFieldBackgroundColor={colors.greyLight}
                showsCancelButton={searchFocus}
                onFocus={() => setSearchFocus(true)}
                onCancelButtonPress={() => {
                  setSearchStart(false);
                  setQuery('');
                }}
                onSearchButtonPress={search}
                hideBackground
              />
            </SearchContainer>
          </SearchBarWrapper>
        ),
        [search, searchFocus]
      )}

      {useMemo(
        () => (
          <StyledButtonGroup onPress={switchQueryType} selectedIndex={searchType} buttons={['Repositories', 'Users']} />
        ),
        [searchType, switchQueryType]
      )}

      {useMemo(
        () => isPendingSearch && <LoadingContainer animating={isPendingSearch} text={`Searching for ${query}`} />,
        [isPendingSearch, query]
      )}

      {useMemo(
        () =>
          searchStart &&
          !noResults && (
            <ListContainer noBorderTopWidth={isPendingSearch}>
              <FlatList
                data={getSearchResults()}
                onRefresh={() =>
                  getSearcher()(query, {
                    forceRefresh: true,
                  })
                }
                refreshing={isPendingSearch}
                onEndReached={() => getSearcher()(query, { loadMore: true })}
                onEndReachedThreshold={0.5}
                // ListFooterComponent={() => this.renderFooter(isPendingSearch)}
                keyExtractor={(item, index) => index.toString()}
                // renderItem={this.renderItem}
              />
            </ListContainer>
          ),
        [getSearchResults, getSearcher, isPendingSearch, noResults, query, searchStart]
      )}
    </View>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {
    pagination: { SEARCH_REPOS, SEARCH_USERS },
    entities: { repos, users },
  } = state;

  const searchQuery = ownProps.navigation.getParam(NAV_QUERY_PARAM);

  const reposSearchResultsPagination = SEARCH_REPOS[searchQuery] || {
    ids: [],
    isFetching: false,
  };
  const reposSearchResults = reposSearchResultsPagination.ids.map(id => repos[id]);

  const usersSearchResultsPagination = SEARCH_USERS[searchQuery] || {
    ids: [],
    isFetching: false,
  };
  const usersSearchResults = usersSearchResultsPagination.ids.map(id => users[id]);

  return {
    reposSearchResultsPagination,
    reposSearchResults,
    usersSearchResultsPagination,
    usersSearchResults,
    searchQuery,
  };
};

// const mapDispatchToProps = {
//   searchRepos: RestClient.search.repos,
//   searchUsers: RestClient.search.users,
// };

export default connect(mapStateToProps)(HomeScreen);
