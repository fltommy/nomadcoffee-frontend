import styled from "styled-components";
import { darkModeVar, isLoggedInVar } from "../apollo";

const Title = styled.h1`
    color: ${(props) => props.theme.fontColor};
`;

const Container = styled.div`
    background-color: ${(props) => props.theme.bgColor};
`;

function Login() {
    return (
        <Container>
            <Title>Login</Title>
            <button onClick={() => isLoggedInVar(true)}>Log in</button>
            <button onClick={()=>darkModeVar(true)}>DarkMode</button>
            <button onClick={()=>darkModeVar(false)}>LightMode</button>
        </Container>
    )
}
export default Login; 