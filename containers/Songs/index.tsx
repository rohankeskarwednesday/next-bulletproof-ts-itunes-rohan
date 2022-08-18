import { Container, CustomCard, If, T } from "@common";
import SongsList from "@features/songs/components/SongsList";
import { Divider, Input, Pagination, Row } from "antd";
// import { ErrorState, Recommended, RepoList, YouAreAwesome } from "@features/repos/components";
// import { IRepoError, Recommendation } from "@features/repos/types";
import { IntlShape, injectIntl } from "react-intl";
import React, { memo, useEffect, useState } from "react";
import { debounce, get, isEmpty } from "lodash-es";
import { compose } from "redux";
import { fonts } from "@themes/index";
// import { useFetchRecommendationQuery } from "@features/repos/api/getRecommendations";
import { useRouter } from "next/router";
import { useFetchSongsQuery } from "@app/features/songs/api/getItunesSongs";

interface SongContainerProps {
  intl: IntlShape;
}

const { Search } = Input;

export const Songs: React.FC<SongContainerProps> = ({ intl }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, error, isLoading, isFetching } = useFetchSongsQuery({ searchTerm });

  const handleOnChange = debounce((e: any) => {
    const value = e.target.value;

    if (value) {
      setSearchTerm(value);
    }
  }, 500);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <Container
      padding={20}
      maxwidth={500}
      style={{
        height: "100vh",
        alignSelf: "center",
      }}
    >
      <Search placeholder="Search for songs" onChange={handleOnChange} onSearch={handleSearch} />
      <SongsList loading={isLoading} data={data} />
    </Container>
  );
};

export default compose(injectIntl, memo)(Songs);
