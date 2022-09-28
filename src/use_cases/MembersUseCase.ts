interface MembersUseCase {
  logout(): void;

  isLoggedIn(): Promise<boolean>;
}

export default MembersUseCase;
