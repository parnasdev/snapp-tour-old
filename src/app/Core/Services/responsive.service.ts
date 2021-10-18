import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ResponsiveService {

    isMobile(): boolean {
        return window.innerWidth < 769;
    }

    isTV(): boolean {
        return window.innerWidth > 3200;
    }
}



