class Japanese extends Language {
  toString(is_daiji = false, is_hiragana = false) {
    const DIGITS = this.#getDigits(is_daiji, is_hiragana);
    const POWERS = this.#getPowers(is_daiji, is_hiragana);
    const UNITS = this.#getUnits(is_daiji, is_hiragana);

    if (this.num == 0) {
      return DIGITS[0];
    }

    let str = [];
    let digit_num = this.getDigitNum();
    let exists_zero = -1;

    for (var i = digit_num; i >= 0; i--) {
      let digit = this.getDigit(i);
      let power = i % 4;
      let unit = power == 0 ? i / 4 : 0;
      let digit_str = DIGITS[digit];
      let power_str = POWERS[power];
      let unit_str = UNITS[unit];

      if (digit == 0) {
        digit_str = '';
        power_str = '';
        if (exists_zero == -1) {
          exists_zero = power;
        }
      }
      if (digit == 1 && 0 < power && ((power < 4 && i < 4) || (power < 3 && 4 <= i))) {
        digit_str = '';
      }
      if (exists_zero == 3 && unit != 0) {
        unit_str = '';
      }
      if (digit != 0 || power == 0) { 
        exists_zero = -1;
      }

      str.push(digit_str, power_str, unit_str);
      str = str.filter(e => e != '');
    }

    if (is_hiragana) {
      str = this.#fixHiragana(str);
    }

    return str.join('');
  }

  #getDigits(is_daiji, is_hiragana) {
    if (!is_daiji && !is_hiragana) {
      return ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    } else if (is_daiji && !is_hiragana) {
      return ['零', '壱', '弐', '参', '肆', '伍', '陸', '漆', '捌', '玖'];
    } else {
      return ['れい', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう'];
    }
  }

  #getPowers(is_daiji, is_hiragana) {
    if (!is_daiji && !is_hiragana) {
      return ['', '十', '百', '千'];
    } else if (is_daiji && !is_hiragana) {
      return ['', '拾', '陌', '阡'];
    } else {
      return ['', 'じゅう', 'ひゃく', 'せん'];
    }
  }

  #getUnits(is_daiji, is_hiragana) {
    if (!is_daiji && !is_hiragana) {
      return ['', '万', '億', '兆'];
    } else if (is_daiji && !is_hiragana) {
      return ['', '萬', '億', '兆'];
    } else {
      return ['', 'まん', 'おく', 'ちょう'];
    }
  }

  #fixHiragana(str) {
    for (var i = 0; i < str.length - 1; i++) {
      if (str[i] == 'いち') {
        if (str[i + 1] == 'せん' || str[i + 1] == 'ちょう') {
          str[i] = 'いっ';
        }
      } else if (str[i] == 'さん') {
        if (str[i + 1] == 'ひゃく') {
          str[i + 1] = 'びゃく';
        }
      } else if (str[i] == 'ろく') {
        if (str[i + 1] == 'ひゃく') {
          str[i] = 'ろっ';
          str[i + 1] = 'ぴゃく';
        }
      } else if (str[i] == 'はち') {
        if (str[i + 1] == 'ひゃく') {
          str[i] = 'はっ';
          str[i + 1] = 'ぴゃく';
        } else if (str[i + 1] == 'ちょう') {
          str[i] = 'はっ';
        }
      }
    }
    return str;
  }
}
