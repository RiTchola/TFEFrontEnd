export interface Fichier{
    id: number,
    date: Date,
    personneContact: string,
    fileURL?: string,
    typeF: 'VIDEO' | 'IMAGE'
}
