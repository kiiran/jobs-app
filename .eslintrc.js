module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "airbnb-base"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true,
            "modules": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-native"
    ],
    "rules": {
        "indent": [
            "error",
            2,
            { "SwitchCase": 1 }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "semi": [
            "error",
            "always",
            {"omitLastInOneLineBlock": true}
        ],
        "arrow-body-style": [
          0,
          "as-needed",
          {"requireReturnForObjectLiteral": false}
        ],
        "class-methods-use-this": 0,
        "comma-dangle": ["error", "never"],
        "consistent-return": 0,
        "function-paren-newline": 0,
        "global-require": 0,
        "import/prefer-default-export": 0,
        "max-len": 1,
        "no-use-before-define": 0,
        "no-unused-expressions": 0,
        "prefer-const": 0,
        "quotes": 0,
        "react/prop-types": 0,
        "space-before-function-paren": 0
    }
};
