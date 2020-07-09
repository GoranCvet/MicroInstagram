import { IPictures } from '../pictures/pictures';

export class IAlbum{
    userId: number;
    id: number;
    title: string;
    pictures: IPictures[];
}