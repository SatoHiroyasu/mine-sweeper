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
  public flagCnt: number = 0;
  private subsc: Subscription;

  constructor(private sbSvc: StandByService, private fiSvc: FlagInfoService) {}

  ngOnInit(): void {
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
    this.flagCnt = 0;
    this.sbSvc.restart();
  }
}
