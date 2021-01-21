import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [
    BrowserModule, 
    FormsModule,
    PortalModule,
    ReactiveFormsModule,
    OverlayModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    HeaderComponent
  ]
})
export class AppModule { }
