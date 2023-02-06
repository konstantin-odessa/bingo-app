import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { TUser } from '../../types/types';
import { useBingoContext } from '../../contexts/bingo-context';
import { NameInputField, User, UsersList } from './users-registration.style';
import { FieldProps } from 'formik/dist/Field';

let userId = 0;

export const UserRegistration = () => {
  const { setContext, ...context } = useBingoContext();
  const [users, setUsers] = useState<TUser[]>([]);
  const buttonText = useMemo(() => {
    return users.length >= 3 ? 'Users Limit Reached' : 'Add User';
  }, [users.length]);

  const navigate = useNavigate();

  const startConference = useCallback(() => {
    setContext({
      ...context,
      users,
      activeUserId: users.at(0)?.id ?? 0,
    });

    navigate('/conference');
  }, [context, navigate, setContext, users]);

  return (
    <div>
      <h2>Users Registration</h2>
      <UsersList>
        {users.map((user) => (
          <User key={user.id}>{user.name}</User>
        ))}
      </UsersList>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={(values, { resetForm, setErrors }) => {
          if (users.some((user) => user.name === values.name)) {
            setErrors({ name: 'This name has already been taken.' });
            return;
          }

          setUsers([
            ...users,
            { name: values.name, id: userId++, selectedTilesIds: [] },
          ]);
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
