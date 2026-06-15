"use client";

import React from "react";
import Link from "next/link";

export default function ResetPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-xl p-8 bg-surface rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Password Reset</h2>
        <p className="mb-4">If you followed a password reset link, you can set a new password here (handled by Supabase).
        After completing the flow you'll be returned to the app.</p>
        <p className="mb-6">If you don't see a form, check the reset email link or contact support.</p>
        <Link href="/login" className="text-secondary hover:underline">Return to Sign In</Link>
      </div>
    </div>
  );
}
