import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Styles } from 'src/app/defines/styles';
import { FlagInfoService } from 'src/app/services/flag-info.service';
import { OpenMineService } from 'src/app/services/open-mine.service';
import { StandByService } from 'src/app/services/stand-by.service';

@Component({
  selector: 'game-area',
  templateUrl: './game-area.component.html',
  styleUrls: ['./game-area.component.scss'],
})
export class GameAreaComponent implements OnInit {
  public buttonArray = [];
  private subsc: Subscription;

  @Input() gameInfo: {
    height: number,
    width: number,
    mineNum: number
  }

  constructor(
    private sbSvc: StandByService,
    private fiSvc: FlagInfoService,
    private omSvc: OpenMineService
  ) {}

  ngOnInit(): void {
    this.buttonArray = this.createButtonArray();
    this.setButtonStyles();
    this.standBy();
    this.restartSubscribe();
  }

  private createButtonArray() {
    let arr = [];
    for (let i = 0; i < this.gameInfo.height; i++) {
      arr.push([]);
      for (let j = 0; j < this.gameInfo.width; j++) {
        arr[i].push(0);
      }
    }
    return arr;
  }

  private setButtonStyles() {
    document.getElementsByName('mine-button').forEach((ele) => {
      ele.style.height = Styles.BUTTON_HEIGHT + 'px';
      ele.style.width = Styles.BUTTON_WIDTH + 'px';
      ele.style.fontSize = Styles.BUTTON_FONT_SIZE + 'px';
    });
  }

  private standBy() {
    this.fiSvc.setFlagInfo(
      this.createButtonArray(),
      this.gameInfo.mineNum
    );
    this.sbSvc.standByMines(
      this.createButtonArray(),
      this.gameInfo.mineNum
    );
    this.omSvc.setNorma(
      this.gameInfo.height * this.gameInfo.width -
      this.gameInfo.mineNum
    );
  }

  private restartSubscribe() {
    this.subsc = this.sbSvc.getRestart$().subscribe(() => {
      this.standBy();
    });
  }
}
