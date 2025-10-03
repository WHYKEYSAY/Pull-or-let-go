// Function to save the achievement datamaps to the browser's local storage
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

// Function to load the achievements from local storage into Harlowe variables
window.loadAchievements = function() {
  try {
    const savedData = localStorage.getItem('pullOrLetGoSave');
    if (savedData) {
      const data = JSON.parse(savedData);
      // We need to set these variables in the Harlowe engine's state
      if (data.endingsReached) {
        Harlowe.State.variables.endingsReached = new Map(Object.entries(data.endingsReached));
      }
      if (data.achievementsUnlocked) {
        Harlowe.State.variables.achievementsUnlocked = new Map(Object.entries(data.achievementsUnlocked));
      }
      if (data.playthroughLogs) {
        // Convert the simple objects from JSON back into Harlowe Datamaps
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