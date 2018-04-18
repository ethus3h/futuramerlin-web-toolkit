function formatSecondsAsTime(secs, format) {
    /* based on https://stackoverflow.com/questions/4993097/html5-display-audio-currenttime */
    let hr  = Math.floor(secs / 3600);
    let min = Math.floor((secs - (hr * 3600))/60);
    let sec = Math.floor(secs - (hr * 3600) -  (min * 60));

    if (min < 10){ 
        min = "0" + min; 
    }
    if (sec < 10){ 
        sec  = "0" + sec;
    }

    return min + ':' + sec;
}

let currentTrack=1;

let audioContainer=document.createElement('div');
let audioTag=document.createElement('audio');
// audioTag.setAttribute("controls","controls");
audioTag.addEventListener('ended',reachedEndOfTrack,false);
audioContainer.className="audioContainer";
audioContainer.appendChild(audioTag);

let audioMainPlayButton=document.createElement('button');
let audioTitle=document.createElement('div');
let audioDuration=document.createElement('div');
let audioPlayhead=document.createElement('div');
let audioCurrentTime=document.createElement('div');
let audioWaveform=document.createElement('img');
let audioScrubber=document.createElement('input');
let audioVolume=document.createElement('input');
audioScrubber.type='range';
audioVolume.type='range';
let audioPlayNextButton=document.createElement('button');

audioScrubber.onchange=seekInAudio;

function seekInAudio() {
    let newVal=Math.floor((audioScrubber.value / 100) * audioTag.duration);
    console.log(audioScrubber.value);
    console.log(audioTag.duration);
    if(! isNaN(newVal)){
        audioTag.currentTime=newVal;
    }
}

audioVolume.onchange=updateVolume;
function updateVolume() {
    audioTag.volume = audioVolume.value / 100;
}

audioMainPlayButton.innerHTML="▶";
audioPlayNextButton.innerHTML="⏭";

audioContainer.appendChild(audioMainPlayButton);
audioContainer.appendChild(audioTitle);
audioContainer.appendChild(audioDuration);
audioContainer.appendChild(audioPlayhead);
audioContainer.appendChild(audioCurrentTime);
audioContainer.appendChild(audioWaveform);
audioContainer.appendChild(audioScrubber);
audioContainer.appendChild(audioVolume);
audioContainer.appendChild(audioPlayNextButton);

function togglePlayPause() {
    if(audioTag.paused) {
        audioTag.play();
        syncPlayLabel();
    }else{
        audioTag.pause();
        clearTrackStatuses();
    }
}

audioMainPlayButton.onclick=function(){togglePlayPause();};
audioPlayNextButton.onclick=function(){reachedEndOfTrack(true);};
audioVolume.style.transform='rotate(270deg)';

document.body.appendChild(audioContainer);
let trackRows=document.getElementsByTagName('tr');
loadTrack(1);

function updateCurrentTime() {
    /* based on https://stackoverflow.com/questions/4993097/html5-display-audio-currenttime */
    let currTime = Math.floor(audioTag.currentTime).toString(); 
    let duration = Math.floor(audioTag.duration).toString();
    let remaining = duration - currTime;
    let percentage = currTime / duration;

    audioCurrentTime.innerHTML = formatSecondsAsTime(currTime) + '; ' + '-' + formatSecondsAsTime(remaining) + ' (' + percentage.toFixed(3) + '%)';

    audioScrubber.value=parseInt(((currTime / duration) * 100), 10);

    if (isNaN(duration)){
        audioDuration.innerHTML = '??:??';
    } 
    else{
        audioDuration.innerHTML = formatSecondsAsTime(duration);
    }
}

audioTag.addEventListener("timeupdate", updateCurrentTime);
audioTag.addEventListener("durationchange", updateCurrentTime);

function loadTrack(trackNumber) {
    currentTrack=trackNumber;
    audioWaveform.src=trackNumber+'w.png'
    let trackRows=document.getElementsByTagName('tr');
    let trackRowToPlay=trackRows[trackNumber];
    let audioTag=document.getElementsByClassName('audioContainer')[0].getElementsByTagName('audio')[0];
    let childNodesCounter=0;
    while(audioTag.childNodes.length > 0) {
        let nodes=audioTag.childNodes;
        audioTag.removeChild(nodes[0]);
        childNodesCounter=childNodesCounter+1;
    }
    let tagsToCopy=trackRowToPlay.getElementsByTagName('source');
    for (let i=0; i<tagsToCopy.length; i++) {
        audioTag.appendChild(tagsToCopy[i].cloneNode(true));
    }
    audioTitle.innerHTML=trackRows[trackNumber].getElementsByTagName('td')[2].innerHTML;
}

