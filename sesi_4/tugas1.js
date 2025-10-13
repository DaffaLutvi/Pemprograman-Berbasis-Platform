const film = {
  judul: "Interstellar",
  tahunRilis: 2014,
  sutradara: "Christopher Nolan",
  genre: ["Sci-Fi", "Adventure", "Drama"],

  tampilkanDetail: function() {
    return `Judul: ${this.judul}\nTahun Rilis: ${this.tahunRilis}\nSutradara: ${this.sutradara}\nGenre: ${this.genre.join(", ")}`;
  }
};

console.log("Sutradara:", film.sutradara);
console.log("Genre kedua:", film.genre[1]);
console.log("\nDetail Film:\n" + film.tampilkanDetail());
