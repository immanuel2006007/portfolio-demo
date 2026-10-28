export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  client: string;
  date: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  tags: string[];
}

export interface Achievement {
  id: string;
  title: string;
  position: string;
  quote: string;
  image: string;
  year: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  highlight: boolean;
}

export const PERSONAL_INFO = {
  name: "Immanuel Jayaruban P",
  title: "Creative Technologist & Full Stack Developer",
  shortTitle: "CREATIVE TECHNOLOGIST",
  est: "EST. 2025",
  location: "Coimbatore, Tamil Nadu, India",
  locationShort: "BASED IN INDIA • WORLDWIDE",
  email: "immanuel2006007@gmail.com",
  phone: "+91 72002 50544",
  address: "10/1/6, JJ Illam, E.B Colony, Phase-2, V.G Rao Nagar, Ganapathy, Coimbatore-06",
  hours: "Monday - Friday: 9am - 10pm",
  cvUrl: "https://drive.google.com/file/d/1jkARayq1nnvE5EOPSNrwSTKKmx-PPQJx/view?usp=sharing",
  whatsappUrl: "https://wa.me/qr/HNV2IBII3U3IL1",
  socials: {
    github: "https://github.com/immanuel2006007",
    linkedin: "https://www.linkedin.com/in/immanuel-jayaruban-p180306",
    twitter: "https://x.com/jayarubanXy?t=6ZRNmtDNPB4hxPjEtSkuQA&s=09",
    instagram: "https://www.instagram.com/_immanuel_jr_77?igsh=d3E4Zjc1dGZyM2o=",
  },
  bioShort: "I AM PASSIONATE ABOUT CREATING WEBSITES THAT STAND OUT FROM THE CROWD",
  bioEditorial: "I SPECIALIZE IN BUILDING BESPOKE DIGITAL PRODUCTS WHERE PURPOSEFUL EDITORIAL DESIGN MEETS ROBUST ENGINEERING. CREATING EXPERIENCES WITH INTENTIONAL MOTION, SYSTEMATIC RIGOR, AND MEASURABLE IMPACT.",
  visionStatement: "TURNING VISIONARY IDEAS INTO FAST, DISTINCTIVE DIGITAL EXPERIENCES",
};

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "AI VOICE ASSISTANT",
    subtitle: "Local LLM Inference with Ollama & Speech Recognition",
    category: "AI & Voice Interfaces",
    client: "Personal Project",
    date: "May 2025",
    description: "A powerful offline-capable voice assistant built using Python and Ollama for local large language model inference (LLaMA & Mistral). Operates entirely without cloud dependency, listening through real-time SpeechRecognition and responding via natural Text-to-Speech synthesis.",
    technologies: ["Python", "Ollama", "LLaMA 3", "SpeechRecognition", "gTTS", "Pyttsx3", "Flask"],
    image: "/assets/voice assistant.png",
    githubUrl: "https://github.com/immanuel2006007/Voice-assistant-chatbot",
    tags: ["Artificial Intelligence", "Local LLM", "Voice Pipeline"]
  },
  {
    id: "project-2",
    title: "SONG VOICE ASSISTANT",
    subtitle: "Intelligent Spotify API Voice Audio Controller",
    category: "AI & Voice Applications",
    client: "Personal Project",
    date: "April 2025",
    description: "An intelligent voice-controlled assistant integrating Spotify API for real-time music playback control, playlist discovery, and track analysis using natural conversational voice commands and responsive UI.",
    technologies: ["Python", "SpeechRecognition", "Spotify Web API", "Tkinter", "PyAudio"],
    image: "/assets/songs.png",
    githubUrl: "https://github.com/immanuel2006007/Music-voice-assistant",
    liveUrl: "https://spotify-voice-assistant.vercel.app/",
    tags: ["Audio Engineering", "Voice Command", "Spotify API"]
  },
  {
    id: "project-3",
    title: "SIGN VISION AI",
    subtitle: "Real-Time Deep Learning Computer Vision Translator",
    category: "AI & Computer Vision",
    client: "Academic Capstone",
    date: "May 2025",
    description: "An assistive computer vision system that detects and interprets sign language gestures in real time using webcam video streams and Convolutional Neural Networks (CNN), promoting communication accessibility.",
    technologies: ["Python", "OpenCV", "TensorFlow", "MediaPipe", "CNN", "Keras"],
    image: "/assets/sign1.jpg",
    githubUrl: "https://github.com/immanuel2006007/sign-language-detection",
    tags: ["Computer Vision", "Accessibility", "Deep Learning"]
  },
  {
    id: "project-4",
    title: "TRAVEL VOYAGE",
    subtitle: "Dynamic Destination Explorer & Itinerary Curator",
    category: "Web Development",
    client: "GlobalVoyage Co.",
    date: "May 2025",
    description: "A curated travel guide platform designed to help users discover worldwide destinations, plan multi-stop trips, and experience interactive maps and personalized itineraries.",
    technologies: ["HTML5", "CSS3", "JavaScript", "MySQL", "PHP", "Mapbox"],
    image: "/assets/travel.png",
    githubUrl: "https://github.com/immanuel2006007/Travel-guide",
    liveUrl: "https://travel-guide-delta-pied.vercel.app/",
    tags: ["Full Stack", "Geospatial", "Travel UI"]
  },
  {
    id: "project-5",
    title: "PLAGIARISM CHECKER",
    subtitle: "NLP-Powered Text Similarity & Diff Highlighting",
    category: "Web App & NLP",
    client: "Academic Project",
    date: "May 2025",
    description: "A lightweight web-based plagiarism detection tool built using Python and difflib NLP algorithms, comparing student submissions against reference corpora with live visual difference highlights.",
    technologies: ["Python", "HTML5", "CSS3", "JavaScript", "difflib", "NLP"],
    image: "/assets/plagiarism.png",
    githubUrl: "https://github.com/immanuel2006007/plagiarism-checker",
    liveUrl: "https://plagiarism-checker-cyan.vercel.app/",
    tags: ["NLP", "Algorithm Design", "Text Analytics"]
  },
  {
    id: "project-6",
    title: "FACE GREETING SYSTEM",
    subtitle: "Biometric Facial Recognition & Instant Greeting UI",
    category: "Web App & Biometrics",
    client: "Academic Project",
    date: "May 2025",
    description: "A smart web application utilizing facial recognition to detect and identify registered visitors in real time via browser webcam, delivering personalized greetings with MongoDB database storage.",
    technologies: ["React", "Node.js", "MongoDB", "face-api.js", "Express"],
    image: "/assets/face-gt.png",
    githubUrl: "https://github.com/immanuel2006007/Face-Greeting-",
    tags: ["Facial Biometrics", "React", "Full Stack"]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-1",
    title: "DEPARTMENT CHAIRMAN",
    position: "Department of Artificial Intelligence & Data Science",
    quote: "Elected as Chairman of the AI & Data Science Department through consistent involvement in academic excellence, student engagement leadership, and technical symposium orchestration.",
    image: "/assets/Secretary.jpg",
    year: "2024–2025"
  },
  {
    id: "ach-2",
    title: "FIRST RANK HOLDER",
    position: "III B.Sc Computer Science (AI & Data Science)",
    quote: "Achieved the prestigious First Rank across the entire department by maintaining top academic rigor, consistent problem-solving discipline, and deep mastery of computer science fundamentals.",
    image: "/assets/1st Rank.jpg",
    year: "2024–2025"
  },
  {
    id: "ach-3",
    title: "CLASS REPRESENTATIVE",
    position: "III B.Sc Computer Science (AI & Data Science)",
    quote: "Served as elected student representative, actively bridging the communication between faculty and students while coordinating technical workshops and community hackathons.",
    image: "/assets/Rep.jpg",
    year: "2023–2024"
  }
];

