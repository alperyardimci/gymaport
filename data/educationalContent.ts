export interface Article {
  id: string;
  slug: string;
  title: string;
  titleTr?: string;
  category: string;
  subcategory?: string;
  readTimeMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  content: string;
  summary: string;
  tags: string[];
  imageUrl?: string;
}

export interface FitnessTerm {
  id: string;
  term: string;
  termTr?: string;
  definition: string;
  definitionTr?: string;
  example?: string;
  relatedTerms?: string[];
  category: string;
}

export const ARTICLES: Article[] = [
  {
    id: 'progressive-overload',
    slug: 'progressive-overload',
    title: 'Progressive Overload: The Foundation of Muscle Growth',
    titleTr: 'Progresif Aşırı Yüklenme: Kas Büyümesinin Temeli',
    category: 'training_systems',
    readTimeMinutes: 5,
    difficulty: 'beginner',
    summary: 'Learn why progressive overload is the most important principle in building muscle and strength.',
    content: `Progressive overload is the gradual increase of stress placed upon the body during exercise training. It is the fundamental principle driving muscle growth (hypertrophy), strength gains, and improved athletic performance.

**Why It Works**
Your muscles adapt to the demands placed on them. When you consistently perform the same workout with the same weight and reps, your body has already adapted — and further improvement stalls. To continue making progress, you must progressively challenge your muscles beyond their current capability.

**How to Apply Progressive Overload**
There are several ways to implement this principle:

1. **Increase Weight**: The most straightforward method. When you can complete all sets with good form, add weight.
2. **Increase Reps**: Complete more repetitions with the same weight.
3. **Increase Sets**: Add more total sets per session.
4. **Decrease Rest Time**: The same workload done with shorter rest requires more from your body.
5. **Improve Form**: Better technique often allows you to recruit more muscle fibers.
6. **Increase Range of Motion**: Going deeper in a movement challenges muscles throughout a longer path.
7. **Increase Frequency**: Train the muscle more times per week.

**The Weekly Goal**
A practical approach is to aim for a 2.5-5% increase in total training volume each week. This doesn't mean adding weight every session — sometimes adding one extra rep, one extra set, or simply maintaining performance with improved technique counts as progression.

**Tracking Is Essential**
You cannot apply progressive overload without tracking your workouts. Record weight, sets, and reps each session. GYMAPORT does this automatically, allowing you to monitor your strength trajectory over time.

**Avoid Jumping Too Fast**
More is not always better. Increasing too quickly leads to injury, poor form, and long-term regression. Sustainable progress requires patience. Consistency over months and years, not weeks.`,
    tags: ['progressive overload', 'muscle growth', 'hypertrophy', 'strength', 'beginner'],
  },
  {
    id: 'reps-sets-basics',
    slug: 'reps-sets-basics',
    title: 'Sets and Reps Explained',
    titleTr: 'Set ve Tekrar Açıklaması',
    category: 'training_systems',
    readTimeMinutes: 4,
    difficulty: 'beginner',
    summary: 'Understand what sets, reps, and rest periods mean and how to structure them for your goals.',
    content: `Before you can design an effective workout, you need to understand the basic building blocks: sets, repetitions (reps), and rest periods.

**What Is a Rep?**
A repetition (rep) is a single complete performance of an exercise. For example, lowering and pressing a barbell once during a bench press = 1 rep.

**What Is a Set?**
A set is a group of consecutive repetitions. If you perform 10 bench press reps without stopping, that's 1 set of 10.

**How Many Reps for Your Goal?**

| Goal | Rep Range | Weight |
|------|-----------|--------|
| Strength | 1-5 | Heavy (85-100% 1RM) |
| Hypertrophy (muscle) | 6-15 | Moderate (65-85% 1RM) |
| Muscular Endurance | 15-30 | Light (50-65% 1RM) |

Note: These are general guidelines. Muscle growth can occur across a wide rep range (5-30) as long as the set is taken close to muscular failure.

**How Many Sets?**
Research suggests:
- Beginners: 2-3 sets per exercise
- Intermediate: 3-4 sets per exercise
- Advanced: 4-6 sets per exercise

For the entire week (total volume per muscle group), research supports 10-20 working sets per muscle group per week for hypertrophy.

**Rest Periods**
- Strength (1-5 reps): 3-5 minutes
- Hypertrophy (6-15 reps): 1.5-3 minutes
- Endurance (15+): 30-90 seconds

Longer rest allows greater recovery between sets, enabling more weight or reps in subsequent sets.`,
    tags: ['sets', 'reps', 'beginner', 'basics', 'rep ranges'],
  },
  {
    id: 'upper-lower-split',
    slug: 'upper-lower-split',
    title: 'Upper/Lower Split Training Guide',
    titleTr: 'Üst/Alt Bölme Antrenman Rehberi',
    category: 'training_systems',
    readTimeMinutes: 6,
    difficulty: 'beginner',
    summary: 'A complete guide to the Upper/Lower training split — ideal for 3-4 days per week.',
    content: `The Upper/Lower split is one of the most time-tested and research-supported training structures for building muscle and strength. It divides training into upper body days (chest, back, shoulders, arms) and lower body days (quads, hamstrings, glutes, calves).

**Why It Works**
The Upper/Lower split typically trains each muscle group twice per week, which is considered the optimal training frequency for most intermediate lifters. Research generally supports hitting each muscle group 2x per week for superior muscle growth compared to 1x per week (bro split).

**Example 4-Day Upper/Lower**
- Monday: Upper A (strength focus)
- Tuesday: Lower A (strength focus)
- Thursday: Upper B (hypertrophy focus)
- Friday: Lower B (hypertrophy focus)
- Wednesday, Saturday, Sunday: Rest

**Upper A (Strength Focus)**
1. Barbell Bench Press: 4 × 5-6
2. Barbell Row: 4 × 5-6
3. Overhead Press: 3 × 6-8
4. Lat Pulldown: 3 × 8-10
5. Dumbbell Curl: 3 × 10-12
6. Triceps Pushdown: 3 × 10-12

**Who Is It For?**
- Intermediate lifters with 6+ months of experience
- People who can train 3-4 days per week
- Those who want both strength and muscle growth
- People who prefer balanced training

**Advantages**
- High frequency per muscle group
- Good recovery balance
- Well-supported by research
- Flexible for 3 or 4 days per week`,
    tags: ['upper lower', 'training split', 'frequency', 'intermediate'],
  },
  {
    id: 'muscle-fiber-types',
    slug: 'muscle-fiber-types',
    title: 'Muscle Fiber Types Explained',
    titleTr: 'Kas Lifi Türleri Açıklaması',
    category: 'anatomy',
    readTimeMinutes: 5,
    difficulty: 'intermediate',
    summary: 'Learn about Type I and Type II muscle fibers and how they respond to training.',
    content: `Muscle fibers are not all the same. Human skeletal muscles contain different types of muscle fibers, each with distinct characteristics that affect performance, fatigue, and training adaptations.

**Type I Fibers (Slow-Twitch)**
- Resistant to fatigue
- Use oxygen efficiently (aerobic)
- Lower force production
- More mitochondria (energy producers)
- Activated during endurance activities, light lifting, long-duration exercise
- Example: Marathon runners have a higher proportion of Type I fibers

**Type IIa Fibers (Fast-Twitch, Oxidative)**
- Intermediate between Type I and Type IIx
- Relatively fatigue resistant
- Moderate force production
- Activated during moderate intensity, sustained power activities
- Respond well to both strength and endurance training

**Type IIx Fibers (Fast-Twitch, Glycolytic)**
- High force production
- Fatigue quickly
- Primarily anaerobic
- Activated during maximal effort, heavy lifting, sprinting
- Example: Sprinters and powerlifters have a higher proportion of Type IIx fibers

**Important Note on Exercise Selection**
No exercise exclusively targets one fiber type. All three fiber types can be recruited depending on the intensity and duration of the effort. Heavy, low-rep training tends to recruit more Type II fibers. Light, high-rep training until failure can also recruit Type II fibers as Type I fibers fatigue.

**Training Implications**
- Heavy strength training (1-5 reps) primarily develops Type II fiber strength and size
- Moderate rep ranges (8-15) develop all fiber types
- Higher rep ranges (15-30+) can still build muscle, especially Type I fibers
- Genetics play a large role in fiber type distribution`,
    tags: ['muscle fibers', 'type I', 'type II', 'anatomy', 'intermediate'],
  },
  {
    id: 'rir-rpe-guide',
    slug: 'rir-rpe-guide',
    title: 'RIR and RPE: Training to the Right Intensity',
    titleTr: 'RIR ve RPE: Doğru Yoğunlukta Antrenman',
    category: 'training_systems',
    readTimeMinutes: 4,
    difficulty: 'intermediate',
    summary: 'Understand Reps in Reserve (RIR) and Rate of Perceived Exertion (RPE) for smarter training.',
    content: `Two of the most useful tools for managing training intensity are Reps in Reserve (RIR) and Rate of Perceived Exertion (RPE). Both help you train at the right effort level without relying solely on percentages of your one-rep max.

**Reps in Reserve (RIR)**
RIR represents how many more reps you could have done before reaching muscular failure.

| RIR | Meaning |
|-----|---------|
| RIR 0 | You could not do another rep (failure) |
| RIR 1 | 1 rep left in the tank |
| RIR 2 | 2 reps left |
| RIR 3 | 3 reps left |
| RIR 4+ | Comfortable — not close to failure |

For hypertrophy, most research suggests training within RIR 0-3 produces the best muscle growth. Training too far from failure (RIR 5+) is likely sub-optimal.

**Rate of Perceived Exertion (RPE)**
RPE is a 1-10 scale of how hard a set felt:

| RPE | Meaning |
|-----|---------|
| 10 | Maximal effort — absolute limit |
| 9 | Could do 1 more rep |
| 8 | Could do 2 more reps |
| 7 | Could do 3 more reps |
| 6 | Moderate effort |
| 5 and below | Light work, warm-up |

**How to Use in GYMAPORT**
After completing each set, record your RIR or RPE. This helps you:
- Track whether you're training hard enough
- Identify when weight should be increased
- Monitor fatigue and recovery across a training week`,
    tags: ['RIR', 'RPE', 'intensity', 'training', 'intermediate'],
  },
  {
    id: 'recovery-importance',
    slug: 'recovery-importance',
    title: 'Why Recovery Is as Important as Training',
    titleTr: 'Neden İyileşme Antrenman Kadar Önemlidir',
    category: 'recovery',
    readTimeMinutes: 4,
    difficulty: 'beginner',
    summary: 'Muscle growth happens outside the gym. Learn why recovery is essential to progress.',
    content: `Many people believe more training is always better. The truth is muscle growth doesn't happen during training — it happens during recovery.

**What Happens During Training**
When you lift weights, you create microscopic tears in muscle fibers. The training stimulus is a form of controlled damage that signals the body to repair and grow stronger.

**What Happens During Recovery**
During rest, the body:
- Repairs muscle fiber damage through protein synthesis
- Supercompensates — rebuilding stronger than before
- Replenishes energy stores (muscle glycogen)
- Reduces inflammation
- Restores the nervous system

**Sleep**
Sleep is the most important recovery tool. During deep sleep, the body releases growth hormone, which is critical for muscle repair and growth. Aim for 7-9 hours per night. Chronic sleep deprivation significantly impairs muscle growth, strength, and body composition.

**How Often Should You Train Each Muscle?**
Research generally supports 2-3 times per week per muscle group for optimal hypertrophy. Training a muscle group every day without adequate recovery leads to overtraining and regression.

**Signs of Poor Recovery**
- Persistent muscle soreness lasting 72+ hours
- Declining performance
- Chronic fatigue
- Sleep disruption
- Increased resting heart rate
- Mood changes

**Active Recovery**
Light activity on rest days (walking, stretching, mobility work) can enhance blood flow and speed up recovery without adding significant training stress.`,
    tags: ['recovery', 'sleep', 'rest', 'muscle growth', 'beginner'],
  },
  {
    id: 'compound-vs-isolation',
    slug: 'compound-vs-isolation',
    title: 'Compound vs. Isolation Exercises',
    titleTr: 'Bileşik ve İzolasyon Egzersizleri',
    category: 'training_systems',
    readTimeMinutes: 4,
    difficulty: 'beginner',
    summary: 'Learn the difference between compound and isolation exercises and how to use both effectively.',
    content: `Exercises can be broadly categorized as compound (multi-joint) or isolation (single-joint). Both have important roles in a well-designed training program.

**Compound Exercises**
Compound movements involve multiple joints and muscle groups simultaneously.

Examples:
- Bench Press (shoulders, elbows)
- Squat (hips, knees, ankles)
- Deadlift (hips, knees, spine)
- Pull-Up (shoulders, elbows)
- Overhead Press (shoulders, elbows)

Advantages:
- Recruit more total muscle mass
- Allow heavier loading
- Produce greater hormonal response
- More time-efficient
- Develop coordination and functional strength

**Isolation Exercises**
Isolation exercises focus on a single joint and primarily one muscle.

Examples:
- Bicep Curl (elbow only)
- Leg Extension (knee only)
- Lateral Raise (shoulder only)
- Triceps Pushdown (elbow only)

Advantages:
- Targeted muscle development
- Address weak points
- Lower systemic fatigue
- Useful for rehabilitation
- Better mind-muscle connection

**Optimal Training Strategy**
Build your program around compound movements for the foundation. Use isolation exercises to target weak points, add volume to specific muscles, or finish a session.

A typical session structure:
1. Heavy compound lift (Bench Press, Squat, Deadlift, Row)
2. Secondary compound lift
3. 2-3 isolation exercises

This provides the strength benefits of compounds and the targeted development of isolations.`,
    tags: ['compound', 'isolation', 'exercise selection', 'beginner'],
  },
  {
    id: 'nutrition-basics',
    slug: 'nutrition-basics',
    title: 'Nutrition Basics for Muscle Building',
    titleTr: 'Kas Yapımı İçin Beslenme Temelleri',
    category: 'nutrition',
    readTimeMinutes: 6,
    difficulty: 'beginner',
    summary: 'The fundamental nutritional principles for building muscle and improving body composition.',
    content: `Nutrition is the second pillar of muscle building — after training, it is the most impactful factor in your results.

**Calories**
Muscle growth requires a caloric surplus — consuming more calories than you burn. A moderate surplus of 200-400 calories per day is usually recommended to minimize fat gain while maximizing muscle growth.

For fat loss while maintaining muscle (body recomposition), a slight deficit or maintenance calories with adequate protein can work, especially for beginners.

**Protein**
Protein is the building block of muscle. Adequate protein intake is essential for muscle repair and growth.

Recommendation: 1.6-2.2 grams of protein per kilogram of body weight per day.

Good protein sources:
- Lean meat (chicken, turkey, beef)
- Fish and seafood
- Eggs
- Dairy (Greek yogurt, cottage cheese, milk)
- Legumes (for plant-based options)
- Protein supplements (whey, casein, plant protein)

**Carbohydrates**
Carbohydrates are the primary fuel source for high-intensity exercise. Adequate carbohydrate intake supports training performance and recovery.

**Fats**
Dietary fats support hormone production, including testosterone. Don't eliminate fats — aim for 0.5-1g per kg body weight.

**Meal Timing**
While total daily protein and calories are most important, consuming protein near your training session (within 2 hours before or after) may provide some additional benefit.

**Hydration**
Dehydration impairs strength, endurance, and cognitive function. Aim for 2-3+ liters of water daily, more during intense training.

**Important Note**
GYMAPORT provides general nutrition education. For personalized nutrition plans, especially if you have medical conditions, consult a registered dietitian.`,
    tags: ['nutrition', 'protein', 'calories', 'muscle building', 'beginner'],
  },
];

