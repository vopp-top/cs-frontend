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
	text-decoration: none;

	&:hover{
		text-decoration: underline;
	}
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
`;

export default GlobalStyle;
