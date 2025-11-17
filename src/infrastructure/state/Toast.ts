import { makeAutoObservable } from "mobx";

// Chakra UI v3 toast types
type ToastType = "success" | "error" | "warning" | "info" | "loading";

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
    const type = "success";
    const { title, description } = args;
    this.message = new Toast({
      title,
      description,
      type,
    });
  };

  errorMessage = (args: Message) => {
    const type = "error";
    const { title, description } = args;
    this.message = new Toast({
      title,
      description,
      type,
    });
  };

  clear = () => {
    this.message = undefined;
  };
}

class Toast {
  private readonly title: string = "";
  private readonly description: string = "";
  private readonly type: ToastType = "success";

  constructor(args: {
    title: string;
    description: string;
    type: ToastType;
  }) {
    this.title = args.title;
    this.description = args.description;
    this.type = args.type;
  }

  getTitle = () => {
    return this.title;
  };

  getDescription = () => {
    return this.description;
  };

  getType = () => {
    return this.type;
  };

  // Keep getStatus for backward compatibility
  getStatus = () => {
    return this.type;
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
