import { Location } from './location';
export class Place {
    constructor(public title: string, 
                public description: string, 
                public loaction: Location,
                public imagePath: string) {

    }
}