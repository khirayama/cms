// import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { SignUpForm as Component } from '../../client/presentations/components/SignUpForm';

// const mapDispatchToProps = (dispatch: Dispatch) => {
const mapDispatchToProps = () => {
  return {
    onSubmit: (event: React.FormEvent<HTMLFormElement>, props: any, state: any) => {
      event.preventDefault();
      // TODO: isLoading=true
      // TODO: async create a user
      // TODO: isLoading=false
      // TODO: move to home page
      console.log(props, state);
    },
  };
};

export const SignUpForm = connect(
  null,
  mapDispatchToProps,
)(Component);