export const FITNESS_DICTIONARY: FitnessTerm[] = [
  {
    id: 'progressive-overload-term',
    term: 'Progressive Overload',
    termTr: 'Progresif Aşırı Yüklenme',
    category: 'training_systems',
    definition: 'The gradual increase of stress placed upon the body during training to continually drive adaptation.',
    definitionTr: 'Adaptasyonu sürekli tetiklemek için antrenman sırasında vücuda uygulanan stresin kademeli olarak artırılması.',
    example: 'Adding 2.5kg to your bench press after completing all prescribed reps with good form.',
    relatedTerms: ['hypertrophy', 'periodization', 'training volume'],
  },
  {
    id: 'hypertrophy-term',
    term: 'Hypertrophy',
    termTr: 'Hipertrofi',
    category: 'anatomy',
    definition: 'The increase in muscle cell size in response to resistance training, resulting in larger muscles.',
    definitionTr: 'Direnç antrenmanına yanıt olarak kas hücre boyutunun artması, daha büyük kaslara yol açması.',
    example: 'Training in the 6-15 rep range with progressive overload to maximize hypertrophy.',
    relatedTerms: ['progressive overload', 'muscle protein synthesis', 'training volume'],
  },
  {
    id: 'one-rep-max',
    term: 'One Rep Max (1RM)',
    termTr: 'Tek Tekrar Maksimum (1RM)',
    category: 'training_systems',
    definition: 'The maximum amount of weight you can lift for a single repetition of an exercise with good form.',
    definitionTr: 'İyi form ile bir egzersizin tek tekrarında kaldırabileceğiniz maksimum ağırlık.',
    example: 'If you can bench press 100kg once with perfect form, your 1RM is 100kg.',
    relatedTerms: ['RIR', 'RPE', 'training intensity'],
  },
  {
    id: 'rir-term',
    term: 'RIR (Reps in Reserve)',
    termTr: 'RIR (Yedekte Tekrar)',
    category: 'training_systems',
    definition: 'The number of additional repetitions you could have completed before reaching muscular failure.',
    definitionTr: 'Kassal başarısızlığa ulaşmadan önce yapabilecek olduğunuz ek tekrar sayısı.',
    example: 'Stopping a set of curls at 10 reps when you could have done 12 means RIR = 2.',
    relatedTerms: ['RPE', 'training to failure', 'intensity'],
  },
  {
    id: 'rpe-term',
    term: 'RPE (Rate of Perceived Exertion)',
    termTr: 'RPE (Algılanan Zorluk Derecesi)',
    category: 'training_systems',
    definition: 'A 1-10 scale measuring how hard a set or workout felt, with 10 being absolute maximum effort.',
    definitionTr: 'Bir setin veya antrenstmanın ne kadar zor hissettirdiğini ölçen 1-10 ölçeği; 10 mutlak maksimum çabayı ifade eder.',
    example: 'An RPE 8 set means you could have done 2 more reps.',
    relatedTerms: ['RIR', 'training intensity', 'one rep max'],
  },
  {
    id: 'compound-term',
    term: 'Compound Exercise',
    termTr: 'Bileşik Egzersiz',
    category: 'exercise',
    definition: 'An exercise that involves multiple joints and muscle groups simultaneously.',
    definitionTr: 'Aynı anda birden fazla eklemi ve kas grubunu içeren bir egzersiz.',
    example: 'Bench press involves shoulder and elbow joints, working chest, triceps, and front delts.',
    relatedTerms: ['isolation exercise', 'multi-joint', 'primary lift'],
  },
  {
    id: 'isolation-term',
    term: 'Isolation Exercise',
    termTr: 'İzolasyon Egzersizi',
    category: 'exercise',
    definition: 'An exercise that primarily works a single muscle group through movement at a single joint.',
    definitionTr: 'Tek bir eklemde hareketle ağırlıklı olarak tek bir kas grubunu çalıştıran egzersiz.',
    example: 'A bicep curl only involves elbow flexion, isolating the biceps.',
    relatedTerms: ['compound exercise', 'accessory work'],
  },
  {
    id: 'dropset-term',
    term: 'Drop Set',
    termTr: 'Drop Set',
    category: 'training_systems',
    definition: 'A technique where you perform a set to or near failure, immediately reduce the weight, and continue for more reps without rest.',
    definitionTr: 'Bir seti başarısızlığa yakın yapıp hemen ağırlığı düşürerek dinlenmeden daha fazla tekrar yapmayı içeren teknik.',
    example: 'Bicep curl: 12 reps @ 20kg, immediately drop to 15kg for 10 more reps.',
    relatedTerms: ['intensity technique', 'training to failure', 'volume'],
  },
  {
    id: 'superset-term',
    term: 'Superset',
    termTr: 'Süperset',
    category: 'training_systems',
    definition: 'Performing two exercises back-to-back without rest between them.',
    definitionTr: 'İki egzersizi aralarında dinlenmeden arka arkaya yapmak.',
    example: 'Bicep curls immediately followed by triceps pushdowns.',
    relatedTerms: ['antagonist superset', 'giant set', 'intensity'],
  },
  {
    id: 'periodization-term',
    term: 'Periodization',
    termTr: 'Periyodizasyon',
    category: 'training_systems',
    definition: 'The systematic planning of athletic training, varying volume and intensity over time to maximize performance and prevent overtraining.',
    definitionTr: 'Performansı en üst düzeye çıkarmak ve aşırı antrenmanı önlemek için hacim ve yoğunluğu zaman içinde değiştirerek atletik antrenmanın sistematik planlanması.',
    example: 'A 12-week program that starts with higher volume, lower intensity, and progresses to lower volume, higher intensity.',
    relatedTerms: ['deload', 'training volume', 'progressive overload'],
  },
  {
    id: 'deload-term',
    term: 'Deload',
    termTr: 'Deload (Yük Düşürme)',
    category: 'training_systems',
    definition: 'A planned period of reduced training volume or intensity to allow full recovery before returning to normal or higher training loads.',
    definitionTr: 'Normal veya daha yüksek antrenman yüklerine geri dönmeden önce tam iyileşmeye olanak sağlamak için planlı azaltılmış antrenman hacmi veya yoğunluğu dönemi.',
    example: 'After 8 hard training weeks, taking a week at 50% volume before the next training block.',
    relatedTerms: ['recovery', 'periodization', 'overtraining'],
  },
  {
    id: 'mmc-term',
    term: 'Mind-Muscle Connection',
    termTr: 'Zihin-Kas Bağlantısı',
    category: 'training_systems',
    definition: 'The practice of consciously focusing on and feeling the target muscle contract during an exercise.',
    definitionTr: 'Egzersiz sırasında hedef kasın kasıldığını bilinçli olarak hissetmeye ve odaklanmaya çalışma pratiği.',
    example: 'Focusing on feeling your lat stretch and contract during a lat pulldown rather than just moving the weight.',
    relatedTerms: ['neuromuscular efficiency', 'isolation', 'muscle activation'],
  },
  {
    id: 'tempo-term',
    term: 'Training Tempo',
    termTr: 'Antrenman Temposu',
    category: 'training_systems',
    definition: 'The speed at which you perform each phase of an exercise, typically expressed as a 4-digit code (eccentric-pause-concentric-pause).',
    definitionTr: 'Bir egzersizin her fazını gerçekleştirdiğiniz hız; genellikle 4 haneli bir kod olarak ifade edilir (eksantrik-duraklama-konsantrik-duraklama).',
    example: '3-1-1-0 means 3 seconds down, 1 second pause, 1 second up, 0 second pause.',
    relatedTerms: ['time under tension', 'eccentric', 'concentric'],
  },
  {
    id: 'volume-term',
    term: 'Training Volume',
    termTr: 'Antrenman Hacmi',
    category: 'training_systems',
    definition: 'The total amount of work performed in training, often calculated as sets × reps × weight.',
    definitionTr: 'Antrenmanda yapılan toplam iş miktarı; genellikle set × tekrar × ağırlık olarak hesaplanır.',
    example: '3 sets × 10 reps × 60kg = 1800kg of training volume.',
    relatedTerms: ['progressive overload', 'training frequency', 'periodization'],
  },
];

export const getArticlesByCategory = (category: string): Article[] =>
  ARTICLES.filter((a) => a.category === category);

export const getArticleBySlug = (slug: string): Article | undefined =>
  ARTICLES.find((a) => a.slug === slug);

export const getTermsByCategory = (category: string): FitnessTerm[] =>
  FITNESS_DICTIONARY.filter((t) => t.category === category);

export const searchTerms = (query: string): FitnessTerm[] => {
  const q = query.toLowerCase();
  return FITNESS_DICTIONARY.filter(
    (t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
  );
};

export const LEARN_CATEGORIES = [
  { id: 'training_systems', label: 'Training Systems', icon: 'barbell-outline' },
  { id: 'anatomy', label: 'Anatomy', icon: 'body-outline' },
  { id: 'nutrition', label: 'Nutrition', icon: 'nutrition-outline' },
  { id: 'recovery', label: 'Recovery', icon: 'bed-outline' },
  { id: 'exercise', label: 'Exercise Guide', icon: 'fitness-outline' },
];
