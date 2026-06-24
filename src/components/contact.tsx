"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(form: FormData) {
    const errs: Record<string, string> = {};
    if (!form.get("name")) errs.name = "Nome é obrigatório";
    const email = form.get("email") as string;
    if (!email) errs.email = "Email é obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Email inválido";
    if (!form.get("message")) errs.message = "Mensagem é obrigatória";
    return errs;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");
    // Simula envio
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <section id="contato" className="py-20 px-4">
        <div className="mx-auto max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4">Mensagem enviada!</h2>
          <p className="text-muted-foreground">
            Obrigado pelo contato. Responderei em breve.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contato" className="py-20 px-4">
      <div className="mx-auto max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">Contato</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" name="name" placeholder="Seu nome" />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="seu@email.com" />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Mensagem</Label>
            <Textarea id="message" name="message" placeholder="Sua mensagem..." rows={5} />
            {errors.message && (
              <p className="text-sm text-destructive">{errors.message}</p>
            )}
          </div>
          <Button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Enviando..." : "Enviar Mensagem"}
          </Button>
        </form>
      </div>
    </section>
  );
}
