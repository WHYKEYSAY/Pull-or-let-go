# Remaining Fixes for Pull or Let Go

## Status: Almost Done!

### ✅ Completed:
1. **StoryInit** - Global variables initialized properly
2. **Start** - Per-playthrough variables reset
3. **All Help/Ignore passages** - Now count $helpCount and $ignoreCount
4. **Ending1** - Rewritten with new simple approach

### ⚠️ Still Need to Update:

## Ending2-7: Apply Same Pattern as Ending1

For **each** ending (Ending2 through Ending7), replace the current complex logic with this simple pattern:

```twee
:: EndingX
(set: $currentEnding to "EndingX: [Title]")

<!-- Mark this ending as reached -->
(set: $endingsReached's "EndingX" to 1)

<!-- Check achievements -->
(if: $helpCount is 10)[(set: $achievementsUnlocked's "best" to 1)]
(if: $ignoreCount is 10)[(set: $achievementsUnlocked's "worst" to 1)]

<!-- Calculate severity -->
(set: _displaySeverity to 0)
(if: $event1Choice is "ignore")[(set: _displaySeverity to it + 1)]
(if: $event1Choice is "bully")[(set: _displaySeverity to it + 2)]
(if: $event2Choice is "ignore")[(set: _displaySeverity to it + 1)]
(if: $event2Choice is "bully")[(set: _displaySeverity to it + 2)]
(if: $event3Choice is "ignore")[(set: _displaySeverity to it + 1)]
(if: $event3Choice is "bully")[(set: _displaySeverity to it + 2)]

<!-- Create and add log entry -->
(set: _logEntry to (dm:
  "name", $friendName,
  "imgBase", $friendImgBase,
  "imgExt", $friendImgExt,
  "friendship", $friendship,
  "severity", _displaySeverity,
  "ending", $currentEnding
))
(set: $playthroughLogs to it + (a: _logEntry))
(if: $playthroughLogs's length > 7)[
  (set: $playthroughLogs to (subarray: $playthroughLogs, 1, 7))
]

<h2>EndingX: [Title]</h2>
[Image and story text here]
<br>
[[See Your Summary->Achievements]]
```

### Changes to Make:
1. Remove all `<script>` tags and JavaScript calls
2. Change `(datamap:)` to `(dm:)`
3. Change `(datatype:` checks to simple logic
4. Use `to 1` instead of `to true` for endings/achievements
5. Remove complex conditional checks
6. Use simpler array append: `(set: $playthroughLogs to it + (a: _logEntry))`

---

## Achievements Page: Rewrite

Replace the entire `:: Achievements` passage with this:

```twee
:: Achievements
<h2>Playthrough Log</h2>
<div style="max-height: 280px; overflow-y: auto; border: 1px solid #444;">
<table class="summary-table">
  <thead>
  <tr>
    <th>Character</th>
    <th>Portrait</th>
    <th>Final Bond Score</th>
    <th>Severity Score</th>
    <th>Ending Reached</th>
  </tr>
  </thead>
  <tbody>
  (if: $playthroughLogs's length > 0)[
    (for: each _log, ...$playthroughLogs)[
      (print: '<tr>')
      (print: '<td>' + _log's name + '</td>')
      (print: '<td><img src=\"' + _log's imgBase + '_safe' + _log's imgExt + '\"></td>')
      (print: '<td>' + (text: _log's friendship) + '</td>')
      (print: '<td>' + (text: _log's severity) + '</td>')
      (print: '<td>' + _log's ending + '</td>')
      (print: '</tr>')
    ]
  ](else:)[
    (print: '<tr><td colspan="5">No playthroughs logged yet.</td></tr>')
  ]
  </tbody>
</table>
</div>

<div class="achievements">
  <h3>Ending Collection</h3>
  <div class="star-container">
    (if: $endingsReached's "Ending1" is 1)[(print: '<span class="star-c1">★</span>')]
    (else:)[(print: '<span class="star-grey">☆</span>')]
    
    (if: $endingsReached's "Ending2" is 1)[(print: '<span class="star-c2">★</span>')]
    (else:)[(print: '<span class="star-grey">☆</span>')]
    
    (if: $endingsReached's "Ending3" is 1)[(print: '<span class="star-c3">★</span>')]
    (else:)[(print: '<span class="star-grey">☆</span>')]
    
    (if: $endingsReached's "Ending4" is 1)[(print: '<span class="star-c4">★</span>')]
    (else:)[(print: '<span class="star-grey">☆</span>')]
    
    (if: $endingsReached's "Ending5" is 1)[(print: '<span class="star-c5">★</span>')]
    (else:)[(print: '<span class="star-grey">☆</span>')]
    
    (if: $endingsReached's "Ending6" is 1)[(print: '<span class="star-c6">★</span>')]
    (else:)[(print: '<span class="star-grey">☆</span>')]
    
    (if: $endingsReached's "Ending7" is 1)[(print: '<span class="star-c7">★</span>')]
    (else:)[(print: '<span class="star-grey">☆</span>')]
  </div>

  <h3>Special Achievements</h3>
  <table style="width: 100%; border-collapse: collapse; margin-top: 1em;">
    <tr>
      (if: $achievementsUnlocked's "best" is 1)[
        <td style="width: 60px; text-align: center; font-size: 2em;">🌹</td>
        <td style="padding: 10px;"><b>Best of the Best</b></td>
        <td style="padding: 10px;"><small>You supported your friend at every single opportunity.</small></td>
      ](else:)[
        <td style="width: 60px; text-align: center; font-size: 2em; color: #888;">❓</td>
        <td style="padding: 10px; color: #888;"><b>???</b></td>
        <td style="padding: 10px; color: #888;"><small>????????????????????????????????????????????</small></td>
      ]
    </tr>
    <tr>
      (if: $achievementsUnlocked's "worst" is 1)[
        <td style="width: 60px; text-align: center; font-size: 2em;">💀</td>
        <td style="padding: 10px;"><b>Worst of the Worst</b></td>
        <td style="padding: 10px;"><small>You abandoned your friend at every single opportunity.</small></td>
      ](else:)[
        <td style="width: 60px; text-align: center; font-size: 2em; color: #888;">❓</td>
        <td style="padding: 10px; color: #888;"><b>???</b></td>
        <td style="padding: 10px; color: #888;"><small>????????????????????????????????????????????</small></td>
      ]
    </tr>
  </table>
</div>

<br><br>
[[Play Again?->Start]]
```

---

## Testing After Updates:

1. Import into Twine
2. Compile to HTML
3. Play through choosing all "help" options (you need 10 help choices total)
4. Should reach Ending1
5. Achievements page should show:
   - Your playthrough log entry
   - First star lit up in pink
   - Best of the Best achievement unlocked
6. Click "Play Again?"
7. Play through with different choices
8. Should see TWO log entries and TWO stars lit up

---

## Key Points:

- **No JavaScript needed** - Pure Harlowe variables
- **0 and 1** instead of false/true for easier logic
- **Simpler checks** - Just `is 1` instead of complex datatype checks
- **Global vars persist** across "Play Again" clicks
- **Per-playthrough vars** reset each time

The system is now much simpler and more reliable!
