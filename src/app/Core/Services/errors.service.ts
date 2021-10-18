import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorsService {
    errors = {};

    constructor() {
        this.errors = {};
    }


    hasError(field: any): any {
        return this.errors.hasOwnProperty(field);
    }

    getError(field: any): any {
        // @ts-ignore
        if (this.errors[field]) {
            // @ts-ignore
            return this.errors[field][0];
        }

    }

    recordError(error: any): any {
        this.errors = error;
    }

    any(): any {
        return Object.keys(this.errors).length > 0;
    }

    clear(field = null): any {
        if (field) {
            // @ts-ignore
            delete this.errors[field];
            return;
        }
        this.errors = {};

    }
}




