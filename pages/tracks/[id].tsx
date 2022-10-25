import React from "react";
import { useRouter } from "next/router";
import SongInfo from "@app/containers/SongInfo";

const SongInfoPage = () => {
  const router = useRouter();

  const { id, entity } = router.query;

  return <SongInfo trackId={id} entity={entity} />;
};

export default SongInfoPage;
