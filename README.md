# INTRAVERSE - Premium Tech Solutions

A bold, futuristic, and minimalist website for INTRAVERSE, showcasing premium technology services in a dark-themed, cinematic layout. The website features a grid-based services section, an elegant "Who We Are" section, and a sophisticated contact form with Supabase database integration.

## Features

- **Minimalist Dark Theme**: Sleek black, white, and grey color scheme for a premium tech aesthetic
- **Pixelated Cursor**: Custom 8x8 pixel cursor that changes size on interactive elements
- **Animated Cursor Trail**: Elegant background cursor animation that follows mouse movement  
- **Interactive Services Grid**: 2x3 grid layout with hover animations revealing tech stack information
- **Enhanced About Section**: Modern grid layout with statistics showcasing company achievements
- **Logo Glitch Effect**: Subtle visual glitch animation when hovering over the INTRAVERSE logo
- **Responsive Design**: Fully mobile-optimized from smartphones to desktop screens
- **Supabase Integration**: Contact form with data storage capabilities in Supabase
- **Optimized Typography**: Monospace font styling with careful attention to readability
- **Optimized Footer**: 70% width message on left with copyright information and location details

## Tech Stack

- HTML5
- CSS3 (with custom animations and transitions)
- JavaScript (vanilla)
- Supabase (for contact form data storage)
- Tailwind CSS (utility classes)
- Framer Motion (for animations)

## Setup

1. Clone the repository
2. Open `index.html` in your browser for local development
3. To enable form submissions, set up a Supabase project:
   - Create a free account at [supabase.io](https://supabase.io)
   - Create a new table called `inquiries` with the following columns:
     - id (int8) - Primary Key
     - name (text)
     - email (text)
     - phone (text)
     - requirements (text)
     - created_at (timestamptz)
   - Update the `supabaseUrl` and `supabaseKey` in the `js/script.js` file

## Customization

- **Colors**: Edit the CSS variables in the `:root` section of `css/styles.css`
- **Logo**: Replace the logo in the header section of `index.html`
- **Content**: Modify text content in `index.html`
- **Images**: Replace image files in the `images` directory
- **Services**: Add or remove service cards in the services section of `index.html`

## Deployment

1. Upload all files to your web hosting provider
2. Ensure all file paths are correct
3. If using Supabase, update the configuration in `js/script.js` with your production credentials
4. Test the contact form to ensure it's working correctly

## Credits

- INTRAVERSE Tech Solutions
- Built with ❤️ using modern CSS and JavaScript
- Contact: hello@intraverse.tech

---

© 2025 INTRAVERSE. All rights reserved. 