function clearTrackStatuses() {
    let trackRows=document.getElementsByTagName('tr');
    for(let i=1;i<trackRows.length;i++) {
        /* skip first row: it is header */
        let trackRowToClear=trackRows[i];
        trackPlayButton=trackRowToClear.getElementsByTagName('td')[1].getElementsByTagName('button')[0];
        trackPlayButton.innerHTML="▶";
        trackPlayButton.className='playButton';
    }
    audioMainPlayButton.innerHTML="▶";
}

function syncPlayLabel() {
    trackNumber=currentTrack;
    let trackRows=document.getElementsByTagName('tr');
    let trackRowToPlay=trackRows[trackNumber];
    trackPlayButton=trackRowToPlay.getElementsByTagName('td')[1].getElementsByTagName('button')[0];
    trackPlayButton.innerHTML="⏸";
    trackPlayButton.className='playButton playing';
    trackPlayButton.onclick=function(){pauseTrackFromTrackButton(this);};
    audioMainPlayButton.innerHTML="⏸";
}

function playTrack(trackNumber) {
    loadTrack(trackNumber);
    let audioTag=document.getElementsByClassName('audioContainer')[0].getElementsByTagName('audio')[0];
    audioTag.play();
    clearTrackStatuses();
    syncPlayLabel(trackNumber);
}

function pauseTrack(trackNumber) {
    loadTrack(trackNumber);
    let audioTag=document.getElementsByClassName('audioContainer')[0].getElementsByTagName('audio')[0];
    audioTag.pause();
    clearTrackStatuses();
    document.getElementsByTagName('tr')[trackNumber].getElementsByTagName('td')[1].getElementsByTagName('button')[0].onclick=function(){playTrackFromTrackButton(this);};
}

function playTrackFromTrackButton(trackClickedElement) {
    let trackRows=document.getElementsByTagName('tr');
    for(let i=1;i<trackRows.length;i++) {
        /* skip first row: it is header */
        if (trackRows[i].getElementsByTagName('td')[1].getElementsByTagName('button')[0] === trackClickedElement) {
            playTrack(i);
        }
    }
    return false;
}

function pauseTrackFromTrackButton(trackClickedElement) {
    let trackRows=document.getElementsByTagName('tr');
    for(let i=1;i<trackRows.length;i++) {
        /* skip first row: it is header */
        if (trackRows[i].getElementsByTagName('td')[1].getElementsByTagName('button')[0] === trackClickedElement) {
            pauseTrack(i);
        }
    }
    return false;
}

function reachedEndOfTrack(eventParameter) {
    currentTrackElement=document.getElementsByClassName('playing')[0];
    let currentTrack=0;
    let trackRows=document.getElementsByTagName('tr');
    for(let i=1;i<trackRows.length;i++) {
        /* skip first row: it is header */
        if (trackRows[i].getElementsByTagName('td')[1].getElementsByTagName('button')[0] === currentTrackElement) {
            currentTrack=i;
        }
    }
    nextTrack=currentTrack+1;
    numberOfTracks=document.getElementsByTagName('tr').length-1;
    if(nextTrack>numberOfTracks) {
        nextTrack=1;
    }
    audioTag.currentTime=0;
    if(trackPlayButton.class.contains('playing')) {
        playTrack(nextTrack);
    }
    else {
        loadTrack(nextTrack);
    }
}

for(let i=1;i<trackRows.length;i++) {
    /* skip first row: it is header */
    trackAudioCell=trackRows[i].getElementsByTagName('td')[1];
    trackAudioCellAudioElement=trackAudioCell.getElementsByTagName('audio')[0];
    trackAudioCellAudioElement.style.display="none";
    trackAudioCellAudioElement.pause();
    trackPlayButton=document.createElement('button');
    trackPlayButton.className='playButton';
    trackPlayButton.innerHTML="▶";
    trackPlayButton.onclick=function(){playTrackFromTrackButton(this);};
    trackAudioCell.appendChild(trackPlayButton);
}
