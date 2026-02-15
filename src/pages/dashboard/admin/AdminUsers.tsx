import { motion } from "framer-motion";
import { Users, Search, MoreVertical, Plus, Shield } from "lucide-react";
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const users = [
  { id: 1, name: "Mohammed Bouabdelli", email: "m.bouabdelli@email.com", role: "Patient", status: "active", joined: "10 Jan 2026" },
  { id: 2, name: "Dr. Amina Benjelloun", email: "a.benjelloun@email.com", role: "Médecin", status: "active", joined: "5 Jan 2026" },
  { id: 3, name: "Ahmed Bennani", email: "a.bennani@email.com", role: "Patient", status: "active", joined: "15 Déc 2025" },
  { id: 4, name: "Dr. Youssef El Mansouri", email: "y.elmansouri@email.com", role: "Médecin", status: "active", joined: "1 Déc 2025" },
  { id: 5, name: "Fatima Zahra", email: "f.zahra@email.com", role: "Patient", status: "inactive", joined: "20 Nov 2025" },
  { id: 6, name: "Sara Idrissi", email: "s.idrissi@email.com", role: "Patient", status: "active", joined: "10 Nov 2025" },
];

const roleColor: Record<string, string> = {
  Patient: "bg-primary/10 text-primary",
  Médecin: "bg-success/10 text-success",
  Admin: "bg-warning/10 text-warning",
};

const AdminUsers = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <DashboardLayout role="admin" userName="Administrateur">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold text-foreground">Utilisateurs</h1>
          <Button variant="hero"><Plus className="w-4 h-4" />Ajouter</Button>
        </div>
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Rôle" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="Patient">Patients</SelectItem>
              <SelectItem value="Médecin">Médecins</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Inscription</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(u => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell><span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColor[u.role] || ""}`}>{u.role}</span></TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.status === "active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                        {u.status === "active" ? "Actif" : "Inactif"}
                      </span>
                    </TableCell>
                    <TableCell>{u.joined}</TableCell>
                    <TableCell className="text-right"><Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default AdminUsers;
