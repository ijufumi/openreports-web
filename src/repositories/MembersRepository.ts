import User from "../vos/User";
import GoogleAuthUrl from "../vos/GoogleAuthUrl";

interface MembersRepository {
  logout(): Promise<undefined>;

  status(): Promise<User | undefined>;
}

export default MembersRepository;
