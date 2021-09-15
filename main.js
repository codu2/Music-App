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

let progress = document.querySelector('.progress');
const endTime = document.querySelector('.duration');
const current = document.querySelector('.current');
const progress_div = document.querySelector('.progress-div');

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
})

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
})
