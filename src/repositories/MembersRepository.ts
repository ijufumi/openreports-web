import UserVo from "../vos/UserVo";
import GoogleAuthUrlVo from "../vos/GoogleAuthUrlVo";

interface MembersRepository {
  logout(): Promise<void>;

  status(): Promise<UserVo>;
}

export default MembersRepository;
