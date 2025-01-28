import prisma from "@/lib/prisma";
import { leadCreateSchema } from "@/lib/validation/lead";

export async function GET(req: Request) {
  const res = await prisma.lead.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      inquiry: true,
      SalePerson: {
        select: {
          name: true,
        },
      },
    },
  });
  const output = res.map((l) => {
    const { SalePerson, ...other } = l;

    return {
      ...other,
      salesPerson: SalePerson?.name ?? null,
    };
  });

  return Response.json(output);
}

export async function POST(req: Request) {
  const body = await req.json();

  const validate = leadCreateSchema.safeParse(body);

  if (validate.success) {
    const res = await prisma.lead.create({
      data: validate.data,
    });

    return new Response("success", { status: 200 });
  } else {
    return new Response(JSON.stringify(validate.error), { status: 400 });
  }
}
