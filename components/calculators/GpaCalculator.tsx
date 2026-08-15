"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

type Course = { id: string; name: string; credits: number; grade: number };

const GRADE_POINTS = [10, 9, 8, 7, 6, 5, 4, 0];

export default function GpaCalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: crypto.randomUUID(), name: "Subject 1", credits: 4, grade: 9 },
    { id: crypto.randomUUID(), name: "Subject 2", credits: 3, grade: 8 },
  ]);

  const gpa = useMemo(() => {
    const totalCredits = courses.reduce((s, c) => s + c.credits, 0);
    const totalPoints = courses.reduce((s, c) => s + c.credits * c.grade, 0);
    return totalCredits ? totalPoints / totalCredits : 0;
  }, [courses]);

  function update(id: string, patch: Partial<Course>) {
    setCourses((cs) => cs.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }

  function addCourse() {
    setCourses((cs) => [...cs, { id: crypto.randomUUID(), name: `Subject ${cs.length + 1}`, credits: 3, grade: 8 }]);
  }

  function removeCourse(id: string) {
    setCourses((cs) => cs.filter((c) => c.id !== id));
  }

  return (
    <section className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-medium">GPA / CGPA Planner</h2>
        <div className="rounded-full bg-gradient-to-br from-[var(--v-emerald)] to-[var(--v-cyan)] px-4 py-1.5 text-sm font-semibold text-black">
          {gpa.toFixed(2)} SGPA
        </div>
      </div>
      <p className="text-sm text-[var(--v-text-dim)] mb-5">Add each subject&apos;s credits and grade point to see live SGPA.</p>

      <div className="space-y-2">
        {courses.map((c) => (
          <div key={c.id} className="grid grid-cols-[1fr_5rem_5rem_2rem] items-center gap-2">
            <input
              value={c.name}
              onChange={(e) => update(c.id, { name: e.target.value })}
              className="rounded-lg bg-[var(--v-obsidian-raised)] border border-[var(--v-glass-border)] px-2 py-1.5 text-sm outline-none focus:border-[var(--v-emerald)]"
            />
            <input
              type="number"
              min={1}
              max={6}
              value={c.credits}
              onChange={(e) => update(c.id, { credits: Number(e.target.value) })}
              className="rounded-lg bg-[var(--v-obsidian-raised)] border border-[var(--v-glass-border)] px-2 py-1.5 text-sm outline-none focus:border-[var(--v-emerald)]"
              aria-label="Credits"
            />
            <select
              value={c.grade}
              onChange={(e) => update(c.id, { grade: Number(e.target.value) })}
              className="rounded-lg bg-[var(--v-obsidian-raised)] border border-[var(--v-glass-border)] px-2 py-1.5 text-sm outline-none focus:border-[var(--v-emerald)]"
            >
              {GRADE_POINTS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <button onClick={() => removeCourse(c.id)} aria-label="Remove subject" className="text-[var(--v-text-dim)] hover:text-red-400">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <button onClick={addCourse} className="mt-4 flex items-center gap-1.5 text-sm text-[var(--v-emerald)] hover:underline">
        <Plus className="h-4 w-4" /> Add subject
      </button>
    </section>
  );
}
