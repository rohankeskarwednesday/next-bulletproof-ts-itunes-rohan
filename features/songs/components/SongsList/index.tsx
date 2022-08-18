/**
 *
 * RepoList
 *
 */

import React from "react";
import get from "lodash/get";
import { Skeleton, Card } from "antd";
import { T, CustomCard, If } from "@common";

interface SongListProps {
  data?: any;
  loading: boolean;
}

const { Meta } = Card;

const SongsList: React.FC<SongListProps> = props => {
  const { data, loading } = props;

  const items: any[] = get(data, "results", []);
  const totalCount: number = get(data, "resultCount", 0);
  const BlockText = props => <T display="block" {...props} />;

  return (
    <If condition={items.length !== 0 || loading}>
      {totalCount !== 0 && <BlockText id="matching_songs" values={{ totalCount }} />}
      <div data-test-id="songs-list" style={{ display: "flex", flexWrap: "wrap" }}>
        <Skeleton loading={loading} active>
          {items.map((item, index: number) => (
            <Card
              key={index}
              hoverable
              style={{ width: 200, marginLeft: "20px", marginTop: "30px" }}
              cover={<img src={item.artworkUrl100} />}
            >
              <Meta title={item.collectionCensoredName} description={""} />
            </Card>
          ))}
        </Skeleton>
      </div>
    </If>
  );
};

export default SongsList;
