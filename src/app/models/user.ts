export class User {
    id?: number;
    username!: string;
    password!: string;
    role!: string;
    enabled: boolean = false;
    authorities?: [];
    accountNonExpired?: boolean = true;
    accountNonLocked?: boolean = true;
    credentialsNonExpired?: boolean;
}
