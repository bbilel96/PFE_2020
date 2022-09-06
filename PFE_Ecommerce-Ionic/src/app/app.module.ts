import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {IonicStorageModule} from '@ionic/storage';
import { AuthGuardService} from './Services/storage/auth/auth-guard.service';
import {AuthService} from './Services/storage/auth/auth.service';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [  BrowserModule, IonicModule.forRoot({hardwareBackButton: false}), AppRoutingModule, HttpClientModule,
  IonicStorageModule],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,



    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
