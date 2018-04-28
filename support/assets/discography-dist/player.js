let oldTrackRows = document.getElementsByTagName('tr');
let newTrackRows = [];
newTrackRows[0]=oldTrackRows[0];
for(let counter=1; counter<oldTrackRows.length; counter++) {
    if (oldTrackRows[counter].parentElement.tagName === "THEAD") {
        alert('fuck you');
        continue;
    }
    newTrackRows.push(oldTrackRows[counter]);
}
let trackRows = newTrackRows;

function formatSecondsAsTime(secs, format) {
    /* based on https://stackoverflow.com/questions/4993097/html5-display-audio-currenttime */
    let hr = Math.floor(secs / 3600);
    let min = Math.floor((secs - (hr * 3600)) / 60);
    let sec = Math.floor(secs - (hr * 3600) - (min * 60));

    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }

    return min + ':' + sec;
}

let currentTrack = 1;

let audioContainer = document.createElement('div');
let audioTag = document.createElement('audio');
// audioTag.setAttribute("controls","controls");
audioTag.addEventListener('ended', reachedEndOfTrack, false);
audioContainer.className = "audioContainer";
audioContainer.appendChild(audioTag);

let audioMainPlayButton = document.createElement('button');
audioMainPlayButton.className = "audioMainPlayButton";
let audioTitle = document.createElement('span');
audioTitle.className = "audioTitle";
let audioDuration = document.createElement('span');
audioDuration.className = "audioDuration";
let audioPlayhead = document.createElement('div');
audioPlayhead.className = "audioPlayhead";
let audioCurrentTime = document.createElement('span');
audioCurrentTime.className = "audioCurrentTime";
let audioWaveform = document.createElement('img');
audioWaveform.className = "audioWaveform";
let audioScrubber = document.createElement('input');
audioScrubber.className = "audioScrubber";
let audioVolume = document.createElement('input');
audioVolume.className = "audioVolume";
audioScrubber.type = 'range';
audioVolume.type = 'range';
let audioPlayNextButton = document.createElement('button');
audioPlayNextButton.className = "audioPlayNextButton";

audioScrubber.onchange = seekInAudio;

function seekInAudio() {
    let newVal = Math.floor((audioScrubber.value / 100) * audioTag.duration);
    if (!isNaN(newVal)) {
        audioTag.currentTime = newVal;
    }
}

audioVolume.onchange = updateVolume;

function updateVolume() {
    audioTag.volume = audioVolume.value / 100;
}

audioMainPlayButton.innerHTML = "▶";
audioPlayNextButton.innerHTML = "⏭";

audioContainer.appendChild(audioWaveform);
audioContainer.appendChild(audioPlayhead);
audioContainer.appendChild(audioTitle);
audioContainer.appendChild(audioMainPlayButton);
audioContainer.appendChild(audioDuration);
audioContainer.appendChild(audioCurrentTime);
audioContainer.appendChild(audioScrubber);
audioContainer.appendChild(audioVolume);
audioContainer.appendChild(audioPlayNextButton);

function togglePlayPause() {
    if (audioTag.paused) {
        audioTag.play();
        syncPlayLabel();
    } else {
        audioTag.pause();
        clearTrackStatuses();
    }
}

audioMainPlayButton.onclick = function() {
    togglePlayPause();
};
audioPlayNextButton.onclick = function() {
    reachedEndOfTrack(true);
};
audioVolume.style.transform = 'rotate(270deg)';

document.body.insertBefore(audioContainer, document.body.firstChild);

loadTrack(1);

