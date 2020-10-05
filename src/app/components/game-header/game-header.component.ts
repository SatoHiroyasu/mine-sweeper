import { Component, Input, OnInit } from '@angular/core';
import { Styles } from 'src/app/defines/styles'
import { GameAreaComponent } from '../game-area/game-area.component';

@Component({
  selector: 'game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.scss']
})
export class GameHeaderComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    document.getElementById("game-header").style.width = ((GameAreaComponent.WIDTH * (Styles.BUTTON_WIDTH + 2) - 2)) + "px";
  }

}
