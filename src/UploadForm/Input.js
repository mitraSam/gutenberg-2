import React from 'react';
import {css} from '@emotion/core';
const Input = ({errors, touched, handleChange, handleBlur, fieldName, value, type}) => {
    const input = css`
        width: 100%;
        font-size: 1em;
        border: none;
        padding: 0.5em 0;
        font-family: var(--main-font);
        border-bottom: 1px solid var(--dark-gray);
        color: var(--dark-gray);
        background: var(--off-white);
    `;
    return (
        <div>
            <p
                css={css`
                    margin: 0;
                `}>
                <label htmlFor="title" style={{display: 'block'}}>
                    {fieldName}
                </label>
                {fieldName === 'license' ? (
                    <textarea
                        css={css`
                            ${input}
                        `}
                        id={fieldName}
                        placeholder={fieldName}
                        value={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors[fieldName] && touched[fieldName] ? 'text-input error' : 'text-input'}
                    />
                ) : (
                    <input
                        css={css`
                            ${input}
                        `}
                        id={fieldName}
                        placeholder={fieldName}
                        type={type ? type : 'text'}
                        value={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors[fieldName] && touched[fieldName] ? 'text-input error' : 'text-input'}
                    />
                )}
            </p>
            <div
                css={css`
                    position: relative;
                    height: 1em;
                    margin-bottom: 0.5em;
                `}>
                {errors[fieldName] && touched[fieldName] && (
                    <span
                        css={css`
                            position: absolute;
                            color: var(--action-color);
                            font-size: 0.8em;
                        `}>
                        {errors[fieldName]}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Input;
