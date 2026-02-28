# Environment Setup

## Required Environment Variables

This project requires OpenAI API credentials to enable the AI chatbot feature.

### Setup Instructions:

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Get your OpenAI API key from: https://platform.openai.com/api-keys

3. Add your API key to `.env.local`:
   ```
   VITE_OPENAI_API_KEY=sk-proj-your-actual-key-here
   ```

### Security Notes:

- **NEVER** commit `.env.local` to version control
- The `.gitignore` file already excludes `*.local` files
- Rotate your API key immediately if accidentally exposed
- Keep your API keys secure and private

### Without API Key:

The app will still function, but the chatbot will display a message that the service is unavailable.