export const SERVICES: Service[] = [
  {
    id: "srv-1",
    number: "1",
    title: "UI/UX & EDITORIAL DESIGN",
    subtitle: "Bespoke digital architecture, typography & interaction design",
    description: "Crafting distinct editorial digital identities and frictionless interfaces that resonate with users and elevate brand equity. Every layout is governed by modular grid systems, purposeful micro-interactions, and visual clarity.",
    deliverables: ["FIGMA DESIGN SYSTEMS", "WIREFRAMING & USER FLOWS", "INTERACTIVE PROTOTYPES", "EDITORIAL TYPOGRAPHY"],
    highlight: false
  },
  {
    id: "srv-2",
    number: "2",
    title: "FULL STACK WEB DEVELOPMENT",
    subtitle: "Modern React, Next.js, Node.js & high-performance engineering",
    description: "Developing scalable, lightning-fast web applications built on modern frameworks. Implementing bulletproof TypeScript architecture, smooth inertial motion systems with GSAP/Lenis, and optimized API layers.",
    deliverables: ["REACT & NEXT.JS APP ROUTER", "TYPESCRIPT CODEBASES", "RESTFUL & GRAPHQL APIS", "TAILWIND CSS & WEBGL/3D"],
    highlight: false
  },
  {
    id: "srv-3",
    number: "3",
    title: "AI & INTELLIGENT AGENTS",
    subtitle: "Local LLMs, Voice Interfaces & Computer Vision Systems",
    description: "High-converting editorial landing pages and intelligent software systems tailored for startups, product launches, and personal brands. Engineered to capture attention, boost engagement, and automate complex workflows with offline LLMs (Ollama) and voice technology.",
    deliverables: ["LOCAL LLM PIPELINES (OLLAMA)", "VOICE & SPEECH RECOGNITION", "OPENCV COMPUTER VISION", "SECURE DATA ARCHITECTURES"],
    highlight: true
  }
];

