import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

var moment = require('moment');

@Pipe({
  name: 'tohistory'
})

export class TohistoryPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {

    let today = new Date();
    let givenDate = new Date(1970, 0, 1);
    givenDate.setSeconds(value);

    let ty = today.getFullYear();
    let tm = today.getMonth();
    let td = today.getDate();

    let gy = givenDate.getFullYear();
    let gm = givenDate.getMonth();
    let gd = givenDate.getDate();

    if (ty === gy) {
      if (tm === gm) {
        if (td == gd) {
          return super.transform(value * 1000, Constants.TIME_FMT);
        }
        else {
          if (td - gd == 1) {
            return "yesterday";
          }
          if (td - gd > 1) {
            return Constants.dayOfWeeks[givenDate.getDay()];
          }
        }
      }
      
    }

    var x = moment(today)
    var y = moment(givenDate)
    var duration = moment.duration(x.diff(y))

    let diff = duration.as('hours');
    if(diff<24)
    {
      return "yesterday";
    }
    if (diff<(24*5)) {
      return Constants.dayOfWeeks[givenDate.getDay()];
    }

  return super.transform(value * 1000, Constants.DATE_FMT);

  }
}

@Pipe({
  name: 'todate'
})

export class TodatePipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value * 1000, Constants.DATE_FMT);
  }
}

@Pipe({
  name: 'todatetime'
})

export class TodatetimePipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value * 1000, Constants.DATE_TIME_FMT);
  }
}

@Pipe({
  name: 'totime'
})

export class TotimePipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value * 1000, Constants.TIME_FMT);
  }
}

export class Constants {
  static readonly DATE_FMT = 'dd/MMM/yyyy';
  static readonly DATE_TIME_FMT = `${Constants.DATE_FMT} hh:mm`;
  static readonly TIME_FMT = 'hh:mm a';
  static readonly dayOfWeeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
}