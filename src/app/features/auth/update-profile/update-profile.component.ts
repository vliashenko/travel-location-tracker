import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { InputComponent } from '@shared/components/input/input.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { UpdateProfileService } from './update-profile.service';

@Component({
    selector: 'app-update-profile',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatIconModule,
        InputComponent,
        ButtonComponent
    ],
    providers: [UpdateProfileService],
    templateUrl: './update-profile.component.html',
    styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent {
    private profileService = inject(UpdateProfileService);

    profileForm = this.profileService.profileForm;
    isLoading = this.profileService.isLoading;
    successMessage = this.profileService.successMessage;
    errorMessage = this.profileService.errorMessage;

    onSubmit(): void {
        this.profileService.submitForm();
    }
}
