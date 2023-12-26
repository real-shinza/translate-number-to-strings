function translateNumber() {
  const number_text = document.getElementById('number-text');
  const num = Math.floor(Number(number_text.value));

  if (number_text.value == '') {
    return;
  }

  function setNumber(id, str) {
    const element = document.getElementById(id);
    element.value = num;
    element.innerText = str === undefined ? '' : str;
  }

  const english = new English(num);
  const japanese = new Japanese(num);
  const chinese = new Chinese(num);
  const korean = new Korean(num);

  setNumber('english', english.toString());
  setNumber('japanese', japanese.toString());
  setNumber('japanese-daiji', japanese.toString(true));
  setNumber('japanese-hiragana', japanese.toString(true, true));
  setNumber('traditional', chinese.toString());
  setNumber('traditional-daxie', chinese.toString(true));
  setNumber('simplified', chinese.toString(false, true));
  setNumber('simplified-daxie', chinese.toString(true, true));
  setNumber('korean', korean.toString());
  setNumber('korean-hanja', korean.toString(true));

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'convert', number: num });
}
