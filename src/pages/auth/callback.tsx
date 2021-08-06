import { NextPage } from "next";
import React from "react";

import { Loader } from "@components/atoms";

const View: React.FC<NextPage> = () => {
  return <Loader fullScreen />;
};

export default View;
