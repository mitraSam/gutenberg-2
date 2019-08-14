import React from 'react';
import Subtitle from '../Subtitle/Subtitle';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {css} from '@emotion/core';

import Input from '../UploadForm/Input';

const Form = ({title, authError, setAuthError, handleFormSubmit}) => (
    <div>
        <Subtitle text={title} />
        <Formik
            validationSchema={Yup.object().shape({
                username: Yup.string().required('Required'),
                password: Yup.string().required('Required'),
            })}
            initialValues={{
                username: '',
                password: '',
            }}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(false);
                setAuthError(null);
                handleFormSubmit(values);
            }}>
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                } = props;
                return (
                    <div>
                        <form
                            id={`${title + 'Form'}`}
                            onSubmit={handleSubmit}
                            css={css`
                                border: 1px solid var(--dark-gray);
                                padding: 1em;
                                margin-bottom: 1em;
                                max-width: 32rem;

                                button {
                                    border: 1px solid var(--action-color);
                                    border-radius: 5px;
                                    font-size: 1.25em;
                                    padding: 0.5em;
                                    width: 100%;
                                    margin-top: 0.35em;
                                    font-family: var(--id-font);
                                    &:active,
                                    &:focus,
                                    &:hover {
                                        border-color: transparent;
                                        color: #fff;
                                        background: var(--dark-gray);
                                    }
                                }
                            `}>
                            {authError && (
                                <span
                                    css={css`
                                        color: var(--action-color);
                                    `}>
                                    {authError}
                                </span>
                            )}
                            {Object.keys(values).map(fieldName => (
                                <Input
                                    key={fieldName}
                                    value={values[fieldName]}
                                    fieldName={fieldName}
                                    errors={errors}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    touched={touched}
                                />
                            ))}

                            <div>
                                <p>
                                    <button
                                        css={css`
                                            margin-right: 0.7em;
                                        `}
                                        form={`${title + 'Form'}`}
                                        type="submit"
                                        disabled={isSubmitting}>
                                        Submit
                                    </button>
                                </p>
                                <p>
                                    <button
                                        form="uploadForm"
                                        type="button"
                                        className="outline"
                                        onClick={handleReset}
                                        disabled={!dirty || isSubmitting}>
                                        Reset
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>
                );
            }}
        </Formik>
    </div>
);

export default Form;
