"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { postSchema, type PostFormValues } from "./post-schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function FormPost() {
  const { data: session } = useSession();
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const router = useRouter();
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      name: "",
      categori_id: undefined,
      status: "draft",
      tags: "",
      image_url: "",
      content: "",
      description: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/categori/index`, {
          headers: { Authorization: `Bearer ${session?.data?.token || ""}` },
        });
        if (res.ok) {
          const data = await res.json();
          const items = Array.isArray(data?.data) ? data.data : [];
          setCategories(
            items.map((c: { id: number; name: string }) => ({
              id: c.id,
              name: c.name,
            }))
          );
        }
      } catch {}
    };
    run();
  }, [API_BASE, session?.data?.token]);

  const onSubmit = async (values: PostFormValues) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/admin/post/store`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.data?.token || ""}`,
        },
        body: JSON.stringify({
          name: values.name,
          categori_id:
            values.categori_id !== undefined && values.categori_id !== null
              ? typeof values.categori_id === "string"
                ? Number(values.categori_id)
                : values.categori_id
              : null,
          status: values.status,
          tags: values.tags ? values.tags : null,
          image_url: values.image_url ? values.image_url : null,
          content: values.content,
          description: values.description ? values.description : null,
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to create post");
      }
      toast.success("Post created");
      form.reset();
      router.push("/management/post");
    } catch {
      toast.error("Gagal membuat post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-4xl space-y-8"
        >
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div>
              <h2 className="font-semibold text-foreground">Post</h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Buat dan kelola post
              </p>
            </div>
            <div className="md:col-span-2 space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-2" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categori_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value ? String(field.value) : ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((c) => (
                            <SelectItem key={c.id} value={String(c.id)}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Pilih status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="mt-2"
                          placeholder="tag1,tag2"
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="mt-2"
                        placeholder="https://..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Konten</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="mt-2" rows={6} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="mt-2"
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Separator className="my-2" />
          <div className="flex items-center justify-end space-x-4">
            <Button
              type="submit"
              disabled={loading}
              className="whitespace-nowrap"
            >
              {loading ? "Menyimpan..." : "Simpan Post"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
