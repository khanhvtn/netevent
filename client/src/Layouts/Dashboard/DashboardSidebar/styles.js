import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  sidebarWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: theme.palette.background.default
  },
  sidebarAccountWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: 18
  },
  p2: {
    padding: 16
  },
  sidebarListItem: {
    display: 'flex'
  },
  sidebarListButton: {
    color: 'text.secondary',
    fontWeight: 'medium',
    justifyContent: 'flex-start',
    letterSpacing: 0,
    paddingTop: 12,
    paddingBottom: 12,
    textTransform: 'none',
    width: '100%',
    '& svg': {
      marginRight: 8
    }
  }
}));
