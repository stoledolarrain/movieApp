import { Component, OnInit } from '@angular/core';
import { SqliteService, Movie } from '../services/sqlite';
import { Router } from '@angular/router';
import { IonHeader, IonList, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonItem, IonLabel, IonThumbnail } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonList, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonItem, IonLabel, IonThumbnail]
})
export class MoviesPage implements OnInit {
  movies: Movie[] = [];

  constructor(private sqliteService: SqliteService, private router: Router) {}

  async ngOnInit() {
    await this.sqliteService.createDataBase();
    await this.loadMovies();
  }

  async ionViewWillEnter() {
    await this.loadMovies();
  }

  async loadMovies() {
    this.movies = await this.sqliteService.getMovies();
  }

  goToDetail(movie: Movie) {
    this.router.navigate(['/movie-detail', movie.id]);
  }

  async addMovie() {
    const name = prompt("Nombre de la película:");
    const description = prompt("Descripción:");
    const image = prompt("URL de la imagen:");

    if (name && description && image) {
      await this.sqliteService.addMovie({ name, description, image });
      await this.loadMovies();
    }
  }

  async deleteMovie(id: number) {
    const confirmDelete = confirm("Eliminar pelicula?");
    if (confirmDelete) {
      await this.sqliteService.deleteMovie(id);
      await this.loadMovies();
    }
  }
}
