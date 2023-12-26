function copyNumber(id) {
  const toast = document.getElementById('toast');
  const element = document.getElementById(id);
  const num = element.value;
  const text = element.innerText;

  if (num === undefined) {
    return;
  }

  navigator.clipboard.writeText(text);

  toast.style.visibility = 'visible';
  setTimeout(() => { toast.style.visibility = 'hidden' }, 1500);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'copy', number: num, language: id });
}
