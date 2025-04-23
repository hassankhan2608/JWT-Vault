# JWT Vault <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/key.svg" width="28" align="center" alt="Key Icon" />

A professional-grade JWT secret generator built with security and privacy at its core. Generate cryptographically secure JWT secrets directly in your browser with zero server-side processing.

<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/shield-check.svg" width="80" alt="Shield Check Icon" />
  
  ![License](https://img.shields.io/badge/license-MIT-blue.svg)
  ![Security](https://img.shields.io/badge/security-100%25_client_side-brightgreen.svg)
  ![Built with](https://img.shields.io/badge/built_with-Next.js_13-black.svg)
</div>

## ✨ Features

### 🔒 Security First

- **100% Client-Side Processing**
  - All computation happens in your browser
  - No server requests
  - Zero data storage
  - Complete privacy

### 🛡️ Cryptographic Security

- Leverages Web Crypto API
- True random number generation
- Industry-standard algorithms

### 🎨 Modern & Intuitive

- Real-time strength analysis
- Visual entropy feedback
- Customizable generation options
- Accessible interface

## 🚀 Secret Generation Options

### Formats

- 📝 Base64 (URL Safe)
- 🔢 Hexadecimal
- 🆔 UUID v4

### Customization

- 📏 Adjustable length (8-512 characters)
- 🔤 Character set selection
- 💪 Strength indicators
- 🎯 Entropy calculation

## 🛠️ Technical Stack

### Core Technologies

- ⚛️ Next.js 13 (App Router)
- 🎨 Tailwind CSS
- 🧩 shadcn/ui
- ✨ Framer Motion
- 📦 TypeScript

### UI Components

- 🎭 Dark mode by default
- 🖌️ Custom animations
- 📱 Responsive design
- ♿ ARIA-compliant

## 💻 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔐 Best Practices for JWT Secrets

1. **Length Matters**

   - Minimum 32 characters
   - More length = more security

2. **Uniqueness is Key**

   - Generate new secrets per project
   - Never reuse across environments

3. **Randomness Rules**

   - Avoid patterns
   - Skip meaningful words
   - Trust the generator

4. **Secure Storage**

   - Use environment variables
   - Never commit secrets
   - Implement secret management

5. **Regular Rotation**
   - Plan rotation schedules
   - Automate when possible
   - Maintain version control

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🌟 About

JWT Vault is maintained by StackBlitz. It was created to provide developers with a secure, user-friendly tool for generating JWT secrets.

<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/lock.svg" width="40" alt="Lock Icon" />
  
  Built with ❤️ by StackBlitz
</div>
