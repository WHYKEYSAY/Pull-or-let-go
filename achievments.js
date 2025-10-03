// Function to save achievement data
window.saveAchievements = function(endings, achievements, logs) {
  try {
    const data = {
      endingsReached: endings,
      achievementsUnlocked: achievements,
      playthroughLogs: logs
    };
    localStorage.setItem('pullOrLetGoSave', JSON.stringify(data));
  } catch (e) {
    console.error("Could not save achievements:", e);
  }
};

// Function to load achievement data
window.loadAchievements = function() {
  try {
    const savedData = localStorage.getItem('pullOrLetGoSave');
    if (savedData) {
      const data = JSON.parse(savedData);
      if (data.endingsReached) {
        Harlowe.State.variables.endingsReached = new Map(Object.entries(data.endingsReached));
      }
      if (data.achievementsUnlocked) {
        Harlowe.State.variables.achievementsUnlocked = new Map(Object.entries(data.achievementsUnlocked));
      }
      if (data.playthroughLogs) {
        let logs = [];
        for (const log of data.playthroughLogs) {
          logs.push(new Map(Object.entries(log)));
        }
        Harlowe.State.variables.playthroughLogs = logs;
      }
    }
  } catch (e) {
    console.error("Could not load achievements:", e);
  }
};

// --- New Self-Starting Music Player ---
(function() {
    if (!document.getElementById('story-bgm')) {
        const bgm = document.createElement('audio');
        bgm.id = 'story-bgm';
        bgm.src = 'BGM.mp3';
        bgm.loop = true;
        document.body.appendChild(bgm);

        const promise = bgm.play();
        if (promise !== undefined) {
            promise.catch(error => {
                console.log("Autoplay prevented. Waiting for user interaction.");
                const playOnFirstClick = () => {
                    bgm.play();
                    window.removeEventListener('click', playOnFirstClick);
                };
                window.addEventListener('click', playOnFirstClick);
            });
        }
    }
})();