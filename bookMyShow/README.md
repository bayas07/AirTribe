Created a database and added three tables
Table 1 - Theater List
Columns - TheaterId, City, TheaterName
Table 2 - Movies List
Columns - MovieId, MovieName, MovieLanguage, MovieDimension, MovieCertification
Table 3 - Movies Info
Columns - Id, Screen, AVType, SubtitlesLanguage, BookingStatus, ShowTiming, ShowDate

Below api's are created for the movie listing.

1. movies/:city - If the user selects the city, this api will send all the theaters in the city.
2. movies/:city/:theatre - If the user selects the theater, this api will send all the movies for the next 7 Days.
3. movies/:city/:theatre/:date - If the user selects any date, this api will filter the movies for the specific date.
