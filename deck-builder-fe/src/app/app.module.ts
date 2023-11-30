import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { UserFormComponent } from './component/user-form/user-form.component';
import { DeckListComponent } from './component/deck-list/deck-list.component';
import { DeckFormComponent } from './component/deck-form/deck-form.component';
import { SafePipe } from './component/safe.pipe';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { AuthInterceptor } from './component/auth.interceptor';
import { RegisterFormComponent } from './component/register-form/register-form.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { DeckDetailsComponent } from './component/deck-details/deck-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteDialogComponent } from './component/delete-dialog/delete-dialog.component';
import { ErrorInterceptor } from './component/error.interceptor';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FilterPipe } from './component/filter.pipe';
import { CommentDialogComponent } from './component/comment-dialog/comment-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    DeckListComponent,
    DeckFormComponent,
    SafePipe,
    FilterPipe,
    LoginFormComponent,
    RegisterFormComponent,
    NotFoundComponent,
    DeckDetailsComponent,
    DeleteDialogComponent,
    UserProfileComponent,
    ChangePasswordComponent,
    CommentDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatGridListModule,
    MatPaginatorModule,
    MatCheckboxModule,
    FontAwesomeModule,
    NgxMatSelectSearchModule
  ],
  providers: [[{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }]],
  bootstrap: [AppComponent]
})
export class AppModule { }
