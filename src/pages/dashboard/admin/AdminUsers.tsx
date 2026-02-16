import { motion } from "framer-motion";
import { Search, Plus, MoreVertical, Trash2, Eye, Edit } from "lucide-react";
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const initialUsers = [
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
  const { toast } = useToast();
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewUser, setViewUser] = useState<typeof initialUsers[0] | null>(null);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("Patient");

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleAdd = () => {
    if (!newName || !newEmail) return;
    setUsers(prev => [...prev, { id: prev.length + 1, name: newName, email: newEmail, role: newRole, status: "active", joined: "Aujourd'hui" }]);
    setShowAdd(false); setNewName(""); setNewEmail(""); setNewRole("Patient");
    toast({ title: "Utilisateur ajouté", description: `${newName} a été ajouté avec succès.` });
  };

  const handleDelete = (id: number) => {
    const user = users.find(u => u.id === id);
    setUsers(prev => prev.filter(u => u.id !== id));
    setDeleteId(null);
    toast({ title: "Utilisateur supprimé", description: `${user?.name} a été supprimé.` });
  };

  const handleToggleStatus = (id: number) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u));
    toast({ title: "Statut modifié" });
  };

  return (
    <DashboardLayout role="admin" userName="Administrateur">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold text-foreground">Utilisateurs</h1>
          <Button variant="hero" onClick={() => setShowAdd(true)}><Plus className="w-4 h-4" />Ajouter</Button>
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
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setViewUser(u)}><Eye className="w-4 h-4 mr-2" />Voir</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleStatus(u.id)}><Edit className="w-4 h-4 mr-2" />{u.status === "active" ? "Désactiver" : "Activer"}</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => setDeleteId(u.id)}><Trash2 className="w-4 h-4 mr-2" />Supprimer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader><DialogTitle>Ajouter un utilisateur</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Nom complet</Label><Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Nom complet" /></div>
            <div className="space-y-2"><Label>Email</Label><Input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="email@example.com" /></div>
            <div className="space-y-2">
              <Label>Rôle</Label>
              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="Patient">Patient</SelectItem><SelectItem value="Médecin">Médecin</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Annuler</Button>
            <Button variant="hero" onClick={handleAdd} disabled={!newName || !newEmail}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer l'utilisateur</DialogTitle>
            <DialogDescription>Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Annuler</Button>
            <Button variant="destructive" onClick={() => deleteId && handleDelete(deleteId)}>Supprimer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={viewUser !== null} onOpenChange={() => setViewUser(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Détails utilisateur</DialogTitle></DialogHeader>
          {viewUser && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-muted-foreground">Nom:</span> <span className="font-medium">{viewUser.name}</span></div>
              <div><span className="text-muted-foreground">Email:</span> <span className="font-medium">{viewUser.email}</span></div>
              <div><span className="text-muted-foreground">Rôle:</span> <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColor[viewUser.role]}`}>{viewUser.role}</span></div>
              <div><span className="text-muted-foreground">Statut:</span> <span className="font-medium">{viewUser.status === "active" ? "Actif" : "Inactif"}</span></div>
              <div><span className="text-muted-foreground">Inscription:</span> <span className="font-medium">{viewUser.joined}</span></div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminUsers;
