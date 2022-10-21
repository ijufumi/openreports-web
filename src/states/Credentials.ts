enum Keys {
  API_TOKEN = "api_token",
  WORKSPACE_ID = "workspace_id",
}

class Credentials {
  hasToken = () => {
    return this.has(Keys.API_TOKEN);
  };

  setToken = (token: string) => {
    this.set(Keys.API_TOKEN, token);
  };

  getToken = () => {
    return this.get(Keys.API_TOKEN);
  };

  removeToken = () => {
    this.remove(Keys.API_TOKEN);
  };

  setWorkspaceId = (id: string) => {
    this.set(Keys.WORKSPACE_ID, id);
  };

  getWorkspaceId = () => {
    return this.get(Keys.WORKSPACE_ID);
  };

  removeWorkspaceId = () => {
    this.remove(Keys.WORKSPACE_ID);
  };

  set = (key: Keys, value: string) => {
    sessionStorage.setItem(key, value);
  };

  get = (key: Keys) => {
    return sessionStorage.getItem(key);
  };

  has = (key: Keys) => {
    return this.get(key) !== undefined;
  };

  remove = (key: Keys) => {
    sessionStorage.removeItem(key);
  };
}

const credentials = new Credentials();

export default credentials;
