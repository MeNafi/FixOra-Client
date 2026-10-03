"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  Droplets,
  Zap,
  Hammer,
  Paintbrush,
  Wrench,
  ArrowRight,
  CheckCircle2,
  Clock,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils/utils";

const categories = [
  { name: "Cleaning", icon: Sparkles, tint: "bg-orange-50 text-orange-500 dark:bg-orange-950/40 dark:text-orange-400", count: 12 },
  { name: "Plumbing", icon: Droplets, tint: "bg-blue-50 text-blue-500 dark:bg-blue-950/40 dark:text-blue-400", count: 12 },
  { name: "Electrical", icon: Zap, tint: "bg-amber-50 text-amber-500 dark:bg-amber-950/40 dark:text-amber-400", count: 12 },
  { name: "Handyman", icon: Hammer, tint: "bg-violet-50 text-violet-500 dark:bg-violet-950/40 dark:text-violet-400", count: 12 },
  { name: "Painting", icon: Paintbrush, tint: "bg-emerald-50 text-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-400", count: 12 },
  { name: "Appliance repair", icon: Wrench, tint: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300", count: 12 },
];

const steps = [
  { n: "01", title: "Tell us what you need", desc: "Choose a service and share a few details about your home." },
  { n: "02", title: "Meet your match", desc: "We connect you with a trusted professional who fits your needs." },
  { n: "03", title: "Relax, we've got it", desc: "Track the booking, pay securely, and enjoy the finished job." },
];

const pros = [
  { name: "Arif Rahman", role: "Master Plumber", rating: "4.9", jobs: "128", initials: "AR", color: "bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-200" },
  { name: "Maya Chen", role: "Home Cleaning Pro", rating: "5.0", jobs: "94", initials: "MC", color: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200" },
  { name: "Ethan Brooks", role: "Certified Electrician", rating: "4.8", jobs: "76", initials: "EB", color: "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-200" },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute left-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-amber-200/20 blur-3xl dark:bg-amber-900/10" />
          </div>

          <div className="container grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-sm font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Trusted help, right when you need it
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
                Your home, <span className="text-primary">taken care of.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg text-muted-foreground leading-relaxed">
                Book reliable, vetted professionals for all the little (and big) things that keep your home running beautifully.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" asChild className="rounded-full px-6 h-12 text-base shadow-md shadow-primary/20">
                  <Link href="/technicians">Find a professional <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="rounded-full px-6 h-12 text-base border-border bg-card">
                  <Link href="/services">Browse services</Link>
                </Button>
              </div>
            </motion.div>

            {/* HERO RIGHT SIDE IMAGE CARD */}
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative mx-auto w-full max-w-md">
              <div className="relative rounded-3xl bg-gradient-to-br from-sky-100 to-orange-50 p-6 dark:from-sky-950/40 dark:to-orange-950/30">
                
                {/* AI / High Quality Professional Image */}
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-inner">
                  <Image
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1000&auto=format&fit=crop"
                    alt="Professional technician repairing home appliance"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* Arrives Badge */}
                <div className="absolute right-4 top-10 rounded-full bg-foreground px-3.5 py-2 text-xs font-medium text-background shadow-lg flex items-center gap-1.5 z-10">
                  <Clock className="h-3.5 w-3.5" /> Arrives in 24 min
                </div>

                {/* Booking Confirmed Badge */}
                <div className="absolute left-2 bottom-12 rounded-2xl bg-card/95 backdrop-blur-sm border shadow-lg p-3 flex items-center gap-3 z-10">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Booking confirmed</p>
                    <p className="text-xs text-muted-foreground">Today, 2:00 PM</p>
                  </div>
                </div>

                {/* Professional Label */}
                <div className="absolute right-8 bottom-8 rounded-full bg-card/90 backdrop-blur-sm border px-3 py-1 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase z-10">
                  Professional
                </div>

              </div>
            </motion.div>
          </div>
        </section>

        <section className="container py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">Explore services</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Everything your home needs</h2>
              <p className="mt-2 text-muted-foreground">Showing the latest available catalog</p>
            </div>
            <Link href="/services" className="text-sm font-medium text-primary hover:underline underline-offset-4 inline-flex items-center gap-1">
              View all services <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mb-8 flex flex-wrap gap-2">
            {["All services", "Popular", "Home care", "Repairs"].map((f, i) => (
              <button key={f} className={cn("rounded-full px-4 py-2 text-sm font-medium transition-colors", i === 0 ? "bg-foreground text-background" : "bg-secondary text-muted-foreground hover:bg-secondary/80")}>
                {f}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat, i) => (
              <motion.div key={cat.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link href={`/services?category=${encodeURIComponent(cat.name)}`}>
                  <Card className="group h-full border-0 shadow-sm hover:shadow-md transition-all cursor-pointer bg-card">
                    <CardContent className="flex flex-col items-start gap-4 p-5">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${cat.tint} transition-transform group-hover:scale-110`}>
                        <cat.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{cat.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{cat.count} services</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="bg-muted/40 py-20">
          <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">Simple by design</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Good help should feel effortless.</h2>
              <p className="mt-4 max-w-md text-muted-foreground leading-relaxed">
                From the first search to the final review, FixOra keeps every detail in one calm, clear place.
              </p>
              <Button variant="outline" asChild className="mt-6 rounded-full">
                <Link href="/services">Learn more <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {steps.map((s, i) => (
                <motion.div key={s.n} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card className="h-full border-0 shadow-sm bg-card">
                    <CardContent className="p-6">
                      <p className="text-xs font-semibold text-primary tracking-wider">{s.n}</p>
                      <div className="mt-4 mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold">{s.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">The FixOra standard</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">People you can count on</h2>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-foreground">4.9/5</span> average rating
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {pros.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link href="/technicians">
                  <Card className="group border-0 shadow-sm hover:shadow-md transition-all cursor-pointer bg-card">
                    <CardContent className="flex items-center gap-4 p-5">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold ${p.color}`}>{p.initials}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{p.name}</p>
                        <p className="text-sm text-muted-foreground">{p.role}</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {p.rating} · {p.jobs} jobs
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="container pb-20">
          <div className="relative overflow-hidden rounded-3xl bg-foreground text-background px-8 py-16 text-center md:px-16">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
            <div className="relative">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden><path d="M12 3L4 9v12h5v-7h6v7h5V9l-8-6z" /></svg>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Your next home project starts here.</h2>
              <p className="mx-auto mt-4 max-w-md text-background/70">
                Join thousands of homeowners making their everyday a little easier with FixOra.
              </p>
              <Button size="lg" asChild className="mt-8 rounded-full px-8 h-12 text-base shadow-lg">
                <Link href="/services">Book a service <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
