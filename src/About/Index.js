import React from 'react';
import Subtitle from '../Subtitle/Subtitle';
import {css} from '@emotion/core';

const About = () => (
    <div
        css={css`
            @media (min-width: 75em) {
                margin-left: 1.4em;
            }
        `}>
        <Subtitle text="about" />
        <p>
            A quiet place on the web where you can find some awesome books. Books can also be uploaded but please
            respect the required format.
        </p>
    </div>
);

export default About;
