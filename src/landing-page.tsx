import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AppState, ReqresAccess, ReqresCredentials } from './app-state';
import { login, register } from './reqres';
import Form from './form/Form';
import PasswordInput from './form/PasswordInput';
import TextInput from './form/TextInput';

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

const initialState: State = {};
type State = Readonly<{ [key: string]: string }>;

class LandingPage extends React.Component<Props, State> {
  readonly state: State = initialState;

  constructor(props: Props) {
    super(props);
  }

  handleInputChange = (e: any) => {
    console.log(this.state);
    const { name, type, checked, value } = e.target;
    this.setState({ [name]: type === 'checkbox' ? checked : value });
  };

  login = () => {
    const { email, password } = this.state;
    this.props.login(email, password);
  };

  render() {
    return (
      <div className="Landing-Page">
        <section className="Landing-Page-Banner">
          <div className="Landing-Page-Banner-Headline">
            <h3>what</h3>
            <h2>makes.life</h2>
            <h3>for you?</h3>
          </div>
          <p className="Landing-Page-Banner-Tagline">brought to you by mmdb.</p>
          <div className="Landing-Page-Banner-Actions">
            <Form legend="login" onSubmit={this.login}>
              <TextInput label="email" name="email" onChange={this.handleInputChange} />
              <PasswordInput name="password" onChange={this.handleInputChange} />
            </Form>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ reqres: { user, token, error } }: AppState): StateProps => {
  return { user, token, error };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    login: (email: string, password: string) => {
      console.log(`dispatching login action: ${email} / ${password}`);
      const creds = { email, password };
      console.log(creds);
      return dispatch<any>(login.action(creds));
    },
    register: (email: string, password: string) =>
      dispatch<any>(register.action({ email, password }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
