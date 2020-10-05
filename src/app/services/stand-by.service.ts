import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { Bectors } from 'src/app/defines/bectors'
import { MineFieldService } from 'src/app/services/mine-field.service'

@Injectable({
  providedIn: 'root'
})
export class StandByService {
  private minesSub: ReplaySubject<any>;

  constructor(private mfSvc: MineFieldService) {
    this.minesSub = new ReplaySubject<any>();
  }

  public getMines$() {
    return this.minesSub.asObservable();
  }

  public standByMines(buttonArray: number[][], mineNum: number) {
    for(let i = 0; i < mineNum; i++){
      let top = Math.floor(Math.random() * buttonArray.length);
      let left = Math.floor(Math.random() * buttonArray[0].length);
      
      if(buttonArray[top][left] == 0){
        buttonArray[top][left] = -1;
        this.minesSub.next({left: left, top: top});
      }else {
        --i;
        continue;
      }
    }
    this.minesSub.complete();
  }
}
