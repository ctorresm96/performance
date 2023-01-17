import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './feature/home/home.component';
import { ClientsComponent } from './feature/clients/clients.component';
import { AboutComponent } from './feature/about/about.component';
import { RouterModule } from '@angular/router';
import { TableComponent } from './core/components/table/table.component';
import { BcpFormmodule } from '@bcp/ng-core-v4/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomDateFormatPipe } from './core/components/pipes/customDateFormat.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientsComponent,
    AboutComponent,
    TableComponent,
    CustomDateFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BcpFormmodule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
