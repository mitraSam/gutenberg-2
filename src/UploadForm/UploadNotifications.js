import React, {useState} from 'react';
import {Link} from '@reach/router';
import {css} from '@emotion/core';
import {useSubscription} from '@apollo/react-hooks';
import {BOOK_UPLOAD_SUB} from '../Queries';

const UploadNotifications = ({freshTitle, setUploading, uploading, setFile, handleReset, buttonStyle}) => {
    const [uploadNotifications, updateNotifications] = useState([]);

    useSubscription(BOOK_UPLOAD_SUB, {
        onSubscriptionData: ({
            subscriptionData: {
                data: {
                    uploadingBook: {message},
                },
            },
        }) => updateNotifications([...uploadNotifications, message]),
    });

    return (
        <div
            css={css`
                position: absolute;
                max-width: 32rem;
                top: 0;
                bottom: 0;
                padding: 1em;
                background: var(--off-white);
                display: ${uploading ? 'block' : 'none'};
                z-index: 1;
                width: 100%;
                border: 1px solid var(--dark-gray);
            `}>
            <button
                onClick={() => {
                    setUploading(false);
                    updateNotifications([]);
                    setFile(null);
                    handleReset();
                }}
                css={css`
                    float: right;

                    ${buttonStyle};
                    width: auto;
                `}>
                x
            </button>
            {uploadNotifications.map(notification => (
                <p key={notification}>{notification}</p>
            ))}
            <p>
                {freshTitle && (
                    <Link
                        css={css`
                            border-bottom: 1px solid var(--action-color);
                        `}
                        to={`/${freshTitle}`}>
                        check it out
                    </Link>
                )}
            </p>
        </div>
    );
};

export default UploadNotifications;
