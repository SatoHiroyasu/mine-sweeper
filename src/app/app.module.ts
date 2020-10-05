import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameAreaComponent } from './components/game-area/game-area.component';
import { GameHeaderComponent } from './components/game-header/game-header.component';
import { MineButtonComponent } from './components/mine-button/mine-button.component';

@NgModule({
  declarations: [
    AppComponent,
    GameAreaComponent,
    GameHeaderComponent,
    MineButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
