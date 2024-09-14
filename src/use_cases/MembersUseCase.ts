interface MembersUseCase {
  logout(): Promise<void>

  isLoggedIn(): Promise<boolean>
}

export default MembersUseCase
