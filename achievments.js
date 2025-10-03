// In-memory storage for achievements (no localStorage)
if (!window.gameData) {
  window.gameData = {
    endingsReached: {},
    achievementsUnlocked: {},
    playthroughLogs: []
  };
}

// Function to save achievement data (in-memory only)
window.saveAchievements = function(endings, achievements, logs) {
  try {
    console.log("Saving - Input:", {endings, achievements, logs});

    // Convert Harlowe datamaps to plain objects
    const endingsObj = {};
    if (endings instanceof Map) {
      endings.forEach((v, k) => { endingsObj[k] = v; });
    } else if (endings && typeof endings === 'object') {
      Object.assign(endingsObj, endings);
    }
    window.gameData.endingsReached = endingsObj;

    const achievementsObj = {};
    if (achievements instanceof Map) {
      achievements.forEach((v, k) => { achievementsObj[k] = v; });
    } else if (achievements && typeof achievements === 'object') {
      Object.assign(achievementsObj, achievements);
    }
    window.gameData.achievementsUnlocked = achievementsObj;

    const logsArray = [];
    if (Array.isArray(logs)) {
      logs.forEach(log => {
        if (log instanceof Map) {
          const obj = {};
          log.forEach((v, k) => { obj[k] = v; });
          logsArray.push(obj);
        } else if (log && typeof log === 'object') {
          logsArray.push(log);
        }
      });
    }
    window.gameData.playthroughLogs = logsArray;

    console.log("Saved achievements:", window.gameData);
  } catch (e) {
    console.error("Could not save achievements:", e);
  }
};

// Function to load achievement data (from memory) - returns the data directly
window.loadAchievements = function() {
  try {
    if (!window.gameData) {
      window.gameData = {
        endingsReached: {},
        achievementsUnlocked: {},
        playthroughLogs: []
      };
    }

    console.log("Loading achievements:", window.gameData);

    // Return the data so Harlowe can use it
    return {
      endingsReached: window.gameData.endingsReached || {},
      achievementsUnlocked: window.gameData.achievementsUnlocked || {},
      playthroughLogs: window.gameData.playthroughLogs || []
    };
  } catch (e) {
    console.error("Could not load achievements:", e);
    return {
      endingsReached: {},
      achievementsUnlocked: {},
      playthroughLogs: []
    };
  }
};

// --- Self-Starting Music Player ---
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