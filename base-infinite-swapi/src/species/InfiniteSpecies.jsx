import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "react-query";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
    isLoading,
    isFetching,
  } = useInfiniteQuery(
    "sw-spices",
    ({ pageParams = initialUrl }) => fetchUrl(pageParams),
    { getNextPageParam: (lastPage) => lastPage.next || undefined }
  );

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div>Error! {error.toString()}</div>;

  return (
    <>
      {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((species) => {
            return (
              <>
                <Species
                  key={species.name}
                  name={species.name}
                  language={species.language}
                  averageLifespan={species.averageLifespan}
                />
              </>
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
