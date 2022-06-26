import {IManagement} from "../i-management";
import {User} from "../../model/user";

export interface IUserManagement extends IManagement<User> {
    findByUsername(username: string) : User | null;
    findByEmail(email: string) : User| null;
    login(username: string, password: string): User| null;
}
