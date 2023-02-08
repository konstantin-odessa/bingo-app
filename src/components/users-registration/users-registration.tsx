import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { NameInputField, User, UsersList } from './users-registration.style';
import { FieldProps } from 'formik/dist/Field';
import { TUser } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { setUsers as setUsersAction } from '../../redux/users.slice';
import { setUserStrategies } from '../../redux/strategies.slice';

export const UserRegistration = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [users, setUsers] = useState<TUser['name'][]>([]);
  const buttonText = useMemo(() => {
    return users.length >= 3 ? 'Users Limit Reached' : 'Add User';
  }, [users.length]);

  const { users: reduxUsers } = useSelector<RootState, RootState['usersReducer']>(
    (state) => state.usersReducer,
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!reduxUsers.length) {
      return;
    }

    dispatch(setUserStrategies(reduxUsers));

    navigate('/conference');
  }, [dispatch, navigate, reduxUsers]);

  const startConference = useCallback(() => {
    const newUsers: Omit<TUser, 'id'>[] = users.map((name) => ({
      name,
      selectedTilesIds: [],
    }));

    dispatch(setUsersAction(newUsers));
  }, [dispatch, users]);

  return (
    <div>
      <h2>Users Registration</h2>
      <UsersList>
        {users.map((user, index) => (
          <User key={index}>{user}</User>
        ))}
      </UsersList>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={(values, { resetForm, setErrors }) => {
          if (users.some((user) => user === values.name)) {
            setErrors({ name: 'This name has already been taken.' });
            return;
          }

          setUsers([...users, values.name]);
          resetForm();
        }}
      >
        {({ values, errors }) => (
          <Form>
            {users.length < 3 && (
              <Field name='name' placeholder='Enter user name'>
                {({ field }: FieldProps) => (
                  <NameInputField
                    type='text'
                    placeholder='Enter user name'
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                )}
              </Field>
            )}
            {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
            <br />
            <button disabled={!values.name || users.length >= 3} type='submit'>
              {buttonText}
            </button>
          </Form>
        )}
      </Formik>
      <br />

      <button onClick={startConference} disabled={users.length === 0}>
        Start Conference
      </button>
    </div>
  );
};
