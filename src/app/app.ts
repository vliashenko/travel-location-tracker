import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@shared/components/header/header.component';
import { PlaceStorageService } from '@services/place/place-storage.service.api';

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

  getWishlistCount(): number {
    return this.storageService.getWishlist().length;
  }

  navigateToTracker(): void {
    this.router.navigate(['/tracker']);
  }

  navigateToWishlist(): void {
    this.router.navigate(['/wishlist']);
  }
}
