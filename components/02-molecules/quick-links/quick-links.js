const quickLinks = document.querySelector('.quick-links');
const callouts = document.querySelector('.callouts');

// if callouts is above or below quickLinks then remove the spaces in between

if (quickLinks.getBoundingClientRect().bottom < callouts.getBoundingClientRect().top) {
  quickLinks.style.marginTop = '0';
  quickLinks.style.marginBottom = '0';
  callouts.style.marginTop = '0';
  callouts.style.marginBottom = '0';
} else if (quickLinks.getBoundingClientRect().top > callouts.getBoundingClientRect().bottom) {
  quickLinks.style.marginTop = '0';
  quickLinks.style.marginBottom = '0';
  callouts.style.marginTop = '0';
  callouts.style.marginBottom = '0';
}