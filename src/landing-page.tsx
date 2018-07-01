import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AppState, ReqresAccess, ReqresCredentials } from './app-state';
import { login, register } from './reqres';

interface OwnProps {}

interface StateProps {
  user?: ReqresCredentials;
  token?: string;
  error?: Error;
}

interface DispatchProps {
  login: (username: string, password: string) => Promise<ReqresAccess>;
  register: (username: string, password: string) => Promise<ReqresAccess>;
}

type Props = OwnProps & StateProps & DispatchProps;

const initialState = { counter: 0 };
type State = Readonly<typeof initialState>;

class LandingPage extends React.Component<Props, State> {
  readonly state: State = initialState;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>got heem!</h3>
        <p>TODO: implement login/register</p>
      </div>
    );
  }
}

const mapStateToProps = ({ reqres: { user, token, error } }: AppState): StateProps => {
  return { user, token, error };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    login: (email: string, password: string) => dispatch<any>(login.action({ email, password })),
    register: (email: string, password: string) =>
      dispatch<any>(register.action({ email, password }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
