export class Resident {
    id?: number;
    nom!: string;
    prenom!: string;
    dateNaissance!: Date;
    email!: string;
    tel!: string;
    adresse!: string;
    statut!: string;
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
