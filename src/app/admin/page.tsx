"use client";

import { MainLayout } from "@/components/layout/Main";
import { H1 } from "@/components/typography/H1";
import { Button } from "@/components/ui/button";
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
import { SalePerson } from "@prisma/client";

import { useQuery } from "@tanstack/react-query";

export default function AdminPage() {
  const leads = useQuery({
    queryKey: ["lead-list"],
    queryFn: async () => {
      const res = await fetch("/api/lead");
      return (await res.json()) as LeadItem[];
    },
  });

  const salePersons = useQuery({
    queryKey: ["sale-persons"],
    queryFn: async () => {
      const res = await fetch("/api/sale-person");

      return (await res.json()) as SalePerson[];
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
            <TableHead>Inquiry</TableHead>
            <TableHead>Assignee</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.data?.map(({ id, name, email, inquiry, salesPerson }) => (
            <TableRow key={id}>
              <TableCell>{name}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{inquiry}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline">{salesPerson ?? ""}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {salePersons.data?.map((i) => (
                      <DropdownMenuItem key={i.id}>{i.name}</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </MainLayout>
  );
}
