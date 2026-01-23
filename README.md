# Maybank Statement Converter

A free, privacy-focused web application that converts Maybank bank and credit card statements from PDF to CSV or Excel format. All processing happens locally in your browser - no data is uploaded to any server.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://maybankconverter.raziman.online)
[![Next.js](https://img.shields.io/badge/Next.js-15.3-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

## Features

- **100% Private & Secure** - All file processing happens locally in your browser. Your financial data never leaves your device
- **Dual Format Support** - Handles both Maybank bank statements and credit card statements
- **Multiple Export Formats** - Download as CSV (for financial software) or Excel (XLSX) format
- **Fast Processing** - Instant conversion with no server delays
- **Mobile Friendly** - Works seamlessly on desktop, tablet, and mobile devices
- **Drag & Drop** - Easy file upload with drag and drop support

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **UI Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **PDF Processing:** [pdf-parse](https://www.npmjs.com/package/pdf-parse)
- **Excel Export:** [xlsx](https://www.npmjs.com/package/xlsx)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- **Analytics:** Google Tag Manager integration
- **Deployment:** [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 20+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone git@github.com:raziman18/maybankconverter.git
cd maybankconverter
```

2. Install dependencies:
```bash
yarn install
# or
npm install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
yarn dev
# or
npm run dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
yarn build
yarn start
```

## Privacy & Security

- **No Server Upload**: All processing happens entirely in the browser using client-side JavaScript
- **No Data Storage**: Files are never stored or logged anywhere
- **Local Processing**: Your financial data remains on your device at all times
- **Open Source**: Code is publicly available for transparency and audit


## License

This project is licensed under the GNU General Public License v3.0 (GPLv3) - see the [LICENSE](LICENSE) file for details.

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

## Author

**Raziman**

- Blog: [raziman.online](https://raziman.online/)
- Related Article: [Maybank Bank Statement Converter](https://raziman.online/maybank-bank-statement-converter/)

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- PDF parsing powered by [pdf-parse](https://www.npmjs.com/package/pdf-parse)
- Excel generation by [SheetJS](https://sheetjs.com/)

## Disclaimer

This tool is provided "as is" without warranty of any kind. Users should verify the accuracy of converted data. Not affiliated with or endorsed by Maybank. For personal use only.

---

**Live Demo:** [maybankconverter.raziman.online](https://maybankconverter.raziman.online)
