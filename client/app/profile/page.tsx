"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { recipeService } from "@/services/recipe.service";
import LoadingState from "@/components/LoadingState";
import { api } from "@/lib/api";

interface ProfileStats {
  recipesCreatedCount: number;
  favoritesSavedCount: number;
  mostUsedCuisine: string;
  totalCookTime: number;
}

interface ProfileData {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
  stats: ProfileStats;
  createdRecipes: any[];
  favoriteRecipes: any[];
  recentActivity: {
    created: any[];
    favorited: any[];
  };
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<any | null>(null); // null means "Create"

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formCuisine, setFormCuisine] = useState("");
  const [formDifficulty, setFormDifficulty] = useState<"EASY" | "MEDIUM" | "HARD">("MEDIUM");
  const [formCookTime, setFormCookTime] = useState(30);
  const [formCalories, setFormCalories] = useState<number | "">("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formIngredients, setFormIngredients] = useState<{ name: string; quantity: string }[]>([
    { name: "", quantity: "" },
  ]);
  const [formSteps, setFormSteps] = useState<{ stepNumber: number; instruction: string }[]>([
    { stepNumber: 1, instruction: "" },
  ]);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Fetch profile data
  const fetchProfile = async () => {
    if (!user || !user.id) return;
    try {
      setLoading(true);
      const res = await api.get<{ success: boolean; data: ProfileData }>(`/users/profile/${user.id}`);
      if (res.data.success) {
        setProfile(res.data.data);
      }
    } catch (err: any) {
      console.error("Error loading profile:", err);
      setErrorMsg("Failed to load your culinary journal details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Lock body scroll when recipe editor modal is open to prevent background scrolling
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // Handle open modal for create
  const handleOpenCreateModal = () => {
    setEditingRecipe(null);
    setFormTitle("");
    setFormDescription("");
    setFormCuisine("");
    setFormDifficulty("MEDIUM");
    setFormCookTime(30);
    setFormCalories("");
    setFormImageUrl("");
    setFormIngredients([{ name: "", quantity: "" }]);
    setFormSteps([{ stepNumber: 1, instruction: "" }]);
    setValidationErrors({});
    setIsModalOpen(true);
  };

  // Handle open modal for edit
  const handleOpenEditModal = (recipe: any) => {
    setEditingRecipe(recipe);
    setFormTitle(recipe.title);
    setFormDescription(recipe.description);
    setFormCuisine(recipe.cuisine || "");
    setFormDifficulty(recipe.difficulty);
    setFormCookTime(recipe.cookTime);
    setFormCalories(recipe.calories || "");
    setFormImageUrl(recipe.imageUrl || "");
    
    // Map existing ingredients
    const mappedIngredients = recipe.ingredients && recipe.ingredients.length > 0 
      ? recipe.ingredients.map((ri: any) => ({
          name: ri.ingredient?.name || ri.name || "",
          quantity: ri.quantity || "",
        }))
      : [{ name: "", quantity: "" }];
    setFormIngredients(mappedIngredients);

    // Map existing steps
    const mappedSteps = recipe.steps && recipe.steps.length > 0
      ? recipe.steps.map((rs: any) => ({
          stepNumber: rs.stepNumber,
          instruction: rs.instruction,
        }))
      : [{ stepNumber: 1, instruction: "" }];
    setFormSteps(mappedSteps);

    setValidationErrors({});
    setIsModalOpen(true);
  };

  // Dynamic lists helpers
  const handleAddIngredient = () => {
    setFormIngredients([...formIngredients, { name: "", quantity: "" }]);
  };

  const handleRemoveIngredient = (index: number) => {
    if (formIngredients.length === 1) return;
    const newIngredients = [...formIngredients];
    newIngredients.splice(index, 1);
    setFormIngredients(newIngredients);
  };

  const handleIngredientChange = (index: number, field: "name" | "quantity", value: string) => {
    const newIngredients = [...formIngredients];
    newIngredients[index][field] = value;
    setFormIngredients(newIngredients);
  };

  const handleAddStep = () => {
    setFormSteps([...formSteps, { stepNumber: formSteps.length + 1, instruction: "" }]);
  };

  const handleRemoveStep = (index: number) => {
    if (formSteps.length === 1) return;
    const newSteps = [...formSteps];
    newSteps.splice(index, 1);
    
    // Recalculate step numbers
    const updatedSteps = newSteps.map((step, i) => ({
      ...step,
      stepNumber: i + 1,
    }));
    setFormSteps(updatedSteps);
  };

  const handleStepInstructionChange = (index: number, value: string) => {
    const newSteps = [...formSteps];
    newSteps[index].instruction = value;
    setFormSteps(newSteps);
  };

  // Form Validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formTitle.trim()) errors.title = "Recipe Title is required";
    if (!formDescription.trim()) errors.description = "A short description is required";
    
    // Filter out blank ingredients
    const validIngredients = formIngredients.filter(i => i.name.trim() !== "");
    if (validIngredients.length === 0) {
      errors.ingredients = "At least one ingredient name is required";
    }

    // Filter out blank steps
    const validSteps = formSteps.filter(s => s.instruction.trim() !== "");
    if (validSteps.length === 0) {
      errors.steps = "At least one recipe instruction step is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Form Submit (Create or Update)
  const handleSubmitRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSaving(true);
    setErrorMsg("");

    const validIngredients = formIngredients.filter(i => i.name.trim() !== "");
    const validSteps = formSteps.filter(s => s.instruction.trim() !== "");

    const payload = {
      title: formTitle.trim(),
      description: formDescription.trim(),
      cuisine: formCuisine.trim() || "Global",
      difficulty: formDifficulty,
      cookTime: Number(formCookTime),
      calories: formCalories ? Number(formCalories) : null,
      imageUrl: formImageUrl.trim() || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop",
      ingredients: validIngredients,
      steps: validSteps,
    };

    try {
      if (editingRecipe) {
        // Edit mode
        await recipeService.updateRecipe(editingRecipe.id, payload);
        setSuccessMsg("Your recipe journal entry has been refined.");
      } else {
        // Create mode
        if (user?.id) {
          await recipeService.createRecipe(user.id, payload);
          setSuccessMsg("A new page has been added to your culinary archive.");
        }
      }
      setIsModalOpen(false);
      fetchProfile();
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err: any) {
      console.error("Error saving recipe:", err);
      setErrorMsg("Failed to preserve your recipe card details.");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Delete Recipe
  const handleDeleteRecipe = async (recipeId: string) => {
    if (!confirm("Are you sure you want to tear this recipe from your notebook? This cannot be undone.")) return;
    try {
      setErrorMsg("");
      await recipeService.deleteRecipe(recipeId);
      setSuccessMsg("The recipe has been removed from your archive.");
      fetchProfile();
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err: any) {
      console.error("Error deleting recipe:", err);
      setErrorMsg("Failed to remove recipe.");
    }
  };

  // Unauthenticated user fallback view
  if (!user) {
    return (
      <div className="flex-1 w-full bg-surface py-20 flex flex-col items-center justify-center relative px-margin-mobile">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface-container/20 to-surface pointer-events-none"></div>
        <main className="max-w-lg w-full text-center relative z-10 bg-surface-bright paper-texture border border-outline-variant/30 shadow-xl rounded-2xl p-12 select-none transform rotate-[-1deg]">
          <div className="w-16 h-16 bg-secondary/15 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-secondary text-4xl">menu_book</span>
          </div>
          <h1 className="font-headline-lg text-primary text-3xl mb-4 italic">
            Your Culinary Journal
          </h1>
          <p className="font-body-md text-on-surface-variant leading-relaxed mb-8">
            "Your personal archive of family secrets, sensory exploration notes, and cataloged heritage recipes is waiting for you."
          </p>
          <div className="space-y-4">
            <Link href="/login">
              <button className="w-full py-4 bg-primary text-on-primary rounded-lg font-label-caps tracking-widest hover:bg-primary-container active:scale-95 transition-all">
                Sign In to Kitchen Log
              </button>
            </Link>
            <p className="text-xs font-label-accent text-on-surface-variant italic">
              Become a custodian of your culinary heritage.
            </p>
          </div>
        </main>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return <LoadingState />;
  }

  const joinDateFormatted = profile?.user?.createdAt 
    ? new Date(profile.user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "June 2026";

  return (
    <div className="w-full min-h-screen bg-surface py-12 px-margin-mobile md:px-margin-desktop antialiased">
      <div className="max-w-container-max mx-auto space-y-12">
        
        {/* Banner Messages */}
        {successMsg && (
          <div className="bg-tertiary-container text-on-tertiary-container p-4 rounded-xl border border-secondary/20 shadow-md text-center max-w-2xl mx-auto flex items-center justify-center gap-2 animate-fade-in-up active">
            <span className="material-symbols-outlined">check_circle</span>
            <span className="font-body-md font-medium">{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="bg-error-container text-on-error-container p-4 rounded-xl border border-error/20 shadow-md text-center max-w-2xl mx-auto flex items-center justify-center gap-2 animate-fade-in-up active">
            <span className="material-symbols-outlined">warning</span>
            <span className="font-body-md font-medium">{errorMsg}</span>
          </div>
        )}

        {/* 1. Header: The Chef's Vintage Journal Cover */}
        <header className="w-full bg-[#FFFFF0] border-2 border-outline-variant/40 rounded-2xl shadow-md p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 text-left">
          <div className="texture-overlay"></div>
          {/* Subtle notebook page lines overlay on top */}
          <div className="absolute top-0 right-0 w-16 h-16 opacity-30 rotate-12 bg-contain bg-no-repeat pointer-events-none" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/vintage-paper.png')` }}></div>

          {/* Left: Chef Avatar Badge */}
          <div className="relative group">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-surface-container rounded-full flex items-center justify-center border-4 border-secondary/20 shadow-inner group-hover:border-secondary transition-all">
              <span className="material-symbols-outlined text-[48px] md:text-[64px] text-secondary">chef_hat</span>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center shadow-md border border-surface-bright">
              <span className="material-symbols-outlined text-[16px]">verified</span>
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <span className="font-handwritten text-3xl text-secondary block mb-1">
                From the desk of
              </span>
              <h1 className="font-headline-lg text-primary text-3xl md:text-4xl font-bold leading-tight">
                {profile?.user?.name}
              </h1>
              <p className="font-body-md text-on-surface-variant text-sm mt-1">{profile?.user?.email}</p>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-xs font-label-caps text-on-surface-variant/80 border-t border-outline-variant/30 pt-4">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-secondary">calendar_month</span>
                Joined {joinDateFormatted}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-secondary">import_contacts</span>
                {profile?.stats?.recipesCreatedCount} Recipes Penned
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-secondary">bookmark</span>
                {profile?.stats?.favoritesSavedCount} Favorites Preserved
              </span>
            </div>
          </div>

          {/* Action button */}
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <button
              onClick={handleOpenCreateModal}
              className="px-6 py-3 bg-secondary text-on-secondary font-label-caps tracking-widest text-sm rounded-lg hover:shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 border border-secondary-container"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Create New Recipe</span>
            </button>
            <button
              onClick={logout}
              className="px-6 py-2 bg-transparent text-error hover:bg-error-container/20 rounded-lg font-label-caps tracking-widest text-xs transition-all flex items-center justify-center gap-2 border border-error/20"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* 2. User Statistics Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
          {/* Card 1: Recipes Created */}
          <div className="group bg-[#FFFFF0] border border-outline-variant/30 p-6 rounded-xl relative shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] hover:-rotate-1 text-left">
            <div className="tape-effect"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-label-caps text-xs text-on-surface-variant/70 tracking-wider">CREATIONS</span>
              <span className="material-symbols-outlined text-secondary opacity-60">menu_book</span>
            </div>
            <h3 className="font-headline-lg text-primary text-4xl font-bold mb-1">
              {profile?.stats?.recipesCreatedCount}
            </h3>
            <p className="font-label-accent text-xs italic text-on-surface-variant">Recipes Created</p>
          </div>

          {/* Card 2: Favorites Saved */}
          <div className="group bg-[#FFFFF0] border border-outline-variant/30 p-6 rounded-xl relative shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] hover:rotate-1 text-left">
            <div className="tape-effect"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-label-caps text-xs text-on-surface-variant/70 tracking-wider">FAVORITES</span>
              <span className="material-symbols-outlined text-secondary opacity-60">bookmark</span>
            </div>
            <h3 className="font-headline-lg text-primary text-4xl font-bold mb-1">
              {profile?.stats?.favoritesSavedCount}
            </h3>
            <p className="font-label-accent text-xs italic text-on-surface-variant">Recipes Saved</p>
          </div>

          {/* Card 3: Most Used Cuisine */}
          <div className="group bg-[#FFFFF0] border border-outline-variant/30 p-6 rounded-xl relative shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] hover:-rotate-1 text-left">
            <div className="tape-effect"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-label-caps text-xs text-on-surface-variant/70 tracking-wider">SIGNATURE STYLE</span>
              <span className="material-symbols-outlined text-secondary opacity-60">restaurant_menu</span>
            </div>
            <h3 className="font-headline-lg text-primary text-2xl font-bold truncate mb-1" title={profile?.stats?.mostUsedCuisine}>
              {profile?.stats?.mostUsedCuisine}
            </h3>
            <p className="font-label-accent text-xs italic text-on-surface-variant">Most Used Cuisine</p>
          </div>

          {/* Card 4: Total Cooking Time */}
          <div className="group bg-[#FFFFF0] border border-outline-variant/30 p-6 rounded-xl relative shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] hover:rotate-1 text-left">
            <div className="tape-effect"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-label-caps text-xs text-on-surface-variant/70 tracking-wider">KITCHEN TIME</span>
              <span className="material-symbols-outlined text-secondary opacity-60">schedule</span>
            </div>
            <h3 className="font-headline-lg text-primary text-4xl font-bold mb-1">
              {profile?.stats?.totalCookTime} <span className="text-lg font-normal">min</span>
            </h3>
            <p className="font-label-accent text-xs italic text-on-surface-variant">Shared Cooking Time</p>
          </div>
        </section>

        {/* 3. My Recipes Grid */}
        <section className="space-y-6 text-left">
          <div className="flex justify-between items-end border-b border-outline-variant/30 pb-4">
            <div>
              <span className="font-label-caps text-xs text-secondary tracking-widest block mb-1">MY NOTEBOOK</span>
              <h2 className="font-headline-lg text-primary text-2xl md:text-3xl">Culinary Archive</h2>
            </div>
            {profile?.createdRecipes && profile.createdRecipes.length > 0 && (
              <span className="font-label-accent text-xs italic text-on-surface-variant">
                {profile.createdRecipes.length} chapters documented
              </span>
            )}
          </div>

          {/* Empty State check */}
          {!profile?.createdRecipes || profile.createdRecipes.length === 0 ? (
            <div className="bg-[#FFFFF0] border border-dashed border-outline-variant/60 rounded-2xl p-16 text-center select-none shadow-sm max-w-xl mx-auto transform rotate-1">
              <div className="relative w-24 h-24 mx-auto mb-6 opacity-30">
                {/* SVG illustrated sketch style logo */}
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-secondary w-full h-full">
                  <path d="M20,60 Q50,40 80,60 C85,63 80,75 75,80 C50,85 25,82 20,60" />
                  <path d="M45,40 C45,20 55,20 55,40" />
                  <line x1="50" y1="40" x2="50" y2="80" />
                </svg>
              </div>
              <p className="font-handwritten text-3xl text-secondary mb-2">
                "Every great recipe begins with a single idea."
              </p>
              <p className="font-body-md text-on-surface-variant text-sm mb-6 max-w-md mx-auto">
                Your culinary journal is currently blank. Tap below to write down your first custom recipe, list ingredients, and map steps.
              </p>
              <button
                onClick={handleOpenCreateModal}
                className="px-6 py-3 bg-secondary text-on-secondary font-label-caps tracking-widest text-xs rounded shadow hover:bg-secondary-fixed active:scale-95 transition-all"
              >
                Create Your First Recipe
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {profile.createdRecipes.map((recipe) => {
                const recipeImageUrl = recipe.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop";
                const recipeCreatedDate = new Date(recipe.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                });

                return (
                  <article key={recipe.id} className="recipe-card bg-[#FFFFF0] rounded-xl overflow-hidden shadow-[0_4px_15px_-5px_rgba(46,70,0,0.08)] flex flex-col h-full border border-surface-variant/50 relative">
                    <div className="relative h-56 w-full overflow-hidden bg-surface-container">
                      <img
                        alt={recipe.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        src={recipeImageUrl}
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow relative text-left">
                      <div className="texture-overlay"></div>
                      
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-label-caps font-label-caps text-secondary tracking-widest uppercase text-xs">
                          {recipe.cuisine || "Global"}
                        </span>
                        <span className="bg-[#e5e2da] text-on-surface-variant px-2 py-0.5 rounded text-[10px] font-label-caps uppercase">
                          {recipe.difficulty.toLowerCase()}
                        </span>
                      </div>

                      <h3 className="text-headline-md font-headline-md text-primary text-xl mb-2 line-clamp-1">
                        {recipe.title}
                      </h3>

                      <p className="text-body-md font-body-md text-on-surface-variant text-xs mb-4 line-clamp-2 flex-grow">
                        {recipe.description}
                      </p>

                      <div className="flex items-center gap-4 text-on-surface-variant text-xs mb-4 border-t border-outline-variant/20 pt-3">
                        <div className="flex items-center gap-1" title="Cook Time">
                          <span className="material-symbols-outlined text-[16px]">schedule</span>
                          <span>{recipe.cookTime} min</span>
                        </div>
                        {recipe.calories !== null && (
                          <div className="flex items-center gap-1" title="Calories">
                            <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                            <span>{recipe.calories} kcal</span>
                          </div>
                        )}
                        <span className="text-[10px] text-on-surface-variant/60 ml-auto">{recipeCreatedDate}</span>
                      </div>

                      {/* Custom CRUD Actions Area */}
                      <div className="flex gap-2 border-t border-outline-variant/30 pt-3 mt-auto">
                        <Link href={`/recipes/${recipe.id}`} className="flex-1">
                          <button className="w-full py-2 bg-surface-container hover:bg-surface-container-highest border border-outline-variant/20 rounded font-label-caps text-[10px] tracking-wider text-primary flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-[0.98]">
                            <span className="material-symbols-outlined text-[14px]">visibility</span>
                            <span>View</span>
                          </button>
                        </Link>
                        <button
                          onClick={() => handleOpenEditModal(recipe)}
                          className="flex-1 py-2 bg-surface-container hover:bg-surface-container-highest border border-outline-variant/20 rounded font-label-caps text-[10px] tracking-wider text-secondary flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-[0.98]"
                        >
                          <span className="material-symbols-outlined text-[14px]">edit</span>
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteRecipe(recipe.id)}
                          className="px-3 py-2 bg-error-container/10 hover:bg-error-container/20 border border-error/20 rounded text-error flex items-center justify-center cursor-pointer transition-all active:scale-[0.98]"
                          title="Delete Recipe"
                        >
                          <span className="material-symbols-outlined text-[14px]">delete</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* 4. Recent Activity Section */}
        {profile?.recentActivity && (profile.recentActivity.created.length > 0 || profile.recentActivity.favorited.length > 0) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left border-t border-outline-variant/25 pt-12">
            
            {/* Recent Creations Column */}
            <div className="space-y-4">
              <h3 className="font-headline-md text-primary text-xl italic flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">history</span>
                Recently Documented
              </h3>
              {profile.recentActivity.created.length === 0 ? (
                <p className="text-xs text-on-surface-variant italic font-label-accent">No entries logged yet.</p>
              ) : (
                <div className="space-y-3">
                  {profile.recentActivity.created.map((recipe) => (
                    <Link key={recipe.id} href={`/recipes/${recipe.id}`} className="block">
                      <div className="flex items-center gap-4 p-3 bg-[#FFFFF0] border border-outline-variant/20 rounded-lg hover:bg-surface-container transition-colors shadow-sm">
                        <img className="w-12 h-12 rounded object-cover" src={recipe.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200&auto=format&fit=crop"} alt="" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-headline-md text-sm text-primary truncate">{recipe.title}</h4>
                          <p className="text-[10px] text-on-surface-variant/80 uppercase tracking-widest">{recipe.cuisine || "Global"} • {recipe.cookTime} min</p>
                        </div>
                        <span className="material-symbols-outlined text-secondary opacity-60">arrow_forward</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Favorites Column */}
            <div className="space-y-4">
              <h3 className="font-headline-md text-primary text-xl italic flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">bookmark</span>
                Saved Heritage Recipes
              </h3>
              {profile.recentActivity.favorited.length === 0 ? (
                <p className="text-xs text-on-surface-variant italic font-label-accent">No saved bookmarks yet.</p>
              ) : (
                <div className="space-y-3">
                  {profile.recentActivity.favorited.map((recipe) => (
                    <Link key={recipe.id} href={`/recipes/${recipe.id}`} className="block">
                      <div className="flex items-center gap-4 p-3 bg-[#FFFFF0] border border-outline-variant/20 rounded-lg hover:bg-surface-container transition-colors shadow-sm">
                        <img className="w-12 h-12 rounded object-cover" src={recipe.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200&auto=format&fit=crop"} alt="" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-headline-md text-sm text-primary truncate">{recipe.title}</h4>
                          <p className="text-[10px] text-on-surface-variant/80 uppercase tracking-widest">{recipe.cuisine || "Global"} • {recipe.cookTime} min</p>
                        </div>
                        <span className="material-symbols-outlined text-secondary opacity-60">arrow_forward</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

          </section>
        )}

      </div>

      {/* 5. Recipe Builder / Editor Modal */}
      {isModalOpen && (
        <div 
          data-lenis-prevent
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto animate-fade-in-up active"
        >
          {/* Main Modal Card (Styled like an Open Journal notebook) */}
          <div className="bg-[#FFFFF0] border-2 border-outline-variant/40 rounded-2xl max-w-4xl w-full max-h-[90vh] shadow-2xl relative flex flex-col">
            <div className="texture-overlay"></div>
            
            {/* Header */}
            <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container/30">
              <div>
                <span className="font-handwritten text-2xl text-secondary block mb-1">
                  {editingRecipe ? "Refining chapter" : "Drafting new page"}
                </span>
                <h2 className="font-headline-lg text-primary text-2xl">
                  {editingRecipe ? "Edit Recipe Card" : "New Recipe Notebook Entry"}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-highest cursor-pointer border border-outline-variant/20 transition-all"
              >
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitRecipe} className="flex-1 overflow-y-auto p-8 space-y-8 text-left">
              
              {/* Section: General Info */}
              <div className="space-y-6">
                <h3 className="font-label-caps text-xs text-secondary tracking-widest border-b border-outline-variant/20 pb-2">I. ESSENTIAL DETAILS</h3>
                
                {/* Title */}
                <div className="space-y-2">
                  <label className="font-label-caps text-xs text-on-surface-variant block font-bold">Recipe Title *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-outline text-on-surface font-body-md focus:border-secondary transition-colors py-2 outline-none placeholder:text-on-surface-variant/40 italic"
                    placeholder="e.g. Grandma's Braised Saffron Lamb..."
                  />
                  {validationErrors.title && (
                    <span className="text-xs text-error font-body-md block">{validationErrors.title}</span>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="font-label-caps text-xs text-on-surface-variant block font-bold">Description / Story *</label>
                  <textarea
                    required
                    rows={3}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full bg-transparent border border-outline-variant/60 rounded p-3 text-on-surface font-body-md focus:border-secondary transition-colors outline-none placeholder:text-on-surface-variant/40"
                    placeholder="Provide a description or the backstory of the dish. Write with heart..."
                  />
                  {validationErrors.description && (
                    <span className="text-xs text-error font-body-md block">{validationErrors.description}</span>
                  )}
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Cuisine */}
                  <div className="space-y-2">
                    <label className="font-label-caps text-xs text-on-surface-variant block font-bold">Cuisine</label>
                    <input
                      type="text"
                      value={formCuisine}
                      onChange={(e) => setFormCuisine(e.target.value)}
                      className="w-full bg-transparent border-0 border-b border-outline text-on-surface focus:border-secondary transition-colors py-2 outline-none placeholder:text-on-surface-variant/40"
                      placeholder="e.g. Italian, Tuscan, Indian"
                    />
                  </div>

                  {/* Difficulty */}
                  <div className="space-y-2">
                    <label className="font-label-caps text-xs text-on-surface-variant block font-bold">Difficulty</label>
                    <select
                      value={formDifficulty}
                      onChange={(e) => setFormDifficulty(e.target.value as any)}
                      className="w-full bg-transparent border-0 border-b border-outline text-on-surface focus:border-secondary py-2 outline-none cursor-pointer"
                    >
                      <option className="bg-[#FFFFF0] text-primary" value="EASY">Easy</option>
                      <option className="bg-[#FFFFF0] text-primary" value="MEDIUM">Medium</option>
                      <option className="bg-[#FFFFF0] text-primary" value="HARD">Hard</option>
                    </select>
                  </div>

                  {/* Cook time */}
                  <div className="space-y-2">
                    <label className="font-label-caps text-xs text-on-surface-variant block font-bold">Cook Time (Minutes) *</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={formCookTime}
                      onChange={(e) => setFormCookTime(Number(e.target.value))}
                      className="w-full bg-transparent border-0 border-b border-outline text-on-surface focus:border-secondary py-2 outline-none"
                    />
                  </div>

                  {/* Calories */}
                  <div className="space-y-2">
                    <label className="font-label-caps text-xs text-on-surface-variant block font-bold">Calories (kcal)</label>
                    <input
                      type="number"
                      min={0}
                      value={formCalories}
                      onChange={(e) => setFormCalories(e.target.value === "" ? "" : Number(e.target.value))}
                      className="w-full bg-transparent border-0 border-b border-outline text-on-surface focus:border-secondary py-2 outline-none"
                      placeholder="e.g. 450"
                    />
                  </div>

                  {/* Image URL */}
                  <div className="space-y-2 sm:col-span-2">
                    <label className="font-label-caps text-xs text-on-surface-variant block font-bold">Recipe Image Link / URL</label>
                    <input
                      type="url"
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                      className="w-full bg-transparent border-0 border-b border-outline text-on-surface focus:border-secondary py-2 outline-none placeholder:text-on-surface-variant/40"
                      placeholder="Paste Unsplash image URL..."
                    />
                  </div>
                </div>
              </div>

              {/* Section: Ingredients */}
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                  <h3 className="font-label-caps text-xs text-secondary tracking-widest">II. INGREDIENTS</h3>
                  <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="text-xs font-label-caps tracking-widest text-secondary flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">add</span> Add Ingredient
                  </button>
                </div>

                {validationErrors.ingredients && (
                  <span className="text-xs text-error font-body-md block">{validationErrors.ingredients}</span>
                )}

                <div className="space-y-3">
                  {formIngredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-4 items-center">
                      <input
                        type="text"
                        required={index === 0}
                        value={ingredient.name}
                        onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                        className="flex-[2] bg-transparent border-0 border-b border-outline-variant text-on-surface focus:border-secondary py-2 outline-none"
                        placeholder="e.g. Fresh paneer cubes"
                      />
                      <input
                        type="text"
                        value={ingredient.quantity}
                        onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
                        className="flex-1 bg-transparent border-0 border-b border-outline-variant text-on-surface focus:border-secondary py-2 outline-none"
                        placeholder="e.g. 250g"
                      />
                      <button
                        type="button"
                        disabled={formIngredients.length === 1}
                        onClick={() => handleRemoveIngredient(index)}
                        className="p-2 text-on-surface-variant/60 hover:text-error disabled:opacity-30 cursor-pointer"
                        title="Remove Ingredient"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section: Instructions */}
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                  <h3 className="font-label-caps text-xs text-secondary tracking-widest">III. METHOD / STEPS</h3>
                  <button
                    type="button"
                    onClick={handleAddStep}
                    className="text-xs font-label-caps tracking-widest text-secondary flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">add</span> Add Step
                  </button>
                </div>

                {validationErrors.steps && (
                  <span className="text-xs text-error font-body-md block">{validationErrors.steps}</span>
                )}

                <div className="space-y-4">
                  {formSteps.map((step, index) => (
                    <div key={index} className="flex gap-4 items-start bg-surface-container/20 p-4 rounded border border-outline-variant/20">
                      <span className="font-handwritten text-2xl text-secondary pt-1.5 w-6 text-right">
                        {step.stepNumber}.
                      </span>
                      <textarea
                        required={index === 0}
                        rows={2}
                        value={step.instruction}
                        onChange={(e) => handleStepInstructionChange(index, e.target.value)}
                        className="flex-1 bg-transparent border-0 border-b border-outline-variant text-on-surface focus:border-secondary py-2 outline-none"
                        placeholder={`Describe step ${step.stepNumber}...`}
                      />
                      <button
                        type="button"
                        disabled={formSteps.length === 1}
                        onClick={() => handleRemoveStep(index)}
                        className="p-2 text-on-surface-variant/60 hover:text-error disabled:opacity-30 pt-3 cursor-pointer"
                        title="Remove Step"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 border-t border-outline-variant/30 pt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border border-outline-variant/60 rounded font-label-caps tracking-wider text-xs hover:bg-surface-container transition-all cursor-pointer"
                >
                  Cancel Draft
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-3 bg-primary text-on-primary font-label-caps tracking-widest text-xs rounded hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center gap-2"
                >
                  {isSaving && <span className="animate-spin text-sm">⏳</span>}
                  <span>{editingRecipe ? "Update Recipe Entry" : "Commit to Archive"}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
