//===============
// Color Scheme
//===============
const colorSchemeConfig = localStorage.getItem('color-scheme') || 'auto';
let colorScheme = 'light';
if (colorSchemeConfig === 'auto') {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    colorScheme = 'dark';
  } else {
    colorScheme = 'light';
  }
} else {
  colorScheme = colorSchemeConfig;
}

document.body.classList.add(`body--${colorScheme}`);
