module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        jest: true,
    },
    globals: {
        module: 'readonly', 
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    settings: {
        react: {
          version: 'detect',
        },
    },
    "plugins": [
        "react"
    ],
    rules: {
        'react/react-in-jsx-scope': 'off', 
        'react/prop-types': 'off', 
      },
};
