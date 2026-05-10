import { prisma } from "@/lib/prisma";

export async function generateInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `ECO-${year}-`;
  const last = await prisma.donation.findFirst({
    where: { invoiceNumber: { startsWith: prefix } },
    orderBy: { invoiceNumber: "desc" },
    select: { invoiceNumber: true },
  });
  let next = 1;
  if (last) {
    const numPart = last.invoiceNumber.slice(prefix.length);
    const parsed = parseInt(numPart, 10);
    if (!Number.isNaN(parsed)) next = parsed + 1;
  }
  return `${prefix}${String(next).padStart(6, "0")}`;
}
