export interface Fichier{
    id: number,
    destinataire: string,
    date: Date,
    nomPersContact: string,
    prenomPersContact: string,
    fileURL?: string,
    typeF: 'VIDEO' | 'IMAGE'
}
