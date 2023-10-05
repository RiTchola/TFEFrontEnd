import { PersonContactType } from "../shared/interfaces/contact-person-type";

export class PersonExtern {
    id?: string;
    nom!: string;
    prenom!: string;
    email!: string;
    tel!: string;
    choix!: PersonContactType;
}
