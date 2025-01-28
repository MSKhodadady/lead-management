import prisma from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

/**
 * Handles PUT requests to update a lead with a new assignee.
 * @param params - The route parameters, containing the `id` of the lead and the `assignee` of the sale person.
 */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string; assignee: string }> }
) {
  const { assignee, id } = await params;

  const assigneeN = Number(assignee);
  const idN = Number(id);

  if (Number.isNaN(assigneeN) && Number.isNaN(idN)) {
    return new Response("bad-request", { status: 400 });
  }

  try {
    await prisma.lead.update({
      where: {
        id: idN,
      },
      data: {
        salePersonId: assigneeN,
      },
    });

    return new Response("success", { status: 200 });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return new Response("error", { status: 400 });
    } else {
      console.error(error);
      return new Response("server-err", { status: 500 });
    }
  }
}
