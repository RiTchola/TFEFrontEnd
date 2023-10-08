import { User } from "./user";

export class ContactPerson {
    id?: number;
    idUser?: number;
    nom!: string;
    prenom!: string;
    dateNaissance!: Date;
    email?: string;
    tel1!: string;
    tel2?: string;
    adresse!: string;
    statut!: string;
    choix!: string;
}
