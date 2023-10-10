const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

export class Util {
    public static getMonth(mois: number) {
        const idx = mois;
        return `${MONTHS[idx]}`;
    }

    public static displayAsDate(date: Date) {
        const d = new Date(date);
        return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
    }

    public static formatDate(date: Date){
        const year = date.getFullYear();
        let day = date.getDate().toString();
        const idx =  (date.getMonth() + 1);

        // Pad single digit month and day with a leading zero
        day = day.length < 2 ? '0' + day : day;

        return `${day} ${MONTHS[idx]} ${year}`;
    }
}
