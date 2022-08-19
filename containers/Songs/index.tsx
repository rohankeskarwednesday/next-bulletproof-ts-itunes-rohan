import { Container } from "@common";
import SongsList from "@features/songs/components/SongsList";
import { Input, Pagination, Affix } from "antd";
import { IntlShape, injectIntl } from "react-intl";
import React, { memo, useEffect, useState } from "react";
import { debounce } from "lodash-es";
import { compose } from "redux";
import { useFetchSongsQuery } from "@app/features/songs/api/getItunesSongs";

import { successGetSongs } from "@slices/songs";
import { useDispatch } from "react-redux";

interface SongContainerProps {
  intl: IntlShape;
}

const { Search } = Input;

export const Songs: React.FC<SongContainerProps> = ({ intl }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [offset, setOffset] = useState<number>(0);

  const dispatch = useDispatch();

  const limit = 10;

  useEffect(() => {
    const offset = currentPage * limit;

    setOffset(offset);
  }, [currentPage]);

  const { data, error, isLoading, isFetching } = useFetchSongsQuery({ searchTerm, offset, limit });

  if (data) {
    dispatch(successGetSongs(data as any));
  }

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
      {data && (
        <Affix offsetBottom={0}>
          <div style={{ display: "flex", backgroundColor: "#fff", padding: "10px 0px" }}>
            <Pagination
              defaultCurrent={1}
              total={50}
              onChange={handlePageChange}
              style={{ marginTop: "10px auto" }}
            />
          </div>
        </Affix>
      )}
    </Container>
  );
};

export default compose(injectIntl, memo)(Songs);
