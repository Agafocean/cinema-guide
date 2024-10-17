import { FormEventHandler, useState } from 'react';
import './LoginForm.css';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../api/queryClient';
import { login } from '../../api/fetchLogin';
import { useDispatch } from 'react-redux';
import { saveActiveModal, saveProfile } from '../../store/reducer';
import { fetchProfile } from '../../api/fetchProfile';
import { register } from '../../api/fetchRegister';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader } from '../Loader';

export const LoginForm = () => {
  const [isReg, setIsReg] = useState(false);
  const [isRegDone, setIsRegDone] = useState(false);
  const [errorAPI, setErrorAPI] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCC, setPasswordCC] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorSurname, setErrorSurname] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPasswordCC, setErrorPasswordCC] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const previousPath = useLocation().state?.previousLocation.pathname;

  const loginMutation = useMutation({
    mutationFn: () => isReg ? register(email, name, surname, password) : login(email, password),
    async onSuccess() {
      if (isReg) setIsRegDone(true)
      else {
        dispatch(saveProfile(await fetchProfile()));
        dispatch(saveActiveModal(false));
        setTimeout(() => navigate(previousPath), 500);
      }
    },
    onError() {
      setErrorAPI(true)
    }
  }, queryClient);

  const validateForm = () => {
    let res = true;
    const testEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    if (!email || !testEmail.test(email)) { setErrorEmail(true); res = false }
    if (isReg && name.length < 4) { setErrorName(true); res = false }
    if (isReg && surname.length < 4) { setErrorSurname(true); res = false }
    if (!password) { setErrorPassword(true); res = false }
    if (isReg && (!passwordCC || password !== passwordCC)) { setErrorPasswordCC(true); res = false }

    return res
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (validateForm()) {
      loginMutation.mutate();
    }
  };

  const modalExit = () => {
    setIsRegDone(false);
    setIsReg(false);
  }

  return (
    <div className="login">
      <img className="login-logo" src="\logo.svg" alt="logo" />
      {isReg && <p className='register-title'>{isRegDone ? "Sign up completed" : "Sign up"}</p>}
      {!isRegDone && <>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-list">
            <input className={`login-item login-email ${errorEmail && "error-email"}`} type="text"
              onChange={(event) => {
                setEmail(event.target.value);
                setErrorEmail(false);
                setErrorAPI(false)
              }}
              value={email} placeholder="Email" />

            {isReg &&
              <input className={`login-item login-name ${errorName && "error-name"}`} type="text"
                onChange={(event) => {
                  setName(event.target.value);
                  setErrorName(false);
                  setErrorAPI(false)
                }}
                value={name} placeholder="Given name" />
            }

            {isReg &&
              <input className={`login-item login-name ${errorSurname && "error-surname"}`} type="text"
                onChange={(event) => {
                  setSurname(event.target.value);
                  setErrorSurname(false);
                  setErrorAPI(false)
                }}
                value={surname} placeholder="Family name" />
            }
            <input className={`login-item login-password ${errorPassword && "error-password"}`} type="password"
              onChange={(event) => {
                setPassword(event.target.value);
                setErrorPassword(false);
                setErrorAPI(false)
              }}
              value={password} placeholder="Password" />
            {isReg &&
              <input className={`login-item login-password ${errorPasswordCC && "error-passwordCC"}`} type="password"
                onChange={(event) => {
                  setPasswordCC(event.target.value);
                  setErrorPasswordCC(false);
                  setErrorAPI(false)
                }}
                value={passwordCC} placeholder="Confirm password" />
            }
          </div>

          {loginMutation.isPending && <Loader />}
          {errorAPI && <span className='errorAPI'>Wrong data</span>}
          {errorName && <span className='errorAPI'>Given name must have at least 4 characters</span>}
          {errorSurname && <span className='errorAPI'>Family name must have at least 4 characters</span>}

          <button className="login-enter" type="submit">
            {isReg ? "Create an account" : "Sign in"}
          </button>
        </form>

        <button className="login-register" onClick={() => {
          setErrorAPI(false); setErrorName(false); setErrorSurname(false); setIsReg(!isReg)
        }}
          disabled={loginMutation.isPending}>
          {isReg ? "I have an account" : "Sign up"}
        </button>
      </>}

      {isRegDone && <>
        <p className='register-done'>Use your email to sign in</p>
        <button className="login-enter" onClick={() => modalExit()}>Sign in</button>
      </>}

      <button className="login-close" onClick={() => {
        dispatch(saveActiveModal(false));
        setTimeout(() => navigate(previousPath), 500);
      }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="24" fill="white" />
          <path d="M22.5859 24L14.793 16.2071L16.2072 14.7928L24.0001 22.5857L31.793 14.7928L33.2072 16.2071L25.4143 24L33.2072 31.7928L31.793 33.2071L24.0001 25.4142L16.2072 33.2071L14.793 31.7928L22.5859 24Z" fill="black" />
        </svg>
      </button>

    </div>
  );
};
