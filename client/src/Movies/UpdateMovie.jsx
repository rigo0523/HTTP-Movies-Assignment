import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const initialState = {
  id: "",
  title: "",
  director: "",
  metascore: 0,
  stars: [],
};

const UpdateMovie = (props) => {
  const [movie, setMovie] = useState(initialState);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const handleChange = (e) => {
    e.preventDefault();
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then((res) => {
        console.log(res.data, "res inside put updatemovie");
        props.getMovieList();
        setMovie(initialState);
        push(`/movies/${params.id}`);
      });
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  return (
    <div>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={movie.title}
            onChange={handleChange}
          />

          <input
            type="text"
            name="director"
            value={movie.director}
            onChange={handleChange}
          />

          <input
            type="number"
            name="metascore"
            value={movie.metascore}
            onChange={handleChange}
          />

          <input
            type="text"
            name="stars"
            value={movie.stars}
            onChange={handleChange}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMovie;