function convertRemToPixels(rem) {
    /* from https://stackoverflow.com/questions/36532307/rem-px-in-javascript */
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function updateCurrentTime() {
    /* based on https://stackoverflow.com/questions/4993097/html5-display-audio-currenttime */
    let currTime = Math.floor(audioTag.currentTime).toString();
    let duration = Math.floor(audioTag.duration).toString();
    let remaining = duration - currTime;
    let percentage = currTime / duration;

    audioCurrentTime.innerHTML = formatSecondsAsTime(currTime) + '; ' + '-' + formatSecondsAsTime(remaining) + ' (' + (percentage * 100).toFixed(3) + '%)';

    let progressPercentage = (currTime / duration);
    audioScrubber.value = parseInt(((currTime / duration) * 100), 10);
    let timelineWidth = audioScrubber.offsetWidth;
    audioPlayhead.style.left = ((timelineWidth * progressPercentage) + convertRemToPixels(4)) + 'px';
    let desiredRightPosition = ((timelineWidth * (1 - progressPercentage)) - convertRemToPixels(10));
    let maximumRightPosition = convertRemToPixels(10);
    if (desiredRightPosition < maximumRightPosition) {
        desiredRightPosition = maximumRightPosition;
    }
    audioCurrentTime.style.right = desiredRightPosition + 'px';
    audioCurrentTime.style.display = 'block';

    if (isNaN(duration)) {
        audioDuration.innerHTML = '??:??';
    } else {
        audioDuration.innerHTML = formatSecondsAsTime(duration);
    }
}

addEventListener("resize", updateCurrentTime);
audioTag.addEventListener("timeupdate", updateCurrentTime);
audioTag.addEventListener("durationchange", updateCurrentTime);

function loadTrack(trackNumber) {
    currentTrack = trackNumber;
    let trackRows = document.getElementsByTagName('tr');
    let trackRowToPlay = trackRows[trackNumber];
    /* Figure out what the relative file name is of the waveform file */
    if (document.getElementById('musiccontents')) {
        /* This is a featured releases page, so get the info from the DOM */
        /*         tr             tbody         table         div */
        let name = trackRowToPlay.parentElement.parentElement.parentElement.id;
        /* based on https://stackoverflow.com/questions/5913927/get-child-node-index */
        let rowIndex = 0;
        let trackRowToPlayTemp=trackRowToPlay;
        for (rowIndex; (trackRowToPlayTemp=trackRowToPlayTemp.previousSibling); rowIndex++);
        rowIndex=rowIndex - 1;
        audioWaveform.src = 'releases/' + name + '/' + rowIndex + 'w.png';
    }
    else {
        /* This is a release page, so get the info from the filename */
        // based on https://stackoverflow.com/questions/16611497/how-can-i-get-the-name-of-an-html-page-in-javascript
        let path = window.location.pathname;
        let file = path.split("/").pop();
        let name = file.split(".").shift();

        audioWaveform.src = name + '/' + trackNumber + 'w.png'
    }
    let audioTag = document.getElementsByClassName('audioContainer')[0].getElementsByTagName('audio')[0];
    let childNodesCounter = 0;
    while (audioTag.childNodes.length > 0) {
        let nodes = audioTag.childNodes;
        audioTag.removeChild(nodes[0]);
        childNodesCounter = childNodesCounter + 1;
    }
    let tagsToCopy = trackRowToPlay.getElementsByTagName('source');
    for (let i = 0; i < tagsToCopy.length; i++) {
        audioTag.appendChild(tagsToCopy[i].cloneNode(true));
    }
    audioTitle.innerHTML = trackRows[trackNumber].getElementsByTagName('td')[2].innerHTML;
}

function clearTrackStatuses() {
    let trackRows = document.getElementsByTagName('tr');
    for (let i = 1; i < trackRows.length; i++) {
        /* skip first row: it is header */
        let trackRowToClear = trackRows[i];
        trackPlayButton = trackRowToClear.getElementsByTagName('td')[1].getElementsByTagName('button')[0];
        trackPlayButton.innerHTML = "▶";
        trackPlayButton.className = 'playButton';
    }
    audioMainPlayButton.innerHTML = "▶";
}

function syncPlayLabel() {
    trackNumber = currentTrack;
    let trackRows = document.getElementsByTagName('tr');
    let trackRowToPlay = trackRows[trackNumber];
    trackPlayButton = trackRowToPlay.getElementsByTagName('td')[1].getElementsByTagName('button')[0];
    trackPlayButton.innerHTML = "⏸";
    trackPlayButton.className = 'playButton playing';
    trackPlayButton.onclick = function() {
        pauseTrackFromTrackButton(this);
    };
    audioMainPlayButton.innerHTML = "⏸";
}

function playTrack(trackNumber) {
    loadTrack(trackNumber);
    let audioTag = document.getElementsByClassName('audioContainer')[0].getElementsByTagName('audio')[0];
    audioTag.play();
    clearTrackStatuses();
    syncPlayLabel(trackNumber);
}

function pauseTrack(trackNumber) {
    loadTrack(trackNumber);
    let audioTag = document.getElementsByClassName('audioContainer')[0].getElementsByTagName('audio')[0];
    audioTag.pause();
    clearTrackStatuses();
    document.getElementsByTagName('tr')[trackNumber].getElementsByTagName('td')[1].getElementsByTagName('button')[0].onclick = function() {
        playTrackFromTrackButton(this);
    };
}

function playTrackFromTrackButton(trackClickedElement) {
    let trackRows = document.getElementsByTagName('tr');
    for (let i = 1; i < trackRows.length; i++) {
        /* skip first row: it is header */
        console.log(i);
        console.log(trackRows[i]);
        console.log(trackRows[i].getElementsByTagName('td')[1]);
        if (trackRows[i].getElementsByTagName('td')[1].getElementsByTagName('button')[0] === trackClickedElement) {
            playTrack(i);
        }
    }
    return false;
}

function pauseTrackFromTrackButton(trackClickedElement) {
    let trackRows = document.getElementsByTagName('tr');
    for (let i = 1; i < trackRows.length; i++) {
        /* skip first row: it is header */
        if (trackRows[i].getElementsByTagName('td')[1].getElementsByTagName('button')[0] === trackClickedElement) {
            pauseTrack(i);
        }
    }
    return false;
}

function reachedEndOfTrack(eventParameter) {
    currentTrackElement = document.getElementsByClassName('playing')[0];
    let currentTrack = 0;
    let trackRows = document.getElementsByTagName('tr');
    for (let i = 1; i < trackRows.length; i++) {
        /* skip first row: it is header */
        if (trackRows[i].getElementsByTagName('td')[1].getElementsByTagName('button')[0] === currentTrackElement) {
            currentTrack = i;
        }
    }
    nextTrack = currentTrack + 1;
    numberOfTracks = document.getElementsByTagName('tr').length - 1;
    if (nextTrack > numberOfTracks) {
        nextTrack = 1;
    }
    audioTag.currentTime = 0;
    if (audioMainPlayButton.className.contains('playing')) {
        playTrack(nextTrack);
    } else {
        loadTrack(nextTrack);
    }
}

for (let i = 1; i < trackRows.length; i++) {
    /* skip first row: it is header */
    trackAudioCell = trackRows[i].getElementsByTagName('td')[1];
    trackAudioCellAudioElement = trackAudioCell.getElementsByTagName('audio')[0];
    trackAudioCellAudioElement.style.display = "none";
    trackAudioCellAudioElement.pause();
    trackPlayButton = document.createElement('button');
    trackPlayButton.className = 'playButton';
    trackPlayButton.innerHTML = "▶";
    trackPlayButton.onclick = function() {
        playTrackFromTrackButton(this);
    };
    trackAudioCell.insertBefore(trackPlayButton, trackAudioCell.firstChild);
}
