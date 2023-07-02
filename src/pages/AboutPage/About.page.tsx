import { Button, ButtonGroup, Typography } from "@mui/material";
import Container from "@mui/material/Container/Container";
import agent from "../../Api/agent";

const AboutPage = () => {

    return (
        <Container>
            <Typography gutterBottom variant="h2">Errors for testing purposes</Typography>
            <ButtonGroup fullWidth>
                <Button variant="contained" onClick={() => agent.testError.get400Error()}>Test 400 Error </Button>
                <Button variant="contained" onClick={() => agent.testError.get401Error()}>Test 401 Error </Button>
                <Button variant="contained" onClick={() => agent.testError.get404Error()}>Test 404 Error </Button>
                <Button variant="contained" onClick={() => agent.testError.get500Error()}>Test 500 Error </Button>
                <Button variant="contained" onClick={() => agent.testError.getValidationError()}>Test validation Error </Button>
            </ButtonGroup>
        </Container>
    )
}

export default AboutPage;