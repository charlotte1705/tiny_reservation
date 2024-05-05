import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
// import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import LogoutIcon from '@mui/icons-material/Logout';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Avatar from '@mui/material/Avatar';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from './SignOutButton'; // Import SignOutButton component

// import MyBookings from '../pages/MyBookings';

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? '  ' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function CustomizedMenus() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const { isLoggedIn, role } = useAppContext();
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        navigate("/"); // Redirect to home page after logout
    };

    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                <Avatar /> {/* Add user avatar here */}
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={handleClose}
                    disableRipple
                    component={Link} // Use Link component from react-router-dom
                    to="/my-profile" // Specify the target link
                    style={{ color: 'inherit' }} // Set the text color to inherit
                >
                    <div><EditIcon /> Profile </div>
                </MenuItem>
                {role === "user" && (
                    <MenuItem
                        onClick={handleClose}
                        disableRipple
                        component={Link} // Use Link component from react-router-dom
                        to="/my-bookings" // Specify the target link
                    >
                        <div><FileCopyIcon /> My Booking</div>
                    </MenuItem>
                )}
                {role !== "user" && (
                    <>
                        <MenuItem
                            onClick={handleClose}
                            disableRipple
                            component={Link} // Use Link component from react-router-dom
                            to="/my-hotels" // Specify the target link
                        >
                            <FileCopyIcon />
                            My Hotel
                        </MenuItem>
                        <MenuItem
                            onClick={handleClose}
                            disableRipple
                            component={Link} // Use Link component from react-router-dom
                            to="/history-booking" // Specify the target link
                        >
                            <FileCopyIcon />
                            History Booking
                        </MenuItem>
                    </>

                )}
                <Divider sx={{ my: 0.5 }} />
                {isLoggedIn && (
                    <MenuItem onClick={handleLogout} disableRipple>
                        <LogoutIcon />
                            <SignOutButton /> {/* Add SignOutButton component */}
                    </MenuItem>
                )}
            </StyledMenu>
        </div>
    );
}
