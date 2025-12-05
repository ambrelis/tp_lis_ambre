import { Component, OnInit } from '@angular/core';
import { PollutionService, Pollution } from '../services/pollution.service';
import { Favorites } from '../services/favorites';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites-page',
  imports: [CommonModule],
  templateUrl: './favorites-page.html',
  styleUrls: ['./favorites-page.css']
})
export class FavoritesPageComponent implements OnInit {
  favoritePollutions: Pollution[] = [];

  constructor(
    private pollutionService: PollutionService,
    private favService: Favorites
  ) {}

  ngOnInit(): void {
    this.pollutionService.getPollutions().subscribe(data => {
      const favIds = this.favService.getFavorites();
      this.favoritePollutions = data.filter(p => favIds.includes(p.id!));
    });
  }

  toggleFav(id: number): void {
    this.favService.toggleFavorite(id);
    // Mettre à jour la liste après retrait
    this.favoritePollutions = this.favoritePollutions.filter(p => this.favService.isFavorite(p.id!));
  }

  isFavorite(id: number): boolean {
    return this.favService.isFavorite(id);
  }
}
