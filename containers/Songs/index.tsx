import { Container, CustomCard, If, T } from "@common";
import SongsList from "@features/songs/components/SongsList";
import { Divider, Input, Pagination, Row, Affix } from "antd";
// import { ErrorState, Recommended, RepoList, YouAreAwesome } from "@features/repos/components";
// import { IRepoError, Recommendation } from "@features/repos/types";
import { IntlShape, injectIntl } from "react-intl";
import React, { memo, useEffect, useState } from "react";
import { debounce, get, isEmpty } from "lodash-es";
import { compose } from "redux";
// import { useFetchRecommendationQuery } from "@features/repos/api/getRecommendations";
import { useFetchSongsQuery } from "@app/features/songs/api/getItunesSongs";

interface SongContainerProps {
  intl: IntlShape;
}

const { Search } = Input;

export const Songs: React.FC<SongContainerProps> = ({ intl }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [offset, setOffset] = useState<number>(0);

  const limit = 10;

  useEffect(() => {
    const offset = currentPage * limit;

    setOffset(offset);
  }, [currentPage]);

  const { data, error, isLoading, isFetching } = useFetchSongsQuery({ searchTerm, offset, limit });

  const handleOnChange = debounce((e: any) => {
    const value = e.target.value;
    setCurrentPage(1);
    if (value) {
      setSearchTerm(value);
    }
  }, 500);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handlePageChange = (page: any, pageSize: any) => {
    setCurrentPage(page);
  };

  return (
    <Container
      padding={20}
      maxwidth={1000}
      style={{
        height: "100vh",
        alignSelf: "center",
      }}
    >
      <Search
        placeholder={intl.formatMessage({ id: "song_search" })}
        onChange={handleOnChange}
        onSearch={handleSearch}
        data-testid="search-input"
      />
      <SongsList loading={isFetching} data={data} error={error} />
      {/* <div></div> */}
      {data && (
        <Affix offsetBottom={0}>
          <div style={{ display: "flex", backgroundColor: "#fff", padding: "10px 0px" }}>
            <Pagination
              defaultCurrent={1}
              total={50}
              onChange={handlePageChange}
              style={{ marginTop: "10px auto 10px auto" }}
            />
          </div>
        </Affix>
      )}
    </Container>
  );
};

export default compose(injectIntl, memo)(Songs);
