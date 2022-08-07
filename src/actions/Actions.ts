import repos from "../repositories/";

class Action {
  login = async (username: string, password: string) => {
    return await repos.login.login({ username, password });
  };

  getGoogleLoginUrl = async () => {
    return await repos.login.getGoogleLoginUrl();
  };

  googleLogin = async (code: any, state: any) => {
    return await repos.login.loginWithGoogle({ code, state });
  };
}

const actions = new Action();

export default actions;
