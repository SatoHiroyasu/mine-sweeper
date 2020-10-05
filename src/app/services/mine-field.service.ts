import { Injectable } from '@angular/core';

const OPENED_VALUE = 99;

@Injectable({
  providedIn: 'root'
})
export class MineFieldService {
  private mineField: number[][]

  constructor() {
    this.mineField = [];
  }

  public getOpenedValue() {
    return OPENED_VALUE;
  }

  public getMineField() {
    return this.mineField;
  }

  public setMineField(buttonArray: number[][]) {
    this.mineField = buttonArray;
  }

  public setMineValue(
    left: number,
    top: number,
    value: number
  ) {
    this.mineField[top][left] = value;
    // console.log(this.mineField);
  }
}
