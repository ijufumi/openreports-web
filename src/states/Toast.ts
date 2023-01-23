import { makeAutoObservable } from "mobx";
import { AlertStatus } from "@chakra-ui/react";

interface Message {
  title: string;
  description: string;
}

class ToastState {
  message: Toast | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  successMessage = (args: Message) => {
    const status = "success";
    const { title, description } = args;
    this.message = new Toast({
      title,
      description,
      status,
    });
  };

  errorMessage = (args: Message) => {
    const status = "error";
    const { title, description } = args;
    this.message = new Toast({
      title,
      description,
      status,
    });
  };

  clear = () => {
    this.message = undefined;
  };
}

class Toast {
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

const toastState = new ToastState();

export const successToast = (args: Message) => {
  toastState.successMessage(args);
};

export const errorToast = (args: Message) => {
  toastState.errorMessage(args);
};

export const useToastState = () => {
  return toastState;
};
