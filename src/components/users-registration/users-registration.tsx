import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { NameInputField, User, UsersList } from './users-registration.style';
import { FieldProps } from 'formik/dist/Field';
import { TUser } from '../../types/types';
import { strategiesMap, useBingoContext } from '../../contexts/bingo.context';
import { StrategyStateEnum } from '../../enums/strategy-state.enum';

let userId = 0;

export const UserRegistration = () => {
  const context = useBingoContext();
  const { setContext } = context;
  const [users, setUsers] = useState<TUser['name'][]>([]);
  const buttonText = useMemo(() => {
    return users.length >= 3 ? 'Users Limit Reached' : 'Add User';
  }, [users.length]);

  const navigate = useNavigate();

  const startConference = useCallback(() => {
    const newUsers: TUser[] = users.map((name) => ({
      id: userId++,
      name,
      selectedTilesIds: [],
    }));

    setContext({
      ...context,
      users: newUsers,
      strategies: newUsers.flatMap((user) => {
        const types = [...strategiesMap.keys()];

        return types.map((type) => ({
          userId: user.id,
          strategyType: type,
          selectedTiles: [],
          isClosed: false,
          isFulfilled: false,
          state: StrategyStateEnum.PENDING,
        }));
      }),
    });

    navigate('/conference');
  }, [context, navigate, setContext, users]);

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
