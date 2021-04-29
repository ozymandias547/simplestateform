export default class MockComponent {
  constructor() {
    this.state = {
      values: {}
    }
  }
  setState(state) {
    this.state = state
  }
}
