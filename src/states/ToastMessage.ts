import { makeAutoObservable } from "mobx";
import { AlertStatus } from "@chakra-ui/react";

class ToastMessageState {
  message: ToastMessage | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  successMessage = (args: { title: string; description: string }) => {
    const status = "success";
    const { title, description } = args;
    this.message = new ToastMessage({
      title,
      description,
      status,
    });
  };

  errorMessage = (args: { title: string; description: string }) => {
    const status = "error";
    const { title, description } = args;
    this.message = new ToastMessage({
      title,
      description,
      status,
    });
  };

  clear = () => {
    this.message = undefined;
  };
}

class ToastMessage {
  private readonly title: string = "";
  private readonly description: string = "";
  private readonly status: AlertStatus = "success";

  constructor(args: {
    title: string;
    description: string;
    status: AlertStatus;
  }) {
    this.title = args.title;
    this.description = args.description;
    this.status = args.status;
  }

  getTitle = () => {
    return this.title;
  };

  getDescription = () => {
    return this.description;
  };

  getStatus = () => {
    return this.status;
  };
}

const toastMessageState = new ToastMessageState();

const useToastMessageState = () => {
  return toastMessageState;
};

export default useToastMessageState;
