class DiscountResponseMock {
  constructor(percentage) {
    this.percentage = percentage;
  }

  getPercentage() {
    return this.percentage;
  }
}

module.exports = DiscountResponseMock;
