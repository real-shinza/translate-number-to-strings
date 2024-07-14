const koreanType = {
  hangul: 'hangul',
  hanja: 'hanja',
}

class Korean extends Language {
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
      if (digit === 1 && ((unit === 0 && 0 < power) || (unit > 0 && i === digit_num))) {
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

    return str.join('');
  }

  #getDigits() {
    switch (this.type) {
      case koreanType.hangul:
        return ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
      case koreanType.hanja:
        return ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    }
  }

  #getPowers() {
    switch (this.type) {
      case koreanType.hangul:
        return ['', '십', '백', '천'];
      case koreanType.hanja:
        return ['', '十', '百', '千'];
    }
  }

  #getUnits() {
    switch (this.type) {
      case koreanType.hangul:
        return ['', '만', '억', '조'];
      case koreanType.hanja:
        return ['', '萬', '億', '兆'];
    }
  }
}
