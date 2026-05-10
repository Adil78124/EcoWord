import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonError } from "@/lib/api/response";
import { respondIfDatabaseNotConfigured } from "@/lib/db-config";
import { requireAdminApi } from "@/lib/admin/guard";

export async function GET() {
  const db = respondIfDatabaseNotConfigured();
  if (db) return db;
  const auth = await requireAdminApi();
  if (auth instanceof Response) return auth;
  try {
    const [
      volunteerTotal,
      volunteerNew,
      contactTotal,
      donationsTotal,
      donationsTestPaid,
      usersTotal,
      recentVolunteers,
      recentContacts,
      recentDonations,
    ] = await Promise.all([
      prisma.volunteerApplication.count(),
      prisma.volunteerApplication.count({ where: { status: "NEW" } }),
      prisma.contactMessage.count(),
      prisma.donation.count(),
      prisma.donation.count({ where: { status: "TEST_PAID" } }),
      prisma.user.count(),
      prisma.volunteerApplication.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.donation.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        volunteerTotal,
        volunteerNew,
        contactTotal,
        donationsTotal,
        donationsTestPaid,
        usersTotal,
      },
      recent: {
        volunteers: recentVolunteers,
        contacts: recentContacts,
        donations: recentDonations.map((d) => ({
          ...d,
          amount: d.amount.toString(),
        })),
      },
    });
  } catch (e) {
    console.error(e);
    return jsonError("Ошибка сервера", 500);
  }
}
