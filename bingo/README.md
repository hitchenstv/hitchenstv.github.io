# Blizzcon 2026 Classic Plus Bingo

A web-based bingo card generator for your Blizzcon 2026 predictions!

## Features

- **Input Interface**: Enter your predictions with comma-separated mutually exclusive options
- **5x5 Bingo Card**: Randomizes predictions into a bingo grid with a FREE space in the center
- **Re-randomize**: Shuffle predictions at any time
- **Save as JPG**: Download your bingo card as an image
- **Print as PDF**: Print directly or save as PDF

## How to Use

### 1. Input Your Predictions

**Default Predictions**: The app loads default predictions from `predictions.txt` automatically.

To use your own predictions:
- Clear the defaults by clicking "🗑️ Clear Defaults"
- Enter your predictions in the input box:
  - One prediction per line
  - Use **comma** to separate mutually exclusive options (e.g., "Team A wins, Team B wins")
  - Use **semicolon** to separate different categories

Example:
```
Team A wins;Team B wins
Player X gets MVP
Game Y is cancelled
```

### 2. Generate Your Card

Click "Parse Predictions" to generate your bingo card.

### 3. Customize

Click "Re-randomize" to shuffle the predictions into a different arrangement.

### 4. Save or Print

- Click "Save as JPG" to download your card as an image
- Click "Print PDF" to print or save as PDF

## Hosting on GitHub Pages

### Quick Setup

1. Push these files to your GitHub repository:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`

2. Enable GitHub Pages in your repository settings:
   - Go to your repository on GitHub
   - Click "Settings" tab
   - Click "Pages" in the left sidebar
   - Under "Source", select "Deploy from a branch"
   - Choose "main" (or "master") and the root folder ("/" or "/root")
   - Click "Save"

3. Your site will be live at: `https://yourusername.github.io/bingo/`

### Custom Domain (Optional)

To use a custom domain:
1. Add a CNAME file with your domain name
2. Configure DNS records as instructed by your domain registrar
3. In GitHub Pages settings, add your custom domain

## File Structure

```
bingo/
├── index.html      # Main HTML file
├── styles.css      # Styling
├── script.js       # JavaScript logic
└── README.md       # This file
```

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

Free to use and modify for personal and non-commercial use.

---

**Made for Blizzcon 2026 🎮**
