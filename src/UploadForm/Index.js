import React, {useState} from 'react';
import {css} from '@emotion/core';
import {useMutation} from '@apollo/react-hooks';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Subtitle from '../Subtitle/Subtitle';
import {UPLOAD_BOOK} from '../Queries';
import Input from './Input';
import CreditsInput from './CreditsInput';
import UploadFileButton from './UploadFileButton';
import UploadNotifications from './UploadNotifications';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [uploadBook, {}] = useMutation(UPLOAD_BOOK);
    const [uploading, setUploading] = useState(false);
    const [freshTitle, setFreshTitle] = useState(null);

    const buttonStyle = css`
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
    `;
    return (
        <div
            css={css`
                @media (min-width: 75em) {
                    margin-left: 1.4em;
                }
            `}>
            <Subtitle text="upload book" />
            <Formik
                validationSchema={Yup.object().shape({
                    title: Yup.string().required('Required'),
                    author: Yup.string().required('Required'),
                    source: Yup.string()
                        .url()
                        .required('Required'),
                    license: Yup.string().required('Required'),
                })}
                initialValues={{
                    title: "Swann's Way",
                    author: 'Marcel Proust',
                    source: 'https://www.gutenberg.org/files/7178/7178-h/7178-h.htm',
                    license:
                        'This eBook is for the use of anyone anywhere at no cost and with\n' +
                        'almost no restrictions whatsoever.  You may copy it, give it away or\n' +
                        're-use it under the terms of the Project Gutenberg License included\n' +
                        'with this eBook or online at www.gutenberg.org',
                    credits: [
                        'Produced by Eric Eldred, and David Widger',
                        'Translated From The French By C. K. Scott Moncrieff',
                    ],
                }}
                onSubmit={(values, {setSubmitting}) => {
                    setUploading(true);
                    uploadBook({variables: {input: {...values, file}}})
                        .then(({data: {uploadBook}}) => {
                            setSubmitting(false);
                            setFreshTitle(uploadBook.title);
                        })
                        .catch(e => console.log(JSON.stringify(e)));
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
                        <div
                            css={css`
                                position: relative;
                            `}>
                            <UploadNotifications
                                setFile={setFile}
                                buttonStyle={buttonStyle}
                                freshTitle={freshTitle}
                                handleReset={handleReset}
                                setUploading={setUploading}
                                uploading={uploading}
                            />
                            <form
                                id="uploadForm"
                                onSubmit={handleSubmit}
                                css={css`
                                    border: 1px solid var(--dark-gray);
                                    padding: 1em;
                                    margin-bottom: 1em;
                                    max-width: 32rem;

                                    button {
                                        ${buttonStyle}
                                    }
                                `}>
                                {Object.keys(values).map(fieldName =>
                                    fieldName === 'credits' ? (
                                        <CreditsInput key="credits" credits={values.credits} />
                                    ) : (
                                        <Input
                                            key={fieldName}
                                            value={values[fieldName]}
                                            fieldName={fieldName}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            touched={touched}
                                        />
                                    )
                                )}

                                <UploadFileButton setFile={setFile} file={file} />
                                <div>
                                    <p>
                                        <button
                                            css={css`
                                                margin-right: 0.7em;
                                            `}
                                            form="uploadForm"
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
};
export default UploadForm;
