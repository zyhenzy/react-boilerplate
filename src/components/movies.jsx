import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./list/listGroup";
import MoviesTable from "./table/moviesTable";
import style from "./movies.module.css"

class Movies extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      genres: [],
      selectedGenre: "全部电影",
    };
  }

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: getGenres(),
    });
  }

  handleGenreSelect = (genre) => {
    this.setState({
      selectedGenre: genre,
    });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  getPagedData = () => {
    const { selectedGenre, movies: allMovies } = this.state;

    const filtered =
      selectedGenre && selectedGenre !== "全部电影"
        ? allMovies.filter((m) => m.genres.indexOf(selectedGenre) >= 0)
        : allMovies;

    return { totalCount: filtered.length, movies: filtered };
  };

  render() {
    const { genres, selectedGenre } = this.state;

    const { totalCount, movies } = this.getPagedData();

    return (
      <div className="row">
        <h3 className={style.title}>movie title</h3>
        <div className="col-2">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        {totalCount ? (
          <div className="col">
            <p>一共有 {totalCount} 条相关的电影</p>
            <MoviesTable movies={movies} onLike={this.handleLike} />
          </div>
        ) : (
          <div className="col">
            <p>没有相关电影</p>
          </div>
        )}
      </div>
    );
  }
}

export default Movies;
