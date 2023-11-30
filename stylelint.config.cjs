// noinspection SpellCheckingInspection

const flexAndGridGroup = [
    //grid container
    'grid',
    'grid-template',
    'grid-template-areas',
    'grid-template-columns',
    'grid-template-rows',
    'grid-auto-flow',
    'grid-auto-columns',
    'grid-auto-rows',
    'grid-gap',
    'grid-column-gap',
    'grid-row-gap',

    //flex container
    'flex-direction',
    'flex-wrap',
    'flex-flow',
    //common
    'justify-content',
    'align-items',
    'align-content',

    'grid-area',
    'grid-column',
    'grid-column-start',
    'grid-column-end',
    'grid-row',
    'grid-row-start',
    'grid-row-end',

    'order',
    'flex-grow',
    'flex-shrink',
    'flex-basis',
    'flex',
    'align-self'
];
const positionGroup = ['position', 'top', 'right', 'bottom', 'left'];
const marginGroup = [
    'margin',
    'margin-top',
    'margin-right',
    'margin-bottom',
    'margin-left'
];
const borderGroup = [
    'border',
    'border-top',
    'border-right',
    'border-bottom',
    'border-left',
    'border-width',
    'border-top-width',
    'border-right-width',
    'border-bottom-width',
    'border-left-width',
    'border-style',
    'border-top-style',
    'border-right-style',
    'border-bottom-style',
    'border-left-style',
    'border-radius',
    'border-top-left-radius',
    'border-top-right-radius',
    'border-bottom-left-radius',
    'border-bottom-right-radius',
    'border-color',
    'border-top-color',
    'border-right-color',
    'border-bottom-color',
    'border-left-color',
    'border-image',
    'border-image-source',
    'border-image-width',
    'border-image-outset',
    'border-image-repeat',
    'border-image-slice'
];
const backgroundGroup = [
    'background',
    'background-attachment',
    'background-clip',
    'background-color',
    'background-image',
    'background-origin',
    'background-position',
    'background-repeat',
    'background-size',
    'background-blend-mode'
];
const paddingGroup = [
    'padding',
    'padding-top',
    'padding-right',
    'padding-bottom',
    'padding-left'
];
const sizeGroup = ['width', 'height'];

module.exports = {
    ignoreFiles: '**/!(*.module.scss)', //alternative .stylelintignore breaks Idea plugin
    plugins: [
        'stylelint-scss',
        'stylelint-order',
        'stylelint-prettier'
    ],
    rules: {
        'prettier/prettier': true,
        'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$', //includes camelcase
        'color-hex-length': 'long',
        'max-nesting-depth': 3,

        'scss/selector-no-redundant-nesting-selector': true,

        'order/properties-alphabetical-order': null,
        'order/properties-order': [
            ['display']
                .concat(flexAndGridGroup)
                .concat(positionGroup)
                .concat(marginGroup)
                .concat(borderGroup)
                .concat(backgroundGroup)
                .concat(paddingGroup)
                .concat(sizeGroup),
            {unspecified: 'bottom'}
        ],

        'property-no-unknown': [
            true,
            {
                ignoreProperties: ['/^css/']
            }
        ],

        'sh-waqar/declaration-use-variable': [
            [
                '/color/',
                'fill',
                'font-family',
                {ignoreValues: ['transparent', 'inherit', 'unset']}
            ]
        ]
    }
};
