import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

html {
	background-color: ${({ theme }) => theme.colors.background};
}

body, input, button {
	font-family: ${({ theme }) => theme.font};
	color: ${({ theme }) => theme.colors.text};
}

input, button {
	border: none;
	background: none;

	&:focus {
		outline: none;
	}
}

input {
	&::placeholder {
		user-select: none;
	}
}

button {
	user-select: none;
}

a {
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
}

::-webkit-scrollbar {
  display: none;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  display: none;
}
`;

export default GlobalStyle;
