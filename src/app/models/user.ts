import { RoleType } from "../shared/interfaces/roleType";

export class User {
    username!: string;
    password!: string;
    role!: RoleType;
    enabled: boolean = false;
    authorities?: [];
    accountNonExpired?: boolean = true;
    accountNonLocked?: boolean = true;
    credentialsNonExpired?: boolean;
}
