import { Component, OnInit } from '@angular/core';
import { Favorites } from '../services/favorites';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {
  favoritesCount = 0;

  constructor(private favService: Favorites) {}

  ngOnInit(): void {
    this.favService.getFavoritesCount().subscribe(count => {
      this.favoritesCount = count;
    });
  }
}
