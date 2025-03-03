import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputImagesService {

  private imagePrefix = 'profileImage_';

  setImage(userId: string, image: string): void {
    localStorage.setItem(`${this.imagePrefix}${userId}`, image);   
  }

  getImage(userId: string | null): string | null {
    if (!userId) return null;
    return localStorage.getItem(`${this.imagePrefix}${userId}`);
  }

  clearImage(userId: string): void {
    localStorage.removeItem(`${this.imagePrefix}${userId}`);
  }
}
