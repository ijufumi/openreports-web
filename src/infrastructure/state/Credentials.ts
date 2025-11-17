enum Keys {
  API_TOKEN = "api_token",
  WORKSPACE_ID = "workspace_id",
  REFRESH_TOKEN = "refresh_token",
}

export const Credentials = {
  hasToken() {
    return Credentials.has(Keys.API_TOKEN)
  },

  setToken(token: string) {
    Credentials.set(Keys.API_TOKEN, token)
  },

  getToken() {
    return Credentials.get(Keys.API_TOKEN)
  },

  removeToken() {
    Credentials.remove(Keys.API_TOKEN)
  },

  hasRefreshToken() {
    return Credentials.has(Keys.REFRESH_TOKEN)
  },

  setRefreshToken(token: string) {
    Credentials.set(Keys.REFRESH_TOKEN, token)
  },

  getRefreshToken() {
    return Credentials.get(Keys.REFRESH_TOKEN)
  },

  removeRefreshToken() {
    Credentials.remove(Keys.REFRESH_TOKEN)
  },

  setWorkspaceId(id: string) {
    Credentials.set(Keys.WORKSPACE_ID, id)
  },

  getWorkspaceId() {
    return Credentials.get(Keys.WORKSPACE_ID)
  },

  removeWorkspaceId() {
    Credentials.remove(Keys.WORKSPACE_ID)
  },

  has(key: Keys) {
    return Credentials.get(key) !== undefined
  },

  set(key: Keys, value: string) {
    localStorage.setItem(key, value)
  },

  get(key: Keys) {
    return localStorage.getItem(key)
  },

  remove(key: Keys) {
    localStorage.removeItem(key)
  },
}

export default Credentials
