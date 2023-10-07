export interface UserLoginSuccessDTO {
  message: string,
  username:string,
  role:string,
  token: string,
  teamId: number
}
