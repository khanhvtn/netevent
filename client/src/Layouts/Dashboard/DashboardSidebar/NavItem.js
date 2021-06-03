import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, ListItem } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../../actions/userActions';

const NavItem = ({ href, icon: Icon, title, ...rest }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const css = useStyles();
    const active = href.includes(location.pathname) ? true : false;


    const handleAction = () => {
        if (href === 'logout') {
            return dispatch(userLogout(history));
        }
        if (href === 'pickrole') {
            history.push(`/${href}`)
        }
        history.push(href[0]);
    };

    return (
        <ListItem
            disableGutters
            className={css.sidebarListItem}
            style={{ paddingTop: 0, paddingBottom: 0 }}
            {...rest}
        >
            <Button
                className={css.sidebarListButton}
                color={active ? 'primary' : 'default'}
                onClick={handleAction}
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
    title: PropTypes.string,
};

export default NavItem;