# Personal CV Website

A modern, attractive website that tells your story and showcases your CV.

## Features

- **Beautiful Design**: Modern gradient hero section with smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Scrolling**: Elegant navigation between sections
- **Interactive Elements**: Hover effects, animations, and transitions
- **Story Timeline**: Visual timeline to tell your personal story
- **Professional CV Section**: Well-organized CV layout with sidebar
- **Skills Showcase**: Interactive skill tags
- **Contact Form**: Get in touch section with form

## Customization Guide

### 1. Personal Information

Edit `index.html` and replace the following placeholders:

- **Name**: Replace "Your Name" in the hero section and footer
- **Email**: Replace "your.email@example.com" in contact sections
- **Phone**: Replace "+1 (555) 123-4567" with your phone number
- **Location**: Replace "Your City, Country" with your location
- **LinkedIn**: Update the LinkedIn profile URL

### 2. Your Story

In the "My Story" section, customize the three timeline items:
- The Beginning
- Growth & Learning
- Current Chapter

Replace the placeholder text with your actual story.

### 3. CV Content

Update the CV section with your real information:
- **Professional Summary**: Your career overview
- **Work Experience**: Add your job history
- **Education**: Your educational background
- **Certifications**: Your professional certifications

### 4. Skills

Update the skills section with your actual skills:
- **Technical Skills**: Your technical expertise
- **Soft Skills**: Your interpersonal skills
- **Languages**: Languages you speak

### 5. Profile Photo

Replace the SVG placeholder with your actual photo:
- Add an `<img>` tag in the `.image-placeholder` and `.photo-placeholder` divs
- Or update the SVG to match your style

### 6. Colors

To change the color scheme, edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;  /* Main brand color */
    --secondary-color: #8b5cf6; /* Secondary color */
    /* ... other colors */
}
```

## How to Use

1. Open `index.html` in a web browser
2. Customize the content with your information
3. For local development, you can use a simple HTTP server:
   ```bash
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Feel free to use and modify this template for your personal website!
