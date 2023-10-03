const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

export class Util {
    public static getMonth(mois: number) {
        const idx = mois;
        return `${MONTHS[idx]}`;
    }
}
