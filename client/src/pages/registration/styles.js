import { makeStyles } from '@material-ui/core'

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
        overflowX: "hidden",
        overflow: "hidden",
        position: "relative",
        padding: '2% 16%',
        zIndex: 1
    },
    wrapper: {

    },
    topDisplay: {
        minHeight: 345,
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        position: "relative",
        borderRadius: 8,
        zIndex: 0
    },
    register: {
        padding: 24
    },
    responsive: {
        position: 'absolute',
        width: "100%",
        height: "70vh",
        WebkitFilter: "blur(20px)",
        backdropFilter: 'blur(10px) brightness(0.10)',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        // borderRadius: 8
    },
    image: {
        width: '100%',
        height: '0',
        paddingTop: '56.25%', // 16:9,
    },
    detailWrapper: {
        padding: '48px 24px',
        [theme.breakpoints.down('md')]: {
            padding: '48px 24px',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '48px 24px',
        },
        [theme.breakpoints.down('xs')]: {
            padding: 8,
        },
    },
    circularProgress: {
        position: "absolute",
        top: "50%",
        left: "50%",
    },
    centered: {
        position: "absolute",
        top: "50%",
        left: "30%",
        maxWidth: "512px",
        transform: `translate(-${50}%, -${50}%)`,
        [theme.breakpoints.only('sm')]: {
            width: "50%",
            height: "50%",
        },
        [theme.breakpoints.only('md')]: {
            width: "60%",
            height: "60%",
            top: "50%",
            left: "33%",
        },
    },
    paper1: {
        padding: theme.spacing(2),
        textAlign: 'left',
        width: "100%",
        height: "70%",
        [theme.breakpoints.only('sm')]: {

            width: "100%",
            height: "70%",
        },
        [theme.breakpoints.only('md')]: {
            width: "80%",
            height: "80%",
        },
    },
    typo1: {
        [theme.breakpoints.only('sm')]: {
            fontSize: "8pt",
        },
        [theme.breakpoints.only('md')]: {
            fontSize: "9pt",
        },
    },
    typo2: {
        marginTop: 20,
        [theme.breakpoints.only('sm')]: {
            fontSize: "6pt",
            marginTop: 0,
        },
        [theme.breakpoints.only('md')]: {
            fontSize: "9pt",
            marginTop: 0,
        },
    },
    typo3: {
        [theme.breakpoints.only('sm')]: {
            fontSize: "6pt",
        },
        [theme.breakpoints.only('md')]: {
            fontSize: "8pt",
            marginTop: 0,
        },
    },

    typo4: {
        [theme.breakpoints.only('sm')]: {
            fontSize: "6pt",
            marginTop: 0,
            top: -30,
            left: 140
        },

        [theme.breakpoints.only('md')]: {
            fontSize: "8pt",
            marginTop: 10,
        },
    },
    icon: {
        position: "relative",
        top: 5
    },
    body: {
        padding: 20,
    },
    eventName: {
        color: "#000054",
        fontSize: "20pt",
        marginBottom: 7
    },
    eventDescription: {
        fontSize: "14pt"
    },
    eventType: {
        marginTop: 3,
        fontSize: "14pt"
    },
    eventMode: {
        marginTop: 3,
        fontSize: "14pt"
    },
    eventLocation: {
        marginTop: 3,
        fontSize: "14pt"
    },
    eventLanguage: {
        marginTop: 3,
        fontSize: "14pt"
    },
    eventRegistrationCloseDate: {
        marginTop: 3,
        fontSize: "14pt"
    },
    eventAccommodation: {
        marginTop: 3,
        fontSize: "14pt"
    },
    eventActivities: {
        color: "#000054",
        fontSize: "20pt",
        marginTop: 7
    },
    tableText: {
        fontSize: "14pt"
    },
    eventTags: {
        color: "#000054",
        fontSize: "20pt",
        marginTop: 7
    },
    mt36: {
        marginTop: 36
    },
    chip: {
        backgroundColor: "#000054",
        color: "#fff",
        margin: theme.spacing(0.5),
    },
    chipContainer: {
        root: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(0.5),
            },
        },
    },
    form: {
        color: "#000054",
        fontSize: "20pt",
        marginTop: 7
    },
    textField: {
        marginTop: 7
    },
    registerButton: {
        marginTop: 20,
        backgroundColor: "red",
        '&:hover': {
            backgroundColor: '#a2001c',
        }
    },
    errorStyle: {
        color: "red",
        fontSize: 11
    },

    academicField: {
        marginLeft: theme.spacing(2),
        marginTop: -4

    }
}))