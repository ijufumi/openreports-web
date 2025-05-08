import React, { FC, useMemo, useEffect, useState } from "react"
import { useLocation } from "react-router"
import UseCaseFactory from "../../usecases/UseCaseFactory"
import StringUtils from "../../components/utils/string/StringUtils"
import useNavigator from "../navigator"

interface Props {}

const GoogleCallback: FC<Props> = () => {
  const { search } = useLocation()
  const navigator = useNavigator()
  const [initialized, setInitialized] = useState<boolean>(false)

  const loginUseCase = UseCaseFactory.createLoginUseCase()

  const params = useMemo(() => {
    return new URLSearchParams(search)
  }, [search])

  useEffect(() => {
    const initialize = async () => {
      const code = !!params?.get("code") ? params.get("code") : ""
      if (!StringUtils.isBlank(code)) {
        const member = await loginUseCase.loginWithGoogle({ code })
        if (member) {
          navigator.toTop()
          return
        }
        navigator.toGoogleError()
      }
      setInitialized(true)
    }

    initialize()
  }, [params])

  if (!initialized) {
    return null
  }

  return <div />
}

export default GoogleCallback
