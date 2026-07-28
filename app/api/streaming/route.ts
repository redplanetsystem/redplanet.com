import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE = path.join(DATA_DIR, 'streaming.json');

async function ensure() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try { await fs.access(FILE); } catch { await fs.writeFile(FILE, JSON.stringify({ streams: [] }, null, 2)); }
  } catch (e) { /* ignore */ }
}

export async function GET() {
  await ensure();
  try {
    const raw = await fs.readFile(FILE, 'utf-8');
    const data = JSON.parse(raw);
    return NextResponse.json(data.streams || []);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await ensure();
  try {
    const body = await req.json();
    const raw = await fs.readFile(FILE, 'utf-8');
    const data = JSON.parse(raw || '{"streams":[]}');
    const id = Date.now();
    const stream = { id, ...body };
    data.streams.push(stream);
    await fs.writeFile(FILE, JSON.stringify(data, null, 2));
    return NextResponse.json(stream);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
