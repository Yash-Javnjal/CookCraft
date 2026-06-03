import { DietType, Difficulty } from "@prisma/client";
import { prisma } from "./prisma";

type SeedIngredient = {
  name: string;
  quantity: string;
};

type SeedStep = {
  stepNumber: number;
  instruction: string;
};

type SeedRecipe = {
  title: string;
  description: string;
  cuisine: string;
  dietType: DietType;
  difficulty: Difficulty;
  cookTime: number;
  calories: number;
  imageUrl?: string | null;
  ingredients: SeedIngredient[];
  steps: SeedStep[];
};

const recipes = [
  {
    title: "Paneer Butter Masala",
    description: "A rich and creamy north Indian curry with soft paneer cubes simmered in a velvety butter and tomato gravy, spiced with aromatic masalas.",
    cuisine: "Indian",
    dietType: "VEGETARIAN",
    difficulty: "MEDIUM",
    cookTime: 35,
    calories: 420,
    ingredients: [
      { name: "Paneer", quantity: "250g, cubed" },
      { name: "Tomato", quantity: "3 medium, chopped" },
      { name: "Onion", quantity: "1 large, roughly chopped" },
      { name: "Butter", quantity: "3 tbsp" },
      { name: "Garlic", quantity: "4 cloves, minced" },
      { name: "Heavy cream", quantity: "4 tbsp" },
      { name: "Garam masala", quantity: "1 tsp" },
      { name: "Kashmiri red chili powder", quantity: "1 tsp" }
    ],
    steps: [
      { stepNumber: 1, instruction: "Blend tomatoes and onion together into a smooth puree." },
      { stepNumber: 2, instruction: "Heat butter in a pan over medium heat and sauté minced garlic until golden, about 2 minutes." },
      { stepNumber: 3, instruction: "Pour in the tomato-onion puree and cook on medium heat for 10 minutes, stirring occasionally, until oil separates from the masala." },
      { stepNumber: 4, instruction: "Add garam masala, Kashmiri red chili powder, and salt. Mix well and cook for 2 more minutes." },
      { stepNumber: 5, instruction: "Gently add paneer cubes and fold them into the sauce." },
      { stepNumber: 6, instruction: "Stir in heavy cream and simmer on low heat for 5 minutes until the sauce thickens slightly." },
      { stepNumber: 7, instruction: "Garnish with a drizzle of cream and serve hot with naan or steamed rice." }
    ]
  },
  {
    title: "Chicken Tikka Masala",
    description: "Juicy marinated chicken pieces grilled to perfection and tossed in a bold, smoky tomato-onion gravy with warming Indian spices.",
    cuisine: "Indian",
    dietType: "HIGH_PROTEIN",
    difficulty: "MEDIUM",
    cookTime: 50,
    calories: 480,
    ingredients: [
      { name: "Chicken", quantity: "500g, boneless cubes" },
      { name: "Onion", quantity: "2 medium, finely chopped" },
      { name: "Tomato", quantity: "3 medium, pureed" },
      { name: "Garlic", quantity: "5 cloves, minced" },
      { name: "Yogurt", quantity: "4 tbsp" },
      { name: "Heavy cream", quantity: "3 tbsp" },
      { name: "Garam masala", quantity: "1.5 tsp" },
      { name: "Turmeric", quantity: "0.5 tsp" },
      { name: "Cumin", quantity: "1 tsp" }
    ],
    steps: [
      { stepNumber: 1, instruction: "Marinate chicken in yogurt, half the garlic, garam masala, turmeric, and salt for at least 30 minutes." },
      { stepNumber: 2, instruction: "Grill or pan-sear the marinated chicken on high heat until charred and cooked through, about 8 to 10 minutes. Set aside." },
      { stepNumber: 3, instruction: "In the same pan, heat oil and sauté onions until deep golden brown, about 10 minutes." },
      { stepNumber: 4, instruction: "Add remaining garlic and cook for 1 minute, then pour in the tomato puree." },
      { stepNumber: 5, instruction: "Add cumin, garam masala, and salt. Cook the masala on medium heat for 8 minutes until oil separates." },
      { stepNumber: 6, instruction: "Add grilled chicken pieces and stir in heavy cream. Simmer for 5 minutes." },
      { stepNumber: 7, instruction: "Serve hot garnished with fresh coriander alongside rice or naan." }
    ]
  },
  {
    title: "Dal Tadka",
    description: "A comforting everyday Indian lentil dish finished with a sizzling temper of cumin, garlic, and dried chilies — humble, hearty, and deeply flavorful.",
    cuisine: "Indian",
    dietType: "VEGAN",
    difficulty: "EASY",
    cookTime: 25,
    calories: 280,
    ingredients: [
      { name: "Yellow lentils", quantity: "1 cup" },
      { name: "Onion", quantity: "1 medium, finely chopped" },
      { name: "Tomato", quantity: "2 medium, chopped" },
      { name: "Garlic", quantity: "5 cloves, minced" },
      { name: "Cumin seeds", quantity: "1 tsp" },
      { name: "Turmeric", quantity: "0.5 tsp" },
      { name: "Oil", quantity: "2 tbsp" }
    ],
    steps: [
      { stepNumber: 1, instruction: "Rinse lentils thoroughly and pressure cook with 2.5 cups water, turmeric, and salt for 3 whistles until soft. Set aside." },
      { stepNumber: 2, instruction: "Heat oil in a pan and add cumin seeds. Let them splutter for 30 seconds." },
      { stepNumber: 3, instruction: "Add chopped onion and sauté on medium heat until golden brown, about 6 minutes." },
      { stepNumber: 4, instruction: "Add minced garlic and cook for 1 minute until fragrant." },
      { stepNumber: 5, instruction: "Stir in chopped tomatoes and cook until soft and pulpy, about 5 minutes." },
      { stepNumber: 6, instruction: "Pour the cooked lentils into the pan, mix well, and simmer for 5 minutes. Adjust consistency with water if needed." },
      { stepNumber: 7, instruction: "Serve with steamed rice or roti." }
    ]
  },
  {
    title: "Aloo Gobi",
    description: "A classic dry stir-fry of potato and cauliflower cooked with turmeric, cumin, and ginger — a staple from Indian home kitchens.",
    cuisine: "Indian",
    dietType: "VEGETARIAN",
    difficulty: "EASY",
    cookTime: 30,
    calories: 220,
    ingredients: [
      { name: "Potato", quantity: "3 medium, diced" },
      { name: "Cauliflower", quantity: "1 small head, cut into florets" },
      { name: "Onion", quantity: "1 medium, sliced" },
      { name: "Tomato", quantity: "1 large, chopped" },
      { name: "Garlic", quantity: "3 cloves, minced" },
      { name: "Turmeric", quantity: "0.5 tsp" },
      { name: "Cumin seeds", quantity: "1 tsp" },
      { name: "Oil", quantity: "2 tbsp" }
    ],
    steps: [
      { stepNumber: 1, instruction: "Heat oil in a wide pan and add cumin seeds. Let them splutter for 30 seconds." },
      { stepNumber: 2, instruction: "Add sliced onion and sauté until translucent, about 5 minutes." },
      { stepNumber: 3, instruction: "Add garlic and cook for 1 minute, then stir in turmeric and chopped tomato." },
      { stepNumber: 4, instruction: "Add diced potatoes, mix well, cover and cook on low heat for 10 minutes." },
      { stepNumber: 5, instruction: "Add cauliflower florets, salt, and a splash of water. Cover and cook for another 10 minutes until vegetables are tender." },
      { stepNumber: 6, instruction: "Uncover, increase heat, and stir-fry for 2 minutes to dry out any excess moisture. Serve with roti." }
    ]
  },
  {
    title: "Butter Chicken",
    description: "Succulent tandoor-style chicken in a silky, mildly spiced tomato and butter sauce — India's most beloved dish worldwide.",
    cuisine: "Indian",
    dietType: "HIGH_PROTEIN",
    difficulty: "MEDIUM",
    cookTime: 45,
    calories: 510,
    ingredients: [
      { name: "Chicken", quantity: "500g, boneless" },
      { name: "Butter", quantity: "4 tbsp" },
      { name: "Tomato", quantity: "4 medium, pureed" },
      { name: "Onion", quantity: "1 large, chopped" },
      { name: "Garlic", quantity: "4 cloves, minced" },
      { name: "Milk", quantity: "100ml" },
      { name: "Garam masala", quantity: "1.5 tsp" },
      { name: "Kashmiri red chili powder", quantity: "1 tsp" }
    ],
    steps: [
      { stepNumber: 1, instruction: "Season chicken with garam masala, chili powder, and salt. Pan-fry in 1 tbsp butter until golden on all sides. Remove and set aside." },
      { stepNumber: 2, instruction: "In the same pan, melt 2 tbsp butter and sauté onion until golden, about 8 minutes." },
      { stepNumber: 3, instruction: "Add garlic and cook for 1 minute, then pour in the tomato puree." },
      { stepNumber: 4, instruction: "Cook the tomato masala on medium heat for 12 minutes until thick and butter starts to surface." },
      { stepNumber: 5, instruction: "Blend the sauce until smooth and return to the pan." },
      { stepNumber: 6, instruction: "Add chicken, stir in milk, and simmer on low for 10 minutes." },
      { stepNumber: 7, instruction: "Finish with 1 tbsp butter on top and serve with naan or basmati rice." }
    ]
  },
  {
    title: "Palak Paneer",
    description: "A vibrant Indian curry made with fresh spinach puree and golden-fried paneer, spiced with garlic, ginger, and warming garam masala.",
    cuisine: "Indian",
    dietType: "VEGETARIAN",
    difficulty: "MEDIUM",
    cookTime: 35,
    calories: 380,
    ingredients: [
      { name: "Paneer", quantity: "200g, cubed" },
      { name: "Spinach", quantity: "300g, fresh leaves" },
      { name: "Onion", quantity: "1 medium, chopped" },
      { name: "Tomato", quantity: "1 large, chopped" },
      { name: "Garlic", quantity: "4 cloves, minced" },
      { name: "Butter", quantity: "2 tbsp" },
      { name: "Milk", quantity: "50ml" },
      { name: "Garam masala", quantity: "1 tsp" }
    ],
    steps: [
      { stepNumber: 1, instruction: "Blanch spinach in boiling water for 2 minutes, transfer to ice water to preserve color, drain, and blend into a smooth puree." },
      { stepNumber: 2, instruction: "Heat butter in a pan and lightly fry paneer cubes until golden on all sides. Remove and set aside." },
      { stepNumber: 3, instruction: "In the same pan, sauté onion until golden, then add garlic and cook for 1 minute." },
      { stepNumber: 4, instruction: "Add chopped tomato and garam masala. Cook for 5 minutes until soft." },
      { stepNumber: 5, instruction: "Pour in the spinach puree and mix well. Simmer for 5 minutes." },
      { stepNumber: 6, instruction: "Add paneer cubes and a splash of milk. Cook on low heat for 3 minutes." },
      { stepNumber: 7, instruction: "Adjust salt and serve hot with roti or rice." }
    ]
  },
  {
    title: "Margherita Pizza",
    description: "A timeless Neapolitan pizza topped with bright tomato sauce, fresh mozzarella, and fragrant basil on a hand-stretched crispy crust.",
    cuisine: "Italian",
    dietType: "VEGETARIAN",
    difficulty: "MEDIUM",
    cookTime: 40,
    calories: 560,
    ingredients: [
      { name: "Flour", quantity: "2 cups, all-purpose" },
      { name: "Tomato", quantity: "2 medium, crushed" },
      { name: "Cheese", quantity: "150g mozzarella, sliced" },
      { name: "Garlic", quantity: "2 cloves, minced" },
      { name: "Olive oil", quantity: "3 tbsp" },
      { name: "Dried basil", quantity: "1 tsp" },
      { name: "Yeast", quantity: "1 tsp, instant" }
    ],
    steps: [
      { stepNumber: 1, instruction: "Combine flour, yeast, 1 tsp salt, 1 tbsp olive oil, and warm water. Knead into a smooth dough and let it rise for 30 minutes." },
      { stepNumber: 2, instruction: "Cook crushed tomatoes with garlic and 1 tbsp olive oil in a small pan for 8 minutes to make the sauce. Season with salt and dried basil." },
      { stepNumber: 3, instruction: "Preheat oven to 230°C. Stretch the dough into a thin round on a floured surface." },
      { stepNumber: 4, instruction: "Spread tomato sauce over the base leaving a 1-inch border. Layer mozzarella slices evenly on top." },
      { stepNumber: 5, instruction: "Bake for 12 to 15 minutes until crust is golden and cheese is bubbling." },
      { stepNumber: 6, instruction: "Drizzle with olive oil and serve immediately." }
    ]
  },
  {
    title: "Spaghetti Aglio e Olio",
    description: "A deceptively simple yet deeply satisfying Italian pasta made with spaghetti, slowly golden garlic, good olive oil, and a hint of chili.",
    cuisine: "Italian",
    dietType: "VEGAN",
    difficulty: "EASY",
    cookTime: 20,
    calories: 390,
    ingredients: [
      { name: "Spaghetti", quantity: "200g" },
      { name: "Garlic", quantity: "6 cloves, thinly sliced" },
      { name: "Olive oil", quantity: "5 tbsp" },
      { name: "Red chili flakes", quantity: "0.5 tsp" },
      { name: "Parsley", quantity: "2 tbsp, finely chopped" }
    ],
    steps: [
      { stepNumber: 1, instruction: "Cook spaghetti in heavily salted boiling water until al dente. Reserve 1 cup of pasta water before draining." },
      { stepNumber: 2, instruction: "While pasta cooks, heat olive oil in a large pan over low heat and add sliced garlic." },
      { stepNumber: 3, instruction: "Cook garlic slowly until pale golden, about 4 minutes. Add chili flakes and cook 30 more seconds. Do not let garlic brown." },
      { stepNumber: 4, instruction: "Add drained spaghetti to the pan and toss to coat. Add splashes of pasta water to emulsify into a light sauce." },
      { stepNumber: 5, instruction: "Toss in chopped parsley, adjust salt, and serve immediately." }
    ]
  },
  {
    title: "Chicken Alfredo Pasta",
    description: "Creamy, indulgent fettuccine coated in a rich butter and parmesan sauce, topped with seasoned pan-seared chicken strips.",
    cuisine: "Italian",
    dietType: "HIGH_PROTEIN",
    difficulty: "MEDIUM",
    cookTime: 30,
    calories: 620,
    ingredients: [
      { name: "Fettuccine", quantity: "200g" },
      { name: "Chicken", quantity: "300g, sliced into strips" },
      { name: "Butter", quantity: "3 tbsp" },
      { name: "Milk", quantity: "200ml" },
      { name: "Cheese", quantity: "80g parmesan, grated" },
      { name: "Garlic", quantity: "3 cloves, minced" },
      { name: "Onion", quantity: "1 small, finely diced" }
    ],
    steps: [
      { stepNumber: 1, instruction: "Cook fettuccine in salted boiling water until al dente. Reserve 0.5 cup pasta water, drain, and set aside." },
      { stepNumber: 2, instruction: "Season chicken strips with salt and pepper. Sear in 1 tbsp butter over high heat until golden and cooked through, about 5 minutes per side." },
      { stepNumber: 3, instruction: "Remove chicken and set aside. In the same pan, melt remaining butter and sauté onion and garlic until soft, about 3 minutes." },
      { stepNumber: 4, instruction: "Pour in milk and bring to a gentle simmer. Stir in grated parmesan until the sauce is smooth and creamy." },
      { stepNumber: 5, instruction: "Add fettuccine and toss to coat. Add a splash of pasta water if the sauce is too thick." },
      { stepNumber: 6, instruction: "Plate the pasta, top with sliced chicken, and garnish with extra parmesan and black pepper." }
    ]
  },
  {
    title: "Classic Beef Lasagna",
    description: "Layers of seasoned ground beef bolognese, creamy béchamel sauce, and tender pasta sheets baked until golden and bubbling.",
    cuisine: "Italian",
    dietType: "NONE",
    difficulty: "HARD",
    cookTime: 90,
    calories: 680,
    ingredients: [
      { name: "Lasagna sheets", quantity: "12 sheets" },
      { name: "Ground beef", quantity: "400g" },
      { name: "Tomato", quantity: "3 medium, pureed" },
      { name: "Onion", quantity: "1 large, diced" },
      { name: "Garlic", quantity: "4 cloves, minced" },
      { name: "Cheese", quantity: "200g mozzarella, grated" },
      { name: "Milk", quantity: "400ml" },
      { name: "Butter", quantity: "3 tbsp" },
      { name: "Flour", quantity: "3 tbsp" }
    ],
    steps: [
      { stepNumber: 1, instruction: "Sauté onion in oil until soft, add garlic, then brown the ground beef over high heat. Season with salt and pepper." },
      { stepNumber: 2, instruction: "Add tomato puree and simmer the bolognese sauce on low heat for 20 minutes until thick." },
      { stepNumber: 3, instruction: "Make the béchamel: melt butter in a saucepan, whisk in flour, and cook for 1 minute. Gradually add milk, whisking constantly until thick and smooth. Season with salt and a pinch of nutmeg." },
      { stepNumber: 4, instruction: "Preheat oven to 190°C. Grease a deep baking dish." },
      { stepNumber: 5, instruction: "Layer lasagna sheets, bolognese sauce, béchamel, and grated cheese. Repeat layers ending with béchamel and cheese on top." },
      { stepNumber: 6, instruction: "Cover with foil and bake for 30 minutes. Remove foil and bake uncovered for 15 more minutes until the top is golden." },
      { stepNumber: 7, instruction: "Rest for 10 minutes before slicing and serving." }
    ]
  },
  {
    title: "Chicken Fried Rice",
    description: "Wok-tossed day-old rice with tender chicken, scrambled eggs, and savory soy sauce — a Chinese takeout staple made at home.",
    cuisine: "Chinese",
    dietType: "HIGH_PROTEIN",
    difficulty: "EASY",
    cookTime: 25,
    calories: 450,
    ingredients: [
      { name: "Rice", quantity: "2 cups, cooked and cold" },
      { name: "Chicken", quantity: "250g, diced" },
      { name: "Eggs", quantity: "2 large" },
      { name: "Onion", quantity: "1 medium, diced" },
      { name: "Garlic", quantity: "3 cloves, minced" },
      { name: "Soy sauce", quantity: "3 tbsp" },
      { name: "Oil", quantity: "3 tbsp" }
    ],
    steps: [
      { stepNumber: 1, instruction: "Heat 2 tbsp oil in a wok over high heat. Stir-fry diced chicken until cooked through and slightly golden, about 5 minutes. Remove and set aside." },
      { stepNumber: 2, instruction: "Add remaining oil and sauté onion and garlic for 2 minutes." },
      { stepNumber: 3, instruction: "Push to one side, crack eggs into the wok, and scramble until just set." },
      { stepNumber: 4, instruction: "Add cold rice, breaking up any clumps. Toss everything together on high heat for 3 minutes." },
      { stepNumber: 5, instruction: "Return chicken to the wok, drizzle with soy sauce, and toss for 2 more minutes." },
      { stepNumber: 6, instruction: "Taste, adjust seasoning, and serve immediately." }
    ]
  },
  {
    title: "Veg Hakka Noodles",
    description: "Indo-Chinese street-style noodles tossed in a blazing wok with crisp vegetables, soy sauce, and chili sauce.",
    cuisine: "Chinese",
    dietType: "VEGETARIAN",
    difficulty: "EASY",
    cookTime: 20,
    calories: 340,
    ingredients: [
      { name: "Hakka noodles", quantity: "200g" },
      { name: "Onion", quantity: "1 medium, thinly sliced" },
      { name: "Garlic", quantity: "3 cloves, minced" },
      { name: "Soy sauce", quantity: "2 tbsp" },
      { name: "Chili sauce", quantity: "1 tbsp" },
      { name: "Oil", quantity: "3 tbsp" },
      { name: "Spring onion", quantity: "2 stalks, chopped" }
    ],
    steps: [
      { stepNumber: 1, instruction: "Boil noodles according to package directions until just tender. Drain, rinse with cold water, and toss with 1 tsp oil to prevent sticking." },
      { stepNumber: 2, instruction: "Heat oil in a wok over high heat. Sauté garlic for 30 seconds, then add onion and stir-fry for 2 minutes." },
      { stepNumber: 3, instruction: "Add noodles and toss on high heat for 2 minutes." },
      { stepNumber: 4, instruction: "Drizzle soy sauce and chili sauce. Toss vigorously for another 2 minutes." },
      { stepNumber: 5, instruction: "Garnish with chopped spring onion and serve immediately." }
    ]
  },
  {
    title: "Kung Pao Chicken",
    description: "A classic Sichuan stir-fry with tender chicken, crunchy peanuts, dried chilies, and a bold sweet-spicy-tangy sauce.",
    cuisine: "Chinese",
    dietType: "HIGH_PROTEIN",
    difficulty: "MEDIUM",
    cookTime: 30,
    calories: 420,
    ingredients: [
      { name: "Chicken", quantity: "400g, cubed" },
      { name: "Onion", quantity: "1 medium, diced" },
      { name: "Garlic", quantity: "4 cloves, minced" },
      { name: "Soy sauce", quantity: "3 tbsp" },
      { name: "Peanuts", quantity: "50g, roasted" },
      { name: "Dried red chilies", quantity: "6 whole" },
      { name: "Oil", quantity: "3 tbsp" }
    ],
    steps: [
      { stepNumber: 1, instruction: "Marinate chicken in 1 tbsp soy sauce and a pinch of cornstarch for 15 minutes." },
      { stepNumber: 2, instruction: "Mix the sauce: combine remaining soy sauce, 1 tbsp vinegar, 1 tsp sugar, and 1 tbsp water. Set aside." },
      { stepNumber: 3, instruction: "Heat oil in a wok over high heat. Fry dried chilies for 30 seconds until they darken slightly." },
      { stepNumber: 4, instruction: "Add marinated chicken and stir-fry until cooked through and golden, about 5 minutes." },
      { stepNumber: 5, instruction: "Add onion and garlic. Stir-fry for 2 more minutes." },
      { stepNumber: 6, instruction: "Pour in the sauce and toss everything together. Cook for 1 minute until sauce coats the chicken." },
      { stepNumber: 7, instruction: "Add roasted peanuts, toss to combine, and serve with steamed rice." }
    ]
  },
  {
    title: "Egg Fried Rice",
    description: "Fluffy wok-tossed rice scrambled with eggs, scallions, and soy sauce — a quick Chinese staple made in under 20 minutes.",
    cuisine: "Chinese",
    dietType: "VEGETARIAN",
    difficulty: "EASY",
    cookTime: 20,
    calories: 380,
    ingredients: [
      { name: "Rice", quantity: "2 cups, cooked and cold" },
      { name: "Eggs", quantity: "3 large" },
      { name: "Onion", quantity: "1 small, diced" },
      { name: "Garlic", quantity: "2 cloves, minced" },
      { name: "Soy sauce", quantity: "2 tbsp" },
      { name: "Butter", quantity: "1 tbsp" },
      { name: "Oil", quantity: "2 tbsp" }
    ],
    steps: [
      { stepNumber: 1, instruction: "Heat oil in a wok over high heat until smoking. Add garlic and onion and stir-fry for 1 minute." },
      { stepNumber: 2, instruction: "Push to the side and add butter to the center. Crack in eggs and scramble until 80% set." },
      { stepNumber: 3, instruction: "Add cold rice and break up any clumps. Toss everything on high heat for 3 minutes." },
      { stepNumber: 4, instruction: "Drizzle soy sauce over the rice and toss vigorously for 1 more minute." },
      { stepNumber: 5, instruction: "Taste, adjust seasoning, and serve hot." }
    ]
  },
  {
    title: "Cheese Omelette",
    description: "A perfectly folded fluffy egg omelette with a gooey melted cheddar center — a quick, satisfying American breakfast classic.",
    cuisine: "American",
    dietType: "VEGETARIAN",
    difficulty: "EASY",
    cookTime: 10,
    calories: 310,
    ingredients: [
      { name: "Eggs", quantity: "3 large" },
      { name: "Cheese", quantity: "50g cheddar, grated" },
      { name: "Milk", quantity: "2 tbsp" },
      { name: "Butter", quantity: "1 tbsp" },
      { name: "Onion", quantity: "0.5 small, finely diced" }
    ],
    steps: [
      { stepNumber: 1, instruction: "Whisk eggs with milk, a pinch of salt, and pepper until well combined and slightly frothy." },
      { stepNumber: 2, instruction: "Melt butter in a non-stick pan over medium heat. Sauté diced onion for 2 minutes until softened." },
      { stepNumber: 3, instruction: "Pour the egg mixture into the pan. Let it sit undisturbed for 30 seconds until the edges start to set." },
      { stepNumber: 4, instruction: "Using a spatula, gently push set edges toward the center, tilting the pan to let uncooked egg flow to the edges." },
      { stepNumber: 5, instruction: "When the top is just barely set, sprinkle grated cheese over one half." },
      { stepNumber: 6, instruction: "Fold the omelette in half over the cheese and slide onto a plate. Serve immediately." }
    ]
  },
  {
    title: "Classic Beef Burger",
    description: "A juicy smash-style beef patty with melted cheddar, sliced tomato, and caramelized onion stacked in a toasted brioche bun.",
    cuisine: "American",
    dietType: "HIGH_PROTEIN",
    difficulty: "MEDIUM",
    cookTime: 25,
    calories: 620,
    ingredients: [
      { name: "Ground beef", quantity: "300g" },
      { name: "Burger buns", quantity: "2" },
      { name: "Cheese", quantity: "2 slices cheddar" },
      { name: "Tomato", quantity: "1 medium, sliced" },
      { name: "Onion", quantity: "0.5 medium, sliced into rings" },
      { name: "Butter", quantity: "1 tbsp" },
      { name: "Garlic", quantity: "2 cloves, minced" }
    ],
    steps: [
      { stepNumber: 1, instruction: "Mix ground beef with minced garlic, salt, and pepper. Divide into 2 equal balls without overworking the meat." },
      { stepNumber: 2, instruction: "Heat a cast-iron pan over high heat until smoking. Place beef balls and smash flat with a spatula. Cook 3 minutes without moving." },
      { stepNumber: 3, instruction: "Flip patties, place a cheese slice on each, and cook for 2 more minutes. Remove from heat." },
      { stepNumber: 4, instruction: "Toast bun halves in butter in the same pan until golden." },
      { stepNumber: 5, instruction: "Assemble: add tomato slices and onion rings on the bottom bun, place the cheeseburger patty, and close with the top bun." },
      { stepNumber: 6, instruction: "Press gently and serve immediately." }
    ]
  },
  {
    title: "Buttermilk Pancakes",
    description: "Tall, fluffy American-style pancakes with golden edges and a tender crumb, served with maple syrup and a pat of melting butter.",
    cuisine: "American",
    dietType: "VEGETARIAN",
    difficulty: "EASY",
    cookTime: 20,
    calories: 350,
    ingredients: [
      { name: "Flour", quantity: "1.5 cups, all-purpose" },
      { name: "Milk", quantity: "1 cup" },
      { name: "Eggs", quantity: "2 large" },
      { name: "Butter", quantity: "2 tbsp, melted" },
      { name: "Baking powder", quantity: "2 tsp" }
    ],
    steps: [
      { stepNumber: 1, instruction: "Whisk flour, baking powder, 2 tbsp sugar, and 0.5 tsp salt together in a large bowl." },
      { stepNumber: 2, instruction: "In a separate bowl, whisk milk, eggs, and melted butter together." },
      { stepNumber: 3, instruction: "Pour wet ingredients into dry and stir gently until just combined. A few lumps are fine; do not over-mix." },
      { stepNumber: 4, instruction: "Heat a non-stick pan over medium heat and lightly grease with butter. Pour 0.25 cup batter per pancake." },
      { stepNumber: 5, instruction: "Cook until bubbles form on the surface and edges look set, about 2 minutes. Flip and cook 1 more minute until golden." },
      { stepNumber: 6, instruction: "Serve immediately with maple syrup and a pat of butter." }
    ]
  },
  {
    title: "Mac and Cheese",
    description: "Ultra-creamy baked macaroni in a velvety cheddar sauce with a golden bubbling top — American comfort food at its finest.",
    cuisine: "American",
    dietType: "VEGETARIAN",
    difficulty: "MEDIUM",
    cookTime: 30,
    calories: 580,
    ingredients: [
      { name: "Macaroni", quantity: "2 cups" },
      { name: "Cheese", quantity: "200g cheddar, grated" },
      { name: "Milk", quantity: "300ml" },
      { name: "Butter", quantity: "3 tbsp" },
      { name: "Flour", quantity: "2 tbsp" },
      { name: "Garlic", quantity: "1 clove, minced" }
    ],
    steps: [
      { stepNumber: 1, instruction: "Cook macaroni in salted boiling water until al dente. Drain and set aside." },
      { stepNumber: 2, instruction: "Melt butter in a saucepan over medium heat. Add garlic and cook for 30 seconds." },
      { stepNumber: 3, instruction: "Whisk in flour and cook for 1 minute, stirring constantly." },
      { stepNumber: 4, instruction: "Gradually pour in milk, whisking to prevent lumps. Cook until the sauce thickens, about 5 minutes." },
      { stepNumber: 5, instruction: "Remove from heat and stir in three-quarters of the grated cheese until fully melted and smooth. Season with salt and pepper." },
      { stepNumber: 6, instruction: "Add macaroni to the sauce and stir to coat. Transfer to a baking dish, top with remaining cheese, and bake at 200°C for 15 minutes until golden." }
    ]
  },
  {
    title: "Chicken Tacos",
    description: "Juicy spiced chicken strips in warm corn tortillas with fresh tomato salsa, shredded cheese, and a squeeze of lime.",
    cuisine: "Mexican",
    dietType: "HIGH_PROTEIN",
    difficulty: "EASY",
    cookTime: 25,
    calories: 390,
    ingredients: [
      { name: "Chicken", quantity: "350g, cut into strips" },
      { name: "Corn tortillas", quantity: "6 small" },
      { name: "Tomato", quantity: "2 medium, diced" },
      { name: "Onion", quantity: "1 medium, diced" },
      { name: "Cheese", quantity: "60g, shredded" },
      { name: "Garlic", quantity: "3 cloves, minced" },
      { name: "Oil", quantity: "2 tbsp" }
    ],
    steps: [
      { stepNumber: 1, instruction: "Season chicken strips with cumin, chili powder, garlic, salt, and pepper." },
      { stepNumber: 2, instruction: "Heat oil in a pan over high heat. Cook chicken strips for 5 to 6 minutes until cooked through and slightly charred." },
      { stepNumber: 3, instruction: "Make quick salsa: combine diced tomato, half the diced onion, salt, and a squeeze of lime juice. Set aside." },
      { stepNumber: 4, instruction: "Warm tortillas directly on a gas flame for 30 seconds per side, or in a dry pan, until soft and lightly charred." },
      { stepNumber: 5, instruction: "Assemble tacos: add chicken, spoon over salsa, top with remaining raw onion and shredded cheese." },
      { stepNumber: 6, instruction: "Serve immediately with lime wedges on the side." }
    ]
  },
  {
    title: "Bean and Cheese Quesadilla",
    description: "Crispy golden flour tortillas filled with creamy refried beans, melted cheddar, and caramelized onion — a quick Mexican weeknight meal.",
    cuisine: "Mexican",
    dietType: "VEGETARIAN",
    difficulty: "EASY",
    cookTime: 15,
    calories: 430,
    ingredients: [
      { name: "Flour tortillas", quantity: "4 large" },
      { name: "Cheese", quantity: "150g cheddar, grated" },
      { name: "Refried beans", quantity: "1 cup" },
      { name: "Onion", quantity: "1 small, thinly sliced" },
      { name: "Butter", quantity: "1 tbsp" },
      { name: "Tomato", quantity: "1 medium, diced" }
    ],
    steps: [
      { stepNumber: 1, instruction: "Heat butter in a skillet over medium heat. Sauté sliced onion until golden and caramelized, about 7 minutes." },
      { stepNumber: 2, instruction: "Spread a layer of refried beans over one half of each tortilla." },
      { stepNumber: 3, instruction: "Top beans with caramelized onion, diced tomato, and a generous handful of grated cheese." },
      { stepNumber: 4, instruction: "Fold each tortilla in half to close." },
      { stepNumber: 5, instruction: "In the same skillet over medium heat, cook each quesadilla for 2 to 3 minutes per side until crispy and golden with melted cheese inside." },
      { stepNumber: 6, instruction: "Slice into wedges and serve with sour cream or salsa." }
    ]
  }
] satisfies SeedRecipe[];

