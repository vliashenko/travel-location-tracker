import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { ButtonComponent } from '@shared/components/button/button.component';
import { RouterLink } from '@angular/router';

export interface UserProfile {
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    ButtonComponent,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user = input<UserProfile | null>(null);
  wishlistCount = input<number>(0);

  openWishlist = output<void>();
  logoClick = output<void>();
  loginClick = output<void>();
  logoutClick = output<void>();
  profileClick = output<void>();
}
