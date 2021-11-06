import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HotelApiService} from "../../../Core/Https/hotel-api.service";
import {MessageService} from "../../../Core/Services/message.service";
import {CommonApiService} from "../../../Core/Https/common-api.service";
import {SessionService} from "../../../Core/Services/session.service";
import {HotelListRes, HotelRequestDTO} from "../../../Core/Models/hotelDTO";
import {FormControl} from "@angular/forms";
import {CityListRequestDTO, CityResponseDTO} from "../../../Core/Models/cityDTO";
import {CityApiService} from "../../../Core/Https/city-api.service";

@Component({
    selector: 'prs-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    cityFC = new FormControl();
    hotelReq: HotelRequestDTO = {
        isAdmin: true,
        paginate: true,
        city: null
    };
    citiesResponse: CityResponseDTO[] = []
    hotelList: HotelListRes[] = [];
    cityType = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                public hotelApi: HotelApiService,
                public message: MessageService,
                public cityApiService: CityApiService,
                public commonApi: CommonApiService,
                public session: SessionService,
    ) {
    }

    ngOnInit(): void {
        this.getCities();
        this.getList();
    }

    getList(): void {
        this.hotelList = [];
        this.hotelReq = {
            isAdmin: true,
            paginate: true,
            city: +this.cityFC.value
        }
        this.hotelApi.getHotels(this.hotelReq).subscribe((res: any) => {
            if (res.isDone) {
                this.hotelList = res.data;

            } else {
                this.message.custom(res.message)
            }
        }, (error: any) => {
            this.message.error()

        })
    }


    getCities(): void {
        const req: CityListRequestDTO = {
            type: this.cityType,
            hasHotel: false,
            hasTour: false,
            search: null,
            perPage: 20
        }
        this.cityApiService.getCities(req).subscribe((res: any) => {
            if (res.isDone) {
                this.citiesResponse = res.data;
                this.cityFC.setValue(this.citiesResponse[0].id)
                this.getList()
            }
        }, (error: any) => {
            this.message.error()
        })
    }

    typeChange(): void {
        this.getCities();
    }

    deleteHotel(slug: string) {
        this.hotelApi.delete(slug).subscribe((res: any) => {
            if (res.isDone) {
                this.message.custom(res.message);
                this.getList();
            } else {
                this.message.custom(res.message)
            }
        }, (error: any) => {
            this.message.error()
        })
    }

}
