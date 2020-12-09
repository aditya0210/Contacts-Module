import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseSharedModule } from '@fuse/shared.module';
import { LoginComponent } from 'app/main/authentication/login/login.component';
import { RegisterModule } from '../register/register.module';
import { ForgotPasswordModule } from '../forgot-password/forgot-password.module';
import { ResetPasswordModule } from '../reset-password/reset-password.module';
import { DirectiveModule } from '../directive.module';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardModule } from 'app/main/dashboard/dashboard.module';

const routes = [
    {
        path: 'auth/login',
        component: LoginComponent
    },
];

@NgModule({
    declarations: [
        LoginComponent

    ],
    imports: [
        RouterModule.forChild(routes),
        ResetPasswordModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        RegisterModule,
        ForgotPasswordModule,
        FuseSharedModule,
        DirectiveModule,
        TranslateModule,
        DashboardModule
    ],
    exports: [
        LoginComponent,
    ]
})
export class LoginModule {
}
