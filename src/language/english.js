class English extends Language {
  toString() {
    const SINGLE_DIGITS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const TEEN_DIGITS = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const TENS_DIGITS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const POWERS = ['', '', 'hundred'];
    const UNITS = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion'];

    if (this.num === 0) {
      return this.#toHeadBigString(SINGLE_DIGITS[0]);
    }

    let str = [];
    let digit_num = this.getDigitNum();
    let exists_zero = -1;

    for (let i = digit_num; i >= 0; i--) {
      let digit = this.getDigit(i);
      let power = i % 3;
      let unit = power === 0 ? i / 3 : 0;
      let digit_str = '';
      let power_str = POWERS[power];
      let unit_str = UNITS[unit];

      if (power === 0) {
        digit = this.getDigit(i, 2);
        if (1 <= digit && digit <= 9) {
          digit_str += SINGLE_DIGITS[digit];
        } else if (10 <= digit && digit <= 19) {
          digit_str += TEEN_DIGITS[digit - 10];
        } else if (20 <= digit && digit <= 99) {
          let tens = Math.floor(digit / 10) % 10;
          let ones = digit % 10;
          if (digit % 10 === 0) {
            digit_str += TENS_DIGITS[tens];
          } else {
            digit_str += `${TENS_DIGITS[tens]}-${SINGLE_DIGITS[ones]}`;
          }
        }
      } else if (power === 1) {
        continue;
      } else if (power === 2) {
        if (digit === 0) {
          power_str = '';
        } else {
          digit_str += SINGLE_DIGITS[digit];
        }
      }

      if (digit === 0 && exists_zero === -1) {
        exists_zero = power;
      }

      if (exists_zero === 2 && unit !== 0) {
        unit_str = '';
      }

      if (digit !== 0 || power === 0) {
        exists_zero = -1;
      }

      str.push(digit_str, power_str, unit_str);
      str = str.filter(e => e != '');
    }

    return this.#toHeadBigString(str.join(' '));
  }

  /**
   * 先頭のアルファベットを大文字に変換
   * @param {string} str 対象の文字列
   * @returns {string} 変換後の文字列
   */
  #toHeadBigString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
