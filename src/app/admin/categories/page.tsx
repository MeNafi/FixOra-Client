"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Plus, Pencil, Trash2, Loader2, FolderOpen } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AdminNav } from "@/components/layout/admin-nav";
import { ProtectedRoute } from "@/components/layout/protected-route";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PageLoader, EmptyState } from "@/components/shared/loading";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { categoriesApi, getErrorMessage } from "@/lib/api";
import type { Category } from "@/types";

type CategoryForm = { name: string; description?: string; icon?: string };

function CategoriesManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { register, handleSubmit, reset } = useForm<CategoryForm>();

  const load = async () => {
    setLoading(true);
    try {
      const res = await categoriesApi.adminGetAll();
      setCategories(res.data || []);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    reset({ name: "", description: "", icon: "" });
    setOpen(true);
  };

  const openEdit = (category: Category) => {
    setEditing(category);
    reset({ name: category.name, description: category.description || "", icon: category.icon || "" });
    setOpen(true);
  };

  const onSubmit = async (data: CategoryForm) => {
    setSubmitting(true);
    try {
      if (editing) {
        await categoriesApi.update(editing.id, data);
        toast.success("Category updated");
      } else {
        await categoriesApi.create(data);
        toast.success("Category created");
      }
      setOpen(false);
      reset();
      load();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await categoriesApi.delete(deleteTarget.id);
      toast.success("Category deleted");
      setDeleteTarget(null);
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <AdminNav />
      <main className="container flex-1 py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
            <p className="mt-1 text-muted-foreground">Manage service categories</p>
          </div>
          <Dialog
            open={open}
            onOpenChange={(v) => {
              setOpen(v);
              if (!v) setEditing(null);
            }}
          >
            <DialogTrigger asChild>
              <Button onClick={openCreate}>
                <Plus className="mr-2 h-4 w-4" /> Add category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editing ? "Edit category" : "New category"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" {...register("name", { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" {...register("description")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="icon">Icon (optional)</Label>
                  <Input id="icon" placeholder="e.g. wrench" {...register("icon")} />
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={submitting}>
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {editing ? "Save changes" : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <PageLoader />
        ) : categories.length === 0 ? (
          <EmptyState title="No categories" description="Create your first category" icon={FolderOpen} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <Card key={c.id} className="flex flex-col transition-shadow hover:shadow-md">
                <CardHeader className="flex flex-row items-start justify-between gap-2">
                  <div className="min-w-0">
                    <CardTitle className="text-lg">{c.name}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {c.description || "No description"}
                    </p>
                    {c._count?.services != null && (
                      <p className="mt-2 text-xs font-medium text-primary">
                        {c._count.services} service{c._count.services === 1 ? "" : "s"}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(c)} aria-label="Edit category">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteTarget(c)}
                      aria-label="Delete category"
                      className="[--btn-fill:theme(colors.red.100)] hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </main>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
        title="Delete this category?"
        description={
          deleteTarget
            ? `"${deleteTarget.name}" will be permanently removed. Services in this category may be affected.`
            : undefined
        }
        confirmLabel="Yes, delete"
        loading={deleting}
        onConfirm={confirmDelete}
      />

      <Footer />
    </div>
  );
}

export default function AdminCategoriesPage() {
  return (
    <ProtectedRoute roles={["ADMIN"]}>
      <CategoriesManagement />
    </ProtectedRoute>
  );
}
