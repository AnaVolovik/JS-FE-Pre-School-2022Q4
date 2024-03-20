//document.addEventListener('DOMContentLoaded', function() {
    //2
    const greeting = document.querySelector('.greeting');
    
    function getTimeOfDay() {
      const date = new Date();
      const hours = date.getHours();
      if (hours >= 00 && hours < 6) return 'night';
      if (hours >= 06 && hours < 12) return 'morning';
      if (hours >= 12 && hours < 18) return 'afternoon';
      if (hours >= 18 && hours < 24) return 'evening';
    }

    function showGreeting() {
      const timeOfDay = getTimeOfDay();
      const greetingText = `Good ${timeOfDay},`;
      greeting.textContent = greetingText;
    }

    function setLocalStorage() {
      let username = document.querySelector('.name').value;
      localStorage.setItem('name', username);
    }
    window.addEventListener('beforeunload', setLocalStorage);
  
    function getLocalStorage() {
      if(localStorage.getItem('name')) {
        document.querySelector('.name').value = localStorage.getItem('name');
      }
    }
    window.addEventListener('load', getLocalStorage);

  //1
  const time = document.querySelector('.time');
  const day = document.querySelector('.date');

  function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
    showDate();
    showGreeting();
  }
  showTime();

  function showDate() {
    const date = new Date();
    const options = {weekday: 'long', day: 'numeric', month: 'long'};
    const currentDate = date.toLocaleDateString('en-EN', options);
    day.textContent = currentDate;
  }

  //3
  let bodyDoc = document.querySelector('body');
  let randomNum;
  let nextArrow = document.querySelector('.slide-next');
  let prevArrow = document.querySelector('.slide-prev');

  function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  getRandomNum(1,20);

  function setBg() {
    const timeOfDay = getTimeOfDay();
    const img = new Image();
    let bgNum = String(randomNum);
    bgNum = bgNum.padStart(2, '0');
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
      bodyDoc.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
    };
  }
  setBg();

  nextArrow.addEventListener('click', function getSlideNext() {
    if(randomNum < 20) {
      randomNum = randomNum + 1;
    } else {
      randomNum = 1;
    }
    setBg();
  });

  prevArrow.addEventListener('click', function getSlidePrev() {
    if(randomNum > 1) {
      randomNum = randomNum - 1;
    } else {
      randomNum = 20;
    }
    setBg();
  });

  //4

  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const humidity = document.querySelector('.humidity');
  const wind = document.querySelector('.wind');
  const weatherDescription = document.querySelector('.weather-description');
  const city = document.querySelector('.city');
  const weatherErr = document.querySelector('.weather-error');

  window.addEventListener('load', () => {
    city.value = 'Minsk';
    getWeather();
  })

  async function getWeather(e) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=f7f7368f06b9e24563e8038f907182c2&units=metric`;
      const res = await fetch(url);
      const data = await res.json();

      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
      humidity.textContent = `${data.main.humidity.toFixed(0)}%`;
      wind.textContent = `${data.wind.speed.toFixed(0)}m/s`;
      weatherDescription.textContent = data.weather[0].description;
    } catch(e) {
      temperature.textContent = '';
      humidity.textContent = '';
      wind.textContent = '';
      weatherDescription.textContent = '';
      alert('Error! Incorrect city value.');
    }
  }

  function setLocalCity() {
    let cityName = document.querySelector('.city').value;
    localStorage.setItem('city', cityName);
  }
  window.addEventListener('beforeunload', setLocalCity);

  function getLocalCity() {
    if(localStorage.getItem('city')) {
      document.querySelector('.city').value = localStorage.getItem('city');
    }
  }
  window.addEventListener('load', getLocalCity);

  city.addEventListener('change', getWeather);

  //5
  const quote = document.querySelector('.quote');
  const author = document.querySelector('.author');
  const quoteBtn = document.querySelector('.change-quote');

  async function getQuotes() {
    const quotes = './js/data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    getRandomNum(0,9);

    quote.textContent = `${data[randomNum].text}`;
    author.textContent = `${data[randomNum].author}`;

    quoteBtn.addEventListener('click', getQuotes);
  }
  getQuotes();

  //6 + 7
  let playBut = document.querySelector('.play');
  const nextBtn = document.querySelector('.play-next');
  const prevBtn = document.querySelector('.play-prev');
  let muteButton = document.querySelector('.mute-button');

  let volumeSlider = document.querySelector('.volume_slider');
  let playSlider = document.querySelector('.play_slider');
  
  let currTime = document.querySelector('.current-time');
  let totalDuration = document.querySelector('.total-duration');
  let updateTimer;

  let audioList = document.querySelectorAll('audio');
  let trackName = document.querySelector('.track-name');

  let currentSong = 0;

  function playAudio() {
    playBut.classList.add('pause');
    playBut.classList.remove('play');
  }

  function pauseAudio() {
    playBut.classList.add('play');
    playBut.classList.remove('pause');
  }

  function playSong() {
    clearInterval(updateTimer);
    resetValues();
    updateTimer = setInterval(seekUpdate, 10);
    playAudio();
    setVolume();
    mutedAudio();
    trackName.textContent = audioList[currentSong].parentElement.textContent;
    if (audioList[currentSong].paused) {
      audioList[currentSong].parentElement.classList.add('active');
      audioList[currentSong].play();
      playAudio();
    } else {
      audioList[currentSong].pause();
      audioList[currentSong].parentElement.classList.remove('active');
      pauseAudio();
    }
    audioList[currentSong].addEventListener('ended', playNext);
  }

  function mutedAudio() {
    if (audioList[currentSong].classList.value.match('muted')) {
      muteButton.classList.add('soundOff');
      muteButton.classList.remove('soundOn');
      audioList[currentSong].muted = true;
    } else {
      muteButton.classList.add('soundOn');
      muteButton.classList.remove('soundOff');
      audioList[currentSong].muted = false;
    }
  }

  muteButton.addEventListener('click', function() {
    audioList.forEach(el => {
      el.classList.toggle('muted');
      mutedAudio();
    })
  });

  function playNext() {
    audioList[currentSong].pause();
    audioList[currentSong].currentTime = 0;
    audioList[currentSong].parentElement.classList.remove('active');
    pauseAudio();
    currentSong++;
    if (currentSong >= audioList.length) {
      currentSong = 0;
    }
    playSong();
    audioList[currentSong].addEventListener('ended', playNext);
  }

  nextBtn.addEventListener('click', playNext);

  prevBtn.addEventListener('click', function() {
    audioList[currentSong].pause();
    audioList[currentSong].currentTime = 0;
    audioList[currentSong].parentElement.classList.remove('active');
    pauseAudio();
    currentSong == audioList.length;
    currentSong--;
    if (currentSong < 0) {
      currentSong = audioList.length-1;
    }
    playSong();
  });

  playBut.addEventListener('click', playSong);

  function setVolume() {
    audioList.forEach(el => el.volume = volumeSlider.value / 100);
  }

  function resetValues() {
    currTime.textContent = '00:00';
    totalDuration.textContent = '00:00';
    playSlider.value = 0;
  }

  function seekTo() {
    let seekto = audioList[currentSong].duration * (playSlider.value / 100);
    audioList[currentSong].currentTime = seekto;
  }

  function seekUpdate() {
    let seekPosition = 0;
    if (!isNaN(audioList[currentSong].duration)) {
      seekPosition = audioList[currentSong].currentTime * (100 / audioList[currentSong].duration);
      playSlider.value = seekPosition;

      let currentMinutes = Math.floor(audioList[currentSong].currentTime / 60);
      let currentSeconds = Math.floor(audioList[currentSong].currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(audioList[currentSong].duration / 60);
      let durationSeconds = Math.floor(audioList[currentSong].duration - durationMinutes * 60);
      if (currentSeconds < 10) { currentSeconds = '0' + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = '0' + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = '0' + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = '0' + durationMinutes; }

      currTime.textContent = currentMinutes + ':' + currentSeconds;
      totalDuration.textContent = durationMinutes + ':' + durationSeconds;
    }
  }
