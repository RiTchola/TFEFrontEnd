import { PersonContactType } from "../shared/interfaces/person-contact-type";
import { Status } from "../shared/interfaces/person-status";
import { User } from "./user";

export class PersonContact {
    id?: number;
    nom!: string;
    prenom!: string;
    dateNaissance!: string;
    email!: string;
    tel1!: string;
    tel2?: string;
    adresse!: string;
    statut!: Status;
    choix!: PersonContactType;
    user!: User;
}
