export type TypePersonne =
    | "EPOUX"
    | "EPOUSE"
    | "PARENT"
    | "ENFANT"
    | "PETIT_FILS"
    | "PETITE_FILLE"
    | "AUTRE_FAMILLE"
    | "AMI"
    | "AVOCAT"
    | "MEDECIN_TRAITANT"
    | "KINESITHERAPEUTE"
    | "AUTRE";
export interface RapportVisite {
    id: number,
    nomResid: string,
    prenomResid: string,
    dateBirthResid: Date,
    commentaire: string,
    dateVisite: Date,
    nomVisiteur: string,
    typePersonne: TypePersonne
}
