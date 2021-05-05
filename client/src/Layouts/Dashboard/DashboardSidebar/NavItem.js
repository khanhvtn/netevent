import {
    NavLink as RouterLink,
    matchPath,
    useLocation
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, ListItem } from '@material-ui/core';
import useStyles from './styles'

const NavItem = ({
    href,
    icon: Icon,
    title,
    ...rest
}) => {
    const location = useLocation();
    const css = useStyles();
    // const active = href ? !!matchPath({
    //     path: href,
    //     end: false
    // }, location.pathname) : false;

    return (
        <ListItem
            disableGutters
            className={css.ListItem1}
            style={{ paddingTop: 0, paddingBottom: 0 }}
            {...rest}
        >
            <Button
                component={RouterLink}
                className={css.button1}
                to={href}
            >
                {Icon && (
                    <Icon size="20" />
                )}
                <span>
                    {title}
                </span>
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
