enum Keys {
  API_TOKEN = "api_token",
}

class Credentials {
  hasToken = () => {
    return this.getToken() != undefined;
  };

  setToken = (token: string) => {
    sessionStorage.setItem(Keys.API_TOKEN, token);
  };

  getToken = () => {
    return sessionStorage.getItem(Keys.API_TOKEN);
  };

  removeToken = () => {
    sessionStorage.removeItem(Keys.API_TOKEN);
  };
}

const credentials = new Credentials();

export default credentials;
