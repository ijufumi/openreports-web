enum Keys {
  API_TOKEN = "api_token",
  WORKSPACE_ID = "workspace_id",
}

export const Credentials = {
  hasToken() {
    return Credentials.has(Keys.API_TOKEN);
  },

  setToken(token: string) {
    Credentials.set(Keys.API_TOKEN, token);
  },

  getToken() {
    return Credentials.get(Keys.API_TOKEN);
  },

  removeToken() {
    Credentials.remove(Keys.API_TOKEN);
  },

  setWorkspaceId(id: string) {
    Credentials.set(Keys.WORKSPACE_ID, id);
  },

  getWorkspaceId() {
    return Credentials.get(Keys.WORKSPACE_ID);
  },

  removeWorkspaceId() {
    Credentials.remove(Keys.WORKSPACE_ID);
  },

  set(key: Keys, value: string) {
    sessionStorage.setItem(key, value);
  },

  get(key: Keys) {
    return sessionStorage.getItem(key);
  },

  has(key: Keys) {
    return Credentials.get(key) !== undefined;
  },

  remove(key: Keys) {
    sessionStorage.removeItem(key);
  },
};

export default Credentials;
