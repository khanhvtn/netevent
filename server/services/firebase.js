const admin = require('firebase-admin');
const serviceAccountKey = require(`../serviceAccountKey.json`);

admin.initializeApp({
    credential: admin.credential.cert({
        type: process.env.TYPE || serviceAccountKey.type,
        project_id: process.env.PROJECT_ID || serviceAccountKey.project_id,
        private_key_id:
            process.env.PROJECT_KEY_ID || serviceAccountKey.private_key_id,
        private_key: process.env.PRIVATE_KEY || serviceAccountKey.private_key,
        client_email:
            process.env.CLIENT_EMAIL || serviceAccountKey.client_email,
        client_id: process.env.CLIENT_ID || serviceAccountKey.client_id,
        auth_uri: process.env.AUTH_URI || serviceAccountKey.auth_uri,
        token_uri: process.env.TOKEN_URI || serviceAccountKey.token_uri,
        auth_provider_x509_cert_url:
            process.env.AUTH_PROVIDER_X509_CERT_URL ||
            serviceAccountKey.auth_provider_x509_cert_url,
        client_x509_cert_url:
            process.env.CLIENT_X509_CERT_URL ||
            serviceAccountKey.client_x509_cert_url,
    }),
    storageBucket: 'gs://netevent-b5dd4.appspot.com',
});

exports.bucketInstance = admin.storage().bucket();
