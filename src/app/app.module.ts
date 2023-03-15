import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NbThemeModule } from '@nebular/theme';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { NbSidebarModule, NbLayoutModule, NbButtonModule, NbChatModule, NbStepperModule, NbCardModule } from '@nebular/theme';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NbThemeModule.forRoot(), // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbLayoutModule,
    NbSidebarModule.forRoot(), // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    NbChatModule,
    NbStepperModule,
    HttpClientModule,
    NbCardModule,
    NbChatModule.forRoot({ messageGoogleMapKey: 'MAP_KEY' }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