function normalizeIngredientName(name: string) {
  return name.trim();
}

const transactionOptions = {
  maxWait: 20_000,
  timeout: 60_000,
};

function getRecipeData(recipe: SeedRecipe) {
  return {
    title: recipe.title,
    description: recipe.description,
    cuisine: recipe.cuisine,
    dietType: recipe.dietType,
    difficulty: recipe.difficulty,
    cookTime: recipe.cookTime,
    calories: recipe.calories,
    imageUrl: recipe.imageUrl ?? null,
  };
}

async function main() {
  const ingredientNames = new Set<string>();

  for (const recipe of recipes) {
    for (const ingredient of recipe.ingredients) {
      const name = normalizeIngredientName(ingredient.name);

      if (!name) {
        throw new Error(`Recipe "${recipe.title}" contains an ingredient without a name.`);
      }

      ingredientNames.add(name);
    }
  }

  await prisma.ingredient.createMany({
    data: Array.from(ingredientNames).map((name) => ({ name })),
    skipDuplicates: true,
  });

  const ingredients = await prisma.ingredient.findMany({
    where: { name: { in: Array.from(ingredientNames) } },
    select: { id: true, name: true },
  });

  const ingredientIdsByName = new Map(ingredients.map((ingredient) => [ingredient.name, ingredient.id]));
  const recipeTitles = recipes.map((recipe) => recipe.title);
  const existingRecipes = await prisma.recipe.findMany({
    where: { title: { in: recipeTitles } },
    select: { id: true, title: true },
  });
  const recipeIdsByTitle = new Map(existingRecipes.map((recipe) => [recipe.title, recipe.id]));

  for (const recipe of recipes) {
    const existingRecipeId = recipeIdsByTitle.get(recipe.title);
    const savedRecipe = existingRecipeId
      ? await prisma.recipe.update({
          where: { id: existingRecipeId },
          data: getRecipeData(recipe),
        })
      : await prisma.recipe.create({
          data: getRecipeData(recipe),
        });

    recipeIdsByTitle.set(recipe.title, savedRecipe.id);
  }

  const recipeIds = Array.from(recipeIdsByTitle.values());
  const recipeIngredientData = recipes.flatMap((recipe) => {
    const recipeId = recipeIdsByTitle.get(recipe.title);

    if (!recipeId) {
      throw new Error(`Recipe "${recipe.title}" was not saved.`);
    }

    const ingredientsByName = new Map<string, SeedIngredient>();

    for (const ingredient of recipe.ingredients) {
      const name = normalizeIngredientName(ingredient.name);
      ingredientsByName.set(name, { ...ingredient, name });
    }

    return Array.from(ingredientsByName.values()).map((ingredient) => {
      const ingredientId = ingredientIdsByName.get(ingredient.name);

      if (!ingredientId) {
        throw new Error(`Ingredient "${ingredient.name}" was not saved.`);
      }

      return {
        recipeId,
        ingredientId,
        quantity: ingredient.quantity.trim(),
      };
    });
  });

  const recipeStepData = recipes.flatMap((recipe) => {
    const recipeId = recipeIdsByTitle.get(recipe.title);

    if (!recipeId) {
      throw new Error(`Recipe "${recipe.title}" was not saved.`);
    }

    return recipe.steps
      .slice()
      .sort((a, b) => a.stepNumber - b.stepNumber)
      .map((step) => ({
        recipeId,
        stepNumber: step.stepNumber,
        instruction: step.instruction.trim(),
      }));
  });

  await prisma.$transaction(
    [
      prisma.recipeIngredient.deleteMany({
        where: { recipeId: { in: recipeIds } },
      }),
      prisma.recipeStep.deleteMany({
        where: { recipeId: { in: recipeIds } },
      }),
      prisma.recipeIngredient.createMany({
        data: recipeIngredientData,
        skipDuplicates: true,
      }),
      prisma.recipeStep.createMany({
        data: recipeStepData,
        skipDuplicates: true,
      }),
    ],
    transactionOptions
  );

  console.log(`Seeded ${recipes.length} recipes.`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    const exitCode = process.exitCode ?? 0;

    await Promise.race([
      prisma.$disconnect(),
      new Promise<void>((resolve) => {
        setTimeout(resolve, 2_000);
      }),
    ]);

    process.exit(exitCode);
  });
