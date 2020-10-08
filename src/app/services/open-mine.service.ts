import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Bectors } from '../defines/bectors';
import { MineFieldService } from './mine-field.service';

@Injectable({
  providedIn: 'root',
})
export class OpenMineService {
  private norma;
  private openMineSub: Subject<any>;
  private clearSub: Subject<any>;

  constructor(private mfSvc: MineFieldService) {
    this.openMineSub = new Subject<any>();
    this.clearSub = new Subject<any>();
  }

  public setNorma(norma: number) {
    this.norma = norma;
  }

  public getNorma() {
    return this.norma;
  }

  public getOpenMine$() {
    return this.openMineSub.asObservable();
  }

  public getClear$() {
    return this.clearSub.asObservable();
  }

  public nextOpenMine(info: { left: number; top: number; value: number }) {
    this.openMineSub.next(info);
    this.norma--;
    if (this.norma == 0) {
      this.clearSub.next();
    }
  }
}
