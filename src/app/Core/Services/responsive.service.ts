import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ResponsiveService {

    isMobile(): boolean {
        return window.innerWidth < 414;
    }
    isTablet(): boolean {
    return window.innerWidth < 800;
    }
    isTV(): boolean {
        return window.innerWidth > 3200;
    }
}



