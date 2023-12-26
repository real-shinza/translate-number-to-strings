class Chinese extends Language {
  toString(is_daxie = false, is_simplified = false) {
    const DIGITS = this.#getDigits(is_daxie, is_simplified);
    const POWERS = this.#getPowers(is_daxie);
    const UNITS = this.#getUnits(is_simplified);

    if (this.num == 0) {
      return DIGITS[0];
    }

    let str = [];
    let digit_num = this.getDigitNum();
    let exists_zero = -1;
    let first_zero = digit_num % 4 == 3 ? -1 : digit_num % 4 + 1;

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
        if (first_zero == -1) {
          first_zero = power;
        }
      }
      if (digit == 2 && ((power == 0 && i == digit_num) || power == 3) && !is_daxie) {
        if (!is_simplified) {
          digit_str = '兩';
        } else {
          digit_str = '两';
        }
      }
      if (exists_zero > 0 && digit != 0){
        digit_str = DIGITS[0] + digit_str;
      }
      if ((exists_zero == 0 || exists_zero == 1) && (first_zero == 0 || first_zero == 1) && digit == 0 && power == 0) {
        str.pop();
      }
      if ((digit == 0 && power == 0) || (digit == 1 && power == 1 && i == digit_num)) {
        digit_str = '';
      }
      if (exists_zero == 3 && unit != 0) {
        unit_str = '';
      }
      if (digit != 0 || power == 0) {
        exists_zero = -1;
      }
      if (power == 0) {
        first_zero = -1;
      }

      str.push(digit_str, power_str, unit_str);
      str = str.filter(e => e != '');
    }

    return str.join('');
  }

  #getDigits(is_daxie, is_simplified) {
    if (!is_daxie && !is_simplified) {
      return ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    } else if (is_daxie && !is_simplified) {
      return ['零', '壹', '貳', '叁', '肆', '伍', '陸', '柒', '捌', '玖'];
    } else if (!is_daxie && is_simplified) {
      return ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    } else {
      return ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    }
  }

  #getPowers(is_daxie) {
    if (!is_daxie) {
      return ['', '十', '百', '千'];
    } else {
      return ['', '拾', '佰', '仟'];
    }
  }

  #getUnits(is_simplified) {
    if (!is_simplified) {
      return ['', '萬', '億', '兆'];
    } else {
      return ['', '万', '亿', '兆'];
    }
  }
}
