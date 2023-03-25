import React from "react";
import Like from "../common/like"
import TableHeader from "./tableHeader"
import TableBody from "./tableBody"

const MoviesTable = ({ movies , onLike}) => {
  const columns = [
    {
      path: "title",
      label: "标题",
      content: (movie) => (
        <a target="_blank" href={movie.alt}>
          {movie.title}
        </a>
      ),
    },
    { path: "original_title", label: "原标题" },
    { path: "year", label: "上映时间" },
    { path: "genres", label: "分类" },
    { path: "rating.average", label: "评分" },
    {
      key: "like",
      label: "收藏",
      content: (movie) => <Like liked={movie.liked} onClick={() => onLike(movie)} />,
    },
  ];

  return (
    <table className="table">
      <TableHeader columns={columns} />
      <TableBody columns={columns} data={movies} />
    </table>
  );
};

export default MoviesTable;