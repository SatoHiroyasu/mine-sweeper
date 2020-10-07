import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Styles } from 'src/app/defines/styles';
import { FlagInfoService } from 'src/app/services/flag-info.service';
import { StandByService } from 'src/app/services/stand-by.service';
import { GameAreaComponent } from '../game-area/game-area.component';

@Component({
  selector: 'game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.scss'],
})
export class GameHeaderComponent implements OnInit {
  public flagCnt: number;
  private interval;
  private timeCount;
  public timeDisplay: string;
  private subsc: Subscription;

  constructor(private sbSvc: StandByService, private fiSvc: FlagInfoService) {}

  ngOnInit(): void {
    this.timeStart();
    document.getElementById('game-header').style.width =
      GameAreaComponent.WIDTH * (Styles.BUTTON_WIDTH + 2) - 2 + 'px';
    this.flagInfoSubscribe();
  }

  private flagInfoSubscribe() {
    this.subsc = this.fiSvc.getFlagInfo$().subscribe((value) => {
      this.flagCnt = value;
    });
  }

  public gameRestart() {
    this.sbSvc.restart();
    clearInterval(this.interval);
    this.timeStart();
    this.subsc.unsubscribe();
    this.flagInfoSubscribe();
  }

  private timeStart() {
    this.timeCount = 0;
    this.timeDisplay = "00:00";
    this.interval = window.setInterval(() => {
      if(this.timeDisplay == "99:58"){
        clearInterval(this.interval);
      }
      this.timeCount++;
      let sec = this.timeCount % 60;
      let minDisplay = ("00" + ((this.timeCount - sec) / 60)).slice(-2);
      let secDisplay = ("00" + (sec)).slice(-2);
      this.timeDisplay = minDisplay + ":" + secDisplay;
    }, 1000)
  }
}
