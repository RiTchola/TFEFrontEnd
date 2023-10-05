import { Etablissement } from './etablissement';
import { HumorType } from '../shared/interfaces/humorType';
export class DailyReport {
    id?: string;
    numeroR!: boolean;
    date!: string;
    reqCardiaque!: string;
    freqRespiratoire!: string;
    presArterielle!: string;
    temperature!: string;
    satOxygene!: string;
    sommeil!: boolean;
    selle!: boolean;
    urine!: boolean;
    coiffure!: boolean;
    manicure!: boolean;
    pedicure!: boolean;
    toilette!: boolean;
    vetements!: boolean;
    humeur!: HumorType;
    commentaire?: string;
    etablissement!: Etablissement;
}
