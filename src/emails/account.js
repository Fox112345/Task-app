const sgMail = require('@sendgrid/mail');

// const sendgridAPIkey = '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'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send(
        {
            to: email,
            from: 'fox112345@yandex.ru',
            subject: 'Welcome Email',
            text: `Hello ${name}! Welcome to the app! `
        }
    )
}

const sendDeleteEmail = (email, name) => {
    sgMail.send(
        {
            to: email,
            from: 'fox112345@yandex.ru',
            subject: 'Goodbye Email',
            text: `Goodbye ${name}! Welcome back! `
        }
    )
}

module.exports = {
    sendWelcomeEmail,
    sendDeleteEmail
}