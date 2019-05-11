export interface State {
  count: number;
  ui: {
    locale: 'en' | 'ja';
  };
}

export function reducer(state: any, action: any): State {
  switch (action.type) {
    case 'INCREMENT': {
      return {
        count: state.count + 1,
        ui: state.ui,
      };
    }
    case 'DECREMENT': {
      return {
        count: state.count - 1,
        ui: state.ui,
      };
    }
    case 'CHANGE_LOCALE': {
      return {
        count: state.count,
        ui: {
          locale: action.payload.locale,
        },
      };
    }
    default:
  }
  return state;
}
