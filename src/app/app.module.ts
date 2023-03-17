import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { NbThemeModule, NbSidebarModule, NbLayoutModule, NbButtonModule, NbChatModule, NbStepperModule, NbCardModule, NbInputModule, NbIconModule, NbFormFieldModule, NbActionsModule, NbProgressBarModule, NbCheckboxModule, NbRadioModule, NbAccordionModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MessageListComponent } from './components/message-list/message-list.component';
import { MessageFormComponent } from './components/message-form/message-form.component';
import { MessageItemComponent } from './components/message-item/message-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MessageListComponent,
    MessageFormComponent,
    MessageItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
    NbInputModule,
    NbEvaIconsModule,
    NbIconModule,
    NbFormFieldModule,
    NbActionsModule,
    NbProgressBarModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatFormFieldModule,
    NbCheckboxModule,
    NbRadioModule,
    NbAccordionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
