import { Recipe } from '../types/Recipe';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Grilled Chicken Salad',
    titleAr: 'سلطة الدجاج المشوي',
    description: 'A healthy and delicious grilled chicken salad with fresh vegetables.',
    descriptionAr: 'سلطة دجاج مشوي صحية ولذيذة مع الخضروات الطازجة.',
    imageUrl: 'https://images.pexels.com/photos/5718071/pexels-photo-5718071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    calories: 400,
    protein: 35,
    carbs: 20,
    fat: 15,
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    servings: 2,
    mealType: 'lunch',
    cuisineType: 'Mediterranean',
    ingredients: [
      {
        id: '1-1',
        name: 'Chicken breast',
        nameAr: 'صدر دجاج',
        quantity: 2,
        unit: 'piece'
      },
      {
        id: '1-2',
        name: 'Mixed salad greens',
        nameAr: 'خضار مشكلة',
        quantity: 2,
        unit: 'cup'
      },
      {
        id: '1-3',
        name: 'Cherry tomatoes',
        nameAr: 'طماطم كرزية',
        quantity: 1,
        unit: 'cup'
      },
      {
        id: '1-4',
        name: 'Cucumber',
        nameAr: 'خيار',
        quantity: 1,
        unit: 'medium'
      },
      {
        id: '1-5',
        name: 'Olive oil',
        nameAr: 'زيت زيتون',
        quantity: 2,
        unit: 'tbsp'
      },
      {
        id: '1-6',
        name: 'Lemon juice',
        nameAr: 'عصير ليمون',
        quantity: 1,
        unit: 'tbsp'
      },
      {
        id: '1-7',
        name: 'Salt',
        nameAr: 'ملح',
        quantity: 1,
        unit: 'tsp'
      },
      {
        id: '1-8',
        name: 'Black pepper',
        nameAr: 'فلفل أسود',
        quantity: 0.5,
        unit: 'tsp'
      }
    ],
    instructions: [
      'Season chicken breasts with salt, pepper, and olive oil.',
      'Grill chicken for 6-7 minutes on each side until cooked through.',
      'Let chicken rest for 5 minutes, then slice into strips.',
      'In a large bowl, combine mixed greens, tomatoes, and cucumber.',
      'Whisk together olive oil, lemon juice, salt, and pepper to create dressing.',
      'Toss salad with dressing.',
      'Top with sliced grilled chicken and serve immediately.'
    ],
    instructionsAr: [
      'تبّل صدور الدجاج بالملح والفلفل وزيت الزيتون.',
      'اشوِ الدجاج لمدة 6-7 دقائق على كل جانب حتى ينضج تمامًا.',
      'اترك الدجاج يرتاح لمدة 5 دقائق، ثم قطّعه إلى شرائح.',
      'في وعاء كبير، اخلط الخضار المشكلة والطماطم والخيار.',
      'اخفق زيت الزيتون وعصير الليمون والملح والفلفل لصنع التتبيلة.',
      'قلّب السلطة مع التتبيلة.',
      'ضع شرائح الدجاج المشوي على الوجه وقدمها فورًا.'
    ],
    isFavorite: true
  },
  {
    id: '2',
    title: 'Vegetable Stir Fry',
    titleAr: 'خضار مقلي',
    description: 'A quick and nutritious vegetable stir fry with tofu.',
    descriptionAr: 'طبق خضار مقلي سريع ومغذي مع التوفو.',
    imageUrl: 'https://images.pexels.com/photos/6072095/pexels-photo-6072095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    calories: 320,
    protein: 15,
    carbs: 35,
    fat: 12,
    prepTimeMinutes: 15,
    cookTimeMinutes: 10,
    servings: 2,
    mealType: 'dinner',
    cuisineType: 'Asian',
    ingredients: [
      {
        id: '2-1',
        name: 'Tofu',
        nameAr: 'توفو',
        quantity: 200,
        unit: 'g'
      },
      {
        id: '2-2',
        name: 'Broccoli',
        nameAr: 'بروكلي',
        quantity: 1,
        unit: 'cup'
      },
      {
        id: '2-3',
        name: 'Bell peppers',
        nameAr: 'فلفل رومي',
        quantity: 1,
        unit: 'medium'
      },
      {
        id: '2-4',
        name: 'Carrots',
        nameAr: 'جزر',
        quantity: 2,
        unit: 'medium'
      },
      {
        id: '2-5',
        name: 'Soy sauce',
        nameAr: 'صوص الصويا',
        quantity: 2,
        unit: 'tbsp'
      },
      {
        id: '2-6',
        name: 'Sesame oil',
        nameAr: 'زيت السمسم',
        quantity: 1,
        unit: 'tbsp'
      },
      {
        id: '2-7',
        name: 'Garlic',
        nameAr: 'ثوم',
        quantity: 2,
        unit: 'clove'
      },
      {
        id: '2-8',
        name: 'Ginger',
        nameAr: 'زنجبيل',
        quantity: 1,
        unit: 'tbsp'
      }
    ],
    instructions: [
      'Press and cube tofu, then set aside.',
      'Chop all vegetables into bite-sized pieces.',
      'Heat sesame oil in a wok or large pan over medium-high heat.',
      'Add garlic and ginger, stir for 30 seconds until fragrant.',
      'Add tofu and cook until lightly browned, about 3-4 minutes.',
      'Add vegetables and stir fry for 5-6 minutes until tender-crisp.',
      'Add soy sauce and toss to combine.',
      'Serve hot over rice or noodles if desired.'
    ],
    instructionsAr: [
      'اضغط على التوفو وقطّعه إلى مكعبات، ثم ضعه جانبًا.',
      'قطّع جميع الخضروات إلى قطع بحجم اللقمة.',
      'سخّن زيت السمسم في مقلاة كبيرة على نار متوسطة إلى عالية.',
      'أضف الثوم والزنجبيل، وقلّب لمدة 30 ثانية حتى تفوح رائحتهما.',
      'أضف التوفو واطهه حتى يصبح لونه بنيًا فاتحًا، حوالي 3-4 دقائق.',
      'أضف الخضروات وقلّبها لمدة 5-6 دقائق حتى تصبح طرية.',
      'أضف صوص الصويا وقلّب الخليط.',
      'قدّم الطبق ساخنًا فوق الأرز أو المعكرونة إذا رغبت.'
    ],
    isFavorite: false
  },
  {
    id: '3',
    title: 'Avocado Toast',
    titleAr: 'توست الأفوكادو',
    description: 'Simple and nutritious breakfast with avocado and eggs.',
    descriptionAr: 'فطور بسيط ومغذي بالأفوكادو والبيض.',
    imageUrl: 'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    calories: 350,
    protein: 12,
    carbs: 30,
    fat: 22,
    prepTimeMinutes: 10,
    cookTimeMinutes: 5,
    servings: 1,
    mealType: 'breakfast',
    cuisineType: 'International',
    ingredients: [
      {
        id: '3-1',
        name: 'Whole grain bread',
        nameAr: 'خبز حبوب كاملة',
        quantity: 2,
        unit: 'slice'
      },
      {
        id: '3-2',
        name: 'Avocado',
        nameAr: 'أفوكادو',
        quantity: 1,
        unit: 'medium'
      },
      {
        id: '3-3',
        name: 'Eggs',
        nameAr: 'بيض',
        quantity: 2,
        unit: 'large'
      },
      {
        id: '3-4',
        name: 'Cherry tomatoes',
        nameAr: 'طماطم كرزية',
        quantity: 0.5,
        unit: 'cup'
      },
      {
        id: '3-5',
        name: 'Salt',
        nameAr: 'ملح',
        quantity: 0.25,
        unit: 'tsp'
      },
      {
        id: '3-6',
        name: 'Black pepper',
        nameAr: 'فلفل أسود',
        quantity: 0.25,
        unit: 'tsp'
      },
      {
        id: '3-7',
        name: 'Red pepper flakes',
        nameAr: 'رقائق الفلفل الأحمر',
        quantity: 0.25,
        unit: 'tsp'
      }
    ],
    instructions: [
      'Toast the bread slices until golden brown.',
      'Cut the avocado in half, remove the pit, and scoop the flesh into a bowl.',
      'Mash the avocado with a fork and season with salt and pepper.',
      'Spread the mashed avocado on the toast.',
      'Heat a non-stick pan and crack the eggs into it. Cook to your preference (sunny-side up or over easy).',
      'Place the cooked eggs on top of the avocado toast.',
      'Slice cherry tomatoes in half and arrange them around the eggs.',
      'Sprinkle with red pepper flakes and serve immediately.'
    ],
    instructionsAr: [
      'حمّص شرائح الخبز حتى تصبح ذهبية اللون.',
      'قطّع الأفوكادو إلى نصفين، أزل النواة، واستخرج اللب في وعاء.',
      'اهرس الأفوكادو بشوكة وتبّل بالملح والفلفل.',
      'ضع الأفوكادو المهروس على الخبز المحمص.',
      'سخّن مقلاة غير لاصقة واكسر البيض فيها. اطهه حسب تفضيلك.',
      'ضع البيض المطبوخ فوق توست الأفوكادو.',
      'قطّع الطماطم الكرزية إلى أنصاف ورتبها حول البيض.',
      'رش رقائق الفلفل الأحمر وقدّم الطبق فورًا.'
    ],
    isFavorite: true
  }
];