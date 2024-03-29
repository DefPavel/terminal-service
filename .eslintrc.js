module.exports = {
	"env": {
		"es6": true,
		"browser": true,
		"es2021": true
	},
	"extends": [
		"plugin:react/recommended",
		"plugin:prettier/recommended",
		"plugin:react-redux/recommended",
		"airbnb",
		"prettier"
	],
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"prettier",
		"react-redux"
	],
	"rules": {
		"strict": 0,
		"comma-dangle": ["error", "always-multiline"],
		"func-names": 0,
		"radix": 0,
		"no-throw-literal": 0,
		"no-use-before-define": 0,
		"no-plusplus": 0,
		"no-await-in-loop": 0,
		"no-multi-assign": 0,
		"no-unused-expressions": ["error", { "allowTernary": true }],
		"consistent-return": 0,
		"array-callback-return": ["error", { "allowImplicit": true }],
		"no-path-concat": 0,
		"no-restricted-syntax": 0,
		"prettier/prettier": "error",
		"react/require-default-props": 0,
		"import/prefer-default-export": 0,
		"vars-on-top": 0,
		"no-var": 0,
		"import/no-named-as-default": 0,
		"no-param-reassign": ["error", { "props": false }],
		"jsx-a11y/no-noninteractive-element-interactions": 0,
		"jsx-a11y/click-events-have-key-events": 0,
		"react-redux/useSelector-prefer-selectors": 0,
		"react/prop-types": 0,
		"jsx-a11y/label-has-associated-control": 0,
		"no-unused-vars": "warn",
		"react/no-array-index-key": 0,
		"react/jsx-props-no-spreading": 0
	}
};
