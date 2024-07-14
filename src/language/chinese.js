const chineseType = {
  simplified_xiaoxie: 'simplified_xiaoxie',
  simplified_daxie: 'simplified_daxie',
  traditional_xiaoxie: 'traditional_xiaoxie',
  traditional_daxie: 'traditional_daxie',
};

class Chinese extends Language {
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
    let first_zero = digit_num % 4 === 3 ? -1 : digit_num % 4 + 1;

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
        if (first_zero === -1) {
          first_zero = power;
        }
      }
      if (digit === 2 && ((power === 0 && i === digit_num) || power === 3)) {
        if (this.type === chineseType.simplified_xiaoxie) {
          digit_str =  '两';
        } else if (this.type === chineseType.traditional_xiaoxie) {
          digit_str = '兩';
        }
      }
      if (exists_zero > 0 && digit !== 0) {
        digit_str = DIGITS[0] + digit_str;
      }
      if ((exists_zero === 0 || exists_zero === 1) && (first_zero === 0 || first_zero === 1) && digit === 0 && power === 0) {
        str.pop();
      }
      if ((digit === 0 && power === 0) || (digit === 1 && power === 1 && i === digit_num)) {
        digit_str = '';
      }
      if (exists_zero === 3 && unit !== 0) {
        unit_str = '';
      }
      if (digit !== 0 || power === 0) {
        exists_zero = -1;
      }
      if (power === 0) {
        first_zero = -1;
      }

      str.push(digit_str, power_str, unit_str);
      str = str.filter(e => e !== '');
    }

    return str.join('');
  }

  #getDigits() {
    switch (this.type) {
      case chineseType.simplified_xiaoxie:
        return ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
      case chineseType.simplified_daxie:
        return ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
      case chineseType.traditional_xiaoxie:
        return ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
      case chineseType.traditional_daxie:
        return ['零', '壹', '貳', '叁', '肆', '伍', '陸', '柒', '捌', '玖'];
    }
  }

  #getPowers() {
    switch (this.type) {
      case chineseType.simplified_xiaoxie:
      case chineseType.traditional_xiaoxie:
        return ['', '十', '百', '千'];
      case chineseType.simplified_daxie:
      case chineseType.traditional_daxie:
        return ['', '拾', '佰', '仟'];
    }
  }

  #getUnits() {
    switch (this.type) {
      case chineseType.simplified_xiaoxie:
      case chineseType.simplified_daxie:
        return ['', '万', '亿', '兆'];
      case chineseType.traditional_xiaoxie:
      case chineseType.traditional_daxie:
        return ['', '萬', '億', '兆'];
    }
  }
}
