import repos from "../repositories/";

class Action {
  login = async (email: string, password: string) => {
    return await repos.login.login({ email, password });
  };

  getGoogleLoginUrl = async () => {
    return await repos.login.getGoogleLoginUrl();
  };

  googleLogin = async (code: any) => {
    return await repos.login.loginWithGoogle({ code });
  };
}

const actions = new Action();

export default actions;
