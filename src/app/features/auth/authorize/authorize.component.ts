import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { InputComponent } from '@shared/components/input/input.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { AuthService } from '@services/auth/auth.service.api';

export type AuthMode = 'login' | 'register';

@Component({
    selector: 'app-auth-dialog',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
        InputComponent,
        ButtonComponent,
        SpinnerComponent
    ],
    templateUrl: './authorize.component.html',
    styleUrl: './authorize.component.scss'
})

export class AuthDialogComponent {
    private authService = inject(AuthService);
    private dialogRef = inject(MatDialogRef<AuthDialogComponent>);
    private snackBar = inject(MatSnackBar);

    private initialMode: AuthMode = inject(MAT_DIALOG_DATA, { optional: true }) || 'login';

    mode = signal<AuthMode>(this.initialMode);
    email = signal('');
    password = signal('');
    isLoading = signal(false);

    toggleMode(): void {
        this.mode.update(current => current === 'login' ? 'register' : 'login');
    }

    async onSubmit(): Promise<void> {
        if (!this.email() || !this.password()) return;
        this.isLoading.set(true);

        try {
            if (this.mode() === 'login') {
                await this.authService.loginWithEmail(this.email(), this.password());
            } else {
                await this.authService.registerWithEmail(this.email(), this.password());
            }
            this.dialogRef.close(true);
        } catch (err: any) {
            this.showError(err.message || 'Помилка авторизації');
        } finally {
            this.isLoading.set(false);
        }
    }

    async onGoogleLogin(): Promise<void> {
        this.isLoading.set(true);
        try {
            await this.authService.loginWithGoogle();
            this.dialogRef.close(true);
        } catch (err: any) {
            this.showError(err.message || 'Помилка Google auth');
        } finally {
            this.isLoading.set(false);
        }
    }

    private showError(msg: string): void {
        this.snackBar.open(msg, 'Закрити', { duration: 4000 });
    }
}