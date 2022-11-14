import { makeAutoObservable } from "mobx";

class Loader {
  private visible = false;

  constructor() {
    makeAutoObservable(this);
  }

  show = () => {
    this.visible = true;
  };

  hide = () => {
    this.visible = false;
  };

  isVisible = () => {
    return this.visible;
  };
}

const loader = new Loader();

const useLoader = () => {
  return loader;
};

export default useLoader;
