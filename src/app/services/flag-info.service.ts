import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Bectors } from '../defines/bectors';

const FLAG = 1;
const NOFLAG = 0;

@Injectable({
  providedIn: 'root',
})
export class FlagInfoService {
  private flagInfo: number[][];
  private flagCnt;
  private flagInfoSub: BehaviorSubject<number>;
  private codeSub: Subject<any>;

  constructor() {
    this.codeSub = new Subject<any>();
  }

  public updateFlagInfo(left: number, top: number, value: number) {
    if (value == 1) {
      this.flagInfo[top][left] = FLAG;
      this.flagCnt--;
    } else if (value == 2) {
      this.flagInfo[top][left] = NOFLAG;
      this.flagCnt++;
    }
    this.flagInfoSub.next(this.flagCnt);
  }

  public getFlagInfo$() {
    return this.flagInfoSub.asObservable();
  }

  public setFlagInfo(buttonArray: number[][], mineNum: number) {
    this.flagInfo = buttonArray;
    this.flagCnt = mineNum;
    this.flagInfoSub = new BehaviorSubject<number>(mineNum);
  }

  public getFlagCnt() {
    return this.flagCnt;
  }

  public getCode$() {
    return this.codeSub.asObservable();
  }

  public nextCode(left: number, top: number, mineValue: number) {
    if (mineValue == 0) {
      return;
    } else if (this.isAbleCode(left, top, mineValue)) {
      this.codeSub.next({ left: left, top: top });
    }
  }

  private isAbleCode(left: number, top: number, mineValue: number) {
    let cnt = 0;
    for (let bector of Bectors.BECTORS) {
      let _top = top + bector.top;
      let _left = left + bector.left;
      if (
        _top < 0 ||
        _top >= this.flagInfo.length ||
        _left < 0 ||
        _left >= this.flagInfo[0].length
      ) {
        continue;
      }
      if (this.flagInfo[top + bector.top][left + bector.left] == FLAG) {
        cnt++;
      }
    }
    return cnt == mineValue;
  }
}
