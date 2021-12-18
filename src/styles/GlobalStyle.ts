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
}

input, button {
	border: none;
	background: none;

	&:focus {
		outline: none;
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
`;

export default GlobalStyle;
