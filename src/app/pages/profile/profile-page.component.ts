import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateProfileComponent } from '@features/auth/update-profile/update-profile.component';

@Component({
    selector: 'app-profile-page',
    standalone: true,
    imports: [
        CommonModule,
        UpdateProfileComponent
    ],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent { }
