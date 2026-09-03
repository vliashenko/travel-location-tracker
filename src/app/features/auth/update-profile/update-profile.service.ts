import { Injectable, inject, signal, effect } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@services/auth/auth.service.api';

@Injectable()
export class UpdateProfileService {
    private authService = inject(AuthService);

    currentUser = this.authService.currentUser;

    isLoading = signal(false);
    successMessage = signal(false);
    errorMessage = signal<string | null>(null);

    profileForm = new FormGroup({
        email: new FormControl({ value: '', disabled: true }),
        displayName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        photoURL: new FormControl('', [Validators.pattern('https?://.+')])
    });

    constructor() {
        effect(() => {
            const user = this.currentUser();
            if (user) {
                this.profileForm.patchValue({
                    email: user.email || '',
                    displayName: user.displayName || '',
                    photoURL: user.photoURL || ''
                });
            }
        });
    }

    async submitForm(): Promise<void> {
        if (this.profileForm.invalid) {
            this.profileForm.markAllAsTouched();
            return;
        }

        this.isLoading.set(true);
        this.successMessage.set(false);
        this.errorMessage.set(null);

        const { displayName, photoURL } = this.profileForm.getRawValue();

        try {
            await this.authService.updateUserProfile({
                displayName: displayName || '',
                photoURL: photoURL || ''
            });
            this.successMessage.set(true);
        } catch (err: unknown) {
            this.errorMessage.set('Не вдалося оновити профіль.');
            console.error(err);
        } finally {
            this.isLoading.set(false);
        }
    }
}
