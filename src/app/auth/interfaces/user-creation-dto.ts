export interface UserCreationDTO {
  username:string,
  password:string,
  teamId:number,
  role:"Admin" | "Member",
}
