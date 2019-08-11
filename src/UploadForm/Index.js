import React, {useState} from 'react';
import {css} from '@emotion/core';
import {useMutation, useSubscription} from '@apollo/react-hooks';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Subtitle from '../Subtitle/Subtitle';
import {BOOK_UPLOAD_SUB, UPLOAD_BOOK} from '../Queries';
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
                    title: 'BRAVE NEW WORLD',
                    author: 'Aldous Huxley',
                    source: 'https://gutenberg.ca/ebooks/huxleya-bravenewworld/huxleya-bravenewworld-00-h.html',
                    license:
                        'This ebook is made available at no cost and with very few restrictions. These restrictions apply only if (1) ' +
                        'you make a change in the ebook (other than alteration for different display devices), or (2) you are making commercial use of the ebook.' +
                        ' If either of these conditions applies, please check www.gutenberg.ca/links/licence.html before proceeding. ',
                    credits: [
                        'This ebook was produced by Paul Dring, Cindy Beyer, Mark Akrigg & the Online Distributed Proofreading Canada Team at http://www.pgdpcanada.net',
                    ],
                }}
                onSubmit={(values, {setSubmitting}) => {
                    setUploading(true);
                    uploadBook({variables: {input: {...values, file}}})
                        .then(({data: {uploadBook}}) => {
                            setSubmitting(false);
                            setFreshTitle(uploadBook.title);
                        })
                        .catch(console.log);
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
