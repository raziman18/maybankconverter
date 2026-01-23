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

## Project Structure

```
maybankconverter/
├── public/              # Static assets (icons, images)
├── src/
│   ├── app/            # Next.js app directory
│   │   ├── page.tsx    # Home page with SEO metadata
│   │   ├── layout.tsx  # Root layout
│   │   ├── globals.css # Global styles
│   │   ├── FileConverter.tsx    # Main converter component
│   │   ├── disclaimer/          # Legal disclaimer page
│   │   └── report-issue/        # Issue reporting page
│   ├── utils/
│   │   └── parseStatement.ts    # PDF parsing logic
│   └── tests/          # Test PDF files
│       ├── credit/     # Sample credit card statements
│       └── debit/      # Sample bank statements
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.ts
└── README.md
```

## How It Works

1. **Upload**: User uploads a Maybank PDF statement (bank or credit card)
2. **Detection**: System automatically detects statement type (credit card vs bank account)
3. **Parsing**: PDF is parsed using `pdf-parse` to extract transaction data
4. **Processing**: Transaction data is organized into structured format
5. **Export**: User can download the data as CSV or Excel file

### Key Components

- **`FileConverter.tsx`**: Main UI component handling file upload, processing, and download
- **`parseStatement.ts`**: Core parsing logic that extracts transaction data from PDFs
- **`isCreditCard()`**: Detects if the statement is a credit card statement
- **`parseCreditCardStatement()`**: Parses credit card transactions
- **`parseStatement()`**: Parses bank account transactions

## Privacy & Security

- **No Server Upload**: All processing happens entirely in the browser using client-side JavaScript
- **No Data Storage**: Files are never stored or logged anywhere
- **Local Processing**: Your financial data remains on your device at all times
- **Open Source**: Code is publicly available for transparency and audit

## Data Format

### Bank Statement Output (CSV/Excel)

| Date | Details | Amount | Balance |
|------|---------|---------|---------|
| 01/01/2026 | Transaction description | -100.00 | 5,000.00 |

### Credit Card Statement Output (CSV/Excel)

| Post Date | Tx Date | Description | Amount | Sign |
|-----------|---------|-------------|---------|------|
| 01/01/2026 | 30/12/2025 | Purchase details | 100.00 | - |

## Testing

Test PDF files are included in the `src/tests/` directory:
- `src/tests/credit/` - Sample credit card statements
- `src/tests/debit/` - Sample bank statements

## Contributing

Contributions are welcome! If you find a bug or have a feature request:

1. Check existing issues or create a new one
2. Fork the repository
3. Create a feature branch (`git checkout -b feature/amazing-feature`)
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

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

**Live Demo:** [maybankconverter.vercel.com](https://maybankconverter.raziman.online)
