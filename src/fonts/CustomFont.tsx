import { Global } from '@mantine/core';

import Rubic from '../fonts/Rubik-VariableFont_wght.ttf';
import RubicItalic from '../fonts/Rubik-Italic-VariableFont_wght.ttf';

export function CustomFonts() {
    return (
        <Global
            styles={[
                {
                    '@font-face': {
                        fontFamily: 'Rubik',
                        src: `url('${Rubic}') format("ttf")`,
                        fontWeight: 400,
                        fontStyle: 'normal',
                    },
                },

                

                {
                    '@font-face': {
                        fontFamily: 'Rubik',
                        src: `url('${RubicItalic}') format("ttf")`,
                        fontWeight: 400,
                        fontStyle: 'italic',
                    },
                },
            ]}
        />
    );
}