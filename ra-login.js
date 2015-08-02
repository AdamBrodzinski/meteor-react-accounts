/*global React, ReactAccounts:true */
/* jshint maxlen: false */

ReactAccounts = {};
var noop = function() {};

ReactAccounts.LoginForm = React.createClass({
  getDefaultProps: function() {
    return {
      debug: true,
      type: "email-password",
      noValidate: true,
      formClassName: "ReactAccounts__form",
      onLoginError: noop,
    };
  },

  getInitialState: function() {
    return {
      loginErrMsg: ""
    };
  },

  dbug: function() {
    if (this.props.debug) {
      console.debug.apply(console, arguments);
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();
    if (this.props.type === "email-password") {
      var email = this.refs.email.getDOMNode().value;
      var pass = this.refs.password.getDOMNode().value;
      this.loginWithPassword(email, pass);
      this.dbug("Form submit", email, pass, e);
    }
  },

  loginWithPassword: function(email, pass) {
    var self = this;
    Meteor.loginWithPassword(email, pass, function(err) {
      if (err) {
        self.setState({loginErrMsg: err.reason});
        self.props.onLoginError(err);
        self.dbug("ERROR", err.reason);
      } else {
        console.log("Success", Meteor.user());
      }
    });
  },

  render: function() {
    var formProps = {
      className: this.props.formClassName,
      noValidate: this.props.noValidate,
      onSubmit: this.handleSubmit
    };

    return (
      React.createElement("form",  formProps,
        React.createElement("input", {ref: "email", type: "email"}),
        React.createElement("input", {ref: "password", type: "password"}),
        React.createElement("input", {ref: "submit", type: "submit"}),
        React.createElement("div", {ref: "errMsg"}, this.state.loginErrMsg)
      )
    );
  }
});
