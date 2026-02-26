# SS LOCAL

## Current State
New project with no existing frontend or backend code. The user has uploaded the SS LOCAL logo (globe with flame icon and green "LOCAL" text on black background).

## Requested Changes (Diff)

### Add
- App header with SS LOCAL logo (uploaded image) and app name
- Four horizontally scrollable sections with icons/links:
  1. **OTT APPS**: ETV WIN, SUN NXT, HOT STAR, ZEE 5, AHA, SONY LIV, AMAZON PRIME, NET FLIX - each links to their Google Play Store page
  2. **TV CHANNELS**: ETV, GEMINI, STAR MAA, ZEE TELUGU, SPORTS - each links to their Google Play Store page
  3. **NEWS CHANNELS**: TV9, V6, T NEWS, N TV - each links to YouTube live streams
  4. **Youtube**: SS LOCAL, DJ SONGS, Folk songs - each links to YouTube channels/playlists

### Modify
- Nothing (new project)

### Remove
- Nothing (new project)

## Implementation Plan
1. Create a single-page React app (no backend needed)
2. Display the SS LOCAL logo at top with app branding
3. Build reusable ScrollableRow component that shows a heading and horizontally scrollable icon cards
4. Each icon card shows a colored icon/emoji placeholder + label, opens link in new tab on click
5. Four rows: OTT APPS, TV CHANNELS, NEWS CHANNELS, Youtube
6. Dark theme matching the logo (black/dark background, green accents)

## UX Notes
- Dark background (black or very dark) to match logo aesthetic
- Green accent color (#00ff00 or similar) to match the "LOCAL" text in logo
- Cards should be touch-friendly (large tap targets) for mobile use
- Icons should be visually distinct colored tiles with the app name label below
- Horizontal scroll with no visible scrollbar for clean look
- Logo image: /assets/uploads/IMG_20230812_092139-1.png
