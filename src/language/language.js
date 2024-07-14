class Language {
  /**
   * @param {number} num 変換する数字
   */
  constructor(num) {
    this.num = num;
  }

  /**
   * 指定された桁数の数字を取得
   * @param {number} n 取得する桁数
   * @param {number} m 加算する桁数
   * @returns {number} 
   */
  getDigit(n, m = 1) {
    return Math.floor(this.num % Math.pow(10, n + m) / Math.pow(10, n));
  }

  /**
   * 入力値を数を返す
   * @returns {number} 行数
   */
  getDigitNum() {
    return this.num === 0 ? 1 : Math.floor(Math.log10(this.num));
  }
}
