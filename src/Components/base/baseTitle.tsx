import { Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

type IProps={
    title:string;
}

const BaseTitle=(props:IProps)=>{
    
const {title}=props;

    return (
<NavLink className='navLink navLinkHome'  to={'/'} >{title}</NavLink>
    )
}

export default BaseTitle;