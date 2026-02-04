import type { OrganonList } from '../types.js';

/**
 * Organon lists — curated concept collections for cross-domain prompting.
 * Adapted from Gunkel's organons via ideonomy-explorer.
 */
export const organonLists: OrganonList[] = [
  {
    id: "emotions",
    name: "Emotions",
    description: "The spectrum of human emotional states — from primal affects to subtle shadings.",
    items: [
      "Love", "Joy", "Fear", "Anger", "Sadness", "Surprise", "Disgust", "Contempt",
      "Curiosity", "Awe", "Hope", "Grief", "Gratitude", "Envy", "Shame", "Pride",
      "Guilt", "Compassion", "Longing", "Nostalgia", "Serenity", "Ecstasy", "Melancholy",
      "Anxiety", "Dread", "Elation", "Tenderness", "Reverence", "Wonder", "Delight",
      "Enthusiasm", "Contentment", "Frustration", "Bewilderment", "Fascination", "Admiration",
      "Anticipation", "Eagerness", "Relief", "Triumph", "Euphoria", "Bliss", "Inspiration",
      "Pity", "Sympathy", "Empathy", "Solidarity", "Warmth", "Passion", "Zeal",
      "Solemnity", "Wistfulness", "Remorse", "Regret", "Humility", "Embarrassment",
      "Apprehension", "Unease", "Restlessness", "Tension", "Trepidation", "Alarm",
      "Horror", "Indignation", "Resentment", "Disillusionment", "Resignation", "Acceptance",
      "Equanimity", "Tranquility", "Mirth", "Amusement", "Playfulness", "Exuberance",
      "Cheerfulness", "Optimism", "Confidence", "Courage", "Determination", "Defiance",
      "Freedom", "Belonging", "Intimacy", "Trust", "Vulnerability", "Openness",
      "Alertness", "Mindfulness", "Presence", "Absorption", "Flow", "Commitment",
    ],
  },
  {
    id: "traits",
    name: "Personality Traits",
    description: "Dimensions of character — the vocabulary of personality across cultures.",
    items: [
      "Resourceful", "Patient", "Courageous", "Analytical", "Creative", "Empathetic",
      "Disciplined", "Curious", "Resilient", "Generous", "Honest", "Humble",
      "Imaginative", "Industrious", "Intuitive", "Kind", "Logical", "Methodical",
      "Observant", "Optimistic", "Passionate", "Perceptive", "Persistent", "Philosophical",
      "Practical", "Principled", "Reflective", "Scholarly", "Sincere", "Steadfast",
      "Strategic", "Tactful", "Tenacious", "Thoughtful", "Versatile", "Visionary",
      "Wise", "Witty", "Adaptable", "Adventurous", "Assertive", "Balanced",
      "Careful", "Collaborative", "Communicative", "Compassionate", "Composed",
      "Conscientious", "Dedicated", "Dependable", "Determined", "Diligent", "Diplomatic",
      "Discerning", "Efficient", "Encouraging", "Ethical", "Focused", "Genuine",
      "Gracious", "Independent", "Innovative", "Insightful", "Inventive",
      "Meticulous", "Open-minded", "Persuasive", "Proactive", "Reliable",
      "Self-aware", "Spontaneous", "Systematic", "Tolerant", "Trustworthy",
    ],
  },
  {
    id: "phenomena",
    name: "Universal Phenomena",
    description: "Cross-domain phenomena that appear in nature, society, and thought.",
    items: [
      "Emergence", "Resonance", "Entropy", "Symbiosis", "Feedback", "Oscillation",
      "Diffusion", "Crystallization", "Erosion", "Catalysis", "Mutation", "Selection",
      "Adaptation", "Convergence", "Divergence", "Equilibrium", "Cascade", "Threshold",
      "Phase transition", "Self-organization", "Turbulence", "Homeostasis", "Hysteresis",
      "Bifurcation", "Synchronization", "Amplification", "Attenuation", "Saturation",
      "Nucleation", "Propagation", "Interference", "Superposition", "Polarization",
      "Friction", "Inertia", "Momentum", "Gravity", "Magnetism", "Radiation",
      "Absorption", "Reflection", "Refraction", "Diffraction", "Convection",
      "Conduction", "Evaporation", "Condensation", "Accretion", "Decay",
      "Reproduction", "Metabolism", "Migration", "Hibernation", "Metamorphosis",
      "Photosynthesis", "Fermentation", "Combustion", "Oxidation", "Fusion",
    ],
  },
  {
    id: "sciences",
    name: "Sciences & Fields",
    description: "Domains of human knowledge — each a lens for seeing differently.",
    items: [
      "Physics", "Biology", "Chemistry", "Mathematics", "Computer Science",
      "Psychology", "Sociology", "Economics", "Philosophy", "Linguistics",
      "Anthropology", "History", "Geography", "Ecology", "Neuroscience",
      "Genetics", "Astronomy", "Geology", "Oceanography", "Meteorology",
      "Architecture", "Engineering", "Medicine", "Law", "Theology",
      "Art History", "Music Theory", "Literature", "Game Theory", "Network Science",
      "Information Theory", "Cybernetics", "Systems Theory", "Complexity Science",
      "Behavioral Economics", "Cognitive Science", "Evolutionary Biology",
      "Quantum Mechanics", "Thermodynamics", "Fluid Dynamics",
      "Epidemiology", "Cryptography", "Materials Science", "Robotics",
      "Artificial Intelligence", "Ethics", "Rhetoric", "Semiotics",
    ],
  },
  {
    id: "activities",
    name: "Human Activities",
    description: "What humans do — from the mundane to the transcendent.",
    items: [
      "Building", "Teaching", "Healing", "Governing", "Trading", "Creating",
      "Exploring", "Fighting", "Worshipping", "Mourning", "Celebrating", "Playing",
      "Farming", "Cooking", "Storytelling", "Singing", "Dancing", "Writing",
      "Painting", "Sculpting", "Debating", "Judging", "Forgiving", "Remembering",
      "Forgetting", "Dreaming", "Planning", "Improvising", "Navigating", "Mapping",
      "Measuring", "Counting", "Classifying", "Naming", "Translating", "Mediating",
      "Competing", "Cooperating", "Migrating", "Settling", "Defending", "Attacking",
      "Nurturing", "Mentoring", "Experimenting", "Observing", "Meditating",
      "Protesting", "Inventing", "Restoring", "Recycling", "Conserving",
    ],
  },
  {
    id: "shadow-traits",
    name: "Shadow Traits",
    description: "The darker dimensions of character — destructive patterns and tendencies.",
    items: [
      "Arrogant", "Deceitful", "Manipulative", "Vindictive", "Envious", "Greedy",
      "Cruel", "Cowardly", "Apathetic", "Cynical", "Obsessive", "Paranoid",
      "Narcissistic", "Passive-aggressive", "Dogmatic", "Rigid", "Reckless",
      "Self-destructive", "Contemptuous", "Petty", "Spiteful", "Negligent",
      "Hypocritical", "Entitled", "Volatile", "Controlling", "Dismissive",
      "Exploitative", "Fanatical", "Jealous", "Resentful", "Sycophantic",
      "Tyrannical", "Ungrateful", "Wasteful", "Willfully ignorant",
    ],
  },
];

/** Quick lookup by id */
export const organonListsById = new Map(
  organonLists.map(o => [o.id, o])
);
