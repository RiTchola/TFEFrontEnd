import { Etablissement } from "./etablissement";
import { MedecinTraitant } from "./medecin-traitant";
import { PersonContact } from "./person-contact";
import { RapportVisite } from "./rapport-visite";
import { RapportQuotidien } from "./rapport-quotidien";
import { User } from "./user";

export class Resident {
    id?: number;
    nom!: string;
    prenom!: string;
    dateNaissance!: string;
    email!: string;
    tel!: string;
    adresse!: string;
    statut!: string;
    dateEntree!: string;
    motifEntree!: string;
    dateSortie!: string;
    motifSortie!: string;
    antMedical!: string;
    antChirugical!: string;
    nbEnfant: number = 0;
    chambre!: string;
    etatSante!: string;
    actif: boolean = false;
    user!: User;
    medecinTraitant!: MedecinTraitant;
    etablissement!: Etablissement;
    personneContacts!: PersonContact[];
    rapportQuotidiens!: RapportQuotidien[];
    rapportVisites!: RapportVisite[];
}
