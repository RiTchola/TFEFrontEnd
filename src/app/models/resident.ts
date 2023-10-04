export type StatutM = 
    | ""
    | "CELIBATAIRE"
    | "MARIE"
    | "DIVORCE"
    | "VEUF";

export class Resident {
    id?: number;
    nom!: string;
    prenom!: string;
    dateNaissance!: Date;
    email!: string;
    tel!: string;
    adresse!: string;
    statut!: StatutM;
    dateEntree!: Date;
    motifEntree!: string;
    dateSortie!: Date;
    motifSortie!: string;
    antMedical!: string;
    antChirugical!: string;
    nbEnfant: number = 0;
    chambre!: string;
    etatSante!: string;
    actif: boolean = true;
}
