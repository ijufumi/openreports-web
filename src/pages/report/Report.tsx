import React, { FC } from "react";
import { useParams } from "react-router";
import { HStack } from "@chakra-ui/react";

interface Props {}

const Report: FC<Props> = () => {
  const params = useParams();
  const id = params.id;

  console.log(id);
  return <HStack></HStack>;
};

export default Report;
