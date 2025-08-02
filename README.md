<img width="3188" height="1202" alt="frame (3)" src="https://github.com/user-attachments/assets/517ad8e9-ad22-457d-9538-a9e62d137cd7" />

# Mood Spoiler 🤖

## Basic Details

### Team Name: Polar Express

### Team Members
- Team Lead: Muhammed Ajzal - TKM College of Engineering
- Member 2: Athira Harikumar - TKM College of Engineering

### Project Description
Mood Spoiler is an AI-powered chat app that uses your webcam to guess your real emotion—then responds with the exact opposite mood, spiced with humor or sarcasm! Try to be happy? It’ll bring the rain! Feeling sad? It’ll annoy you with cheer.

### The Problem (that doesn't exist)
Too many chatbots are supportive, positive, or logical. But what about those times you need your happiness ruined, or your sadness mocked? Sometimes, we just crave a villain to spoil our mood for no reason at all.

### The Solution (that nobody asked for)
Mood Spoiler Bot! Uses AI and real-time facial detection to sense your feelings and—out of pure mischief—serve responses that are 100% the opposite. Happy? Prepare to be grumpy. Sad? We’re sending confetti... sarcastically!

## Technical Details

### Technologies/Components Used

For Software:
- Languages: TypeScript, JavaScript
- Frameworks: React (Vite)
- Libraries: face-api.js (for webcam emotion detection), Hugging Face Inference API (GLM-4.5 LLM), TailwindCSS (UI)
- Tools: npm, VSCode, GitHub

For Hardware:
- Webcam (to capture your face and annoy you)
- Laptop or desktop (with browsers, because facial sarcasm needs the cloud!)

### Implementation

For Software:
# Setup API Token

This project uses the **Hugging Face Chat Completions API**, which requires an API token.

1. Create a `.env` file in the project root (same folder as `package.json`)
2. Add your token to `.env`:
```
VITE_HF_TOKEN=your_huggingface_token_here
```
3. Get a free Hugging Face token here: https://huggingface.co/settings/tokens (choose **Read** role for inference)
4. **Important:** Restart your dev server after modifying `.env`



# Installation
```bash
git clone https://github.com/yourusername/mood-spoiler.git
cd mood-spoiler
npm install
```

# Run
```bash
# For Vite
npm run dev

# For Create React App
npm start
```

### Project Documentation

# Screenshots

![Live Mood Detection](/assets/detection.png)
*Live webcam view showing detected emotion*

![Chat UI](/assets/chat.png)
*Snarky bot response—opposite to the detected mood—in action!*

![Mood Mismatch](/assets/Mismatch.png)
*Bot calling out a mismatch between user’s words and neutral face*

# Diagrams

![Workflow](/assets/workflow.png)
For Hardware:

# Schematic & Circuit

*Not applicable*

# Build Photos

![Final](/assets/Final.png)

### Project Demo

# Video
[[Video Link](https://drive.google.com/file/d/1kaLyh-s5DMNdbjFzG4dOWZzWujPadLIO/view?usp=sharing)]


## Team Contributions
Muhammed Ajzal - Created the Proj
Athira Harikumar

Made with ❤️ and a little bit of evil at TinkerHub Useless Projects

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--25-25?link=https%3A%2F%2Fwww.tinkerhub.org%2Fevents%2FQ2Q1TQKX6Q%2FUseless%2520Projects)

[1] https://github.com/user-attachments/assets/517ad8e9-ad22-457d-9538-a9e62d137cd7
