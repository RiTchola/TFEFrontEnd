const MONTHS = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];

export class Util {
    public static toDate(date: string) {
        const idx = Number.parseInt(date.split('-')[1]) - 1;
        return `${date.split('-')[2]} ${MONTHS[idx]} ${date.split('-')[0]}`;
    }

    public static displayAsDate(date: Date) {
        const d = new Date(date);
        return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
    }
}
