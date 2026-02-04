import type { Division } from '../types.js';

/**
 * Core reasoning divisions — the ~30 most useful for structured creative thinking.
 * Each enriched with keywords, core question, and guiding sub-questions.
 * Full list of 235 available as rawDivisions below.
 */
export const reasoningDivisions: Division[] = [
  // === UNDERSTANDING (what is it?) ===
  {
    id: 6, theme: "ANALOGIES", binomen: "Icelology", groupId: 2,
    keywords: ["similar", "like", "compare", "parallel", "metaphor", "resembles", "equivalent", "maps to"],
    coreQuestion: "What is this fundamentally like?",
    guidingQuestions: [
      "What natural systems exhibit similar behavior or structure?",
      "What problems in other domains have been solved with analogous approaches?",
      "What metaphor best captures the essence of this situation?",
      "Where does the analogy break down, and what does that reveal?",
      "What would a biologist/physicist/architect/musician see in this problem?",
    ],
  },
  {
    id: 7, theme: "ANALYSES", binomen: "Merismology", groupId: 2,
    keywords: ["break down", "decompose", "parts", "components", "dissect", "examine", "structure", "anatomy"],
    coreQuestion: "What are the constituent parts, and how do they relate?",
    guidingQuestions: [
      "What are the irreducible components of this problem?",
      "Which part, if removed, would change the nature of the whole?",
      "What hidden dependencies exist between the parts?",
      "At what level of granularity does the most useful analysis occur?",
    ],
  },
  {
    id: 29, theme: "CONCEPTS", binomen: "Ennoology", groupId: 2,
    keywords: ["define", "meaning", "idea", "notion", "abstract", "concept", "essence", "what is"],
    coreQuestion: "What exactly do we mean, and what concepts are we really working with?",
    guidingQuestions: [
      "Are there ambiguous terms that different people interpret differently?",
      "What concept is actually central vs. what we assume is central?",
      "What new concept might we need to invent to think about this clearly?",
      "What would Gunkel's 'binomen' be for this idea — what is its true name?",
    ],
  },
  {
    id: 163, theme: "PERSPECTIVES", binomen: "Apopsology", groupId: 2,
    keywords: ["viewpoint", "angle", "frame", "lens", "stakeholder", "see", "perceive", "interpret"],
    coreQuestion: "How does this look from radically different vantage points?",
    guidingQuestions: [
      "Who sees this problem completely differently, and why?",
      "What perspective would make this obvious or trivial?",
      "What would this look like in 100 years? 1000 years?",
      "What would an alien intelligence notice that we miss?",
    ],
  },

  // === CAUSATION (why?) ===
  {
    id: 17, theme: "CAUSES", binomen: "Etiology", groupId: 3,
    keywords: ["why", "because", "reason", "root cause", "origin", "trigger", "source", "driver"],
    coreQuestion: "Why does this happen, and what are the real causes?",
    guidingQuestions: [
      "What is the proximate cause vs. the ultimate cause?",
      "What causes are we assuming that might be wrong?",
      "What feedback loops amplify or dampen the causes?",
      "If you removed each cause one by one, which one actually matters?",
    ],
  },
  {
    id: 19, theme: "CHAINS-OF-CONSEQUENCES", binomen: "Anyormology", groupId: 3,
    keywords: ["consequence", "result", "cascade", "domino", "ripple", "downstream", "impact", "then what"],
    coreQuestion: "What cascading consequences follow, and how far do they reach?",
    guidingQuestions: [
      "What is the second-order effect that nobody is discussing?",
      "Where does the chain of consequences cross into a different domain?",
      "What unintended consequences are most likely?",
      "At what point does the cascade become unpredictable?",
    ],
  },
  {
    id: 153, theme: "ORIGINS", binomen: "Archology", groupId: 3,
    keywords: ["beginning", "genesis", "start", "source", "where from", "history", "root", "seed"],
    coreQuestion: "Where did this actually begin, and what was the original seed?",
    guidingQuestions: [
      "What was the earliest recognizable form of this thing?",
      "What conditions made its emergence possible?",
      "Could it have originated differently, and would that change its nature?",
      "What has been forgotten about its origins that still shapes it?",
    ],
  },
  {
    id: 13, theme: "BADS", binomen: "Cacology", groupId: 7,
    keywords: ["fail", "wrong", "risk", "danger", "problem", "flaw", "weakness", "pitfall", "mistake"],
    coreQuestion: "What can go wrong, and what is already going wrong that we're not seeing?",
    guidingQuestions: [
      "What is the worst realistic outcome?",
      "What failure mode is everyone ignoring because it's uncomfortable?",
      "Where are the single points of failure?",
      "What would a hostile adversary exploit?",
    ],
  },

  // === CHANGE (how does it move?) ===
  {
    id: 21, theme: "CHANGES", binomen: "Tropology", groupId: 3,
    keywords: ["evolve", "transform", "shift", "adapt", "develop", "progress", "transition", "trend"],
    coreQuestion: "How is this changing, and where is it heading?",
    guidingQuestions: [
      "What is changing faster than expected? Slower?",
      "What appears stable but is actually on the verge of transformation?",
      "What driving forces are accelerating or decelerating the change?",
      "What phase of its lifecycle is this in?",
    ],
  },
  {
    id: 44, theme: "CYCLES", binomen: "Nostology", groupId: 3,
    keywords: ["cycle", "repeat", "periodic", "rhythm", "loop", "oscillate", "recur", "season"],
    coreQuestion: "What cycles, rhythms, or recurring patterns are at play?",
    guidingQuestions: [
      "What has happened before that's happening again?",
      "What is the natural period of this cycle?",
      "Are we at a peak, trough, or inflection point?",
      "What would break the cycle — and should we want to break it?",
    ],
  },
  {
    id: 127, theme: "LIMITATIONS", binomen: "Horology", groupId: 5,
    keywords: ["limit", "constraint", "boundary", "ceiling", "barrier", "bottleneck", "cap", "threshold"],
    coreQuestion: "What are the real limits, and which ones are actually movable?",
    guidingQuestions: [
      "Which constraints are physical/fundamental vs. conventional/assumed?",
      "What becomes possible if the biggest constraint is removed?",
      "What are we treating as a limit that's really just a current state?",
      "What limit are we approaching that we haven't noticed yet?",
    ],
  },
  {
    id: 219, theme: "TRANSFORMATIONS", binomen: "Diaplastology", groupId: 3,
    keywords: ["transform", "convert", "reshape", "metamorphose", "transmute", "reframe", "pivot"],
    coreQuestion: "What transformations are possible, and what would fundamentally change the nature of this?",
    guidingQuestions: [
      "What would this look like if its core assumption were inverted?",
      "What minimal change would produce the maximal transformation?",
      "What transformation has already happened that we haven't recognized?",
      "What is preventing the natural transformation from occurring?",
    ],
  },

  // === STRUCTURE (how is it organized?) ===
  {
    id: 96, theme: "HIERARCHIES", binomen: "Climology", groupId: 6,
    keywords: ["hierarchy", "level", "layer", "rank", "order", "above", "below", "nested", "priority"],
    coreQuestion: "What hierarchies exist here, and are they the right ones?",
    guidingQuestions: [
      "What levels of abstraction are most useful for thinking about this?",
      "Is the current hierarchy natural or imposed? By whom?",
      "What happens if you flatten the hierarchy? Deepen it?",
      "What sits at the top that shouldn't, or at the bottom that should be higher?",
    ],
  },
  {
    id: 26, theme: "COMBINATIONS", binomen: "Mixology", groupId: 6,
    keywords: ["combine", "mix", "merge", "integrate", "synthesize", "hybrid", "blend", "fusion"],
    coreQuestion: "What combinations haven't been tried, and what emerges from unlikely pairings?",
    guidingQuestions: [
      "What two things, if combined, would create something genuinely new?",
      "What combinations are everyone doing that have become stale?",
      "What elements resist combination, and why?",
      "What is the 'minimum viable combination' that produces the desired emergent property?",
    ],
  },
  {
    id: 160, theme: "PATTERNS", binomen: "Digmology", groupId: 6,
    keywords: ["pattern", "recur", "motif", "template", "regularity", "structure", "shape", "form"],
    coreQuestion: "What patterns are present, and what do they predict?",
    guidingQuestions: [
      "What pattern is visible at one scale but invisible at another?",
      "What pattern from a completely different domain applies here?",
      "What apparent pattern is actually coincidence?",
      "What would the pattern predict happens next?",
    ],
  },
  {
    id: 146, theme: "NETWORKS", binomen: "Dictyology", groupId: 6,
    keywords: ["network", "connection", "graph", "link", "node", "web", "relationship", "topology"],
    coreQuestion: "What is the network structure, and where are the critical connections?",
    guidingQuestions: [
      "What are the most connected nodes, and what happens if they fail?",
      "What connections are missing that should exist?",
      "Is this a small-world, scale-free, or random network?",
      "Where are the bridges between otherwise disconnected clusters?",
    ],
  },
  {
    id: 209, theme: "SYSTEMS", binomen: "Systemology", groupId: 6,
    keywords: ["system", "feedback", "loop", "emergent", "complex", "adaptive", "ecosystem", "holistic"],
    coreQuestion: "What system dynamics are at play, and what emerges from the whole?",
    guidingQuestions: [
      "What feedback loops — positive or negative — are driving behavior?",
      "What properties emerge from the system that no component has alone?",
      "Where are the leverage points where small changes have big effects?",
      "What is the system optimizing for, and is that what we want?",
    ],
  },

  // === ALTERNATIVES (what else?) ===
  {
    id: 3, theme: "ALTERNATIVES", binomen: "Allagology", groupId: 3,
    keywords: ["alternative", "option", "instead", "other way", "different approach", "what if", "choose"],
    coreQuestion: "What alternatives exist that we haven't considered?",
    guidingQuestions: [
      "What approach would someone from a completely different field take?",
      "What option are we dismissing too quickly?",
      "What is the 'do nothing' alternative, and what happens then?",
      "What alternative was tried before and failed — and has anything changed since?",
    ],
  },
  {
    id: 151, theme: "OPPOSITES", binomen: "Enantiology", groupId: 6,
    keywords: ["opposite", "reverse", "inverse", "contrary", "antithesis", "negate", "flip", "contrast"],
    coreQuestion: "What is the opposite, and what can we learn from inverting our assumptions?",
    guidingQuestions: [
      "What if we wanted the exact opposite outcome — what would we do?",
      "What is the shadow or dark twin of our current approach?",
      "What truth is hiding in the position we most disagree with?",
      "What apparent opposites are actually complementary?",
    ],
  },
  {
    id: 119, theme: "INVERSIONS", binomen: "Simomology", groupId: 3,
    keywords: ["invert", "reverse", "flip", "upside down", "backwards", "turn around", "mirror"],
    coreQuestion: "What happens when we invert or reverse the problem?",
    guidingQuestions: [
      "What if we solved for the opposite of what we want and then negated?",
      "What becomes visible when you read the situation backwards?",
      "What would the solution look like if we started from the end?",
      "What assumption, if inverted, changes everything?",
    ],
  },
  {
    id: 73, theme: "EXCELLENCES", binomen: "Aristology", groupId: 7,
    keywords: ["ideal", "perfect", "best", "excellence", "optimal", "gold standard", "aspire", "benchmark"],
    coreQuestion: "What would perfection look like, and what can we learn from the ideal?",
    guidingQuestions: [
      "If there were no constraints, what would the ideal solution be?",
      "What existing example comes closest to excellence here?",
      "What quality separates good from excellent in this domain?",
      "What would we never compromise on if we were building this right?",
    ],
  },

  // === CONTEXT (where does it sit?) ===
  {
    id: 23, theme: "CIRCUMSTANCES", binomen: "Symphorology", groupId: 4,
    keywords: ["context", "circumstance", "condition", "environment", "situation", "when", "where", "setting"],
    coreQuestion: "What circumstances and conditions make this the way it is?",
    guidingQuestions: [
      "What environmental factors are we taking for granted?",
      "How would different circumstances change the entire problem?",
      "What circumstance is temporary but being treated as permanent?",
      "What context does the other side have that we lack?",
    ],
  },
  {
    id: 27, theme: "COMMONALITIES", binomen: "Metochology", groupId: 6,
    keywords: ["common", "shared", "universal", "same", "overlap", "mutual", "consensus", "agree"],
    coreQuestion: "What is shared or universal here that we might be overlooking?",
    guidingQuestions: [
      "What do all instances of this problem have in common?",
      "What is the underlying commonality between seemingly different approaches?",
      "What assumption does everyone share — and is it valid?",
      "What common ground exists between opposing positions?",
    ],
  },
  {
    id: 50, theme: "DIFFERENCES", binomen: "Heterology", groupId: 6,
    keywords: ["different", "distinct", "unique", "varies", "diverge", "gap", "contrast", "separate"],
    coreQuestion: "What are the critical differences, and which ones actually matter?",
    guidingQuestions: [
      "What difference is everyone noticing that's actually irrelevant?",
      "What subtle difference is being ignored that's actually decisive?",
      "What makes this instance different from every other?",
      "Where is the line between 'different type' and 'different degree'?",
    ],
  },

  // === DEEPER THINKING ===
  {
    id: 81, theme: "FIRST PRINCIPLES", binomen: "Archelogy", groupId: 8,
    keywords: ["fundamental", "axiom", "base", "foundation", "ground truth", "first principles", "from scratch"],
    coreQuestion: "What are the first principles, and what can we derive from them alone?",
    guidingQuestions: [
      "If we threw out all assumptions and started from physical/logical bedrock, what would we build?",
      "What first principle is everyone citing but nobody has actually verified?",
      "What first principles conflict with each other here?",
      "What new first principle might we be discovering?",
    ],
  },
  {
    id: 157, theme: "PARADOXES", binomen: "Paradoxology", groupId: 5,
    keywords: ["paradox", "contradiction", "impossible", "both true", "tension", "dilemma", "ironic"],
    coreQuestion: "What paradoxes or contradictions exist, and what do they reveal?",
    guidingQuestions: [
      "What two things are both true that seem like they can't both be true?",
      "What apparent contradiction dissolves when you reframe the question?",
      "What paradox is the system trying to resolve, possibly poorly?",
      "What would it mean to hold both sides of the contradiction simultaneously?",
    ],
  },
  {
    id: 8, theme: "ANOMALIES", binomen: "Xenology", groupId: 5,
    keywords: ["anomaly", "exception", "outlier", "unusual", "unexpected", "deviant", "strange", "surprising"],
    coreQuestion: "What anomalies or exceptions exist, and what do they tell us?",
    guidingQuestions: [
      "What doesn't fit the pattern, and why?",
      "What exception might actually be the new rule emerging?",
      "What anomaly has everyone noticed but nobody has explained?",
      "What would we learn if we studied the outliers instead of the average?",
    ],
  },
  {
    id: 174, theme: "PROCESSES", binomen: "Sisology", groupId: 3,
    keywords: ["process", "step", "sequence", "workflow", "procedure", "flow", "pipeline", "stages"],
    coreQuestion: "What processes are at work, and where do they break down?",
    guidingQuestions: [
      "What step in the process adds the most value? The least?",
      "Where does the process create bottlenecks or waste?",
      "What process is happening implicitly that should be made explicit?",
      "What would a zero-step process look like — can we eliminate the process entirely?",
    ],
  },
];

