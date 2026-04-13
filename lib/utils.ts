export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function normalizePassword(input: string) {
  return input.replace(/[^\d]/g, '');
}

export function buildWhatsAppLink(number: string, text: string) {
  const normalized = number.replace(/[^\d]/g, '');
  return `https://wa.me/${normalized}?text=${encodeURIComponent(text)}`;
}

export async function safeJsonFromResponse(response: Response) {
  const raw = await response.text();

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as unknown;
  } catch {
    throw new Error('server balas halaman HTML, bukan data JSON. biasanya ini berarti deploy atau API route-nya lagi error.');
  }
}
