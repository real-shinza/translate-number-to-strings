class Korean extends Language {
  toString(is_hanja = false) {
    const DIGITS = this.#getDigits(is_hanja);
    const POWERS = this.#getPowers(is_hanja);
    const UNITS = this.#getUnits(is_hanja);

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
      if (digit == 1 && ((unit == 0 && 0 < power) || (unit > 0 && i == digit_num))) {
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

    return str.join('');
  }

  #getDigits(is_hanja) {
    if (!is_hanja) {
      return ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
    } else {
      return ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    }
  }

  #getPowers(is_hanja) {
    if (!is_hanja) {
      return ['', '십', '백', '천'];
    } else {
      return ['', '十', '百', '千'];
    }
  }

  #getUnits(is_hanja) {
    if (!is_hanja) {
      return ['', '만', '억', '조'];
    } else {
      return ['', '萬', '億', '兆'];
    }
  }
}
