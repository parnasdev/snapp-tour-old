import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MessageService} from "../../Core/Services/message.service";

@Component({
  selector: 'prs-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {
  hourFC = new FormControl('00')
  minuteFC = new FormControl('00')
  hour = 0;
  minute = 0
  @Output() result = new EventEmitter()
  pattern = /^-?(0|[0-9]\d*)?$/;
  constructor(public message: MessageService) {
  }

  ngOnInit(): void {
  }

  increaseHour(): void {
    debugger
    if (+this.hourFC.value === 23) {
      this.hour = 0;
      this.hourFC.setValue(this.formatter(this.hour))

    } else {
      this.hour++
      this.hourFC.setValue(this.formatter(this.hour))

    }
  }

  decreaseHour(): void {
    if (+this.hourFC.value === 0 || this.hourFC.value === '00') {
      this.hour = 23;
      this.hourFC.setValue(this.formatter(this.hour))
    } else {
      debugger
      if (this.hour > 0){
        this.hour--
        this.hourFC.setValue(this.formatter(this.hour))
      } else {
        this.hour = 23;
        this.hourFC.setValue(this.formatter(this.hour))
      }


    }
  }

  increaseMinutes(): void {
    debugger
    if (+this.minuteFC.value === 59) {
      this.minute = 0;
      this.minuteFC.setValue(this.formatter(this.minute))
    } else {
      this.minute++
      this.minuteFC.setValue(this.formatter(this.minute))
    }
  }

  decreaseMinutes(): void {
    debugger
    if (+this.minuteFC.value === 0 || this.minuteFC.value === '00') {
      this.minute = 59;
      this.minuteFC.setValue(this.formatter(this.minute))
    } else {
      debugger
      if (this.minute > 0){
        this.minute--
        this.minuteFC.setValue(this.formatter(this.minute))
      } else {
        this.minute = 59;
        this.minuteFC.setValue(this.formatter(this.minute))
      }
    }
  }

  minutesChanged(event: any): void {
    console.log(this.pattern.test(event.target.value))
    debugger
    if (!this.pattern.test(event.target.value)) {
      event.target.value = '00';
      this.minute = 0;
    }else {
      debugger
      if (this.minuteFC.value.length < 3){
        if (+this.minuteFC.value > 59) {
          this.minute = 0
          this.minuteFC.setValue(this.formatter(this.minute))
        }else {
          this.minute = +this.minuteFC.value
        }
      } else {
        this.minuteFC.setValue('00')
        this.minute = 0
      }

      this.result.emit({hour: this.hourFC.value, minute: this.minuteFC.value})
    }

  }

  hourChanged(event: any): void {
    if (!this.pattern.test(event.target.value)) {
      event.target.value = '00';
      this.hour = 0;
    }else {
      if (this.hourFC.value.length < 3){
        if (+this.hourFC.value > 23 && this.hourFC.value.length > 2) {
          this.hour = 0
          this.hourFC.setValue(this.formatter(this.hour))
        }else {
          this.hour = +this.hourFC.value
        }
      } else {
        this.hourFC.setValue('00')
        this.hour = 0
      }
      this.result.emit({hour: this.hourFC.value, minute: this.minuteFC.value})
    }
  }

  formatter(n: number) {
    return n > 9 ? '' + n : '0' + n;
  }

  public inputValidator(event: any) {
    if (this.pattern.test(event.target.value)) {
      event.target.value = '00';
      this.message.custom('لطفا فقط عدد وارد کنید');
    }else {

    }
  }
}
