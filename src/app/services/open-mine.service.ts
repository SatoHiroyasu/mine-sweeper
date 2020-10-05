import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Bectors } from '../defines/bectors';
import { MineFieldService } from './mine-field.service';

@Injectable({
  providedIn: 'root'
})
export class OpenMineService {
  private openMineSub: Subject<any>;

  constructor(private mfSvc: MineFieldService) {
    this.openMineSub = new Subject<any>();
  }

  public getOpenMine$() {
    return this.openMineSub.asObservable();
  }
  
  public nextOpenMine(info: {
    left: number,
    top: number,
    value: number
  }) {
    if(info.value == -1){
      this.openMineSub.complete()
    } else if(info.value == 0) {
      this.openMineSub.next(info);
    }
  }
}
