import User from "./user.model";

export default interface Contact {
  id?: string,
  email: string,
  password: string,
  user: User
}