import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { StoreSharedModule } from 'app/shared/shared.module';
import { StoreCoreModule } from 'app/core/core.module';
import { StoreAppRoutingModule } from './app-routing.module';
import { StoreHomeModule } from './home/home.module';
import { StoreEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    StoreSharedModule,
    StoreCoreModule,
    StoreHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    StoreEntityModule,
    StoreAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class StoreAppModule {}
