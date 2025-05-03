import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCredentials, setErrors, setSubmitData } from '../redux/authSlice';
import { validateEmail, validatePassword } from '../components/constants';
import loginimage from "../assets/loginimage.png"
import Footer from '../components/footer';

function LoginForm() {
  const { credentials, errors, submitData } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false)
  const [passwordStatus, setPasswordStatus] = useState({
    length: false,
    upper: false,
    number: false,
    special: false,
  });


  const handleLoginFieldChanges = (name, value) => {
    dispatch(setCredentials({ [name]: value }))
    dispatch(setErrors({ [name]: "" }))
  }

  const handlePasswordVisible = () => {
    setVisible(!visible)
  }

  const setFocusAndError = (fieldId, message) => {
    document.getElementById(fieldId)?.focus();
    dispatch(setErrors({ [fieldId]: message }));
  };

  const validateFields = () => {
    if (!credentials?.email?.trim() || !validateEmail(credentials?.email)) {
      setFocusAndError("email", "Please enter email correctly");
      return false;
    }
    if (!validatePassword(credentials?.password)) {
      setFocusAndError("password", "Please enter password correctly");
      return false;
    }
    return true;
  };

  const handleLoginSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (validateFields()) {
        dispatch(setSubmitData(credentials));
        navigate("/home");
      }
    },
    [credentials,dispatch]
  );

  useEffect(() => {
    if (submitData?.isLoggedIn) {
      localStorage.setItem("userCredentials", JSON.stringify(submitData))
    }
  }, [submitData?.isLoggedIn])

  useEffect(() => {
    const password = credentials.password || "";
    setPasswordStatus({
      length: /.{8,}/.test(password),
      upper: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password),
    });
  }, [credentials.password]);

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row w-100" style={{ maxWidth: '900px' }}>

        <div className="col-md-6 justify-content-center">
          <h3 className="mb-3">Sign In</h3>
          <p>New user? <button  className="link-style-button">Create an account</button></p>

          <form onSubmit={handleLoginSubmit}>
            <div className="mb-3">
              <input
                type="text"
                id="email"
                className="form-control"
                placeholder="Username or email"
                value={credentials.email}
                onChange={(e) => handleLoginFieldChanges("email", e.target.value)}
                required
              />
              {errors?.email && <div style={{ textAlign: "left" }} className="text-danger small">{errors.email}</div>}
            </div>

            <div className="mb-3 position-relative">
              <input
                type={visible ? "text" : "password"}
                id="password"
                className={`form-control`}
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => handleLoginFieldChanges("password", e.target.value)}
                style={{ paddingRight: "60px" }}
              />
              <span
                onClick={handlePasswordVisible}
                className="position-absolute"
                style={{
                  right: "15px",
                  top: "10%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#0d6efd",
                  fontWeight: "500",
                  fontSize: "0.875rem"
                }}
              >
                {visible ? "Hide" : "Show"}
              </span>

              <div className="form-text mt-2">
                <p className={`mb-1 ${passwordStatus.length ? "text-success fw-bold" : "text-danger"}`}>
                  {passwordStatus.length ? "✓" : "✗"} 8 characters minimum
                </p>
                <p className={`mb-1 ${passwordStatus.upper ? "text-success fw-bold" : "text-danger"}`}>
                  {passwordStatus.upper ? "✓" : "✗"} One uppercase letter
                </p>
                <p className={`mb-1 ${passwordStatus.number ? "text-success fw-bold" : "text-danger"}`}>
                  {passwordStatus.number ? "✓" : "✗"} One number
                </p>
                <p className={`mb-0 ${passwordStatus.special ? "text-success fw-bold" : "text-danger"}`}>
                  {passwordStatus.special ? "✓" : "✗"} One special character (!@#$%^&*)
                </p>

              </div>
            </div>

            <div className="mb-3 d-flex align-items-center gap-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="isLoggedIn"
                checked={credentials.isLoggedIn}
                onChange={(e) => handleLoginFieldChanges("isLoggedIn", e.target.checked)}
              />
              <label className="form-check-label" htmlFor="isLoggedIn">Keep me signed in</label>
            </div>

            <button type="submit" className="btn btn-dark w-100 mb-3">Sign In</button>
          </form>

          <div className="d-flex align-items-center my-4">
            <hr className="flex-grow-1 border-dark" />
            <span className="mx-3 text-muted">Or Sign In With</span>
            <hr className="flex-grow-1 border-dark" />
          </div>
          <div className="d-flex justify-content-center gap-3">
            <Footer message={false} />
          </div>
        </div>

        <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center">
          <img src={loginimage} alt="login" style={{ width: '60%' }} />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
