
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve CSS files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Custom middleware to check working hours
function workingHoursMiddleware(req, res, next) {
    const now = new Date();

    const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Lagos',
        weekday: 'long',
        hour: '2-digit',
        hourCycle: 'h23'
    }).formatToParts(now);

    const day = parts.find(p => p.type === 'weekday').value;
    const hour = Number(parts.find(p => p.type === 'hour').value);

    const workingDays = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
    ];

    if (workingDays.includes(day) && hour >= 9 && hour < 17) {
        next();
    } else {
        res.status(403).send(`
            <h1>We're currently closed</h1>
            <p>Visit us Monday to Friday, from 9 AM to 5 PM.</p>
        `);
    }
}

app.use(workingHoursMiddleware);

// Home page
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Home | George Solutions</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <nav>
                <a class="logo" href="/">George Solutions</a>
                <div class="nav-links">
                    <a href="/">Home</a>
                    <a href="/services">Our Services</a>
                    <a href="/contact">Contact Us</a>
                </div>
            </nav>
            <main class="hero">
                <p class="tag">WELCOME TO GEORGE SOLUTIONS</p>
                <h1>We help your business grow.</h1>
                <p>We build modern digital solutions for businesses.</p>
                <a class="button" href="/services">Explore Our Services</a>
            </main>
            <footer>Copyright 2026 George Solutions</footer>
        </body>
        </html>
    `);
});

// Services page
app.get('/services', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Our Services | George Solutions</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <nav>
                <a class="logo" href="/">George Solutions</a>
                <div class="nav-links">
                    <a href="/">Home</a>
                    <a href="/services">Our Services</a>
                    <a href="/contact">Contact Us</a>
                </div>
            </nav>
            <main class="content">
                <h1>Our Services</h1>
                <section class="cards">
                    <article class="card">
                        <h2>Web Development</h2>
                        <p>Modern, responsive websites.</p>
                    </article>
                    <article class="card">
                        <h2>UI Design</h2>
                        <p>Simple and user-friendly designs.</p>
                    </article>
                    <article class="card">
                        <h2>Technical Support</h2>
                        <p>Help with technical problems.</p>
                    </article>
                </section>
            </main>
            <footer>Copyright 2026 George Solutions</footer>
        </body>
        </html>
    `);
});

// Contact page
app.get('/contact', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Contact Us | George Solutions</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <nav>
                <a class="logo" href="/">George Solutions</a>
                <div class="nav-links">
                    <a href="/">Home</a>
                    <a href="/services">Our Services</a>
                    <a href="/contact">Contact Us</a>
                </div>
            </nav>
            <main class="content">
                <h1>Contact Us</h1>
                <div class="card">
                    <p>Email: hello@example.com</p>
                    <p>Working hours: Monday–Friday, 9 AM–5 PM</p>
                </div>
            </main>
            <footer>Copyright 2026 George Solutions</footer>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
