import React, { FC, useMemo, useEffect, useState } from "react";
import { useLocation } from "react-router";
import actions from "../../actions";
import StringUtils from "../../components/utils/StringUtils";

const GoogleCallback: FC = () => {
  const { search } = useLocation();
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
          // TODO
        }
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
