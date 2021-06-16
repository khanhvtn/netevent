const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert({
        type: process.env.TYPE || require(`../serviceAccountKey.json`).type,
        project_id:
            process.env.PROJECT_ID ||
            require(`../serviceAccountKey.json`).project_id,
        private_key_id:
            process.env.PROJECT_KEY_ID ||
            require(`../serviceAccountKey.json`).private_key_id,
        private_key:
            process.env.PRIVATE_KEY.replace(/\\n/g, '\n') ||
            require(`../serviceAccountKey.json`).private_key,
        client_email:
            process.env.CLIENT_EMAIL ||
            require(`../serviceAccountKey.json`).client_email,
        client_id:
            process.env.CLIENT_ID ||
            require(`../serviceAccountKey.json`).client_id,
        auth_uri:
            process.env.AUTH_URI ||
            require(`../serviceAccountKey.json`).auth_uri,
        token_uri:
            process.env.TOKEN_URI ||
            require(`../serviceAccountKey.json`).token_uri,
        auth_provider_x509_cert_url:
            process.env.AUTH_PROVIDER_X509_CERT_URL ||
            require(`../serviceAccountKey.json`).auth_provider_x509_cert_url,
        client_x509_cert_url:
            process.env.CLIENT_X509_CERT_URL ||
            require(`../serviceAccountKey.json`).client_x509_cert_url,
    }),
    storageBucket: 'gs://netevent-b5dd4.appspot.com',
});

exports.bucketInstance = admin.storage().bucket();
