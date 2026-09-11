# Blizzcon 2026 Classic Plus Bingo

A web-based bingo card generator for your Blizzcon 2026 predictions!

## Features

- **Interactive Selection**: Checkboxes to select/deselect predictions
- **Remove Button**: Click "Remove" to delete unwanted predictions
- **5x5 Bingo Card**: Randomizes predictions into a bingo grid with a FREE space in the center
- **Re-randomize**: Shuffle predictions at any time
- **Save/Load from URL**: Share your selection and marked predictions via URL
- **Save as JPG**: Download your bingo card as an image
- **Print as PDF**: Print directly or save as PDF
- **Mark Predictions**: Click bingo cells to mark predictions as "come true"
- **Bingo Detection**: Alerts you when you get 5 in a row!

## How to Use

### 1. Select Your Predictions

The app loads default predictions automatically. To customize:

- **Checkboxes**: Click to select/deselect predictions
- **Remove Button**: Click "Remove" next to predictions you don't want
- **Count**: See how many predictions you have selected (need 24+ for a complete card)

### 2. Generate Your Card

Once you have at least 24 predictions selected:
- Click "🎯 Generate Bingo Card" to create your bingo card

### 3. Customize Your Card

- **Re-randomize**: Shuffle predictions into a different arrangement
- **Mark All/Unmark All**: Toggle all predictions marked or unmarked

### 4. Mark Predictions as "Come True"

- **Click any bingo cell** to mark/unmark it
- Marked cells turn red to indicate the prediction has come true
- The FREE space is always marked

### 5. Save and Share

- **Save to URL**: Click to save your selection and marked predictions to the URL
  - Share this link with others to restore your exact setup
  - The URL contains all selected predictions and marked cells
- **Load from URL**: Click to restore a saved URL

### 6. Save or Print

- **Save as JPG**: Download your bingo card as an image
- **Print PDF**: Print directly or save as PDF

## URL Format

When you save your bingo card, the URL looks like:

```
https://yourusername.github.io/bingo/?selected=pred1,pred2,pred3&marked=0,1,2,3,4,5,6,7,8,9,10,11,13,14,15,16,17,18,19,20,21,22,23,24
```

- `selected`: Comma-separated list of your selected predictions
- `marked`: Comma-separated list of marked cell indices (0-24, excluding FREE space at index 12)

## Files

```
bingo/
├── index.html      # Main HTML file
├── styles.css      # Styling
├── script.js       # JavaScript logic
├── predictions.txt # Default predictions
└── README.md       # This file
```

## Hosting on GitHub Pages

### Quick Setup

1. **Push these files** to your GitHub repository:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `predictions.txt`
   - `README.md`

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click "Settings" tab
   - Click "Pages" in the left sidebar
   - Under "Source", select "main" (or "master") and the root folder ("/" or "/root")
   - Click "Save"

3. **Your site will be live at**: `https://yourusername.github.io/bingo/`

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Tips

- Use "Save to URL" before sharing your bingo card
- Mark predictions as they come true during the event
- You can reload the page and use "Load from URL" to restore your state
- The FREE space in the center is always marked automatically

---

**Made for Blizzcon 2026 🎮**
