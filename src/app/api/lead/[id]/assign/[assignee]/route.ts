import prisma from "@/lib/prisma";

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
    const res = await prisma.lead.update({
      where: {
        id: idN,
      },
      data: {
        salePersonId: assigneeN,
      },
    });

    return new Response("success", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("error", { status: 400 });
  }
}
