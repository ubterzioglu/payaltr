"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { clearAdminSession, setAdminSession, verifyAdminPassword } from "@/lib/admin-auth";

export type AuthState = { error: string | null };

export async function signIn(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/hesabim");

  if (!email || !password) {
    return { error: "E-posta ve şifre zorunludur." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "E-posta veya şifre hatalı." };
  }

  redirect(next);
}

export async function signUp(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password) {
    return { error: "Tüm alanlar zorunludur." };
  }
  if (password.length < 8) {
    return { error: "Şifre en az 8 karakter olmalıdır." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } },
  });

  if (error) {
    return { error: "Kayıt oluşturulamadı. Bu e-posta zaten kullanılıyor olabilir." };
  }

  redirect("/giris?registered=1");
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function adminSignIn(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!password) {
    return { error: "Şifre zorunludur." };
  }
  if (!verifyAdminPassword(password)) {
    return { error: "Şifre hatalı." };
  }

  await setAdminSession();
  redirect(next);
}

export async function adminSignOut(): Promise<void> {
  await clearAdminSession();
  redirect("/admin/giris");
}
