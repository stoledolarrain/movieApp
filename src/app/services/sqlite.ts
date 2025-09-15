import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from "@ionic/angular";

export interface Movie {
  id?: number;
  name: string;
  description: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class SqliteService {
  public database!: SQLiteObject;

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.platform.ready().then(() => {
      this.createDataBase();
    });
  }

  async createDataBase() {
    try {
      this.database = await this.sqlite.create({
        name: 'moviesDB',
        location: 'default',
      });
      await this.createTable();
      console.log('DB creada');
    } catch (err) {
      console.error('No se pudo crear la base de datos', err);
    }
  }

  async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        image TEXT
      )
    `;
    try {
      await this.database.executeSql(query, []);
      console.log('Tabla creada');
    } catch (err) {
      console.error('No se pudo crear la tabla', err);
    }
  }

  async addMovie(movie: Movie) {
    const query = `INSERT INTO movies (name, description, image) VALUES (?, ?, ?)`;
    try {
      await this.database.executeSql(query, [movie.name, movie.description, movie.image]);
    } catch (err) {
      console.error('Error agregando película', err);
    }
  }

  async getMovies(): Promise<Movie[]> {
    const movies: Movie[] = [];
    try {
      const res = await this.database.executeSql('SELECT * FROM movies', []);
      for (let i = 0; i < res.rows.length; i++) {
        movies.push(res.rows.item(i));
      }
    } catch (err) {
      console.error('Error obteniendo películas', err);
    }
    return movies;
  }

  async updateMovie(movie: Movie) {
    if (!movie.id) return;
    const query = `UPDATE movies SET name = ?, description = ?, image = ? WHERE id = ?`;
    try {
      await this.database.executeSql(query, [movie.name, movie.description, movie.image, movie.id]);
    } catch (err) {
      console.error('Error actualizando película', err);
    }
  }

  async deleteMovie(id: number) {
    const query = `DELETE FROM movies WHERE id = ?`;
    try {
      await this.database.executeSql(query, [id]);
    } catch (err) {
      console.error('Error eliminando película', err);
    }
  }
}
