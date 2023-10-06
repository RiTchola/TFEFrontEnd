import { Injectable } from '@angular/core';
import {Communique} from "../../../models/communique";

@Injectable({
  providedIn: 'root'
})
export class CommuniqueService {

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
  constructor() { }

    getCommuniqueById(id: number){
        return this.blogItems.filter(item=> item.id===id)[0];
    }

    addCommentar(data: Communique){
        
    }
}
