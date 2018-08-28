import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {UsersService} from './shared/service/users.service';
import {AuthService} from './shared/service/auth.service';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        SharedModule,
        HttpModule,
        HttpClientModule,
        AuthModule,
        AppRoutingModule
    ],
    providers: [UsersService, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
