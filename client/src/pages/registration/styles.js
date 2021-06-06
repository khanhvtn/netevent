import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        scrollBehavior: "smooth"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        position: "relative"
    },

    responsive: {
        width: "100%",
        maxHeight: "450px",
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
        color: "#000054",
        fontSize: "20pt",
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
        marginTop: 20,
        backgroundColor: "red",
        '&:hover': {
            backgroundColor: '#a2001c',
        },
        [theme.breakpoints.only('sm')]: {
            fontSize: "6pt",
            marginTop: 0,
            top: -20,
            left: 80
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
        padding: theme.spacing(5),
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
    chip: {
        fontSize: "14pt",
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
    }
}))