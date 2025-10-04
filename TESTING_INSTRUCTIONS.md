# Testing Instructions for Pull or Let Go - Achievement System

## What Was Fixed

### 1. **JavaScript Functions Embedded**
- All achievement save/load functions are now embedded in the `.twee` file
- No longer need external `achievments.js` file
- Functions will be available immediately when game loads

### 2. **Data Type Safety**
- All datamap/array accesses now have type checks
- Prevents "accessing data from number 0" errors
- Proper initialization order

### 3. **Debug Logging Added**
- Console logs show data flow at each step
- Can see exactly what data is being saved and loaded

## How to Test

### Step 1: Import and Compile
1. Open Twine
2. Import the updated `pull-letgo.twee` file
3. **IMPORTANT**: You do NOT need to add `achievments.js` anymore - it's embedded
4. Compile to HTML

### Step 2: Open in Browser with Console
1. Open the compiled HTML in your browser
2. Press **F12** to open Developer Tools
3. Click on the **Console** tab
4. Keep this open while playing

### Step 3: Play Through to an Ending
1. Start a new game
2. Choose a character and name them
3. **For Ending1 (Best ending)**: Choose "help" at ALL three major choices:
   - Event 1 (Library): Choose to step in and confront
   - Event 2 (Locker): Choose to stop them
   - Event 3 (Alley): Choose to help them
4. Also choose "help" options in smaller choices throughout

### Step 4: Check Console Logs

You should see these logs:

#### When reaching Ending1:
```
=== Ending1 Debug ===
allHelpChoices: true
allIgnoreChoices: false
endingsReached after set: Map { "Ending1" => true }
achievementsUnlocked after set: Map { "best" => true }
```

#### When saving:
```
=== Before Save ===
endingsReached: Map { "Ending1" => true }
achievementsUnlocked: Map { "best" => true }
playthroughLogs: [ Map { ... } ]
Saving - Input: { endings: Map, achievements: Map, logs: Array }
Saved achievements: { endingsReached: { Ending1: true }, ... }
Save complete
```

#### On Achievements Page:
```
=== Achievements Page Debug ===
endingsReached: Map { "Ending1" => true }
achievementsUnlocked: Map { "best" => true }
playthroughLogs: [ Map { ... } ]
playthroughLogs length: 1
```

### Step 5: Verify Display

On the Achievements page, you should see:

#### ✅ Playthrough Log Table
- Character name (your chosen name)
- Portrait image
- Final Bond Score (should be high, like 89)
- Severity Score (should be 0)
- Ending Reached: "Ending1: Dreams Achieved"

#### ✅ Ending Collection
- First star (★) should be **pink/red** (#F09EA7)
- Other 6 stars should be grey (☆)

#### ✅ Special Achievements
- Should show: 🌹 | **Best of the Best** | You supported your friend at every single opportunity.
- Second row should still show: ❓ | **???** | ????????????...

## Troubleshooting

### If you see "No playthroughs logged yet"

**Check Console For:**
1. `playthroughLogs length: 0` → Data isn't being saved
2. Look for errors in red in console
3. Check if you see "Save complete" message

**Possible Causes:**
- Page was refreshed (in-memory storage is cleared on refresh)
- Clicked "Play Again?" which reloads the page
- Browser cache issue

### If stars don't light up

**Check Console For:**
1. `endingsReached: Map {}` → Empty, no endings saved
2. `endingsReached: Map { "Ending1" => true }` → Has data but not displaying

**If has data but not displaying:**
- Look for Harlowe errors in console
- Check if datamap contains function is working

### If achievements don't unlock

**Check Console For:**
1. `allHelpChoices: false` → You didn't choose all help options
2. `achievementsUnlocked: Map {}` → Not being set
3. `achievementsUnlocked: Map { "best" => true }` → Set correctly

## Expected Results Summary

| Test | Expected Result |
|------|----------------|
| **Console logs** | All debug messages appear as shown above |
| **Playthrough log** | Shows 1 entry with your character data |
| **Ending stars** | Star 1 is colored (pink), others grey |
| **Best achievement** | Shows flower emoji and full text |
| **Worst achievement** | Still shows ??? (locked) |

## Notes

- Data persists ONLY within the same browser session
- Refreshing the page will clear all data (this is by design - in-memory storage)
- To test multiple playthroughs, click "Play Again?" link (don't refresh browser)
- The "Play Again?" link should preserve previous playthrough data

## Multiple Playthrough Testing

To test data persistence across multiple plays:

1. Complete first playthrough → See Achievements page
2. Click "Play Again?" (don't close browser)
3. Complete second playthrough with DIFFERENT choices
4. On Achievements page, you should see:
   - **2 entries** in Playthrough Log
   - **2 stars** lit up (for 2 different endings)
   - Achievements unlock based on your choices

## If Everything Still Fails

Share the console output with me and I can diagnose the exact issue!
