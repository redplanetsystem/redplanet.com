import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE = path.join(DATA_DIR, 'platforms.json');

async function ensure() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try { await fs.access(FILE); } catch { await fs.writeFile(FILE, JSON.stringify([])); }
  } catch (e) { /* ignore */ }
}

export async function GET() {
  await ensure();
  try {
    const raw = await fs.readFile(FILE, 'utf-8');
    return NextResponse.json(JSON.parse(raw));
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await ensure();
  try {
    const body = await req.json();
    const raw = await fs.readFile(FILE, 'utf-8');
    const items = JSON.parse(raw || '[]');
    const id = Date.now();
    const entry = { id, ...body };
    items.push(entry);
    await fs.writeFile(FILE, JSON.stringify(items, null, 2));
    return NextResponse.json(entry);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
