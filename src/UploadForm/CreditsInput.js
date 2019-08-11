import React from 'react';
import {css} from '@emotion/core';
import {Field, FieldArray} from 'formik';

const CreditsInput = ({credits}) => {
    return (
        <FieldArray
            name="credits"
            render={arrayHelpers => (
                <div
                    css={css`
                        button {
                            width: auto;
                        }
                        input {
                            width: 100%;
                            font-size: 1em;
                            border: none;
                            padding: 0.5em 0;
                            font-family: var(--main-font);
                            border-bottom: 1px solid var(--dark-gray);
                            color: var(--dark-gray);
                            background: var(--off-white);
                        }
                    `}>
                    <p>Credits</p>
                    {credits && credits.length > 0 ? (
                        credits.map((credit, index) => (
                            <div key={index}>
                                <Field name={`credits.${index}`} />
                                <button
                                    type="button"
                                    css={css`
                                        margin: 0 1px;
                                    `}
                                    onClick={() => arrayHelpers.remove(index)}>
                                    remove
                                </button>
                                <button type="button" onClick={() => arrayHelpers.insert(index, '')}>
                                    add
                                </button>
                            </div>
                        ))
                    ) : (
                        <button style={{fontSize: '.8em'}} type="button" onClick={() => arrayHelpers.push('')}>
                            Add a credit
                        </button>
                    )}
                </div>
            )}
        />
    );
};

export default CreditsInput;
