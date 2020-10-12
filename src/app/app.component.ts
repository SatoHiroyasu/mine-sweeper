import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mine-sweeper';
  public isStarted = false;

  public gameInfo: {
    height: number,
    width: number,
    mineNum: number
  } = {
    height: 10,
    width: 10,
    mineNum: 10
  }

  public gameStart(event) {
    this.gameInfo = event;
    this.isStarted = true;
  }
}
