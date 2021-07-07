import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    screen: {
        position: 'static',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        margin: 0,
        backgroundColor: '#eeeeee',
        zIndex: -1
    },
    root: {
        flexGrow: 1,
        overflowX: 'hidden',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1
    },
    wrapper: {
        minWidth: 945,
        margin: '2% 16%',
        [theme.breakpoints.down('md')]: {
            margin: '2% 8%',
            minWidth: 0
        },
        [theme.breakpoints.down('sm')]: {
            margin: 0,
            minWidth: 0
        }
    },
    topDisplay: {
        minHeight: 345,
        height: 345,
        [theme.breakpoints.down('sm')]: {
            height: 'auto'
        }
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        position: 'relative',
        borderRadius: 8,
        zIndex: 0
    },
    register: {
        backgroundColor: '#eeeeee',
        padding: 24
    },
    registerBottom: {
        [theme.breakpoints.down('md')]: {
            marginTop: 8
        }
    },
    responsive: {
        position: 'absolute',
        width: '100%',
        height: '70vh',
        WebkitFilter: 'blur(15px)',
        backdropFilter: 'blur(10px) brightness(0.50)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    image: {
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        [theme.breakpoints.down('xs')]: {
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom',
            backgroundSize: 'contain'
        }
    },
    detailWrapper: {
        padding: '48px 24px',
        [theme.breakpoints.down('md')]: {
            padding: '48px 24px'
        },
        [theme.breakpoints.down('sm')]: {
            padding: '48px 24px'
        },
        [theme.breakpoints.down('xs')]: {
            padding: 8
        }
    },
    detailDescriptionWrapper: {
        padding: '48px 96px',
        [theme.breakpoints.down('md')]: {
            padding: '48px 24px'
        },
        [theme.breakpoints.down('sm')]: {
            padding: '24px'
        },
        [theme.breakpoints.down('xs')]: {
            padding: 8
        }
    },
    circularProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%'
    },
    bodyActivity: {
        padding: '40px 20px',
        [theme.breakpoints.down('md')]: {
            padding: '40px 10px'
        },
        [theme.breakpoints.down('sm')]: {
            padding: '40px 0'
        },
        [theme.breakpoints.down('xs')]: {
            padding: '10px 0'
        }
    },
    bodyRegistrationForm: {
        padding: '40px 360px',
        [theme.breakpoints.down('lg')]: {
            padding: '40px 160px'
        },
        [theme.breakpoints.down('sm')]: {
            padding: '40px 80px'
        },
        [theme.breakpoints.down('xs')]: {
            padding: '10px 0'
        }
    },
    tableText: {
        fontSize: '14pt'
    },
    eventTags: {
        color: '#000054',
        fontSize: '20pt',
        marginTop: 7
    },
    mt36: {
        marginTop: 36
    },
    mtb36: {
        margin: 36
    },
    chip: {
        backgroundColor: '#000054',
        color: '#fff',
        margin: theme.spacing(0.5)
    },
    chipContainer: {
        root: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(0.5)
            }
        }
    },
    // form: {
    //     color: "#000054",
    //     fontSize: "20pt",
    //     marginTop: 7
    // },
    textField: {
        marginTop: 7
    },
    registerButton: {
        marginTop: 20,
        backgroundColor: 'red',
        '&:hover': {
            backgroundColor: '#a2001c'
        }
    },
    registerBottomButton: {
        [theme.breakpoints.down('md')]: {
            marginTop: 48
        }
    },
    registerButtonTop: {
        marginRight: 8,
        backgroundColor: 'red',
        '&:hover': {
            backgroundColor: '#a2001c'
        }
    },
    errorStyle: {
        color: 'red',
        fontSize: 11
    },
    academicField: {
        marginLeft: theme.spacing(2),
        marginTop: -4
    }
}));
