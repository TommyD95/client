import { AppBar, Badge, Box, IconButton, Link, List, ListItem, Switch, Toolbar } from "@mui/material"
import BaseTitle from "../base/baseTitle"
import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import useBasketHook from "../../pages/Basket/basket.hook";

type IProps = {
    onChange: () => void;
    dark: boolean;
}
const Header = (props: IProps) => {

    const midLinks = [
        { title: 'contact', path: '/contact' },
    ]

    const rightLinks = [
        { title: 'login', path: '/login' },
        { title: 'register', path: '/register' },
    ]

    const navigate = useNavigate();

    const { onChange, dark } = props;

    const { basket } = useBasketHook();

    const itemCount = basket ? basket?.items.reduce((sum, item) => sum + item.quantity, 0) : 0;

    return (
        <>
            <AppBar position="static" sx={{ mb: 4, bgcolor: "darkblue" }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                    <Box display='flex' alignItems='center'>
                        <BaseTitle title="RE-STORE" />
                        <Switch checked={dark} onChange={onChange} />
                    </Box>

                    <Box display='flex' alignItems='center'>
                        <List sx={{ display: 'flex' }}>
                            {midLinks.map((link, i) =>
                                <ListItem key={i}>
                                    <NavLink className='navLink' to={link.path}>{link.title}</ NavLink>
                                </ListItem>)}
                        </List>
                    </Box>

                    <Box display='flex' alignItems='center'>
                        <IconButton onClick={() => navigate("/basket")} size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
                            <Badge badgeContent={itemCount} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                        <List sx={{ display: 'flex' }}>
                            {rightLinks.map((link, i) =>
                                <ListItem key={i
                                }>
                                    <NavLink className='navLink' to={link.path}>{link.title}
                                    </ NavLink>
                                </ListItem>)}
                        </List>
                    </Box>

                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header;
