const express = require("express");
const app = express();
const port = 3000;

let watchList = [
  {
    videoId: 1,
    title: "JavaScript Tutorial",
    watched: false,
    url: "https://youtu.be/shorturl1",
  },
  {
    videoId: 2,
    title: "Node.js Basics",
    watched: true,
    url: "https://youtu.be/shorturl2",
  },
  {
    videoId: 3,
    title: "React.js Guide",
    watched: false,
    url: "https://youtu.be/shorturl3",
  },
];

// watchlist/update
function updateWatchedStatusById(watchList, videoId, watched) {
  for (let i = 0; i < watchList.length; i++) {
    if (watchList[i].videoId === videoId) {
      watchList[i].watched = watched;
    }
  }
  return watchList;
}

app.get("/watchlist/update", (req, res) => {
  let videoId = parseInt(req.query.videoId);
  let watched = req.query.watched === "true";
  let result = updateWatchedStatusById(watchList, videoId, watched);
  res.json(result);
});

// watchlist/update-all
function updateAllVideosWatchedStatus(watchList, watched) {
  for (let i = 0; i < watchList.length; i++) {
    watchList[i].watched = watched;
  }
  return watchList;
}
app.get("/watchlist/update-all", (req, res) => {
  let watched = req.query.watched === "true";
  let result = updateAllVideosWatchedStatus(watchList, watched);
  res.json(result);
});

// watchlist/delete
function shouldDeleteById(video, videoId) {
  return video.videoId !== videoId;
}

app.get("/watchlist/delete", (req, res) => {
  let videoId = parseInt(req.query.videoId);
  let result = watchList.filter((video) => shouldDeleteById(video, videoId));
  res.json(result);
});

// watchlist/delete-watched
function isWatched(video) {
  return video.watched === true;
}
app.get("/watchlist/delete-watched", (req, res) => {
  let result = watchList.filter((video) => isWatched(video));
  watchList = result;
  res.json(result);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
