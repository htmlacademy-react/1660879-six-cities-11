import { FormEvent, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { AppRoute, AuthorizationStatus, CitiesList } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useInput } from '../../hooks/useInput';
import { loginAction } from '../../store/api-action';
import { changeCity } from '../../store/app-process/app-process-slice';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';
import { AuthData } from '../../types/auth-data';
import { getRandomEnumValue } from '../../util';


function Login() {
  const email = useInput('', {isEmail: true});
  const password = useInput('', {isPassword: true});

  const city = useMemo(() => getRandomEnumValue(CitiesList), []);

  const authStatus = useAppSelector(getAuthorizationStatus);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();


  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Root);
    }
  }, [authStatus, navigate]);

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };


  const handleSubmit = (evt: FormEvent<HTMLButtonElement>) => {

    evt.preventDefault();

    onSubmit({
      email: email.value,
      password: password.value,
    });
  };


  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action=""
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                {(email.isDirty && email.emailError) && <div style={{color: 'red'}}>{email.emailError}</div>}
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email.value}
                  onChange={(evt) => email.onChange(evt)}
                  onBlur={() => email.onBlur()}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                {(password.isDirty && password.passwordError) && <div style={{color: 'red'}}>{password.passwordError}</div>}
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={password.value}
                  onChange={(evt) => password.onChange(evt)}
                  onBlur={() => password.onBlur()}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                onClick={handleSubmit}
                disabled={!!email.emailError || !!password.passwordError}
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Root}
                onClick={() => dispatch(changeCity({value: city}))}
              >
                <span>{city}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
