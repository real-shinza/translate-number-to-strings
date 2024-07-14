/**
 * 変換した数字を任意の要素に記載
 * @param {string} id 対象の要素ID
 * @param {number} num 数字
 * @param {string} str 変換後の数字
 */
function setNumber(id, num, str) {
  const element = document.getElementById(id);
  element.value = num;
  element.innerText = !str ? '' : str;
}

/**
 * 入力された数字を各言語に変換する
 */
function translateNumber() {
  const number_text = document.getElementById('number-text');
  const num = Math.floor(Number(number_text.value));

  if (!number_text.value) return;

  setNumber('english', num, new English(num).toString());
  setNumber('japanese', num, new Japanese(num, japaneseType.shoji).toString());
  setNumber('japanese-daiji', num, new Japanese(num, japaneseType.daiji).toString());
  setNumber('japanese-hiragana', num, new Japanese(num, japaneseType.hiragana).toString());
  setNumber('simplified', num, new Chinese(num, chineseType.simplified_xiaoxie).toString());
  setNumber('simplified-daxie', num, new Chinese(num, chineseType.simplified_daxie).toString());
  setNumber('traditional', num, new Chinese(num, chineseType.traditional_xiaoxie).toString());
  setNumber('traditional-daxie', num, new Chinese(num, chineseType.traditional_daxie).toString());
  setNumber('korean', num, new Korean(num, koreanType.hangul).toString());
  setNumber('korean-hanja', num, new Korean(num, koreanType.hanja).toString());

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'translate', number: num });
}
