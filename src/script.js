document.addEventListener('DOMContentLoaded', () => {
    const videoUpload = document.getElementById('videoUpload');
    const videoElement = document.getElementById('videoElement');
    const uploadPrompt = document.getElementById('uploadPrompt');
    const playPauseButton = document.getElementById('playPauseButton');
    const timeDisplay = document.getElementById('timeDisplay');
    const videoFileName = document.getElementById('videoFileName');
    const uploadButton = document.getElementById('uploadButton');

    // Trigger file input when the upload button is clicked
    uploadButton.addEventListener('click', () => {
        videoUpload.click();
    });

    videoUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            videoElement.src = url;
            videoElement.classList.remove('hidden');
            uploadPrompt.classList.add('hidden');
            videoFileName.textContent = file.name;

            videoElement.addEventListener('loadedmetadata', () => {
                const duration = videoElement.duration;
                const minutes = Math.floor(duration / 60);
                const seconds = Math.floor(duration % 60);
                timeDisplay.textContent = `00:00:00 / ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            });
        }
    });

    playPauseButton.addEventListener('click', () => {
        if (videoElement.paused) {
            videoElement.play();
            playPauseButton.querySelector('i').classList.replace('fa-play', 'fa-pause');
        } else {
            videoElement.pause();
            playPauseButton.querySelector('i').classList.replace('fa-pause', 'fa-play');
        }
    });

    // Timeline scrubbing
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            progressBar.querySelector('.progress').style.width = `${pos * 100}%`;
            videoElement.currentTime = pos * videoElement.duration;
        });
    }
});