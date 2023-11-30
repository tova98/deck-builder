import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './component/logged-in.guard';
import { AdminGuard } from './component/admin.guard';
import { NotLoggedInGuard } from './component/not-logged-in.guard';
import { UserListComponent } from './component/user-list/user-list.component';
import { UserFormComponent } from './component/user-form/user-form.component';
import { DeckListComponent } from './component/deck-list/deck-list.component';
import { DeckDetailsComponent } from './component/deck-details/deck-details.component';
import { DeckFormComponent } from './component/deck-form/deck-form.component';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { RegisterFormComponent } from './component/register-form/register-form.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { ResourceOwnerGuard } from './component/resource-owner.guard';

const routes: Routes = [
  { path: '', redirectTo: '/decks', pathMatch: 'full' },
  { path: 'profile', component: UserProfileComponent, canActivate: [LoggedInGuard]},
  { path: 'edit-profile', component: UserFormComponent, canActivate: [LoggedInGuard]},
  { path: 'users', component: UserListComponent, canActivate: [AdminGuard] },
  { path: 'add-user', component: UserFormComponent, canActivate: [AdminGuard] },
  { path: 'edit-user/:id', component: UserFormComponent, canActivate: [AdminGuard] },
  { path: 'decks', component: DeckListComponent },
  { path: 'decks-user', component: DeckListComponent, canActivate: [LoggedInGuard] },
  { path: 'deck/:id', component: DeckDetailsComponent},
  { path: 'add-deck', component: DeckFormComponent , canActivate: [LoggedInGuard] },
  { path: 'edit-deck/:id', component: DeckFormComponent, canActivate: [LoggedInGuard, ResourceOwnerGuard] },
  { path: 'login', component: LoginFormComponent, canActivate: [NotLoggedInGuard] },
  { path: 'register', component: RegisterFormComponent, canActivate: [NotLoggedInGuard] },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
