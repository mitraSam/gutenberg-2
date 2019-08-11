import React from 'react';
import {css} from '@emotion/core';
const UploadFileButton = ({setFile, file}) => (
    <p style={{margin: '1em 0', position: 'relative'}}>
        <label
            css={css`
                visibility: hidden;
                position: absolute;
            `}
            htmlFor="bookHTML">
            Upload book HTML
        </label>
        <button type="button">
            {file ? file.name : ' Upload book HTML'}

            <input
                css={css`
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    opacity: 0;
                    padding: 0;
                    width: 100%;
                `}
                type="file"
                id="file"
                accept=".html,.txt,application/json"
                onChange={({target}) => {
                    setFile(target.files && target.files.length ? target.files[0] : null);
                }}
            />
        </button>
    </p>
);

export default UploadFileButton;
