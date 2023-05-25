export const Login = () => {
  return (
    <div>
      <img src="logo_white.png" alt="logo" className="logo" />
      <p className="heading">DeTrust</p>
      <p className="subheading">Make smarter decisions</p>
      <div className="inputContainer">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
      </div>
      <button className="unlockButton">Unlock</button>
      <a className="forgotPassword">Forgot password?</a>
      <p className="needHelp">
        Need help? Contact <a href="#">DeTrust support</a>
      </p>
    </div>
  );
};
