import { PersonContactType } from "../shared/interfaces/person-contact-type";

export class PersonExtern {
    id?: string;
    nom!: string;
    prenom!: string;
    email!: string;
    tel!: string;
    choix!: PersonContactType;
}
