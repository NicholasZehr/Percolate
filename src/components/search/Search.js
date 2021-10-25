import React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Index,
  connectStateResults,
} from "react-instantsearch-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const searchClient = algoliasearch(
  "JP955S508F",
  "3de80a48e4011b0c171789a11801fb58"
);

export const Search = () => (
  <InstantSearch indexName="coffees" searchClient={searchClient}>
    <SearchBox />
    {isSearch ? (
      <div className="search-results">
        <Results></Results>
      </div>
    ) : null}
  </InstantSearch>
);

function Hit(props) {
  return (
    <Link to={`/${props.hit.path}`}>
      <div className="results">
        <img
          className="hit-photo"
          src={
            props.hit.photoURL
              ? props.hit.photoURL
              : props.hit.photoUrl
              ? props.hit.photoUrl
              : props.hit.imageUrl
          }
          align="left"
          alt="results"
        />
        <p>
          {props.hit.displayName
            ? props.hit.displayName
            : props.hit.name
            ? props.hit.name
            : `${props.hit.firstName} ${props.hit.lastName}`}
        </p>
      </div>
    </Link>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

const IndexResults = connectStateResults(
  ({ searchState, searchResults, children }) =>
    searchResults && searchResults.nbHits !== 0 ? (
      children
    ) : (
      <div>
        NO RESULTS FOUND IN
        {searchResults ? ` ${searchResults.index.toUpperCase()}` : ""}
      </div>
    )
);
const AllResults = connectStateResults(({ allSearchResults, children }) => {
  const hasResults =
    allSearchResults &&
    Object.values(allSearchResults).some((results) => results.nbHits > 0);
  return !hasResults ? (
    <div>
      <div>
        We're sorry, but we don't have anything that matches your search
      </div>
      <Index indexName="coffees" />
      <Index indexName="Users" />
      <Index indexName="businesses" />
    </div>
  ) : (
    children
  );
});

const Results = connectStateResults(({ searchState }) =>
  searchState && searchState.query ? (
    <AllResults>
      <Index indexName="coffees">
        <IndexResults>
          <h3 className="hit-label">Coffees: </h3>
          <Hits hitComponent={Hit} />
        </IndexResults>
      </Index>
      <Index indexName="Users">
        <IndexResults>
          <h3 className="hit-label">Users: </h3>
          <Hits hitComponent={Hit} />
        </IndexResults>
      </Index>
      <Index indexName="businesses">
        <IndexResults>
          <h3 className="hit-label">Businesses:</h3>
          <Hits hitComponent={Hit} />
        </IndexResults>
      </Index>
    </AllResults>
  ) : null
);

const isSearch = connectStateResults(({ searchState }) =>
  searchState && searchState.query ? true : false
);
