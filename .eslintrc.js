module.exports = {
    "extends": "airbnb",
    "env": {
        "browser": true,
        "node": true
    },
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/prop-types": 0,
        'jsx-a11y/no-static-element-interactions': [
            'error',
            {
                handlers: [
                'onClick',
                'onMouseDown',
                'onMouseUp',
                'onKeyPress',
                'onKeyDown',
                'onKeyUp',
                ],
            },
        ],
    },
    "globals": {
        "document": true,
        "window": true,
        "React": true,
        "ReactDOM": true,
        "$": true,
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ]
};