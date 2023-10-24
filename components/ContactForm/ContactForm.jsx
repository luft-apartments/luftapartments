'use client'
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ReactDOM from 'react-dom';
import styles from './ContactForm.module.scss';

const apartmentsOptions = [
  { value: '2a', label: 'Apartment 2A' },
  { value: '3a', label: 'Apartment 3A' },
  { value: '1b', label: 'Apartment 1B' },
  { value: '2b', label: 'Apartment 2B' },
  { value: '3b', label: 'Apartment 3B' },
];

const initialValues = {
  name: '',
  surname: '',
  phone: '',
  email: '',
  apartments: '',
  datestart: '',
  dateend: '',
  message: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  surname: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  phone: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  apartments: Yup.string().required('Required'),
  message: Yup.string().required('Required'),
});

export const ContactForm = () => {

  const [fieldStates, setFieldStates] = useState({
    name: false,
    surname: false,
    phone: false,
    email: false,
    datestart: false,
    dateend: false,
    message: false,
  });

  const [isMessageSent, setIsMessageSent] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const handleFieldChange = (fieldName, value) => {
    setFieldStates((prevFieldStates) => ({
      ...prevFieldStates,
      [fieldName]: !!value.trim(),
    }));
  };

  const onSubmit = async (values, { resetForm }) => {
    console.log('Форма отправлена');
    try {
      await axios.post('/api/contact', values); // Отправляем данные формы на сервер
      // Здесь вы можете добавить код для обработки успешной отправки, например, очистка формы или вывод сообщения пользователю
      console.log('Форма успешно отправлена!');
      resetForm(); // Сбрасываем значения полей формы к исходным значениям
      setIsMessageSent(true);
      setIsMessageVisible(true);

      setTimeout(() => {
        setIsMessageVisible(false);
      }, 5000); // Скрыть всплывающее окно через 5 секунд
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      // Здесь вы можете добавить код для обработки ошибки отправки, например, вывод сообщения пользователю
    }
  };

  // Создаем портал для всплывающего окна
  const MessagePopup = () => {
    if (!isMessageVisible) return null;

    return ReactDOM.createPortal(
      <div className={styles.popupContainer}>
        <div className={styles.messagePopup}>
          <div className={styles.messageContent}>
            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 20 20" fill="none">
              <path d="M15 7L7.99998 14L4.99994 11M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="#001A72" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className={styles.messageTextWrapper}>
              <h3 className={styles.messageTitle}>Спасибо!</h3>
              <p className={styles.messageText}>Я получил ваше сообщение и свяжусь с вами в ближайшее время.</p>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className={styles.formWrapper}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className={styles.form}>
          <div className={styles.inputWrapper}>
            <div
              className={styles.inputData}
            >
              <Field
                className={styles.input}
                type="text"
                id="name"
                name="name"
                onFocus={() => setFieldStates({ ...fieldStates, name: true })}
                onBlur={(e) => handleFieldChange('name', e.target.value)}
              />
              <label
                htmlFor="name"
                className={`${styles.label} ${fieldStates.name || initialValues.name ? styles.focused : ''}`}
              >
                Name
              </label>
              <ErrorMessage name="name" component="div" className={styles.errorMessage} />
            </div>
            <div
              className={styles.inputData}
            >
              <Field
                className={styles.input}
                type="text"
                id="surname"
                name="surname"
                onFocus={() => setFieldStates({ ...fieldStates, surname: true })}
                onBlur={(e) => handleFieldChange('surname', e.target.value)}
              />
              <label
                htmlFor="surname"
                className={`${styles.label} ${fieldStates.surname || initialValues.surname ? styles.focused : ''}`}
              >
                Nachname
              </label>
              <ErrorMessage name="surname" component="div" className={styles.errorMessage} />
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <div
              className={styles.inputData}
            >
              <Field
                className={styles.input}
                type="text"
                id="phone"
                name="phone"
                onFocus={() => setFieldStates({ ...fieldStates, phone: true })}
                onBlur={(e) => handleFieldChange('phone', e.target.value)}
              />
              <label
                htmlFor="phone"
                className={`${styles.label} ${fieldStates.phone || initialValues.phone ? styles.focused : ''}`}
              >
                Telefonnummer
              </label>
              <ErrorMessage name="phone" component="div" className={styles.errorMessage} />
            </div>

            <div
              className={styles.inputData}
            >
              <Field
                className={styles.input}
                type="email"
                id="email"
                name="email"
                onFocus={() => setFieldStates({ ...fieldStates, email: true })}
                onBlur={(e) => handleFieldChange('email', e.target.value)}
              />
              <label
                htmlFor="email"
                className={`${styles.label} ${fieldStates.email || initialValues.email ? styles.focused : ''}`}
              >
                Email
              </label>
              <ErrorMessage name="email" component="div" className={styles.errorMessage} />
            </div>
          </div>
          <div className={styles.inputData}>
            <div className={styles.selectWrapper}>
              <Field
                as="select"
                id="apartments"
                name="apartments"
                className={`${styles.input} ${styles.select}`}
                onFocus={() => setFieldStates({ ...fieldStates, apartments: true })}
                onBlur={(e) => handleFieldChange('apartments', e.target.value)}
              >
                <option value="" disabled> </option>
                {apartmentsOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <label
                htmlFor="apartments"
                className={`${styles.label} ${fieldStates.apartments || initialValues.apartments ? styles.focused : ''} ${styles.selectLabel}`}
              >
                Wunsch Apartment
              </label>
            </div>
            <ErrorMessage name="apartments" component="div" className={styles.errorMessage} />
          </div>
          <div
            className={`${styles.inputData} ${styles.textarea}`}
          >
            <Field
              as="textarea"
              id="message"
              name="message"
              onFocus={() => setFieldStates({ ...fieldStates, message: true })}
              onBlur={(e) => handleFieldChange('message', e.target.value)}
            />
            <label
              htmlFor="message"
              className={`${styles.labelTextarea} ${fieldStates.message || initialValues.message ? styles.focused : ''}`}
            >
              Sonderwunsch
            </label>
            <ErrorMessage name="message" component="div" className={styles.errorMessage} />
          </div>

          <div className={styles.buttonBlock}>
            <button
              className={styles.button}
              type="submit"
            >
              Send
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};