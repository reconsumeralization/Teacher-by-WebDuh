# Course Management System

A modern, accessible course management system built with Next.js, TypeScript, and Tailwind CSS. This system provides teachers with a comprehensive platform to manage their courses, create interactive content, and engage with students.

## Features

### Course Management
- Create and manage courses
- Organize course content into modules
- Track student progress
- Manage course settings and configurations

### Interactive Content
- Embed external resources and tools
- Create interactive visualizations
- Support for various content types (text, video, code, etc.)
- Real-time collaboration features

### Communication Tools
- Course announcements with scheduling
- Discussion forums with moderation tools
- Student progress tracking
- Direct messaging system

### Assessment Tools
- Create and manage assessments
- Grade tracking
- Progress reports
- Analytics dashboard

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Hooks
- **UI Components**: Radix UI primitives
- **Authentication**: NextAuth.js
- **Database**: (To be implemented)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/reconsumeralization/Teacher-by-WebDuh.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add necessary environment variables.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes
│   └── teacher/           # Teacher-specific routes
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── teacher/          # Teacher-specific components
├── lib/                   # Utility functions and configurations
└── styles/               # Global styles and Tailwind configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
