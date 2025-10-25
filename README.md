# RoadBuddy Voice Agent

Recently I had been looking for information on how to get driver's license and I was very much puzzled going through DMV sites and different things and was having a hard time figuring nearby test drive locations, what all sorts of test had to be given, what needs to be prepared and more and more. So thats how I thought of creating this  AI-powered voice assistant for California DMV knowledge test preparation using LiveKit's real-time communication platform.

## System Architecture

### End-to-End Flow

```
User Browser → Next.js Frontend → LiveKit WebRTC → Python Agent (Backend) → OpenAI (LLM/TTS/STT) → RAG System (FAISS + Embeddings)
```

**Example: User asks "What's the speed limit in residential areas?"**

1. User speaks into browser → AssemblyAI converts speech to text
2. GPT-4 receives question → decides to call `handbook_lookup()` function
3. RAG system searches FAISS vector index for relevant DMV handbook sections
4. Top 3 matching chunks returned: "California residential areas have a 25 mph speed limit..."
5. GPT-4 generates response using handbook context
6. Cartesia TTS converts response to natural voice
7. Audio streamed back to user's browser

### RAG Integration

**Proper RAG Implementation (Not Keyword Search):**

This uses semantic vector search, not basic keyword matching or summarization. The system understands *meaning*, allowing it to answer specific questions about facts in specific chapters.

**How it works:**

1. **PDF Processing**: California DMV Handbook loaded via LangChain's PyPDFLoader (preserves page metadata)
2. **Chunking**: Documents split into 1000-character chunks with 200-char overlap (maintains context across boundaries)
3. **Vectorization**: OpenAI embeddings convert text to 1536-dimensional vectors (captures semantic meaning)
4. **Vector Storage**: FAISS index stores vectors for fast cosine similarity search
5. **Query Processing**: User question converted to vector, compared against all chunks
6. **Retrieval**: Top 3 semantically similar chunks returned with page numbers
7. **Context Injection**: Retrieved chunks fed to GPT-4 for accurate, grounded answers

**Why This Is Proper RAG:**
-  **Semantic search**: Finds meaning, not just matching keywords
-  **Chapter-specific retrieval**: Page numbers preserved for precise citations
-  **Context-aware**: Overlapping chunks prevent information loss at boundaries
-  **Real-time integration**: LiveKit agent calls RAG during voice conversation
-  **Framework-based**: Uses LangChain + FAISS (not built from scratch)

**Example Query:**
```
User: "What should I do at a railroad crossing?"
Vector search finds semantically related content about railroad safety
Returns 3 most relevant handbook sections (even if exact words differ)
Agent cites: "According to the handbook (Page 47), you must slow down..."
```

**Code Snippets:**
```python
# In the rag_utils.py you will find this function
def query_index(query, k=3):
    db = build_or_load_index() 
    results = db.similarity_search(query, k=k)  
    return results 
```

**LiveKit Agent Integration:**
```python
# In the agent.py you will find this function for HandBook lookup with respect to RAG
@function_tool
async def handbook_lookup(self, context: RunContext, question: str):
    results = query_index(question)  
    return formatted_handbook_content
```

## Tools/Frameworks Used

### Backend (Python)
- **LiveKit Agents SDK 1.2** 
- **LangChain 1.0** 
  - `langchain-core`
  - `langchain-community` 
  - `langchain-openai`
  - `langchain-text-splitters` 
- **FAISS 1.12** 
- **PyPDF 6.1** 
- **OpenAI APIs** 
- **Python-dotenv** 
- **Silero VAD** 
- **Pydantic** 

### Frontend (React/Next.js)
- **Next.js 15.5** 
- **React 19** 
- **LiveKit Components React 2.9** 
- **LiveKit Client SDK 2.15** 
- **LiveKit Server SDK 2.13**
- **Radix UI** 
- **Tailwind CSS 4** 
- **Next Themes 0.4** 
- **TypeScript 5** 
- **Motion 12** 
- **Sonner** 

### AI Services
- **OpenAI GPT-4.1-mini** 
- **OpenAI Embeddings** 
- **AssemblyAI Universal Streaming**
- **Cartesia Sonic-2** 

### DevOps & Deployment
- **Docker** 
- **Docker Compose** 
- **AWS EC2** 
- **UV Package Manager**
- **Python 3.13** 

**AWS Deployment:** Backend agent deployed on AWS EC2 using Docker Compose, allowing scalable voice agent hosting with persistent LiveKit connections.

## Features

### Agent Tools (Function Calling)
- **`handbook_lookup`** - RAG-powered search through California Driver Handbook
  - *"What does the handbook say about right-of-way?"*
- **`generate_practice_quiz`** - Creates topic-specific practice quizzes
  - *"Quiz me on traffic signs"*
- **`check_common_mistakes`** - Shares common test mistakes and tips
  - *"What mistakes do people make parking?"*
- **`find_nearby_dmv_offices`** - Locates DMV offices with wait times
  - *"Where's the nearest DMV in San Francisco?"*
- **`explain_road_sign`** - Explains meaning and action for road signs
  - *"What does a yellow diamond sign mean?"*

