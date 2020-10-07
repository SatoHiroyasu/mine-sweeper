import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Styles } from 'src/app/defines/styles';
import { FlagInfoService } from 'src/app/services/flag-info.service';
import { StandByService } from 'src/app/services/stand-by.service';

@Component({
  selector: 'game-area',
  templateUrl: './game-area.component.html',
  styleUrls: ['./game-area.component.scss'],
})
export class GameAreaComponent implements OnInit {
  static HEIGHT = 10;
  static WIDTH = 10;
  static MINE_NUM = 15;
  public buttonArray = [];
  private subsc: Subscription;

  constructor(private sbSvc: StandByService, private fiSvc: FlagInfoService) {}

  ngOnInit(): void {
    this.buttonArray = this.createButtonArray();
    this.setButtonStyles();
    this.standBy();
    this.restartSubscribe();
  }

  private createButtonArray() {
    let arr = [];
    for (let i = 0; i < GameAreaComponent.HEIGHT; i++) {
      arr.push([]);
      for (let j = 0; j < GameAreaComponent.WIDTH; j++) {
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
      GameAreaComponent.MINE_NUM
    );
    this.sbSvc.standByMines(
      this.createButtonArray(),
      GameAreaComponent.MINE_NUM
    );
  }

  private restartSubscribe() {
    this.subsc = this.sbSvc.getRestart$().subscribe(() => {
      this.standBy();
    });
  }
}
