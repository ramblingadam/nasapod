# The Universe Console

A responsive web app with a retro sci-fi themed UI which allows the user to browse a vast library of astronomy photos and videos, along with detailed descriptions of each image to provide context for the wonder. New content available every day. Powered by NASA.

### [**Click here to check it out!**](https://ramblingadam.github.io/nasapod/)

[![Screenshot](https://user-images.githubusercontent.com/96756923/170849935-854eba7d-999e-4bb6-bef6-313eca79229b.jpg)](https://ramblingadam.github.io/nasapod/)

# How It's Made:
**Tech used:** HTML, CSS, JavaScript

# Features:
## Fully Responsive
- The layout intelligently shrinks, grows, or rearranges itself depending on the size and orientation of the user's viewport.

## Stylish Theming
- UI is styled after early-era computers inspired largely by the 1979 film _Alien_

## Intelligent, Dynamically Updating Retro Interface
- Select month, day, and year to view that date's NASA Astronomy Photo (or Video!) of the day.
- Leap years are accounted for! Go to a leap year, such as 2000, and note you can choose February 29th. Change the year, and the date shifts down to the 28th.
- Get into an astronomical mood as you enjoy ambient spacey music and sci-fi clicking sound effects and animations with each button press!

# Lessons Learned:
- Be very wary of using absolute-sizing units in a flexible layout.
- During this project I mastered a CSS technique for implementing flexible iframe-embedded media.
- On my first run-through, I wrote the CSS desktop-first, then went to use media queries to adjust it for mobile. This was a mistake. After spending some time failing to properly untangle my desktop layout to adapt it for mobiles, I scrapped ALL of the CSS and started fresh, coding it mobile first. Expanding the layout with mobile as the base was much less messy than the other way around!
