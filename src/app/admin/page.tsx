"use client";

import { MainLayout } from "@/components/layout/Main";
import { H1 } from "@/components/typography/H1";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";

export default function AdminPage() {
  const query = useQuery({
    queryKey: ["lead-list"],
    queryFn: async () => {
      const res = await fetch("/api/lead");
      return (await res.json()) as LeadItem[];
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
          {query.data?.map(({ id, name, email, inquiry, salesPerson }) => (
            <TableRow key={id}>
              <TableCell>{name}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{inquiry}</TableCell>
              <TableCell>{salesPerson ?? ""}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </MainLayout>
  );
}
