import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { HeaderComponent } from '@shared/components/header/header.component';
import { PlaceStorageService } from '@services/place/place-storage.service.api';
import { AuthService } from '@services/auth/auth.service.api';
import { AuthDialogComponent } from '@features/auth/authorize/authorize.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private router = inject(Router);
  private storageService = inject(PlaceStorageService);
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);

  user = this.authService.currentUser;

  wishlistCount = computed(() => this.storageService.getWishlist().length);

  navigateToTracker(): void {
    this.router.navigate(['/tracker']);
  }

  navigateToWishlist(): void {
    this.router.navigate(['/wishlist']);
  }

  onLogin(): void {
    this.dialog.open(AuthDialogComponent, { data: 'login' });
  }

  onLogout(): void {
    this.authService.logout();
  }
}