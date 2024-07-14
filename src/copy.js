/**
 * 指定された文字列をクリップボードの書き込む
 * @param {string} id ElementId
 */
function copyNumber(id) {
  const toast = document.getElementById('toast');
  const element = document.getElementById(id);
  const num = element.value;
  const text = element.innerText;

  if (!num) return;

  navigator.clipboard.writeText(text);

  toast.style.visibility = 'visible';
  setTimeout(() => { toast.style.visibility = 'hidden' }, 1500);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'copy', number: num, language: id });
}
