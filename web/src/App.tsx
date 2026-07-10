import { useState, useMemo } from "react";
import { 
  Bot, 
  Cpu, 
  Layers, 
  Wrench, 
  Eye, 
  FileText, 
  Search, 
  ExternalLink, 
  Sparkles, 
  Code
} from "lucide-react";
import "./App.css";

interface Resource {
  name: string;
  url: string;
  category: "Frameworks" | "Orchestration" | "Tools" | "Observability" | "Papers";
  description: string;
  stars?: string;
  tags: string[];
}

const resources: Resource[] = [
  // Frameworks
  {
    name: "LangChain",
    url: "https://github.com/langchain-ai/langchain",
    category: "Frameworks",
    description: "Build context-aware, reasoning applications with composable LLM chains and rich integrations.",
    stars: "92k+",
    tags: ["Chains", "Agents", "Python", "JS"]
  },
  {
    name: "LlamaIndex",
    url: "https://github.com/run-llama/llama_index",
    category: "Frameworks",
    description: "Data framework for LLM applications to connect private data sources and build robust RAG systems.",
    stars: "36k+",
    tags: ["RAG", "Data Connectors", "Python", "TS"]
  },
  {
    name: "Pydantic AI",
    url: "https://github.com/pydantic/pydantic-ai",
    category: "Frameworks",
    description: "A production-ready agent framework from the creators of Pydantic, focusing on type safety and structured outputs.",
    stars: "4k+",
    tags: ["Type Safety", "Structured Data", "Python"]
  },
  {
    name: "Vercel AI SDK",
    url: "https://github.com/vercel/ai",
    category: "Frameworks",
    description: "Complete TypeScript toolkit to build conversational, streaming, and agentic user interfaces.",
    stars: "18k+",
    tags: ["Streaming", "Vercel", "TypeScript", "React"]
  },
  {
    name: "Semantic Kernel",
    url: "https://github.com/microsoft/semantic-kernel",
    category: "Frameworks",
    description: "Microsoft's SDK that integrates LLMs with conventional programming languages like C#, Java, and Python.",
    stars: "22k+",
    tags: ["Enterprise", "C#", "Java", "Python"]
  },
  {
    name: "AutoGPT",
    url: "https://github.com/Significant-Gravitas/AutoGPT",
    category: "Frameworks",
    description: "An experimental open-source attempt to make GPT-4 fully autonomous and complete tasks independently.",
    stars: "165k+",
    tags: ["Autonomous", "Agent Loop", "Python"]
  },
  // Orchestration
  {
    name: "LangGraph",
    url: "https://github.com/langchain-ai/langgraph",
    category: "Orchestration",
    description: "Stateful, multi-actor coordination framework built by LangChain, ideal for cyclic agent patterns and graphs.",
    stars: "8k+",
    tags: ["Stateful", "Cyclic Graphs", "Multi-Agent"]
  },
  {
    name: "CrewAI",
    url: "https://github.com/crewAIInc/crewAI",
    category: "Orchestration",
    description: "Framework for orchestrating role-playing, autonomous AI agents to build collaborative intelligence.",
    stars: "21k+",
    tags: ["Role-Playing", "Task Automation", "Python"]
  },
  {
    name: "Microsoft AutoGen",
    url: "https://github.com/microsoft/autogen",
    category: "Orchestration",
    description: "Framework that enables development of LLM applications using multiple conversing agents.",
    stars: "34k+",
    tags: ["Conversational", "Multi-Agent", "Python", "C#"]
  },
  {
    name: "ChatDev",
    url: "https://github.com/OpenBMB/ChatDev",
    category: "Orchestration",
    description: "Virtual software company operated by multiple AI agents playing different roles (CEO, CPO, Developer).",
    stars: "25k+",
    tags: ["Software Engineering", "Simulation", "Python"]
  },
  {
    name: "MetaGPT",
    url: "https://github.com/geekan/MetaGPT",
    category: "Orchestration",
    description: "Multi-agent framework that takes a one-line requirement as input and outputs user stories/specs/code.",
    stars: "43k+",
    tags: ["SOPs", "Software Architecture", "Python"]
  },
  // Tools
  {
    name: "Model Context Protocol (MCP)",
    url: "https://github.com/modelcontextprotocol",
    category: "Tools",
    description: "Open standard for secure integration of tools and data sources into LLMs and IDEs.",
    stars: "2k+",
    tags: ["Protocol", "Integration", "IDE", "Anthropic"]
  },
  {
    name: "Composio",
    url: "https://github.com/ComposioHQ/composio",
    category: "Tools",
    description: "Integrate over 100+ native third-party tools (GitHub, Slack, database connections) directly into agents.",
    stars: "6k+",
    tags: ["Integrations", "APIs", "Actions"]
  },
  {
    name: "Tavily API",
    url: "https://tavily.com/",
    category: "Tools",
    description: "Search engine optimized specifically for LLMs and autonomous agents to fetch factual info fast.",
    stars: "SaaS",
    tags: ["Web Search", "LLM-Optimized", "API"]
  },
  {
    name: "LangChain Community Tools",
    url: "https://github.com/langchain-ai/langchain/tree/master/libs/community/langchain_community/tools",
    category: "Tools",
    description: "Rich suite of pre-built integrations for file operations, search engines, and enterprise APIs.",
    stars: "92k+",
    tags: ["Pre-built", "Utility", "Python"]
  },
  {
    name: "BrowserUse",
    url: "https://github.com/browser-use/browser-use",
    category: "Tools",
    description: "Allows AI agents to interact with web browsers to perform tasks like humans.",
    stars: "12k+",
    tags: ["Web Automation", "GUI Agent", "Python"]
  },
  // Observability
  {
    name: "AgentOps",
    url: "https://github.com/AgentOps-AI/agentops",
    category: "Observability",
    description: "Dashboard to trace, evaluate, and benchmark agent workflows, actions, and costs.",
    stars: "5k+",
    tags: ["Tracing", "Benchmarking", "Cost Tracking"]
  },
  {
    name: "LangSmith",
    url: "https://www.langchain.com/langsmith",
    category: "Observability",
    description: "Platform to trace, debug, test, and evaluate LLM applications and agents built on LangChain.",
    stars: "SaaS",
    tags: ["Tracing", "Debugging", "Evaluation"]
  },
  {
    name: "Phoenix",
    url: "https://github.com/Arize-AI/phoenix",
    category: "Observability",
    description: "Open-source AI observability platform for tracking, evaluating, and tracing LLM/RAG systems.",
    stars: "4k+",
    tags: ["Open-Source", "Traces", "Evals", "RAG"]
  },
  {
    name: "Langfuse",
    url: "https://github.com/langfuse/langfuse",
    category: "Observability",
    description: "Open-source LLM engineering platform for tracing, analytics, and prompt management.",
    stars: "7k+",
    tags: ["Open-Source", "LLMOps", "Metrics"]
  },
  {
    name: "OpenLit",
    url: "https://github.com/openlit/openlit",
    category: "Observability",
    description: "Open-source monitoring tool for LLMs and agents built with OpenTelemetry.",
    stars: "1.5k+",
    tags: ["OpenTelemetry", "Metrics", "APM"]
  },
  // Papers
  {
    name: "ReAct: Synergizing Reasoning & Acting",
    url: "https://arxiv.org/abs/2210.03629",
    category: "Papers",
    description: "Foundational paper on pairing reasoning tracing (Chain of Thought) with action execution.",
    stars: "ArXiv",
    tags: ["Reasoning", "Acting", "Foundational"]
  },
  {
    name: "LLM-Compiler: Parallel Function Calling",
    url: "https://arxiv.org/abs/2312.04511",
    category: "Papers",
    description: "Streamlines tool execution by building dependency trees and calling functions in parallel.",
    stars: "ArXiv",
    tags: ["Parallel Execution", "Function Calling"]
  },
  {
    name: "Generative Agents: Interactive Simulacra",
    url: "https://arxiv.org/abs/2304.03442",
    category: "Papers",
    description: "The original paper simulating sandbox environments (Smallville) using multiple generative AI agents.",
    stars: "ArXiv",
    tags: ["Simulation", "Sandbox", "Human Behavior"]
  }
];

