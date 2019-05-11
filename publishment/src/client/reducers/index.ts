export interface State {
  count: number;
  ui: {
    locale: 'en' | 'ja';
  };
  config: {
    baseUrl: string;
  };
}

export function initialState(baseUrl: string): State {
  return {
    count: 1,
    ui: {
      locale: 'en',
    },
    config: {
      baseUrl,
    },
  };
}

export function reducer(state: State = initialState(''), action: any): State {
  switch (action.type) {
    case 'INCREMENT': {
      return {
        count: state.count + 1,
        ui: state.ui,
        config: state.config,
      };
    }
    case 'DECREMENT': {
      return {
        count: state.count - 1,
        ui: state.ui,
        config: state.config,
      };
    }
    case 'CHANGE_LOCALE': {
      return {
        count: state.count,
        ui: {
          locale: action.payload.locale,
        },
        config: state.config,
      };
    }
    default:
  }
  return state;
}
