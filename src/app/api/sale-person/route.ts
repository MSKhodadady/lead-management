import prisma from "@/lib/prisma";

/**
 * @returns list of sale persons
 */
export async function GET() {
  const res = await prisma.salePerson.findMany();

  return Response.json(res);
}
