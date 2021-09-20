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

const audioFiles = [
    'img/Hotel.mp3',
    'img/Sk8er Boi.mp3',
    'img/My Happy Ending.mp3',
    'img/What The Hell.mp3',
    'img/Boy In A Billion.mp3',
    'img/Complicated.mp3',
    'img/Anything But Ordinary.mp3',
]

const playBtn = document.querySelector('.play');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const player = document.getElementById('player');
const title = document.querySelector('.song-title');
const artist = document.querySelector('.artist');
const playImg = document.querySelector('.play-img img');

let progress = document.querySelector('.progress');
const endTime = document.querySelector('.duration');
const current = document.querySelector('.current');
const progress_div = document.querySelector('.progress-div');

let isPlaying = false;

const playMusic = () => {
    isPlaying = true;
    player.play();
    playBtn.style.backgroundImage = "url(img/pause.png)";
    document.querySelector('.current-play').style.backgroundImage = "url(img/pause.png)";
};

const pauseMusic = () => {
    isPlaying = false;
    player.pause();
    playBtn.style.backgroundImage = "url(img/play.png)";
    document.querySelector('.current-play').style.backgroundImage = "url(img/play.png)";
};

playBtn.addEventListener('click', () => {
    isPlaying ? pauseMusic() : playMusic();
})

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
    currentSong();
};

const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    player.play();
    playMusic();
    currentSong();
};

//audio-timeupdate(currenttime, duration)
player.addEventListener('timeupdate', (event) => {
    //console.log(event);
    const {currentTime, duration} = event.srcElement;
    //console.log(currentTime);
    //console.log(duration);

    let progress_time = (currentTime / duration) * 100;
    //console.log(progress_time);
    progress.style.width = `${progress_time}%`;

    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);
    let return_sec_duration = sec_duration < 10 ? `0${sec_duration}` : `${sec_duration}`;
    //console.log(min_duration);
    //console.log(sec_duration);
    
    if(duration) {
        endTime.textContent = `${min_duration}:${return_sec_duration}`;
    }

    let min_current = Math.floor(currentTime / 60);
    let sec_current = Math.floor(currentTime % 60);
    //console.log(min_duration);
    //console.log(sec_duration);
    let return_sec_current = sec_current < 10 ? `0${sec_current}` : `${sec_current}`;
    
    current.textContent = `${min_current}:${return_sec_current}`;
});

progress_div.addEventListener('click', (event) => {
    //console.log(event);
    const {duration} = player;
    let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
    //console.log(move_progress);

    player.currentTime = move_progress;
});

player.addEventListener('ended', nextSong);

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

const heart = document.querySelector('.heart');

heart.addEventListener('click', () => {
    if(heart.classList.contains('active')) {
        heart.innerHTML = `<i class="ri-heart-line"></i>`;
        heart.classList.remove('active');
    } else {
        heart.innerHTML = `<i class="ri-heart-fill"></i>`;
        heart.classList.add('active');
    }
});

const playlistContainer = document.querySelector('.play-list-container');
const playlistCloseBtn = document.querySelector('.play-list-close');
const playlistBtn = document.querySelector('.playlist-btn');

playlistBtn.addEventListener('click', () => {
    playlistContainer.classList.add('active');
});

playlistCloseBtn.addEventListener('click', () => {
    playlistContainer.classList.remove('active');
});

const loopBtn = document.querySelector('.repeat');

loopBtn.addEventListener('click', () => {
    const loopPlayer = document.getElementById('player');
    if(loopBtn.classList.contains('active')) {
        loopPlayer.loop = false;
        loopBtn.classList.remove('active');
        loopBtn.style.opacity = "0.5";
    } else {
        loopPlayer.loop = true;
        loopBtn.classList.add('active');
        loopBtn.style.opacity = "1";
    }
});

const playList = document.querySelector('.play-list');

for(let i = 0; i < songs.length; i++) {
    loadList(songs[i]);

    function loadList() {
        playList.innerHTML = '';
        songs.forEach(song => {
            playList.innerHTML += `<div class="play-list-content">
                                <img src="img/${song.album}.jpg" alt="">
                                <div class="play-list-info">
                                    <h5 class="list-title">${song.title}</h5>
                                    <h6 class="list-artist">${song.artist}</h6>
                                </div>
                                <div class="play-list-btns">
                                    <span class="list-heart"><i class="ri-heart-line"></i></span>
                                    <span class="list-delete"><i class="ri-delete-bin-7-line"></i></span>
                                </div>
                            </div>`;
        });    
    }
}

const currentSongContent = document.querySelector('.current-song-content');

function currentSong() {
    //console.log(songIndex);
    currentSongContent.innerHTML = '';
    currentSongContent.innerHTML += `<img src="img/${songs[songIndex].album}.jpg" alt="">
                                <h4 class="current-song-title">${songs[songIndex].title}</h4>
                                <div class="current-song-control">
                                    <span class="prev"><img src="img/prev.png" alt=""></span>
                                    <span class="play"><img src="img/play.png" alt=""></span>
                                    <span class="next"><img src="img/next.png" alt=""></span>
                                </div>`;
}
                                
currentSong();

const playContainerHeader = document.querySelector('.play-header');

playList.onclick = ({target}) => {
    //console.log(target);
    
   let songIndex = 0;
    while(target = target.previousElementSibling) {
        songIndex++;
    }
    
    //console.log(songIndex);
    currentSong();

    function nextSong() {
        songIndex = (songIndex + 1) % songs.length;
        loadSong(songs[songIndex]);
        player.play();
        playMusic();
        currentSong();
    };

    function prevSong() {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
        loadSong(songs[songIndex]);
        player.play();
        playMusic();
        currentSong();
    };

    player.addEventListener('ended', nextSong);
    nextBtn.addEventListener('click', nextSong);
    prevBtn.addEventListener('click', prevSong);

    loadSong(songs[songIndex]);
    currentSongContent.innerHTML = `<img src="img/${songs[songIndex].album}.jpg" alt="">
                                <h4 class="current-song-title">${songs[songIndex].title}</h4>
                                <div class="current-song-control">
                                    <span class="prev"><img src="img/prev.png" alt=""></span>
                                    <span class="current-play"></span>
                                    <span class="next"><img src="img/next.png" alt=""></span>
                                </div>`;
                                
    player.src = `src/${songs[songIndex].title}.mp3`;
    player.play();
    playBtn.style.backgroundImage = "url(img/pause.png)";
}

const shuffleBtn = document.querySelector('.shuffle);

function shuffle(array) {
    let currentIndex = array.length, randomIndex;   
    while(currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    
    return array;
}

//shuffle(songs);
//console.log(array);

shuffleBtn.addEventListener('click', () => {
    shuffle(songs);
    console.log(songs);
        
    for(let i = 0; i < songs.length; i++) {
        loadSong(songs[i]);
        player.play();
        playBtn.style.backgroundImage = "url(img/pause.png)";
    }

    if(shuffleBtn.classList.contains('active')) {
        shuffleBtn.classList.remove('active');
        shuffleBtn.style.opacity = "0.5";
    } else {
        shuffleBtn.classList.add('active');
        shuffleBtn.style.opacity = "1";
    }
})

const mainPage = document.querySelector('.main-page');
const mainPlayList = document.querySelector('.main-playlist');
const prevPageBtn = document.querySelector('.prev-page-btn');

mainPlayList.addEventListener('click', () => {
    mainPage.classList.remove('active');
});

prevPageBtn.addEventListener('click', () => {
    mainPage.classList.add('active');
});
