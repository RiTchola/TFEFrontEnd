import { Etablissement } from "./etablissement";
import { PersonExtern } from "./person-extern";

export class RapportVisite {
    id?: string;
    dateVisite!: string;
    commentaire?: string;
    etablissement!: Etablissement;
    personneExterne!: PersonExtern[];
}
