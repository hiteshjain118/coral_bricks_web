# Coral Bricks AI - Website

A modern, professional website for Coral Bricks AI infrastructure platform, built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional design with coral and brick color scheme
- **Responsive**: Fully responsive design that works on all devices
- **Animations**: Smooth animations using Framer Motion
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Legal Pages**: Comprehensive Privacy Policy and Terms of Service
- **Contact Form**: Functional contact form with validation
- **Infrastructure Focus**: Content focused on AI agent and web app deployment platform
- **Chat Interface Integration**: Emphasis on chat interface development workflow

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **Heroicons** - Beautiful SVG icons
- **Headless UI** - Accessible UI components

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.tsx      # Navigation component
│   └── Footer.tsx      # Footer component
├── pages/              # Page components
│   ├── Home.tsx        # Homepage
│   ├── About.tsx       # About page
│   ├── Services.tsx    # Services page
│   ├── Contact.tsx     # Contact page
│   ├── PrivacyPolicy.tsx # Privacy Policy
│   └── TermsOfService.tsx # Terms of Service
├── App.tsx             # Main app component
├── index.tsx           # App entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎨 Design System

### Colors
- **Coral**: Primary brand color (#e15a3a)
- **Brick**: Secondary brand color (#c23d3d)
- **Gray**: Neutral colors for text and backgrounds

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- Custom button styles with hover effects
- Responsive grid layouts
- Consistent spacing and padding
- Smooth transitions and animations

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd coralbricks
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (not recommended)

## 📄 Legal Pages

### Privacy Policy
Comprehensive privacy policy covering:
- Data collection and usage
- AI and machine learning data handling
- User rights and choices
- Security measures
- International data transfers
- Compliance with data protection regulations

### Terms of Service (EULA)
End User License Agreement covering:
- License grant and restrictions
- Acceptable use policy
- Intellectual property rights
- Payment terms
- Liability limitations
- Termination conditions
- Dispute resolution

## 🎯 Pages Overview

### Home
- Hero section with "Reliable Infrastructure for Modern Makers" theme
- Feature highlights focused on AI agent infrastructure and chat interface development
- Call-to-action sections for building and deploying
- Modern gradient backgrounds

### About
- Infrastructure platform story and mission
- Team member profiles focused on infrastructure and developer experience
- Core values for modern makers
- Platform statistics and capabilities

### Services
- Infrastructure platform offerings (AI agents, web apps, APIs)
- Simple deployment process from chat interface
- Application types supported
- Platform features and benefits

### Contact
- Contact form with validation
- Company contact information
- FAQ section
- Business hours and location

## 🔧 Customization

### Colors
Update the color scheme in `tailwind.config.js`:
```javascript
colors: {
  coral: {
    // Custom coral color palette
  },
  brick: {
    // Custom brick color palette
  }
}
```

### Content
- Update company information in components
- Modify service offerings in `Services.tsx`
- Update contact details in `Contact.tsx`
- Customize legal content in Privacy Policy and Terms of Service

### Styling
- Modify component styles in individual files
- Update global styles in `src/index.css`
- Add new Tailwind utilities as needed

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your GitHub repository
- **AWS S3**: Upload build files to S3 bucket
- **GitHub Pages**: Use gh-pages package

## 📞 Support

For questions or support, contact:
- Email: hello@coralbricks.ai
- Phone: +1 (555) 123-4567

## 📄 License

This project is proprietary to Coral Bricks AI. All rights reserved.

## 🔄 Updates

- **v1.0.0** - Initial release with all core pages
- Professional design and branding
- Legal compliance documentation
- Responsive and accessible design
