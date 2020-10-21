
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../store/actions/UserActions';
import Error from '../components/Layout/Error';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email address')
    .required('Must enter a email'),
  password: Yup.string().required('Must enter a password'),
});

const Login = ({ login, history, loggedInUser }) => {
  if (loggedInUser !== null) {
    history.push('/');
  }
  return (
    <div className='form-container'>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          login(values);
          history.push('/');
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='text'
                name='email'
                id='email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={touched.email && errors.email ? 'has-error' : null}
              />
              <Error touched={touched.email} message={errors.email} />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                id='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={
                  touched.password && errors.password ? 'has-error' : null
                }
              />
              <Error touched={touched.password} message={errors.password} />
            </div>
            <div className='form-group'>
              <button
                type='submit'
                className='btn btn-primary btn-block'
                disabled={isSubmitting}
              >
                Login
              </button>
            </div>
          </form>
        )}
      </Formik>
      <h3>
        You dont have an account? Please{' '}
        <Link to='/signup'>
          <span className='text-primary'>Sign Up</span>
        </Link>
      </h3>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loggedInUser: state.user.loggedInUser,
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
