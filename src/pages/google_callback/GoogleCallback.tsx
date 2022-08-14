import React, { FC, useMemo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import actions from "../../actions";
import StringUtils from "../../components/utils/StringUtils";

interface Props {}

const GoogleCallback: FC<Props> = () => {
  const { search } = useLocation();
  const navigation = useNavigate();
  const [initialized, setInitialized] = useState<boolean>(false);

  const params = useMemo(() => {
    return new URLSearchParams(search);
  }, [search]);

  useEffect(() => {
    const initialize = async () => {
      const code = params.get("code");
      const state = params.get("state");
      if (!StringUtils.isBlank(code) && !StringUtils.isBlank(state)) {
        const member = await actions.googleLogin(code, state);
        if (member) {
          navigation("/top");
        }
        navigation("/error/google");
      }
      setInitialized(true);
    };

    initialize();
  }, [params]);

  if (!initialized) {
    return null;
  }

  return <div />;
};

export default GoogleCallback;
