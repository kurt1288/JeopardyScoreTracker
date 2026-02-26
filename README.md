# JeopardyScoreTracker

A simple score tracker for those who like to play Jeopardy! at home.

## Usage

- **Switch Rounds:** Swipe left or right to move between Jeopardy, Double Jeopardy, and Final Jeopardy.
- **View Stats:** Swipe up to view player stats and an audit log.

## Correcting Mistakes or Judges' Reversals

The "Correction" toggle allows you to add or subtract points without those actions being recorded as new "correct" or "incorrect" answers. When the "Correction" toggle is enabled, the "↻" and "↺" buttons will undo _that_ action.

### Example

If you originally awarded a player 400 points for a correct answer, but the show judges later rule that answer to be incorrect:

1. **Undo the Initial Credit:** Open the scoring modal.
    - Toggle the "Correction" option to enabled.
    - Press the green "↺" button next to the player.
    - This removes the 400 points they initially gained without adding an "incorrect" penalty to their stats.
2. **Log the Incorrect Answer:** Press the "-" button next to the player. This ensures the system tracks that they gave an incorrect response.

Correcting an initial _incorrect_ answer can be done in a similar fashion just with the appropriate red "↺" ("undoing" the incorrect answer) and "+" buttons.

### NOTE

If you don't care about tracking incorrect answers or penalizing players for giving them, you can also "undo" reversals and mistakes simply by using the "-" and "+" buttons.

## Audit Log

You can see an log of every action on the Stats screen.
