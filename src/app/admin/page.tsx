"use client";

import { MainLayout } from "@/components/layout/Main";
import { H1 } from "@/components/typography/H1";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { SalePerson } from "@prisma/client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";

export default function AdminPage() {
  const { toast } = useToast();
  const qClient = useQueryClient();

  /**
   * query for reading leads.
   */
  const leads = useQuery({
    queryKey: ["lead-list"],
    queryFn: async () => {
      const res = await fetch("/api/lead");
      return (await res.json()) as LeadItem[];
    },
  });

  /**
   * query for reading sale persons.
   */
  const salePersons = useQuery({
    queryKey: ["sale-persons"],
    queryFn: async () => {
      const res = await fetch("/api/sale-person");

      return (await res.json()) as SalePerson[];
    },
  });

  /**
   * mutation for assigning a lead to a sale person.
   */
  const chooseSalePerson = useMutation({
    mutationFn: async (P: { leadId: number; salePersonId: number }) => {
      const { leadId, salePersonId } = P;

      try {
        const res = await fetch(`/api/lead/${leadId}/assign/${salePersonId}`, {
          method: "PUT",
        });
        if (res.ok) {
          toast({ title: "Change successfully!" });
          qClient.invalidateQueries({ queryKey: ["lead-list"] });
        } else {
          toast({ title: "Server Err" });
        }
      } catch (error) {
        console.error(error);
        toast({ title: "Server Err" });
      }
    },
  });

  return (
    <MainLayout>
      <title>Admin</title>
      <H1>Admin</H1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Assigned Salesperson</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.data?.map(
            ({ id, name, email, inquiry, salePerson, salePersonId }) => (
              <TableRow key={id}>
                <TableCell>{name}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{inquiry}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      {salePerson ? (
                        salePerson
                      ) : (
                        <span className="italic text-gray-400">No One</span>
                      )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {salePersons.data?.map((i) => (
                        <DropdownMenuItem
                          key={i.id}
                          className="flex justify-between"
                          onClick={() =>
                            chooseSalePerson.mutate({
                              leadId: id,
                              salePersonId: i.id,
                            })
                          }
                        >
                          {i.name} {i.id == salePersonId ? <Check /> : <></>}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </MainLayout>
  );
}
