import { Component, OnInit } from '@angular/core';
import { Styles } from 'src/app/defines/styles';
import { StandByService } from 'src/app/services/stand-by.service';

@Component({
  selector: 'game-area',
  templateUrl: './game-area.component.html',
  styleUrls: ['./game-area.component.scss']
})
export class GameAreaComponent implements OnInit {
  static HEIGHT = 20;
  static WIDTH = 40;
  static MINE_NUM = 100;
  public buttonArray = [];

  constructor(private sbSvc: StandByService) { }

  ngOnInit(): void {
    this.setButtonArray();
    this.setButtonStyles();
    this.sbSvc.standByMines(this.buttonArray.concat(), GameAreaComponent.MINE_NUM);
  }

  private setButtonArray() {
    for(let i = 0; i < GameAreaComponent.HEIGHT; i++){
      this.buttonArray.push([]);
      for(let j = 0; j < GameAreaComponent.WIDTH; j++){
        this.buttonArray[i].push(0);
      }
    }
  }

  private setButtonStyles() {
    document.getElementsByName("mine-button").forEach(ele => {
      ele.style.height = Styles.BUTTON_HEIGHT + "px";
      ele.style.width = Styles.BUTTON_WIDTH + "px";
      ele.style.fontSize = Styles.BUTTON_FONT_SIZE + "px";
    })
  }
}
