import { Injectable } from '@angular/core';
import {Communique} from "../../../models/communique";
import {HttpClient, HttpErrorResponse, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommuniqueService {
    apiUrl: string= environment.apiPath+'/communique';

    blogItems: Communique[] = [
        {
            id: 0,
            date: new Date(),
            titre: 'Visual Graphics',
            contenu: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
            fileUrl: ['assets/images/image.png',
                'assets/images/image.png',
                'assets/images/image2.png',
                'assets/images/image3.png',
                'assets/images/image4.png',
                'assets/images/image5.png',
                'assets/images/image6.png']
        },
        {
            id: 1,
            date: new Date(),
            titre: 'Visual Graphics',
            contenu: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
            fileUrl: ['assets/images/image.png',
                'assets/images/image.png',
                'assets/images/image2.png',
                'assets/images/image3.png',
                'assets/images/image4.png',
                'assets/images/image5.png',
                'assets/images/image6.png']
        },
        {
            id: 2,
            date: new Date(),
            titre: 'Visual Graphics',
            contenu: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
            fileUrl: ['assets/images/image.png',
                'assets/images/image.png',
                'assets/images/image2.png',
                'assets/images/image3.png',
                'assets/images/image4.png',
                'assets/images/image5.png',
                'assets/images/image6.png']
        },
        {
            id: 3,
            date: new Date(),
            titre: 'Visual Graphics',
            contenu: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
            fileUrl: ['assets/images/image.png',
                'assets/images/image.png',
                'assets/images/image2.png',
                'assets/images/image3.png',
                'assets/images/image4.png',
                'assets/images/image5.png',
                'assets/images/image6.png']
        },
        {
            id: 4,
            date: new Date(),
            titre: 'Visual Graphics',
            contenu: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
            fileUrl: ['assets/images/image.png',
                'assets/images/image.png',
                'assets/images/image2.png',
                'assets/images/image3.png',
                'assets/images/image4.png',
                'assets/images/image5.png',
                'assets/images/image6.png']
        },
        {
            id: 5,
            date: new Date(),
            titre: 'Visual Graphics',
            contenu: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
            fileUrl: ['assets/images/image.png',
                'assets/images/image.png',
                'assets/images/image2.png',
                'assets/images/image3.png',
                'assets/images/image4.png',
                'assets/images/image5.png',
                'assets/images/image6.png']
        }
    ]
  constructor(private http: HttpClient) { }

    createCommunique(contenu: string, titre: string, date: string, files: File[]): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('contenu', contenu);
        formData.append('titre', titre);
        formData.append('date', date);

        files.forEach((file, index) => {
            formData.append('files', file, file.name);
        });
        const req: HttpRequest<FormData> = new HttpRequest(
            "POST",
            this.apiUrl,
            formData, {
                reportProgress: true,
                responseType: "json",
            });
        return this.http.request(req);
    }

    getCommuniqueById(id: number){
        return this.blogItems.filter(item=> item.id===id)[0];
    }

    addCommentar(data: Communique){

    }
}
