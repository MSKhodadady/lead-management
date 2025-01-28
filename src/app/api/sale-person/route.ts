import prisma from "@/lib/prisma";

export async function GET() {
  const res = await prisma.salePerson.findMany();

  return Response.json(res);
}
