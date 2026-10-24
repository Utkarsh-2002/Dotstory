// Tiny shared store between the WebGL background (writes) and the cursor
// halo (reads). `dark` runs 0 → 1 as the page scrolls from a light section
// into a dark one, so the halo can change colour to stay visible.
export const themeState = { dark: 0 };
