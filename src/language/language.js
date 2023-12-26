class Language {
  constructor(num) {
    this.num = num;
  }

  getDigit(n, m = 1) {
    return Math.floor(this.num % Math.pow(10, n + m) / Math.pow(10, n));
  }

  getDigitNum() {
    return this.num == 0 ? 1 : Math.floor(Math.log10(this.num));
  }
}
