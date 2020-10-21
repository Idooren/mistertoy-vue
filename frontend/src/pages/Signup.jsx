
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signup } from '../store/actions/UserActions';
import Error from '../components/Layout/Error';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Must be grater then two characters')
    .max(255, 'Must be shorter then 255 characters ')
    .required('You must enter username'),
  email: Yup.string()
    .email('Must be a valid email address')
    .required('Must enter a email'),
  password: Yup.string()
    .min(6, 'Must be grater then six characters')
    .required('Must enter a password'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});

const Signup = ({ signup, history, loggedInUser }) => {
  if (loggedInUser !== null) {
    history.push('/');
  }
  return (
    <div className='form-container'>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          signup(values);
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
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                name='username'
                id='username'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                className={
                  touched.username && errors.username ? 'has-error' : null
                }
              />
              <Error touched={touched.email} message={errors.email} />
            </div>
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
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <input
                type='password'
                name='confirmPassword'
                id='confirmPassword'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                className={
                  touched.confirmPassword && errors.confirmPassword
                    ? 'has-error'
                    : null
                }
              />
              <Error
                touched={touched.confirmPassword}
                message={errors.confirmPassword}
              />
            </div>
            <div className='form-group'>
              <button
                type='submit'
                className='btn btn-primary btn-block'
                disabled={isSubmitting}
              >
                Signup
              </button>
            </div>
          </form>
        )}
      </Formik>
      <h3>
        Already have an account? Please{' '}
        <Link to='/login'>
          <span className='text-primary'>Login</span>
        </Link>
      </h3>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loggedInUser: state.user.loggedInUser,
});

const mapDispatchToProps = {
  signup,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
