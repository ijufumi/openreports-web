import UserVo from "../vos/UserVo";
import GoogleAuthUrlVo from "../vos/GoogleAuthUrlVo";

interface MembersRepository {
  logout(): Promise<undefined>;

  status(): Promise<UserVo | undefined>;
}

export default MembersRepository;
