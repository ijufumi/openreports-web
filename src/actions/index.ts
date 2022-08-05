import repos from "../repositories/";

class Action {
  login = async (username: string, password: string) => {
    return await repos.login.login({ username, password });
  };

  googleLogin = async () => {
    return await repos.login.getGoogleLoginUrl();
  };
}

const actions = new Action();

export default actions;
