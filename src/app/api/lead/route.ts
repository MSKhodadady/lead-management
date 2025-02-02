import prisma from "@/lib/prisma";
import { leadCreateSchema } from "@/lib/validation/lead";

/**
 * @returns list of leads
 */
export async function GET() {
  const res = await prisma.lead.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      inquiry: true,
      SalePerson: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
  const output: LeadItem[] = res.map((l) => {
    const { SalePerson, ...other } = l;

    return {
      ...other,
      salePerson: SalePerson?.name ?? null,
      salePersonId: SalePerson?.id ?? null,
    };
  });

  return Response.json(output);
}

/**
 * Create a new lead.
 * @param req with body of type `LeadForm`
 */
export async function POST(req: Request) {
  const body = await req.json();

  const validate = leadCreateSchema.safeParse(body);

  if (validate.success) {
    await prisma.lead.create({
      data: validate.data,
    });

    return new Response("success", { status: 200 });
  } else {
    return new Response(JSON.stringify(validate.error), { status: 400 });
  }
}
