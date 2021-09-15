const songs = [
    {
        title: "Hotel",
        artist: "Claire RosinKranz",
        album: "6_Of_A_Billion",
    },
    {
        title: "Sk8er Boi",
        artist: "Avril Lavigne",
        album: "LetGo",
    },
    {
        title: "My Happy Ending",
        artist: "Avril Lavigne",
        album: "UnderMySkin",
    },
    {
        title: "What The Hell",
        artist: "Avril Lavigne",
        album: "GoodbyeLullaby",
    },
    {
        title: "Boy In A Billion",
        artist: "Claire RosinKranz",
        album: "6_Of_A_Billion2",
    },
    {
        title: "Complicated",
        artist: "Avril Lavigne",
        album: "LetGo",
    },
    {
        title: "Anything But Ordinary",
        artist: "Avril Lavigne",
        album: "LetGo",
    },
]

const playBtn = document.querySelector('.play');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const player = document.getElementById('player');
const title = document.querySelector('.song-title');
const artist = document.querySelector('.artist');
const playImg = document.querySelector('.play-img img');

let isPlaying = false;

const playMusic = () => {
    isPlaying = true;
    player.play();
    playBtn.style.backgroundImage = "url(img/pause.png)";
};

const pauseMusic = () => {
    isPlaying = false;
    player.pause();
    playBtn.style.backgroundImage = "url(img/play.png)";
};

playBtn.addEventListener('click', () => {
    isPlaying ? pauseMusic() : playMusic();
})

/*
playBtn.addEventListener('click', () => {
    if(player.paused) {
        player.play();
        playBtn.style.backgroundImage = "url(img/pause.png)";
    } else {
        player.pause();
        playBtn.style.backgroundImage = "url(img/play.png)";
    }
});
*/

const loadSong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    player.src = `src/${songs.title}.mp3`;
    playImg.src = `img/${songs.album}.jpg`;
};

let songIndex = 0;

const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    player.play();
    playMusic();
};

const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    player.play();
    playMusic();
};

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);