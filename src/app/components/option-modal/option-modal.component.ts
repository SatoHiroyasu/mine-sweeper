import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'option-modal',
  templateUrl: './option-modal.component.html',
  styleUrls: ['./option-modal.component.scss']
})
export class OptionModalComponent implements OnInit {
  @Output() gameInfo = new EventEmitter<any>();

  public info = {
    height: 20,
    width: 25,
    mineNum: 50
  };

  constructor() { }

  ngOnInit(): void {
  }

  public gameStart() {
    this.gameInfo.emit(this.info);
  }

  public changeValue(index: string, value: number) {
    this.info[index] = value;
  }
}
