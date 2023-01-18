import useLoader from "../../states/Loader";

abstract class BaseUseCase {
  private loader = useLoader();

  protected startLoader = () => {
    this.loader.show();
  };

  protected stopLoader = () => {
    this.loader.hide();
  };
}

export default BaseUseCase;