### Communication Features
- **Live Audio Chat** - Real-time voice conversation with transcripts
- **Text Chat** - Type messages instead of speaking (supports both modes)
- **Chat History** - Complete transcript of all voice and text interactions
- **Connect/Disconnect** - Start and end sessions on demand
- **Voice Activity Detection** - Automatic turn detection using Silero VAD

## Setup Instructions

### Running on Web

Access the live application at: **[https://frontend-agentic-ai-chi.vercel.app/](https://frontend-agentic-ai-chi.vercel.app/)**

### Running Locally

#### Prerequisites
- Python 3.10+
- Node.js 18+
- LiveKit account (get free tier at livekit.io)
- OpenAI API key
- Docker (optional, for containerized deployment)

#### Backend Setup

**Option 1: Standard Python Setup**

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
pip install -e .
# Or with UV:
uv sync --locked
```

3. Create `.env.local` file:
```bash
LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret
OPENAI_API_KEY=your_openai_key
```

4. Download ML models:
```bash
python src/agent.py download-files
```

5. Run agent:
```bash
python src/agent.py start
```

**Option 2: Docker Setup**

1. Navigate to backend directory:
```bash
cd backend
```

2. Build Docker image:
```bash
docker build -t my-livekit-agent:latest .
```

3. Update `docker-compose.yml` with your credentials

4. Run with Docker Compose:
```bash
docker-compose up -d
```

#### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
# Or with pnpm:
pnpm install
```

3. Create `.env.local` file:
```bash
LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret
```

4. Run development server:
```bash
npm run dev
```

5. Open browser:
```
http://localhost:3000
```


## Design Decisions / Assumptions

### RAG Design

**Vector Database Choice:** I chose FAISS CPU over Pinecone for this project, even though I use Pinecone daily at my current company. The main reason was portability—Pinecone would require sharing cloud credentials for submission, making it impossible for others to reproduce the setup. FAISS provides a self-contained deployment where the entire vector index (~100MB) ships with the codebase. The trade-off is that FAISS doesn't scale horizontally like Pinecone namespaces would, but for a single DMV handbook, vertical scaling on one instance is sufficient.

**Chunking Strategy:** I configured the system to split documents into 1000-character chunks with 200-character overlap. This balances context preservation with retrieval speed—larger chunks provide more context but slow down search, while smaller chunks fragment information. The 200-character overlap ensures that concepts spanning chunk boundaries remain searchable. I tested this approach and found it captures complete DMV concepts like road rules and sign explanations effectively.


### LiveKit Agent Design

**Agent Persona:** I created RoadBuddy to be a DMV coach with a distinct personality who is calm and supportive. The system prompt provides background information, stating that the user was "born in a DMV parking lot" and that they have "read the entire California Driver Handbook." "Let's hit the road!" and "You've got this!" are examples of test-anxiety-reducing phrases that I set into it. The agent keeps a positive tone throughout the conversation by framing mistakes as teaching opportunities rather than passing judgment.

**Function Tools Architecture:** I used LiveKit's `@function_tool` decorator pattern to implement five specialized function tools.  In order to ground responses in official content, the handbook_lookup tool uses RAG retrieval to return the top three semantically related chunks with page citations.  The generate_practice_quiz tool retrieves information from a pre-loaded database that covers general knowledge, parking, traffic signs, right-of-way, and speed limits.  In order to share category-specific errors (such as parallel parking, lane changes, and intersections) with expert advice from the viewpoint of an examiner, I created check_common_mistakes.  Hardcoded CA DMV locations with addresses, hours, and wait times, along with appointment advice, are available through the find_nearby_dmv_offices tool.  Lastly, explain_road_sign returns the meaning, necessary action, and test tips for signs based on their shape or color (octagon, diamond, or rectangle).


### Hosting Assumptions

**Backend Deployment:** I deployed the agent on AWS EC2 using Docker Compose to manage the containerized agent with all dependencies. This provides a simple deployment path. However, I haven't tested this setup under heavy traffic of thousands of concurrent users hit the system simultaneously, I don't know what would happen. I'm assuming LiveKit's infrastructure can handle multi-user load based on their SLA, but this remains unverified at scale. For production, horizontal scaling would require moving to Kubernetes or similar orchestration.

**Frontend Deployment:** I deployed the frontend on Vercel for serverless hosting with global CDN distribution. The frontend is completely stateless, all session state lives in LiveKit. I'm using hosted LiveKit Cloud rather than self-hosting to prioritize reliability over cost optimization. The trade-off is vendor lock-in and monthly costs, but I value their SLA more than infrastructure management complexity.


## Usage

1. Visit [https://frontend-agentic-ai-chi.vercel.app/](https://frontend-agentic-ai-chi.vercel.app/)
2. Click "Start call" to begin voice session
3. Ask questions:
   - "What's the speed limit in residential areas?"
   - "Give me a practice quiz on right-of-way"
   - "Explain the octagon red sign"
   - "What are common mistakes in parallel parking?"
4. Agent uses RAG to fetch accurate handbook content and function tools for interactive features

