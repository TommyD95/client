import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {

    const navigate = useNavigate();

    return (
        <Container component={Paper} >
            <Typography gutterBottom variant="h3">Ooops- we could not find what you are looking for!</Typography>
            <Divider />
            <Button fullWidth onClick={() => navigate("/")}>back to the catalog</Button>
        </Container>
    )
}

export default NotFound;