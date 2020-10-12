import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameAreaComponent } from './components/game-area/game-area.component';
import { GameHeaderComponent } from './components/game-header/game-header.component';
import { MineButtonComponent } from './components/mine-button/mine-button.component';
import { OptionModalComponent } from './components/option-modal/option-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    GameAreaComponent,
    GameHeaderComponent,
    MineButtonComponent,
    OptionModalComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