/** Quick lookup of reasoning divisions by theme */
export const reasoningDivisionsByTheme = new Map(
  reasoningDivisions.map(d => [d.theme, d])
);

/** All 235 raw division themes for reference */
export const allDivisionThemes: string[] = [
  "ACTS", "ALTERNATIVE HISTORIES", "ALTERNATIVES", "AMBIGUITIES", "ANADESCRIPTIONS",
  "ANALOGIES", "ANALYSES", "ANOMALIES", "ANSWERS", "ANTISYZYGIES", "APPEARANCES",
  "ASSUMPTIONS", "BADS", "BELIEFS", "BINARY BEING", "CAPACITIES", "CAUSES", "CHAINS",
  "CHAINS-OF-CONSEQUENCES", "CHANCES", "CHANGES", "CHAOSES", "CIRCUMSTANCES", "CLUSTERS",
  "COEVOLUTIONS", "COMBINATIONS", "COMMONALITIES", "COMPLEXITIES", "CONCEPTS", "CONFLICTS",
  "CONNECTIONS", "CONSERVATIONS", "CONTENTS AND PARTS", "CONTROLS AND GOVERNMENTS",
  "CONTROVERSIES", "CONVERGENCES", "COOPERATIONS", "COORDINATE SYSTEMS", "CO-PROBABILITIES",
  "COROLLARIES", "COURSES", "CRITERIONS", "CRITICISMS", "CYCLES", "DEBATES AND ARGUMENTS",
  "DECISIONS", "DEFECTS", "DEFINITIONS", "DESCRIPTIONS", "DIFFERENCES", "DISCOVERIES",
  "DISEQUILIBRIUMS", "DISJUNCTIONS", "DISPROOFS", "DISTRIBUTIONS", "DIVERGENCES", "DOCTRINES",
  "DOMAINS", "ECOLOGIC THINGS", "ECONOMIC THINGS", "EFFECTS", "ELEMENTS", "EMERGENTS",
  "ENVIRONMENTS", "EPOCHES", "EQUALITIES", "EQUILIBRIUMS", "EQUIVALENCES", "ERRORS",
  "EVALUATIONS", "EVENTS", "EXAMPLES", "EXCELLENCES", "EXCUSES", "EXPECTATIONS", "EXPERIENCES",
  "EXPERIMENTS", "EXTENSIONS", "EXTREMES", "FIELDS", "FIRST PRINCIPLES", "FLOWS", "FORMS",
  "FUNCTIONS", "FUNDAMENTALS", "FUTURIBLES", "GAMES", "GEDANKENEXPERIMENTS", "GENERALIZATIONS",
  "GENESES", "GOALS", "GOODS", "GROUPS", "HARDEST THINGS", "HETERODOXIES", "HIERARCHIES",
  "HIGHER REALITIES", "HISTORIES", "HYPOTHESES", "IDENTITIES", "IGNORANCES", "ILLUSIONS",
  "IMAGES", "IMPLICATIONS", "IMPOSSIBILITIES", "INDIVIDUALS", "INEQUALITIES",
  "INFINITE COMPLEXITIES", "INFINITIES", "INFORMATION-THEORETIC AND ENTROPIC THINGS",
  "INSTANCES", "INSTRUMENTS", "INTERACTIONS", "INTERDEPENDENCES AND RECIPROCITIES", "INTERESTS",
  "INTERPRETATIONS", "INTER-REPRESENTATIONS", "INVENTIONS", "INVERSIONS", "KNOWLEDGES",
  "LANGUAGES", "LAWS", "LEARNING AND TEACHING", "LEFTOVERS", "LEVELS", "LIFES", "LIMITATIONS",
  "LOGICAL THINGS", "MANIFOLDS", "MATHEMATICAL THINGS", "MATRICES", "MEASUREMENTS", "MECHANISMS",
  "METAPHORS", "METHODS", "MINDS", "MODELS", "MONADS", "MONISMS", "MOTIONS", "NAUGHTS", "NEEDS",
  "NEGATIONS", "NEGATIVE ANALOGIES", "NEGATIVES", "NETWORKS", "NETWORKS-OF-CONSEQUENCES",
  "NICHES", "NIVEAUS", "OPPORTUNITIES", "OPPOSITES", "ORDERS", "ORIGINS", "ORTHODOXIES",
  "OUGHTS", "PARADIGMS", "PARADOXES", "PATHOSES", "PATHS", "PATTERNS", "PERFECTIONS",
  "PERIODICITIES", "PERSPECTIVES", "PHENOMENONS", "PLANS", "POSSIBILITIES", "PRACTICES",
  "PREDICTIONS", "PREPARATIONS", "PRESENT (THE)", "PRINCIPLES", "PROBABILITIES", "PROBLEMS",
  "PROCESSES", "PROJECTIONS", "PROOFS", "PROPERTIES AND DIMENSIONS", "PSYCHOLOGICAL THINGS",
  "PURPOSES", "QUANTITIES", "QUESTIONS", "RANGES", "REACTIONS", "REALMS", "RECURSIONS",
  "RELATIONS", "RELAXATIONS", "REPRESENTATIONS", "RESOURCES", "ROLES", "RULES", "SELF-EFFECTS",
  "SELF-RELATIONS", "SELF-TRANSCENDENCES", "SERIES", "SETS", "SHORTCUTS AND THALWEGS",
  "SIMPLICITIES", "SIMULATIONS", "SOLUTIONS", "SPACES", "SPECTRUMS", "SPECULATIONS",
  "STATES AND CONDITIONS", "STORIES", "STRATEGIES", "SUPREMES", "SURPRISES", "SYSTEMS",
  "TACTICS", "TAXONS", "TERTIUM QUIDS", "THEORIES", "THINGS (ENTITIES)", "THOUGHTS",
  "TOPOLOGIC THINGS", "TRANSCENDENCES", "TRANSFINITES", "TRANSFORMATIONS", "TYPES",
  "ULTIMATES AND ENDS", "ULTRA-FUNDAMENTALS", "UNCERTAINTIES AND DOUBTS",
  "UNIFICATIONS (INTEGRATIONS)", "UNIVERSES", "USES", "VALUES", "VERGENCES", "VIRTUALS",
  "WANTS", "WHOLES AND GESTALTS", "WISDOMS", "WORKS", "ABILITIES", "ECONOMIES OF THOUGHT",
];