type CategoryFilter = "All" | "Frameworks" | "Orchestration" | "Tools" | "Observability" | "Papers";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories: { name: CategoryFilter; icon: any; color: string }[] = [
    { name: "All", icon: Sparkles, color: "#a855f7" },
    { name: "Frameworks", icon: Cpu, color: "#3b82f6" },
    { name: "Orchestration", icon: Layers, color: "#ec4899" },
    { name: "Tools", icon: Wrench, color: "#10b981" },
    { name: "Observability", icon: Eye, color: "#f59e0b" },
    { name: "Papers", icon: FileText, color: "#ef4444" },
  ];

  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      const matchesCategory = selectedCategory === "All" || res.category === selectedCategory;
      const matchesSearch = res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            res.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="app-container">
      {/* Background glow effects */}
      <div className="glow glow-1"></div>
      <div className="glow glow-2"></div>
      
      <header className="app-header">
        <div className="logo-section">
          <div className="logo-icon-bg">
            <Bot className="logo-icon" size={28} />
          </div>
          <h1>Awesome Agentic AI</h1>
        </div>
        <p className="subtitle">
          Interactive directory of state-of-the-art frameworks, tools, observability platforms, and research papers for building autonomous AI agents.
        </p>
      </header>

      {/* Control panel (Search & Filter) */}
      <div className="control-panel">
        <div className="search-wrapper">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Search frameworks, tools, tags..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filters">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`filter-btn ${isActive ? "active" : ""}`}
                style={isActive ? { borderColor: cat.color, boxShadow: `0 0 12px ${cat.color}30` } : {}}
              >
                <Icon size={14} className="filter-icon" style={isActive ? { color: cat.color } : {}} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results grid */}
      <main className="results-section">
        {filteredResources.length > 0 ? (
          <div className="cards-grid">
            {filteredResources.map((res) => {
              // Find matching category style
              const catConfig = categories.find(c => c.name === res.category) || categories[0];
              return (
                <div key={res.name} className="resource-card">
                  <div className="card-header">
                    <span className="category-badge" style={{ backgroundColor: `${catConfig.color}15`, color: catConfig.color, border: `1px solid ${catConfig.color}30` }}>
                      {res.category}
                    </span>
                    {res.stars && (
                      <span className="stars-badge">
                        <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="stars-icon" style={{ marginRight: 4 }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        {res.stars}
                      </span>
                    )}
                  </div>

                  <h3 className="card-title">{res.name}</h3>
                  <p className="card-desc">{res.description}</p>

                  <div className="card-tags">
                    {res.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={res.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="card-link"
                    style={{ borderColor: `${catConfig.color}40` }}
                  >
                    <span>View Repository</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <Code size={40} className="empty-icon" />
            <h3>No resources found</h3>
            <p>Try refining your search query or switching categories.</p>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Built for the Agentic AI community. MIT License.</p>
      </footer>
    </div>
  );
}

export default App;
