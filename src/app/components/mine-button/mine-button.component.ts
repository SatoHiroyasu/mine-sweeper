import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Styles } from 'src/app/defines/styles';
import { StandByService } from 'src/app/services/stand-by.service';
import { GameAreaComponent } from '../game-area/game-area.component';
import { OpenMineService } from 'src/app/services/open-mine.service';
import { MineFieldService } from 'src/app/services/mine-field.service';
import { FlagInfoService } from 'src/app/services/flag-info.service';

const FLAG_VALUES = {
  0: 0,
  1: -99,
  2: 99,
};

const FLAG_COLOR = {
  0: 'black',
  1: 'red',
  2: 'cyan',
};

@Component({
  selector: 'mine-button',
  templateUrl: './mine-button.component.html',
  styleUrls: ['./mine-button.component.scss'],
})
export class MineButtonComponent implements OnInit {
  @Input() left;
  @Input() top;

  public display;
  public mineValue;
  public isOpened;
  public isGameOver;
  public flagValue;
  public mineField: number[][];
  private subsc: Subscription;

  constructor(
    private sbSvc: StandByService,
    private omSvc: OpenMineService,
    private fiSvc: FlagInfoService,
    private mfSvc: MineFieldService
  ) {}

  ngOnInit(): void {
    this.initializeParams();
    this.setButtonStyle();
    this.subscribeAll();
  }

  private initializeParams() {
    this.getThisElement().style.backgroundColor = "black";
    this.getThisElement().style.color = "black";
    this.display = '';
    this.mineValue = 0;
    this.isOpened = false;
    this.isGameOver = false;
    this.flagValue = 0;
  }

  private getThisElement() {
    let elementIndex = GameAreaComponent.WIDTH * this.top + this.left;
    return document.getElementsByName('mine-button').item(elementIndex);
  }

  private setButtonStyle() {
    let element = this.getThisElement();
    element.style.height = Styles.BUTTON_HEIGHT + 'px';
    element.style.width = Styles.BUTTON_WIDTH + 'px';
    element.style.fontSize = Styles.BUTTON_FONT_SIZE + 'px';
  }

  private subscribeAll() {
    this.minesSubscribe();
    this.openMineSubscribe();
    this.codeSubscribe();
    this.restartSubscribe();
  }

  private minesSubscribe() {
    this.subsc = this.sbSvc.getMines$().subscribe(
      (mine) => {
        if (
          Math.abs(mine.left - this.left) <= 1 &&
          Math.abs(mine.top - this.top) <= 1 &&
          !(mine.left == this.left && mine.top == this.top)
        ) {
          this.mineValue++;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        if(this.mfSvc.getMineField()[this.top][this.left] == -1){
          this.mineValue = -1;
          this.display = ButtonDisplays[-1];
        }
      }
    );
  }
  
  private restartSubscribe() {
    this.subsc = this.sbSvc.getRestart$().subscribe(() => {
      this.subsc.unsubscribe();
      this.initializeParams();
      this.subscribeAll();
    })
  }

  private openMineSubscribe() {
    this.subsc = this.omSvc
      .getOpenMine$()
      .pipe(
        filter((info, index) => {
          return (info.value == -1) || (
            !this.isOpened && info.value == 0 &&
            Math.abs(info.left - this.left) <= 1 &&
            Math.abs(info.top - this.top) <= 1
          );
        })
      )
      .subscribe(
        (info) => {
          if(info.value == -1){
            this.isGameOver = true;
          }else if(info.value == 0){
            this.openDisplay();
          }
        },
        (error) => console.log(error),
        () => {
          this.isGameOver = true;
        }
      );
  }

  public openDisplay() {
    if (this.isGameOver || this.isOpened || this.flagValue >= 1) {
      return;
    }
    this.isOpened = true;
    if (this.mineValue == -1) {
      this.display = ButtonDisplays[this.mineValue];
      this.getThisElement().style.backgroundColor = 'red';
    } else if (this.mineValue == 0) {
      this.display = '';
      this.getThisElement().style.backgroundColor = '#338833';
    } else {
      this.display = this.mineValue + '';
      this.getThisElement().style.color = 'lightgreen';
    }
    this.omSvc.nextOpenMine({
      left: this.left,
      top: this.top,
      value: this.mineValue,
    });
    // this.subsc.unsubscribe();
  }

  public setFlag() {
    if (this.isGameOver || this.isOpened) {
      return false;
    }
    this.flagValue = (this.flagValue + 1) % 3;
    this.display = ButtonDisplays[FLAG_VALUES[this.flagValue]];
    this.getThisElement().style.color = FLAG_COLOR[this.flagValue];
    return false;
  }

  private codeSubscribe() {
    this.subsc = this.fiSvc
      .getCode$()
      .pipe(
        filter((codeInfo) => {
          if (this.isGameOver || this.isOpened) {
            return false;
          }
          let result = false;
          for (let info of codeInfo) {
            if (info.left == this.left && info.top == this.top) {
              result = true;
              break;
            }
          }
          return result;
        })
      )
      .subscribe(() => {
        this.openDisplay();
      });
  }
}

export enum ButtonDisplays {
  '' = 0,
  '*' = -1,
  'P' = -99,
  '?' = 99,
}
