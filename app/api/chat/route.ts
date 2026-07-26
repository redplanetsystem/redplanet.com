// app/api/chat/route.ts
//
// Enterprise-Grade Red Planet Autonomous Neural Route & Global Intelligence Engine
// Founders: Deblaq & Win | Core Builder: Deblaq
// Direct LLM integration (Anthropic Claude & Google Gemini) with elite global knowledge,
// strict direct-answer formatting, zero question repetition, and universal world intelligence.

import { NextRequest, NextResponse } from 'next/server';
import { RED_PLANET_SYSTEM_PROMPT } from '@/lib/redPlanetKnowledge';

// Enhanced Global System Prompt enforcing strict direct answers and universal intelligence
const GLOBAL_INTELLIGENCE_PROMPT = `
${RED_PLANET_SYSTEM_PROMPT}

CRITICAL OPERATIONAL RULES FOR ALL RESPONSES:
1. **DIRECT ANSWER ONLY**: Answer the user's question immediately and directly in the first sentence. Never repeat, echo, paraphrase, or reference the user's question.
2. **ZERO FILLER**: Eliminate all conversational fluff, throat-clearing, introductory remarks, or repetitive conversational filler. 
3. **UNIVERSAL KNOWLEDGE**: Possess elite, comprehensive knowledge across all domains of human civilization, world history, global economics, financial markets, advanced physics, astronomy, space exploration (NASA, SpaceX, Elon Musk, Mars colonization), artificial intelligence, software engineering, and music production.
4. **SYNDICATE AWARENESS**: Seamlessly blend universal world intelligence with Red Planet syndicate context when relevant, but prioritize answering general world queries with professional, high-level intelligence.
`;

export async function POST(req: NextRequest) {
  let body: { messages?: { role: 'user' | 'assistant'; content: string }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload format.' }, { status: 400 });
  }

  const messages = body.messages ?? [];
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'No message history provided.' }, { status: 400 });
  }

  const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
  const trimmedMessages = messages.slice(-20);

  // 1. Try Primary Upstream API (Anthropic Claude)
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (anthropicKey) {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 800,
          system: GLOBAL_INTELLIGENCE_PROMPT,
          messages: trimmedMessages,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const textBlock = data.content?.find((c: { type: string }) => c.type === 'text');
        if (textBlock?.text) {
          return NextResponse.json({ reply: textBlock.text.trim(), source: 'anthropic_global_neural_node' });
        }
      }
    } catch (err) {
      console.warn('Anthropic primary link offline, falling over to Gemini/Autonomous Core:', err);
    }
  }

  // 2. Try Secondary Upstream API (Google Gemini)
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: trimmedMessages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
          })),
          systemInstruction: { parts: [{ text: GLOBAL_INTELLIGENCE_PROMPT }] }
        })
      });

      if (geminiRes.ok) {
        const geminiData = await geminiRes.json();
        const replyText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (replyText) {
          return NextResponse.json({ reply: replyText.trim(), source: 'gemini_global_neural_node' });
        }
      }
    } catch (err) {
      console.warn('Gemini secondary link offline, engaging built-in autonomous core:', err);
    }
  }

  // 3. Built-In Autonomous Coded AI Fallback (Universal Knowledge & Direct Formatting)
  try {
    let fallbackReply = "";

    if (lastUserMessage.includes('win') && (lastUserMessage.includes('who') || lastUserMessage.includes('what'))) {
      fallbackReply = "Win is the co-founder, lead cinematic artist, and visionary director of Red Planet, crafting immersive audio-visual experiences and music rollouts designed to prepare human consciousness for multi-planetary expansion.";
    } else if (lastUserMessage.includes('deblaq') && (lastUserMessage.includes('who') || lastUserMessage.includes('what'))) {
      fallbackReply = "Deblaq is the co-founder and operations lead of Red Planet, managing technical architecture, algorithmic trading bots like Expert Sniper Pro v2, and global media syndication infrastructure.";
    } else if (lastUserMessage.includes('elon') || lastUserMessage.includes('musk') || lastUserMessage.includes('spacex')) {
      fallbackReply = "Elon Musk is the founder of SpaceX and CEO of Tesla, spearheading commercial spaceflight, Starship rocket development, and humanity's long-term colonization goal of establishing a self-sustaining city on Mars.";
    } else if (lastUserMessage.includes('mars') || lastUserMessage.includes('colonization')) {
      fallbackReply = "Mars colonization involves establishing permanent human habitation on the Martian surface, overcoming severe environmental hurdles such as thin atmospheric pressure, cosmic radiation, and sub-zero temperatures through advanced terraforming and closed-loop life support systems.";
    } else if (lastUserMessage.includes('weather') || lastUserMessage.includes('climate')) {
      fallbackReply = "Global meteorological systems are driven by complex thermodynamic interactions between solar radiation, ocean currents, and atmospheric pressure gradients, while Martian atmospheric telemetry at Node 08 remains stabilized near 710 Pa.";
    } else if (lastUserMessage.includes('trading') || lastUserMessage.includes('bot') || lastUserMessage.includes('crypto') || lastUserMessage.includes('finance')) {
      fallbackReply = "Algorithmic trading utilizes automated mathematical models and high-frequency execution scripts—such as MetaTrader 5 integration frameworks—to capture market inefficiencies and execute liquidity orders across currency pairs with minimal latency.";
    } else {
      fallbackReply = "Global intelligence networks and interplanetary communication arrays are fully operational, delivering high-fidelity data across terrestrial and Martian nodes.";
    }

    return NextResponse.json({ reply: fallbackReply, source: 'autonomous_global_embedded_core' });
  } catch (err) {
    console.error('Embedded AI core error:', err);
    return NextResponse.json(
      { error: 'All neural communication channels temporarily unavailable. Contact redplanetcodes@gmail.com directly.' },
      { status: 500 }
    );
  }
}