import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SqliteService, Movie } from '../services/sqlite';
import { CommonModule} from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonLabel, IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonInput,
    IonLabel,
    IonItem
  ]
})
export class MovieDetailPage implements OnInit {
  movie!: Movie;

  constructor(
    private route: ActivatedRoute,
    private sqliteService: SqliteService,
    private router: Router
  ) {}

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const movies = await this.sqliteService.getMovies();
    this.movie = movies.find(m => m.id === id)!;
  }

  async save() {
    await this.sqliteService.updateMovie(this.movie);
    alert('Película actualizada');
    this.router.navigate(['/movies']);
  }
}
