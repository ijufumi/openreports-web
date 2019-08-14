export function login(loginId, password) {
   return {
      type : 'FETCH_REQUESTED',
      loginId,
      password,
   }
}