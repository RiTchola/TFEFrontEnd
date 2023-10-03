const MONTHS = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];

export class Util {
    public static getMonth(mois: number) {
        const idx = mois;
    return `${MONTHS[idx]}`;
    }
}
