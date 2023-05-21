const getAllMoviesQuery = (theatreId, city) => {
  return `SELECT TI.Id, TI.Screen, TI.AVType, TI.SubtitlesLanguage, TI.BookingStatus, TI.ShowTiming, TI.ShowDate, M.MovieName, M.MovieLanguage, M.MovieDimension, M.MovieCertification, TH.City, TH.TheaterName
  FROM myData.TheatersInfo TI
  INNER JOIN myData.Movies M
  ON TI.MovieId = M.MovieId
  INNER JOIN myData.Theaters TH
  ON TI.TheaterId = TH.TheaterId
  WHERE TI.TheaterId = ${theatreId} AND TH.City = '${city}'`;
};

const getMoviesByDateQuery = (theatreId, city, date) => {
  return `SELECT TI.Id, TI.Screen, TI.AVType, TI.SubtitlesLanguage, TI.BookingStatus, TI.ShowTiming, TI.ShowDate, M.MovieName, M.MovieLanguage, M.MovieDimension, M.MovieCertification, TH.City, TH.TheaterName
    FROM myData.TheatersInfo TI
    INNER JOIN myData.Movies M
    ON TI.MovieId = M.MovieId
    INNER JOIN myData.Theaters TH
    ON TI.TheaterId = TH.TheaterId
    WHERE TI.TheaterId = ${theatreId} AND TH.City = '${city}' AND TI.ShowDate = '${date}'`;
};

module.exports = { getAllMoviesQuery, getMoviesByDateQuery };
