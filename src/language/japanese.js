const japaneseType = {
  shoji: 'shoji',
  daiji: 'daiji',
  hiragana: 'hiragana',
};

class Japanese extends Language {
  /**
   * @param {number} num 変換する数字
   * @param {string} type 変換種別
   */
  constructor(num, type) {
    super(num);
    this.type = type;
  }

  toString() {
    const DIGITS = this.#getDigits();
    const POWERS = this.#getPowers();
    const UNITS = this.#getUnits();

    if (this.num === 0) {
      return DIGITS[0];
    }

    let str = [];
    let digit_num = this.getDigitNum();
    let exists_zero = -1;

    for (let i = digit_num; i >= 0; i--) {
      let digit = this.getDigit(i);
      let power = i % 4;
      let unit = power === 0 ? i / 4 : 0;
      let digit_str = DIGITS[digit];
      let power_str = POWERS[power];
      let unit_str = UNITS[unit];

      if (digit === 0) {
        digit_str = '';
        power_str = '';
        if (exists_zero === -1) {
          exists_zero = power;
        }
      }
      if (digit === 1 && 0 < power && ((power < 4 && i < 4) || (power < 3 && 4 <= i))) {
        digit_str = '';
      }
      if (exists_zero === 3 && unit !== 0) {
        unit_str = '';
      }
      if (digit !== 0 || power === 0) {
        exists_zero = -1;
      }

      str.push(digit_str, power_str, unit_str);
      str = str.filter(e => e !== '');
    }

    if (this.type === japaneseType.hiragana) {
      str = this.#fixHiragana(str);
    }

    return str.join('');
  }

  #getDigits() {
    switch (this.type) {
      case japaneseType.shoji:
        return ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
      case japaneseType.daiji:
        return ['零', '壱', '弐', '参', '肆', '伍', '陸', '漆', '捌', '玖'];
      case japaneseType.hiragana:
        return ['れい', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう'];
    }
  }

  #getPowers() {
    switch (this.type) {
      case japaneseType.shoji:
        return ['', '十', '百', '千'];
      case japaneseType.daiji:
        return ['', '拾', '陌', '阡'];
      case japaneseType.hiragana:
        return ['', 'じゅう', 'ひゃく', 'せん'];
    }
  }

  #getUnits() {
    switch (this.type) {
      case japaneseType.shoji:
        return ['', '万', '億', '兆'];
      case japaneseType.daiji:
        return ['', '萬', '億', '兆'];
      case japaneseType.hiragana:
        return ['', 'まん', 'おく', 'ちょう'];
    }
  }

  #fixHiragana(str) {
    for (var i = 0; i < str.length - 1; i++) {
      if (str[i] === 'いち') {
        if (str[i + 1] === 'せん' || str[i + 1] === 'ちょう') {
          str[i] = 'いっ';
        }
      } else if (str[i] === 'さん') {
        if (str[i + 1] === 'ひゃく') {
          str[i + 1] = 'びゃく';
        }
      } else if (str[i] === 'ろく') {
        if (str[i + 1] === 'ひゃく') {
          str[i] = 'ろっ';
          str[i + 1] = 'ぴゃく';
        }
      } else if (str[i] === 'はち') {
        if (str[i + 1] === 'ひゃく') {
          str[i] = 'はっ';
          str[i + 1] = 'ぴゃく';
        } else if (str[i + 1] === 'ちょう') {
          str[i] = 'はっ';
        }
      }
    }
    return str;
  }
}
