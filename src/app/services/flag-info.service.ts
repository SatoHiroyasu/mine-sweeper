import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlagInfoService {
  private flagInfo: number[][];
  private flagCnt;
  private flagInfoSub: Subject<number>;
  private codeSub: Subject<Array<any>>;

  constructor() {
    this.flagCnt = 0;
    this.flagInfoSub = new Subject<number>();
    this.codeSub = new Subject<Array<any>>();
  }

  public updateFlagInfo(left: number, top: number, value: number) {
    this.flagInfo[left][top] = value;
    this.flagCnt += value == 1 ? 1 : -1;
    this.flagInfoSub.next(this.flagCnt);
  }

  public getFlagInfo$() {
    return this.flagInfoSub.asObservable();
  }

  public getCode$() {
    return this.codeSub.asObservable();
  }
}
