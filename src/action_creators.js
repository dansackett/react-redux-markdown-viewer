export function updateState(state) {
  return {
    type: 'UPDATE_STATE',
    state: state
  };
}

export function convert(input, caret) {
  return {
    meta: {remote: true},
    type: 'CONVERT',
    input,
    caret
  };
}
