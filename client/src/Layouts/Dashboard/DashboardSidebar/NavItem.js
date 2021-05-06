import {
    NavLink as RouterLink,
    useLocation
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, ListItem } from '@material-ui/core';
import useStyles from './styles'

const NavItem = ({ href, icon: Icon, title, ...rest }) => {
    const location = useLocation();
    const css = useStyles();
    const active = location.pathname === href ? true : false;

    return (
        <ListItem
            disableGutters
            className={css.sidebarListItem}
            style={{ paddingTop: 0, paddingBottom: 0 }}
            {...rest}
        >
            <Button
                component={RouterLink}
                className={css.sidebarListButton}
                color={active ? 'primary' : 'default'}
                to={href}
            >
                {Icon && <Icon size="20" />}
                <span>{title}</span>
            </Button>
        </ListItem>
    );
};

NavItem.propTypes = {
    href: PropTypes.string,
    icon: PropTypes.elementType,
    title: PropTypes.string
};

export default NavItem;
