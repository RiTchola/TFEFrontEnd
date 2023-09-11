import { User } from "./user";

export class Etablissement {
    id?: string;
    nom!: string;
    email1!: string;
    email2?: string;
    tel1!: string;
    tel2?: string;
    adresse!: string;
    dateCreation?: string;
    user!: User;
}
