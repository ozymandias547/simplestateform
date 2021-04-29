export default function getMockClickEvent(type, name, value) {
  return {
    currentTarget: {
      type: type,
      getAttribute: () => name,
      value
    },
  }
}
