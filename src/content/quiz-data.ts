// 164 quiz questions × 3 options — 2 per word × 82 words
// Types: 'impact' | 'alternative' | 'response' | 'severity'
// seed via: npm run seed:details (quiz questions are seeded with word details)
export interface QuizOptionData {
  optionText: string
  isCorrect: boolean
}

export interface QuizQuestionData {
  word: string
  lang: 'en' | 'th'
  questionText: string
  questionType: 'impact' | 'alternative' | 'response' | 'severity'
  options: QuizOptionData[]
}

export const quizData: QuizQuestionData[] = [
  // ─── EN Level 1: please ──────────────────────────────────────────────────────
  {
    word: 'please', lang: 'en',
    questionText: 'What happens when you say "please" when asking for something?',
    questionType: 'impact',
    options: [
      { optionText: 'People are more likely to help you', isCorrect: true },
      { optionText: 'People feel angry', isCorrect: false },
      { optionText: 'People ignore you', isCorrect: false },
    ],
  },
  {
    word: 'please', lang: 'en',
    questionText: 'Which is the best way to ask a teacher for help?',
    questionType: 'alternative',
    options: [
      { optionText: '"Please help me with this."', isCorrect: true },
      { optionText: '"Help me now!"', isCorrect: false },
      { optionText: '"Whatever, never mind."', isCorrect: false },
    ],
  },

  // ─── EN Level 1: thank you ────────────────────────────────────────────────────
  {
    word: 'thank you', lang: 'en',
    questionText: 'When a friend helps you, what should you say?',
    questionType: 'response',
    options: [
      { optionText: '"Thank you so much!"', isCorrect: true },
      { optionText: '"Whatever."', isCorrect: false },
      { optionText: '"That\'s your job."', isCorrect: false },
    ],
  },
  {
    word: 'thank you', lang: 'en',
    questionText: 'Saying "thank you" makes the other person feel...',
    questionType: 'impact',
    options: [
      { optionText: 'Valued and appreciated', isCorrect: true },
      { optionText: 'Embarrassed', isCorrect: false },
      { optionText: 'Angry', isCorrect: false },
    ],
  },

  // ─── EN Level 1: sorry ────────────────────────────────────────────────────────
  {
    word: 'sorry', lang: 'en',
    questionText: 'You accidentally knocked over your friend\'s drink. What do you say?',
    questionType: 'response',
    options: [
      { optionText: '"I\'m sorry! I didn\'t mean to."', isCorrect: true },
      { optionText: '"It\'s your fault for putting it there."', isCorrect: false },
      { optionText: '"Whatever, it\'s just a drink."', isCorrect: false },
    ],
  },
  {
    word: 'sorry', lang: 'en',
    questionText: 'A sincere apology helps...',
    questionType: 'impact',
    options: [
      { optionText: 'Repair the relationship and show you care', isCorrect: true },
      { optionText: 'Make the other person angrier', isCorrect: false },
      { optionText: 'Make the problem bigger', isCorrect: false },
    ],
  },

  // ─── EN Level 1: excuse me ────────────────────────────────────────────────────
  {
    word: 'excuse me', lang: 'en',
    questionText: 'You need to walk past someone in a crowded hallway. What do you say?',
    questionType: 'response',
    options: [
      { optionText: '"Excuse me, could I get past?"', isCorrect: true },
      { optionText: '"Move it!"', isCorrect: false },
      { optionText: 'Say nothing and push through', isCorrect: false },
    ],
  },
  {
    word: 'excuse me', lang: 'en',
    questionText: 'Which phrase works best to politely get someone\'s attention?',
    questionType: 'alternative',
    options: [
      { optionText: '"Excuse me, may I ask you something?"', isCorrect: true },
      { optionText: '"Hey you!"', isCorrect: false },
      { optionText: '"Listen up!"', isCorrect: false },
    ],
  },

  // ─── EN Level 1: you're welcome ──────────────────────────────────────────────
  {
    word: "you're welcome", lang: 'en',
    questionText: 'Someone says "thank you" to you. What is the polite response?',
    questionType: 'response',
    options: [
      { optionText: '"You\'re welcome! Happy to help."', isCorrect: true },
      { optionText: '"I know."', isCorrect: false },
      { optionText: '"You owe me."', isCorrect: false },
    ],
  },
  {
    word: "you're welcome", lang: 'en',
    questionText: '"You\'re welcome" tells the other person...',
    questionType: 'impact',
    options: [
      { optionText: 'You were glad to help them', isCorrect: true },
      { optionText: 'They bother you', isCorrect: false },
      { optionText: 'You want something in return', isCorrect: false },
    ],
  },

  // ─── EN Level 1: pardon me ────────────────────────────────────────────────────
  {
    word: 'pardon me', lang: 'en',
    questionText: 'You didn\'t hear what your teacher said. What do you ask?',
    questionType: 'response',
    options: [
      { optionText: '"Pardon me, could you repeat that?"', isCorrect: true },
      { optionText: '"What?!" (loudly)', isCorrect: false },
      { optionText: '"I wasn\'t listening anyway."', isCorrect: false },
    ],
  },
  {
    word: 'pardon me', lang: 'en',
    questionText: '"Pardon me" is best used when you want to...',
    questionType: 'alternative',
    options: [
      { optionText: 'Politely ask someone to repeat or excuse yourself', isCorrect: true },
      { optionText: 'Express anger', isCorrect: false },
      { optionText: 'Tell someone to be quiet', isCorrect: false },
    ],
  },

  // ─── EN Level 1: well done ────────────────────────────────────────────────────
  {
    word: 'well done', lang: 'en',
    questionText: 'Your friend won a spelling competition. What do you say?',
    questionType: 'response',
    options: [
      { optionText: '"Well done! I\'m so proud of you!"', isCorrect: true },
      { optionText: '"It was an easy competition anyway."', isCorrect: false },
      { optionText: '"Lucky you."', isCorrect: false },
    ],
  },
  {
    word: 'well done', lang: 'en',
    questionText: 'Saying "well done" to someone who worked hard makes them feel...',
    questionType: 'impact',
    options: [
      { optionText: 'Proud and motivated to keep trying', isCorrect: true },
      { optionText: 'Embarrassed', isCorrect: false },
      { optionText: 'Angry', isCorrect: false },
    ],
  },

  // ─── EN Level 1: good job ─────────────────────────────────────────────────────
  {
    word: 'good job', lang: 'en',
    questionText: 'Your little sibling learned to tie their shoes. What do you say?',
    questionType: 'response',
    options: [
      { optionText: '"Good job! You did it!"', isCorrect: true },
      { optionText: '"That took you long enough."', isCorrect: false },
      { optionText: '"Everyone can do that."', isCorrect: false },
    ],
  },
  {
    word: 'good job', lang: 'en',
    questionText: 'Praising someone with "good job" helps them...',
    questionType: 'impact',
    options: [
      { optionText: 'Feel confident and want to do more', isCorrect: true },
      { optionText: 'Stop trying', isCorrect: false },
      { optionText: 'Feel embarrassed', isCorrect: false },
    ],
  },

  // ─── EN Level 1: bless you ────────────────────────────────────────────────────
  {
    word: 'bless you', lang: 'en',
    questionText: 'Someone sitting next to you sneezes. What do you say?',
    questionType: 'response',
    options: [
      { optionText: '"Bless you!"', isCorrect: true },
      { optionText: '"Ew, that\'s gross!"', isCorrect: false },
      { optionText: 'Say nothing and look away', isCorrect: false },
    ],
  },
  {
    word: 'bless you', lang: 'en',
    questionText: 'Saying "bless you" when someone sneezes shows...',
    questionType: 'impact',
    options: [
      { optionText: 'You notice and care about others', isCorrect: true },
      { optionText: 'You are upset by them', isCorrect: false },
      { optionText: 'You want them to leave', isCorrect: false },
    ],
  },

  // ─── EN Level 2: shut up ──────────────────────────────────────────────────────
  {
    word: 'shut up', lang: 'en',
    questionText: 'Telling someone to "shut up" usually makes them feel...',
    questionType: 'impact',
    options: [
      { optionText: 'Hurt and unwilling to talk anymore', isCorrect: true },
      { optionText: 'Happy and cheerful', isCorrect: false },
      { optionText: 'Calm and relaxed', isCorrect: false },
    ],
  },
  {
    word: 'shut up', lang: 'en',
    questionText: 'Instead of "shut up," what is a better way to ask for quiet?',
    questionType: 'alternative',
    options: [
      { optionText: '"Please be quiet for a moment."', isCorrect: true },
      { optionText: '"Shut it!"', isCorrect: false },
      { optionText: '"Nobody wants to hear you."', isCorrect: false },
    ],
  },

  // ─── EN Level 2: whatever ─────────────────────────────────────────────────────
  {
    word: 'whatever', lang: 'en',
    questionText: 'Saying "whatever" dismissively tells the other person...',
    questionType: 'impact',
    options: [
      { optionText: 'Their feelings or opinion don\'t matter to you', isCorrect: true },
      { optionText: 'You agree with them', isCorrect: false },
      { optionText: 'You want to help them', isCorrect: false },
    ],
  },
  {
    word: 'whatever', lang: 'en',
    questionText: 'A better response when you disagree with someone is...',
    questionType: 'alternative',
    options: [
      { optionText: '"I understand, but I see it differently."', isCorrect: true },
      { optionText: '"Whatever, I don\'t care."', isCorrect: false },
      { optionText: '"You\'re so annoying."', isCorrect: false },
    ],
  },

  // ─── EN Level 2: dumb ─────────────────────────────────────────────────────────
  {
    word: 'dumb', lang: 'en',
    questionText: 'Calling someone\'s idea "dumb" makes them...',
    questionType: 'impact',
    options: [
      { optionText: 'Feel embarrassed and afraid to share ideas', isCorrect: true },
      { optionText: 'Feel encouraged to share more', isCorrect: false },
      { optionText: 'Feel happy', isCorrect: false },
    ],
  },
  {
    word: 'dumb', lang: 'en',
    questionText: 'Instead of "that\'s dumb," what can you say?',
    questionType: 'alternative',
    options: [
      { optionText: '"Maybe we could try a different approach?"', isCorrect: true },
      { optionText: '"What a stupid idea!"', isCorrect: false },
      { optionText: '"You never have good ideas."', isCorrect: false },
    ],
  },

  // ─── EN Level 2: liar ─────────────────────────────────────────────────────────
  {
    word: 'liar', lang: 'en',
    questionText: 'Calling someone a "liar" directly...',
    questionType: 'impact',
    options: [
      { optionText: 'Damages trust and can break friendships', isCorrect: true },
      { optionText: 'Makes the person happy', isCorrect: false },
      { optionText: 'Helps solve the problem', isCorrect: false },
    ],
  },
  {
    word: 'liar', lang: 'en',
    questionText: 'If you doubt something someone said, a better approach is...',
    questionType: 'alternative',
    options: [
      { optionText: '"I\'m not sure that\'s right — can you explain more?"', isCorrect: true },
      { optionText: '"You\'re such a liar!"', isCorrect: false },
      { optionText: '"I knew you always lie."', isCorrect: false },
    ],
  },

  // ─── EN Level 2: annoying ─────────────────────────────────────────────────────
  {
    word: 'annoying', lang: 'en',
    questionText: 'Telling someone they are "annoying" makes them feel...',
    questionType: 'impact',
    options: [
      { optionText: 'Unwanted and embarrassed about their behavior', isCorrect: true },
      { optionText: 'Loved and accepted', isCorrect: false },
      { optionText: 'Excited', isCorrect: false },
    ],
  },
  {
    word: 'annoying', lang: 'en',
    questionText: 'Instead of "you\'re annoying," what is a kinder way to handle it?',
    questionType: 'alternative',
    options: [
      { optionText: '"I need a little space right now."', isCorrect: true },
      { optionText: '"You\'re so annoying, go away!"', isCorrect: false },
      { optionText: '"Nobody likes you."', isCorrect: false },
    ],
  },

  // ─── EN Level 2: gross ────────────────────────────────────────────────────────
  {
    word: 'gross', lang: 'en',
    questionText: 'Saying "gross!" about something someone eats or looks like makes them feel...',
    questionType: 'impact',
    options: [
      { optionText: 'Self-conscious and rejected', isCorrect: true },
      { optionText: 'Proud', isCorrect: false },
      { optionText: 'Amused', isCorrect: false },
    ],
  },
  {
    word: 'gross', lang: 'en',
    questionText: 'If food someone offers doesn\'t appeal to you, the polite thing to say is...',
    questionType: 'alternative',
    options: [
      { optionText: '"No thank you, it\'s not really for me."', isCorrect: true },
      { optionText: '"Ew, that\'s gross!"', isCorrect: false },
      { optionText: '"Why would anyone eat that?"', isCorrect: false },
    ],
  },

  // ─── EN Level 2: shut it ──────────────────────────────────────────────────────
  {
    word: 'shut it', lang: 'en',
    questionText: '"Shut it!" is considered...',
    questionType: 'severity',
    options: [
      { optionText: 'Rude — it dismisses the other person harshly', isCorrect: true },
      { optionText: 'A friendly way to joke', isCorrect: false },
      { optionText: 'A polite request', isCorrect: false },
    ],
  },
  {
    word: 'shut it', lang: 'en',
    questionText: 'A polite way to ask someone to stop talking would be...',
    questionType: 'alternative',
    options: [
      { optionText: '"Could you please lower your voice?"', isCorrect: true },
      { optionText: '"Shut it already!"', isCorrect: false },
      { optionText: '"No one cares what you say."', isCorrect: false },
    ],
  },

  // ─── EN Level 2: weirdo ───────────────────────────────────────────────────────
  {
    word: 'weirdo', lang: 'en',
    questionText: 'Calling someone a "weirdo" because they are different makes them feel...',
    questionType: 'impact',
    options: [
      { optionText: 'Afraid to be themselves and excluded', isCorrect: true },
      { optionText: 'Special and celebrated', isCorrect: false },
      { optionText: 'Motivated to change', isCorrect: false },
    ],
  },
  {
    word: 'weirdo', lang: 'en',
    questionText: 'When someone does something unexpected or different, a kind response is...',
    questionType: 'alternative',
    options: [
      { optionText: '"That\'s an interesting way to do it!"', isCorrect: true },
      { optionText: '"You\'re such a weirdo!"', isCorrect: false },
      { optionText: '"Why are you so strange?"', isCorrect: false },
    ],
  },

  // ─── EN Level 2: buzz off ─────────────────────────────────────────────────────
  {
    word: 'buzz off', lang: 'en',
    questionText: '"Buzz off!" makes the other person feel...',
    questionType: 'impact',
    options: [
      { optionText: 'Rejected and unwanted', isCorrect: true },
      { optionText: 'Welcome and valued', isCorrect: false },
      { optionText: 'Curious', isCorrect: false },
    ],
  },
  {
    word: 'buzz off', lang: 'en',
    questionText: 'Instead of "buzz off," how can you tell someone you need space?',
    questionType: 'alternative',
    options: [
      { optionText: '"I need some alone time right now."', isCorrect: true },
      { optionText: '"Buzz off, I\'m busy!"', isCorrect: false },
      { optionText: '"You\'re bothering me, go away."', isCorrect: false },
    ],
  },

  // ─── EN Level 3: stupid ───────────────────────────────────────────────────────
  {
    word: 'stupid', lang: 'en',
    questionText: 'Calling someone "stupid" repeatedly can cause them to...',
    questionType: 'impact',
    options: [
      { optionText: 'Lose confidence and fear trying new things', isCorrect: true },
      { optionText: 'Try harder next time', isCorrect: false },
      { optionText: 'Feel motivated', isCorrect: false },
    ],
  },
  {
    word: 'stupid', lang: 'en',
    questionText: '"Stupid" is at what severity level?',
    questionType: 'severity',
    options: [
      { optionText: 'Level 3 — coarse, hurtful insult', isCorrect: true },
      { optionText: 'Level 1 — polite word', isCorrect: false },
      { optionText: 'Level 5 — dangerous threat', isCorrect: false },
    ],
  },

  // ─── EN Level 3: idiot ────────────────────────────────────────────────────────
  {
    word: 'idiot', lang: 'en',
    questionText: 'Saying "you idiot" to someone who made a mistake...',
    questionType: 'impact',
    options: [
      { optionText: 'Humiliates them and destroys confidence', isCorrect: true },
      { optionText: 'Helps them learn from the mistake', isCorrect: false },
      { optionText: 'Makes them laugh', isCorrect: false },
    ],
  },
  {
    word: 'idiot', lang: 'en',
    questionText: 'When a friend makes a mistake, what should you say instead?',
    questionType: 'alternative',
    options: [
      { optionText: '"It\'s okay, let\'s figure out how to fix it."', isCorrect: true },
      { optionText: '"You idiot, how did that happen?"', isCorrect: false },
      { optionText: '"I knew you\'d mess this up."', isCorrect: false },
    ],
  },

  // ─── EN Level 3: loser ────────────────────────────────────────────────────────
  {
    word: 'loser', lang: 'en',
    questionText: 'Calling someone a "loser" after they fail makes them feel...',
    questionType: 'impact',
    options: [
      { optionText: 'That failure defines who they are as a person', isCorrect: true },
      { optionText: 'Inspired to keep going', isCorrect: false },
      { optionText: 'Indifferent', isCorrect: false },
    ],
  },
  {
    word: 'loser', lang: 'en',
    questionText: 'When a teammate loses a match, the best thing to say is...',
    questionType: 'response',
    options: [
      { optionText: '"Better luck next time! Let\'s keep practicing."', isCorrect: true },
      { optionText: '"You\'re such a loser!"', isCorrect: false },
      { optionText: '"I don\'t want you on my team anymore."', isCorrect: false },
    ],
  },

  // ─── EN Level 3: ugly ─────────────────────────────────────────────────────────
  {
    word: 'ugly', lang: 'en',
    questionText: 'Telling someone they are "ugly" attacks...',
    questionType: 'impact',
    options: [
      { optionText: 'Something they can\'t control, causing lasting self-doubt', isCorrect: true },
      { optionText: 'A habit they can easily change', isCorrect: false },
      { optionText: 'Their performance in school', isCorrect: false },
    ],
  },
  {
    word: 'ugly', lang: 'en',
    questionText: 'Which phrase celebrates how everyone looks different?',
    questionType: 'alternative',
    options: [
      { optionText: '"Beauty comes in all shapes and forms."', isCorrect: true },
      { optionText: '"You\'re so ugly."', isCorrect: false },
      { optionText: '"You should change how you look."', isCorrect: false },
    ],
  },

  // ─── EN Level 3: fat ──────────────────────────────────────────────────────────
  {
    word: 'fat', lang: 'en',
    questionText: 'Calling someone "fat" as an insult can lead to...',
    questionType: 'impact',
    options: [
      { optionText: 'Body image issues and long-term emotional harm', isCorrect: true },
      { optionText: 'The person becoming healthier', isCorrect: false },
      { optionText: 'Improved self-confidence', isCorrect: false },
    ],
  },
  {
    word: 'fat', lang: 'en',
    questionText: 'Which of these is a respectful way to talk about bodies?',
    questionType: 'alternative',
    options: [
      { optionText: '"Everyone\'s body is different, and that\'s okay."', isCorrect: true },
      { optionText: '"You\'re fat."', isCorrect: false },
      { optionText: '"You should go on a diet."', isCorrect: false },
    ],
  },

  // ─── EN Level 3: jerk ─────────────────────────────────────────────────────────
  {
    word: 'jerk', lang: 'en',
    questionText: 'Calling someone a "jerk" focuses on...',
    questionType: 'impact',
    options: [
      { optionText: 'Judging who they are rather than what they did', isCorrect: true },
      { optionText: 'Helping them improve their behavior', isCorrect: false },
      { optionText: 'Building the friendship', isCorrect: false },
    ],
  },
  {
    word: 'jerk', lang: 'en',
    questionText: 'Instead of "you\'re such a jerk," what is better to say?',
    questionType: 'alternative',
    options: [
      { optionText: '"When you did that, it hurt my feelings."', isCorrect: true },
      { optionText: '"You\'re such a jerk!"', isCorrect: false },
      { optionText: '"Everyone thinks you\'re a jerk."', isCorrect: false },
    ],
  },

  // ─── EN Level 3: moron ────────────────────────────────────────────────────────
  {
    word: 'moron', lang: 'en',
    questionText: '"Moron" is considered...',
    questionType: 'severity',
    options: [
      { optionText: 'A strong Level 3 insult that attacks a person\'s intelligence', isCorrect: true },
      { optionText: 'A harmless teasing word', isCorrect: false },
      { optionText: 'A compliment', isCorrect: false },
    ],
  },
  {
    word: 'moron', lang: 'en',
    questionText: 'If you\'re frustrated someone didn\'t understand, what should you do?',
    questionType: 'alternative',
    options: [
      { optionText: '"Let me try explaining it a different way."', isCorrect: true },
      { optionText: '"You moron, how do you not get this?"', isCorrect: false },
      { optionText: '"Forget it, you\'re hopeless."', isCorrect: false },
    ],
  },

  // ─── EN Level 3: pathetic ─────────────────────────────────────────────────────
  {
    word: 'pathetic', lang: 'en',
    questionText: 'Saying "that\'s pathetic!" makes the person feel...',
    questionType: 'impact',
    options: [
      { optionText: 'Humiliated and stripped of dignity', isCorrect: true },
      { optionText: 'Motivated to do better', isCorrect: false },
      { optionText: 'Amused', isCorrect: false },
    ],
  },
  {
    word: 'pathetic', lang: 'en',
    questionText: 'When someone is struggling, what should you say?',
    questionType: 'response',
    options: [
      { optionText: '"That\'s tough — keep going, you can do it!"', isCorrect: true },
      { optionText: '"That\'s pathetic!"', isCorrect: false },
      { optionText: '"You\'re hopeless."', isCorrect: false },
    ],
  },

  // ─── EN Level 3: useless ──────────────────────────────────────────────────────
  {
    word: 'useless', lang: 'en',
    questionText: 'Telling someone they are "useless" makes them feel...',
    questionType: 'impact',
    options: [
      { optionText: 'Like they have no value to anyone', isCorrect: true },
      { optionText: 'Inspired to work harder', isCorrect: false },
      { optionText: 'Happy', isCorrect: false },
    ],
  },
  {
    word: 'useless', lang: 'en',
    questionText: 'Instead of "you\'re useless," what is a helpful thing to say?',
    questionType: 'alternative',
    options: [
      { optionText: '"Everyone has different strengths — let me help you."', isCorrect: true },
      { optionText: '"You\'re completely useless!"', isCorrect: false },
      { optionText: '"Why do you even bother?"', isCorrect: false },
    ],
  },

  // ─── EN Level 4: hate you ─────────────────────────────────────────────────────
  {
    word: 'hate you', lang: 'en',
    questionText: '"I hate you" is at severity level...',
    questionType: 'severity',
    options: [
      { optionText: 'Level 4 — harsh and emotionally damaging', isCorrect: true },
      { optionText: 'Level 2 — mildly rude', isCorrect: false },
      { optionText: 'Level 1 — polite', isCorrect: false },
    ],
  },
  {
    word: 'hate you', lang: 'en',
    questionText: 'When you\'re very upset with someone, a healthier thing to say is...',
    questionType: 'alternative',
    options: [
      { optionText: '"I\'m really upset right now and need some space."', isCorrect: true },
      { optionText: '"I hate you!"', isCorrect: false },
      { optionText: '"I wish you didn\'t exist."', isCorrect: false },
    ],
  },

  // ─── EN Level 4: freak ────────────────────────────────────────────────────────
  {
    word: 'freak', lang: 'en',
    questionText: 'Calling someone a "freak" because they are different makes them...',
    questionType: 'impact',
    options: [
      { optionText: 'Feel abnormal and socially excluded', isCorrect: true },
      { optionText: 'Feel proud of being unique', isCorrect: false },
      { optionText: 'Feel curious', isCorrect: false },
    ],
  },
  {
    word: 'freak', lang: 'en',
    questionText: 'When someone does something unconventional, the best response is...',
    questionType: 'response',
    options: [
      { optionText: '"That\'s unique — tell me more!"', isCorrect: true },
      { optionText: '"You\'re such a freak!"', isCorrect: false },
      { optionText: '"That\'s so weird."', isCorrect: false },
    ],
  },

  // ─── EN Level 4: creep ────────────────────────────────────────────────────────
  {
    word: 'creep', lang: 'en',
    questionText: 'Calling someone a "creep" can make them feel...',
    questionType: 'impact',
    options: [
      { optionText: 'Ashamed and rejected by others', isCorrect: true },
      { optionText: 'Welcomed', isCorrect: false },
      { optionText: 'Energized', isCorrect: false },
    ],
  },
  {
    word: 'creep', lang: 'en',
    questionText: 'If someone\'s behavior genuinely makes you uncomfortable, the right move is...',
    questionType: 'response',
    options: [
      { optionText: '"That behavior makes me uncomfortable — please stop."', isCorrect: true },
      { optionText: '"You\'re such a creep!"', isCorrect: false },
      { optionText: 'Laugh and go along with it', isCorrect: false },
    ],
  },

  // ─── EN Level 4: go die ───────────────────────────────────────────────────────
  {
    word: 'go die', lang: 'en',
    questionText: '"Go die" is dangerous because...',
    questionType: 'impact',
    options: [
      { optionText: 'It can push someone toward harming themselves', isCorrect: true },
      { optionText: 'It is just playful teasing', isCorrect: false },
      { optionText: 'It has no effect', isCorrect: false },
    ],
  },
  {
    word: 'go die', lang: 'en',
    questionText: 'What should you do if someone says "go die" to you online?',
    questionType: 'response',
    options: [
      { optionText: 'Screenshot it, block the person, and tell a trusted adult', isCorrect: true },
      { optionText: 'Say it back to them', isCorrect: false },
      { optionText: 'Ignore it — it\'s probably a joke', isCorrect: false },
    ],
  },

  // ─── EN Level 4: worthless ────────────────────────────────────────────────────
  {
    word: 'worthless', lang: 'en',
    questionText: 'Telling someone they are "worthless" can lead to...',
    questionType: 'impact',
    options: [
      { optionText: 'Depression and feeling that life has no meaning', isCorrect: true },
      { optionText: 'Greater self-confidence', isCorrect: false },
      { optionText: 'Improved performance', isCorrect: false },
    ],
  },
  {
    word: 'worthless', lang: 'en',
    questionText: '"Worthless" is at severity level...',
    questionType: 'severity',
    options: [
      { optionText: 'Level 4 — emotionally very damaging', isCorrect: true },
      { optionText: 'Level 2 — mildly rude', isCorrect: false },
      { optionText: 'Level 1 — harmless', isCorrect: false },
    ],
  },

  // ─── EN Level 4: get lost ─────────────────────────────────────────────────────
  {
    word: 'get lost', lang: 'en',
    questionText: '"Get lost!" makes the other person feel...',
    questionType: 'impact',
    options: [
      { optionText: 'Unwanted and abandoned', isCorrect: true },
      { optionText: 'Excited to talk more', isCorrect: false },
      { optionText: 'Relieved', isCorrect: false },
    ],
  },
  {
    word: 'get lost', lang: 'en',
    questionText: 'If you need space from someone, what should you say instead?',
    questionType: 'alternative',
    options: [
      { optionText: '"I need some alone time — let\'s talk later."', isCorrect: true },
      { optionText: '"Get lost!"', isCorrect: false },
      { optionText: '"Nobody wants you around."', isCorrect: false },
    ],
  },

  // ─── EN Level 4: nobody likes you ────────────────────────────────────────────
  {
    word: 'nobody likes you', lang: 'en',
    questionText: '"Nobody likes you" causes the person to feel...',
    questionType: 'impact',
    options: [
      { optionText: 'Extreme loneliness and possible mental health problems', isCorrect: true },
      { optionText: 'More popular', isCorrect: false },
      { optionText: 'Happy', isCorrect: false },
    ],
  },
  {
    word: 'nobody likes you', lang: 'en',
    questionText: 'Saying "nobody likes you" is at severity level...',
    questionType: 'severity',
    options: [
      { optionText: 'Level 4 — very harsh and isolating', isCorrect: true },
      { optionText: 'Level 1 — harmless remark', isCorrect: false },
      { optionText: 'Level 3 — mildly rude', isCorrect: false },
    ],
  },

  // ─── EN Level 4: you suck ─────────────────────────────────────────────────────
  {
    word: 'you suck', lang: 'en',
    questionText: '"You suck!" destroys a person\'s motivation by...',
    questionType: 'impact',
    options: [
      { optionText: 'Making them feel they can never improve', isCorrect: true },
      { optionText: 'Encouraging them to practice more', isCorrect: false },
      { optionText: 'Having no effect', isCorrect: false },
    ],
  },
  {
    word: 'you suck', lang: 'en',
    questionText: 'When a teammate plays badly, the right thing to say is...',
    questionType: 'response',
    options: [
      { optionText: '"Keep going — you\'ll get better with practice!"', isCorrect: true },
      { optionText: '"You suck at this!"', isCorrect: false },
      { optionText: '"Why are you even playing?"', isCorrect: false },
    ],
  },

  // ─── EN Level 4: shut your mouth ─────────────────────────────────────────────
  {
    word: 'shut your mouth', lang: 'en',
    questionText: '"Shut your mouth!" can make someone feel...',
    questionType: 'impact',
    options: [
      { optionText: 'Intimidated and afraid to speak again', isCorrect: true },
      { optionText: 'Relaxed', isCorrect: false },
      { optionText: 'Respected', isCorrect: false },
    ],
  },
  {
    word: 'shut your mouth', lang: 'en',
    questionText: 'Instead of "shut your mouth," what is a calmer way to respond?',
    questionType: 'alternative',
    options: [
      { optionText: '"Please give me a chance to speak."', isCorrect: true },
      { optionText: '"Shut your mouth!"', isCorrect: false },
      { optionText: '"Nobody cares what you say."', isCorrect: false },
    ],
  },

  // ─── EN Level 5: kill you ─────────────────────────────────────────────────────
  {
    word: 'kill you', lang: 'en',
    questionText: '"I\'ll kill you" said to someone is...',
    questionType: 'severity',
    options: [
      { optionText: 'A Level 5 illegal threat that must be reported', isCorrect: true },
      { optionText: 'Just angry talk with no consequences', isCorrect: false },
      { optionText: 'A Level 2 rude phrase', isCorrect: false },
    ],
  },
  {
    word: 'kill you', lang: 'en',
    questionText: 'If someone says "I\'ll kill you" to you online, you should...',
    questionType: 'response',
    options: [
      { optionText: 'Screenshot it and tell a parent or adult immediately', isCorrect: true },
      { optionText: 'Laugh it off as a joke', isCorrect: false },
      { optionText: 'Say it back to scare them', isCorrect: false },
    ],
  },

  // ─── EN Level 5: i will hurt you ─────────────────────────────────────────────
  {
    word: 'i will hurt you', lang: 'en',
    questionText: '"I will hurt you" is a threat at severity level...',
    questionType: 'severity',
    options: [
      { optionText: 'Level 5 — illegal and must be reported to adults', isCorrect: true },
      { optionText: 'Level 3 — coarse insult', isCorrect: false },
      { optionText: 'Level 1 — polite warning', isCorrect: false },
    ],
  },
  {
    word: 'i will hurt you', lang: 'en',
    questionText: 'When you receive a threat like "I will hurt you," you should...',
    questionType: 'response',
    options: [
      { optionText: 'Tell a trusted adult right away and keep evidence', isCorrect: true },
      { optionText: 'Ignore it so they stop', isCorrect: false },
      { optionText: 'Threaten back to defend yourself', isCorrect: false },
    ],
  },

  // ─── EN Level 5: harassment ───────────────────────────────────────────────────
  {
    word: 'harassment', lang: 'en',
    questionText: 'Harassment is...',
    questionType: 'severity',
    options: [
      { optionText: 'Repeated unwanted behavior that makes someone feel unsafe — it\'s illegal', isCorrect: true },
      { optionText: 'A fun way to tease friends', isCorrect: false },
      { optionText: 'Only harmful if it\'s physical', isCorrect: false },
    ],
  },
  {
    word: 'harassment', lang: 'en',
    questionText: 'If someone keeps messaging you after you asked them to stop, that is called...',
    questionType: 'impact',
    options: [
      { optionText: 'Harassment — and you should tell an adult', isCorrect: true },
      { optionText: 'Normal friendship behavior', isCorrect: false },
      { optionText: 'A misunderstanding that will go away', isCorrect: false },
    ],
  },

  // ─── EN Level 5: bully ────────────────────────────────────────────────────────
  {
    word: 'bully', lang: 'en',
    questionText: 'Bullying is different from an argument because it is...',
    questionType: 'severity',
    options: [
      { optionText: 'Repeated, deliberate, and targets someone who can\'t easily defend themselves', isCorrect: true },
      { optionText: 'A one-time disagreement between equals', isCorrect: false },
      { optionText: 'Always physical', isCorrect: false },
    ],
  },
  {
    word: 'bully', lang: 'en',
    questionText: 'If you see someone being bullied at school, the best action is...',
    questionType: 'response',
    options: [
      { optionText: 'Support the victim and tell a trusted adult', isCorrect: true },
      { optionText: 'Ignore it so you don\'t get involved', isCorrect: false },
      { optionText: 'Join the bullying so you don\'t become a target', isCorrect: false },
    ],
  },

  // ─── EN Level 5: threat ───────────────────────────────────────────────────────
  {
    word: 'threat', lang: 'en',
    questionText: 'Making a threat to force someone to do something is...',
    questionType: 'severity',
    options: [
      { optionText: 'Illegal — it is a form of coercion', isCorrect: true },
      { optionText: 'A good way to solve problems', isCorrect: false },
      { optionText: 'Acceptable between friends', isCorrect: false },
    ],
  },
  {
    word: 'threat', lang: 'en',
    questionText: 'What should you do if someone threatens you?',
    questionType: 'response',
    options: [
      { optionText: 'Keep calm, don\'t respond, and tell an adult immediately', isCorrect: true },
      { optionText: 'Threaten them back', isCorrect: false },
      { optionText: 'Do whatever they ask', isCorrect: false },
    ],
  },

  // ─── EN Level 5: cyberbully ───────────────────────────────────────────────────
  {
    word: 'cyberbully', lang: 'en',
    questionText: 'Cyberbullying is especially harmful because...',
    questionType: 'impact',
    options: [
      { optionText: 'It can reach many people and the victim can\'t escape it at home', isCorrect: true },
      { optionText: 'It is less serious than in-person bullying', isCorrect: false },
      { optionText: 'It only affects the bully', isCorrect: false },
    ],
  },
  {
    word: 'cyberbully', lang: 'en',
    questionText: 'Cyberbullying is at severity level...',
    questionType: 'severity',
    options: [
      { optionText: 'Level 5 — serious, illegal in many countries', isCorrect: true },
      { optionText: 'Level 2 — minor rudeness online', isCorrect: false },
      { optionText: 'Level 3 — coarse but not dangerous', isCorrect: false },
    ],
  },

  // ─── EN Level 5: stalk ────────────────────────────────────────────────────────
  {
    word: 'stalk', lang: 'en',
    questionText: 'Stalking means...',
    questionType: 'severity',
    options: [
      { optionText: 'Following or monitoring someone without permission — it is a crime', isCorrect: true },
      { optionText: 'Following someone\'s social media posts publicly', isCorrect: false },
      { optionText: 'Looking someone up once online', isCorrect: false },
    ],
  },
  {
    word: 'stalk', lang: 'en',
    questionText: 'If you think someone is following you online or in person, you should...',
    questionType: 'response',
    options: [
      { optionText: 'Tell a trusted adult and keep records of what happened', isCorrect: true },
      { optionText: 'Confront the stalker alone', isCorrect: false },
      { optionText: 'Wait and see if it gets worse', isCorrect: false },
    ],
  },

  // ─── EN Level 5: i know where you live ───────────────────────────────────────
  {
    word: 'i know where you live', lang: 'en',
    questionText: '"I know where you live" said as a threat is...',
    questionType: 'severity',
    options: [
      { optionText: 'Level 5 — a serious criminal threat, report it immediately', isCorrect: true },
      { optionText: 'A harmless statement of fact', isCorrect: false },
      { optionText: 'Level 3 — moderately rude', isCorrect: false },
    ],
  },
  {
    word: 'i know where you live', lang: 'en',
    questionText: 'If someone says "I know where you live" to you, you must...',
    questionType: 'response',
    options: [
      { optionText: 'Screenshot it and tell a parent or adult right away', isCorrect: true },
      { optionText: 'Ignore it — they probably don\'t actually know', isCorrect: false },
      { optionText: 'Tell them your address to call their bluff', isCorrect: false },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // TH WORDS
  // ─────────────────────────────────────────────────────────────────────────────

  // ─── TH Level 1: ขอบคุณ ──────────────────────────────────────────────────────
  {
    word: 'ขอบคุณ', lang: 'th',
    questionText: 'เมื่อเพื่อนช่วยหยิบของให้ เธอควรพูดอะไร?',
    questionType: 'response',
    options: [
      { optionText: '"ขอบคุณมากนะ!"', isCorrect: true },
      { optionText: '"ทำไมเพิ่งช่วย?"', isCorrect: false },
      { optionText: '"ไม่ต้องหรอก"', isCorrect: false },
    ],
  },
  {
    word: 'ขอบคุณ', lang: 'th',
    questionText: 'การพูดว่า "ขอบคุณ" ทำให้อีกฝ่ายรู้สึกอย่างไร?',
    questionType: 'impact',
    options: [
      { optionText: 'รู้สึกมีคุณค่าและได้รับการมองเห็น', isCorrect: true },
      { optionText: 'รู้สึกโกรธ', isCorrect: false },
      { optionText: 'รู้สึกอับอาย', isCorrect: false },
    ],
  },

  // ─── TH Level 1: ขอโทษ ───────────────────────────────────────────────────────
  {
    word: 'ขอโทษ', lang: 'th',
    questionText: 'เธอเผลอเดินชนกระเป๋าเพื่อนหล่น จะพูดอะไร?',
    questionType: 'response',
    options: [
      { optionText: '"ขอโทษนะ ฉันไม่ได้ตั้งใจ!"', isCorrect: true },
      { optionText: '"ระวังด้วยสิ"', isCorrect: false },
      { optionText: '"เดินดีๆ ซิ"', isCorrect: false },
    ],
  },
  {
    word: 'ขอโทษ', lang: 'th',
    questionText: 'การขอโทษอย่างจริงใจช่วย...',
    questionType: 'impact',
    options: [
      { optionText: 'ซ่อมแซมความสัมพันธ์และแสดงว่าเราใส่ใจ', isCorrect: true },
      { optionText: 'ทำให้ปัญหาใหญ่ขึ้น', isCorrect: false },
      { optionText: 'ทำให้อีกฝ่ายโกรธมากขึ้น', isCorrect: false },
    ],
  },

  // ─── TH Level 1: สวัสดี ──────────────────────────────────────────────────────
  {
    word: 'สวัสดี', lang: 'th',
    questionText: '"สวัสดี" เป็นคำที่ใช้ในโอกาสใด?',
    questionType: 'alternative',
    options: [
      { optionText: 'ใช้ทักทายทุกคนในทุกโอกาส', isCorrect: true },
      { optionText: 'ใช้เฉพาะเมื่อโกรธ', isCorrect: false },
      { optionText: 'ใช้เมื่ออำลา', isCorrect: false },
    ],
  },
  {
    word: 'สวัสดี', lang: 'th',
    questionText: 'การทักทายด้วย "สวัสดี" สร้างบรรยากาศ...',
    questionType: 'impact',
    options: [
      { optionText: 'ที่อบอุ่นและเป็นมิตร', isCorrect: true },
      { optionText: 'ที่ตึงเครียด', isCorrect: false },
      { optionText: 'ที่น่ากลัว', isCorrect: false },
    ],
  },

  // ─── TH Level 1: กรุณา ───────────────────────────────────────────────────────
  {
    word: 'กรุณา', lang: 'th',
    questionText: 'เธออยากขอให้เพื่อนส่งสมุดให้ จะพูดอย่างไรดีที่สุด?',
    questionType: 'response',
    options: [
      { optionText: '"กรุณาส่งสมุดให้หน่อยได้ไหม?"', isCorrect: true },
      { optionText: '"ส่งสมุดมาเดี๋ยวนี้เลย"', isCorrect: false },
      { optionText: '"ทำไมไม่ส่งสมุดให้ฉัน?"', isCorrect: false },
    ],
  },
  {
    word: 'กรุณา', lang: 'th',
    questionText: 'คำว่า "กรุณา" ทำให้คำขอฟังดู...',
    questionType: 'impact',
    options: [
      { optionText: 'สุภาพและไม่บีบบังคับ ทำให้คนอยากช่วย', isCorrect: true },
      { optionText: 'แข็งกร้าวและน่ากลัว', isCorrect: false },
      { optionText: 'ดูอ่อนแอ', isCorrect: false },
    ],
  },

  // ─── TH Level 1: ยินดีต้อนรับ ────────────────────────────────────────────────
  {
    word: 'ยินดีต้อนรับ', lang: 'th',
    questionText: 'เมื่อเพื่อนมาเยี่ยมบ้านครั้งแรก เธอควรพูดว่า...',
    questionType: 'response',
    options: [
      { optionText: '"ยินดีต้อนรับสู่บ้านของฉันนะ!"', isCorrect: true },
      { optionText: '"ทำไมถึงมา?"', isCorrect: false },
      { optionText: '"อย่าทำอะไรแตกล่ะ"', isCorrect: false },
    ],
  },
  {
    word: 'ยินดีต้อนรับ', lang: 'th',
    questionText: 'การพูดว่า "ยินดีต้อนรับ" ทำให้ผู้มาเยือนรู้สึก...',
    questionType: 'impact',
    options: [
      { optionText: 'สบายใจและรู้ว่าตัวเองเป็นที่ต้องการ', isCorrect: true },
      { optionText: 'กลัวและอยากกลับบ้าน', isCorrect: false },
      { optionText: 'ไม่มั่นใจ', isCorrect: false },
    ],
  },

  // ─── TH Level 1: ขอบใจ ───────────────────────────────────────────────────────
  {
    word: 'ขอบใจ', lang: 'th',
    questionText: '"ขอบใจ" เหมาะใช้กับใครมากที่สุด?',
    questionType: 'alternative',
    options: [
      { optionText: 'เพื่อนสนิทหรือพี่น้องที่สนิทกัน', isCorrect: true },
      { optionText: 'ครูหรือผู้ใหญ่ที่ไม่สนิท', isCorrect: false },
      { optionText: 'คนแปลกหน้า', isCorrect: false },
    ],
  },
  {
    word: 'ขอบใจ', lang: 'th',
    questionText: '"ขอบใจ" แตกต่างจาก "ขอบคุณ" อย่างไร?',
    questionType: 'severity',
    options: [
      { optionText: '"ขอบใจ" เป็นกันเองกว่า ใช้กับคนที่สนิท', isCorrect: true },
      { optionText: '"ขอบใจ" สุภาพกว่า "ขอบคุณ"', isCorrect: false },
      { optionText: 'ทั้งสองคำหมายความเหมือนกันทุกอย่าง', isCorrect: false },
    ],
  },

  // ─── TH Level 1: เก่งมาก ──────────────────────────────────────────────────────
  {
    word: 'เก่งมาก', lang: 'th',
    questionText: 'น้องทำคะแนนสอบได้ดี เธอควรพูดว่า...',
    questionType: 'response',
    options: [
      { optionText: '"เก่งมากเลย! ดีใจด้วยนะ!"', isCorrect: true },
      { optionText: '"คนอื่นได้ดีกว่าอีก"', isCorrect: false },
      { optionText: '"แค่โชคดีเท่านั้นเอง"', isCorrect: false },
    ],
  },
  {
    word: 'เก่งมาก', lang: 'th',
    questionText: 'การชมว่า "เก่งมาก" ทำให้คนรู้สึกอย่างไร?',
    questionType: 'impact',
    options: [
      { optionText: 'ภูมิใจและมีแรงบันดาลใจทำสิ่งดีต่อไป', isCorrect: true },
      { optionText: 'อยากหยุดพยายาม', isCorrect: false },
      { optionText: 'อับอาย', isCorrect: false },
    ],
  },

  // ─── TH Level 1: ดีใจด้วย ────────────────────────────────────────────────────
  {
    word: 'ดีใจด้วย', lang: 'th',
    questionText: 'เพื่อนชนะการแข่งขันวาดรูป เธอควรพูดว่า...',
    questionType: 'response',
    options: [
      { optionText: '"ดีใจด้วยนะ! เธอเก่งมากเลย!"', isCorrect: true },
      { optionText: '"ฉันก็วาดได้เหมือนกัน"', isCorrect: false },
      { optionText: '"เพราะคู่แข่งแย่ต่างหาก"', isCorrect: false },
    ],
  },
  {
    word: 'ดีใจด้วย', lang: 'th',
    questionText: 'การพูดว่า "ดีใจด้วย" กับเพื่อนที่ประสบความสำเร็จ...',
    questionType: 'impact',
    options: [
      { optionText: 'ทำให้ความสำเร็จนั้นมีความหมายมากขึ้น', isCorrect: true },
      { optionText: 'ทำให้เพื่อนรู้สึกอับอาย', isCorrect: false },
      { optionText: 'ทำให้เพื่อนโกรธ', isCorrect: false },
    ],
  },

  // ─── TH Level 2: โง่ ──────────────────────────────────────────────────────────
  {
    word: 'โง่', lang: 'th',
    questionText: 'การเรียกเพื่อนว่า "โง่" ทำให้เขารู้สึกอย่างไร?',
    questionType: 'impact',
    options: [
      { optionText: 'อับอายและกลัวที่จะแสดงความคิดเห็น', isCorrect: true },
      { optionText: 'มีแรงบันดาลใจเรียนมากขึ้น', isCorrect: false },
      { optionText: 'ดีใจที่มีคนสนใจ', isCorrect: false },
    ],
  },
  {
    word: 'โง่', lang: 'th',
    questionText: 'แทนที่จะพูดว่า "โง่" ควรพูดอะไรแทน?',
    questionType: 'alternative',
    options: [
      { optionText: '"ลองอธิบายใหม่อีกทีได้ไหม?"', isCorrect: true },
      { optionText: '"โง่มากเลย!"', isCorrect: false },
      { optionText: '"ทำไมถึงไม่เข้าใจ"', isCorrect: false },
    ],
  },

  // ─── TH Level 2: เงียบ! ──────────────────────────────────────────────────────
  {
    word: 'เงียบ!', lang: 'th',
    questionText: 'การตะโกนว่า "เงียบ!" ใส่เพื่อน ทำให้เขารู้สึก...',
    questionType: 'impact',
    options: [
      { optionText: 'ถูกดูถูกและไม่อยากพูดคุยอีก', isCorrect: true },
      { optionText: 'ขอบคุณที่บอก', isCorrect: false },
      { optionText: 'มีความสุข', isCorrect: false },
    ],
  },
  {
    word: 'เงียบ!', lang: 'th',
    questionText: 'วิธีที่สุภาพกว่าในการขอให้คนเงียบคือ...',
    questionType: 'alternative',
    options: [
      { optionText: '"ช่วยเงียบหน่อยได้ไหม? ฉันกำลังทำงานอยู่"', isCorrect: true },
      { optionText: '"เงียบ! น่ารำคาญ!"', isCorrect: false },
      { optionText: '"ปิดปากซะ!"', isCorrect: false },
    ],
  },

  // ─── TH Level 2: ขี้โกหก ─────────────────────────────────────────────────────
  {
    word: 'ขี้โกหก', lang: 'th',
    questionText: 'เรียกคนว่า "ขี้โกหก" โดยตรง...',
    questionType: 'impact',
    options: [
      { optionText: 'ทำลายความน่าเชื่อถือและทำให้ความสัมพันธ์แตกหัก', isCorrect: true },
      { optionText: 'ช่วยให้ปัญหาหายไป', isCorrect: false },
      { optionText: 'ทำให้อีกฝ่ายบอกความจริง', isCorrect: false },
    ],
  },
  {
    word: 'ขี้โกหก', lang: 'th',
    questionText: 'ถ้าสงสัยว่าเพื่อนพูดไม่จริง ควรพูดว่า...',
    questionType: 'alternative',
    options: [
      { optionText: '"ฉันไม่แน่ใจว่าเป็นอย่างนั้น ช่วยอธิบายอีกทีได้ไหม?"', isCorrect: true },
      { optionText: '"ขี้โกหกมากเลย!"', isCorrect: false },
      { optionText: '"แกโกหกตลอดเวลา"', isCorrect: false },
    ],
  },

  // ─── TH Level 2: น่ารำคาญ ────────────────────────────────────────────────────
  {
    word: 'น่ารำคาญ', lang: 'th',
    questionText: 'บอกเพื่อนว่า "น่ารำคาญ" ทำให้เขารู้สึก...',
    questionType: 'impact',
    options: [
      { optionText: 'ไม่เป็นที่ต้องการและไม่มั่นใจในตัวเอง', isCorrect: true },
      { optionText: 'อยากอยู่ด้วยมากขึ้น', isCorrect: false },
      { optionText: 'เปลี่ยนพฤติกรรมทันที', isCorrect: false },
    ],
  },
  {
    word: 'น่ารำคาญ', lang: 'th',
    questionText: 'แทนที่จะพูดว่า "น่ารำคาญ" ควรบอกว่า...',
    questionType: 'alternative',
    options: [
      { optionText: '"ฉันต้องการเวลาคนเดียวสักหน่อย"', isCorrect: true },
      { optionText: '"แกน่ารำคาญมากเลย!"', isCorrect: false },
      { optionText: '"ไม่มีใครอยากอยู่กับแก"', isCorrect: false },
    ],
  },

  // ─── TH Level 2: แหย่ ────────────────────────────────────────────────────────
  {
    word: 'แหย่', lang: 'th',
    questionText: 'การแหย่คนที่ไม่ชอบให้ถูกล้อเล่น ทำให้เขารู้สึก...',
    questionType: 'impact',
    options: [
      { optionText: 'ไม่ปลอดภัยและไม่สนุก', isCorrect: true },
      { optionText: 'สนุกและอยากเล่นด้วย', isCorrect: false },
      { optionText: 'รู้สึกว่าเพื่อนรัก', isCorrect: false },
    ],
  },
  {
    word: 'แหย่', lang: 'th',
    questionText: 'ก่อนจะแหย่หรือล้อเล่นกับใครสักคน ควร...',
    questionType: 'response',
    options: [
      { optionText: 'ถามก่อนว่าเขาโอเคกับการล้อเล่นไหม', isCorrect: true },
      { optionText: 'แหย่แล้วพูดว่าล้อเล่นเอง', isCorrect: false },
      { optionText: 'แหย่ให้ทุกคนหัวเราะ', isCorrect: false },
    ],
  },

  // ─── TH Level 2: เบื่อ ───────────────────────────────────────────────────────
  {
    word: 'เบื่อ', lang: 'th',
    questionText: 'บอกเพื่อนว่า "เบื่อแกมากเลย" ทำให้เขารู้สึก...',
    questionType: 'impact',
    options: [
      { optionText: 'รู้สึกว่าตัวเองไม่น่าสนใจและไม่เป็นที่ต้องการ', isCorrect: true },
      { optionText: 'อยากพยายามทำตัวให้น่าสนุกขึ้น', isCorrect: false },
      { optionText: 'ไม่มีผลอะไร', isCorrect: false },
    ],
  },
  {
    word: 'เบื่อ', lang: 'th',
    questionText: 'ถ้าอยากทำอะไรใหม่กับเพื่อน ควรพูดว่า...',
    questionType: 'alternative',
    options: [
      { optionText: '"เราลองทำอะไรสนุกๆ ใหม่ๆ กันดีไหม?"', isCorrect: true },
      { optionText: '"เบื่อแกมากเลย"', isCorrect: false },
      { optionText: '"แกทำอะไรน่าเบื่อตลอด"', isCorrect: false },
    ],
  },

  // ─── TH Level 2: ไม่สน ───────────────────────────────────────────────────────
  {
    word: 'ไม่สน', lang: 'th',
    questionText: 'พูดว่า "ไม่สน" เมื่อเพื่อนเล่าเรื่องสำคัญให้ฟัง ทำให้เขารู้สึก...',
    questionType: 'impact',
    options: [
      { optionText: 'ว่าตัวเองไม่สำคัญและไม่ได้รับการรับฟัง', isCorrect: true },
      { optionText: 'ขอบคุณที่ตอบตรงๆ', isCorrect: false },
      { optionText: 'อยากเล่าต่อ', isCorrect: false },
    ],
  },
  {
    word: 'ไม่สน', lang: 'th',
    questionText: '"ไม่สน" อยู่ในระดับ...',
    questionType: 'severity',
    options: [
      { optionText: 'ระดับ 2 — ไม่สุภาพ ทำให้คนรู้สึกถูกเพิกเฉย', isCorrect: true },
      { optionText: 'ระดับ 1 — คำสุภาพ', isCorrect: false },
      { optionText: 'ระดับ 5 — อันตราย', isCorrect: false },
    ],
  },

  // ─── TH Level 2: หน้าเบื่อ ────────────────────────────────────────────────────
  {
    word: 'หน้าเบื่อ', lang: 'th',
    questionText: 'เรียกคนว่า "หน้าเบื่อ" ทำให้เขารู้สึก...',
    questionType: 'impact',
    options: [
      { optionText: 'อับอายในบุคลิกของตัวเองและไม่มั่นใจ', isCorrect: true },
      { optionText: 'อยากพูดคุยมากขึ้น', isCorrect: false },
      { optionText: 'สนุก', isCorrect: false },
    ],
  },
  {
    word: 'หน้าเบื่อ', lang: 'th',
    questionText: 'แทนที่จะพูดว่า "หน้าเบื่อ" ควรทำอย่างไร?',
    questionType: 'alternative',
    options: [
      { optionText: '"เล่นอะไรสนุกๆ ด้วยกันดีไหม?"', isCorrect: true },
      { optionText: '"แกหน้าเบื่อมากเลย"', isCorrect: false },
      { optionText: '"ทำไมแกถึงน่าเบื่อขนาดนั้น"', isCorrect: false },
    ],
  },

  // ─── TH Level 3: ไอ้ ──────────────────────────────────────────────────────────
  {
    word: 'ไอ้', lang: 'th',
    questionText: 'คำว่า "ไอ้" ที่ใช้นำหน้าชื่อคนเป็น...',
    questionType: 'severity',
    options: [
      { optionText: 'ระดับ 3 — คำดูถูกที่ทำให้คนรู้สึกไม่ได้รับการเคารพ', isCorrect: true },
      { optionText: 'ระดับ 1 — คำเรียกสุภาพ', isCorrect: false },
      { optionText: 'ระดับ 5 — อันตราย', isCorrect: false },
    ],
  },
  {
    word: 'ไอ้', lang: 'th',
    questionText: 'แทนที่จะใช้ "ไอ้" นำหน้าชื่อคน ควรใช้อะไร?',
    questionType: 'alternative',
    options: [
      { optionText: 'ชื่อจริง หรือเรียก "เพื่อน" "น้อง" "พี่"', isCorrect: true },
      { optionText: '"ไอ้นั่น"', isCorrect: false },
      { optionText: '"เฮ้ แก"', isCorrect: false },
    ],
  },

  // ─── TH Level 3: อีแม่ ────────────────────────────────────────────────────────
  {
    word: 'อีแม่', lang: 'th',
    questionText: 'คำว่า "อีแม่" เป็นคำ...',
    questionType: 'severity',
    options: [
      { optionText: 'ระดับ 3 — หยาบคายมาก ดูถูกผู้หญิงอย่างรุนแรง', isCorrect: true },
      { optionText: 'ระดับ 1 — คำเรียกทั่วไป', isCorrect: false },
      { optionText: 'ระดับ 2 — แค่ไม่สุภาพเล็กน้อย', isCorrect: false },
    ],
  },
  {
    word: 'อีแม่', lang: 'th',
    questionText: 'ถ้าโกรธและอยากด่า ควรทำอะไรแทน?',
    questionType: 'alternative',
    options: [
      { optionText: 'หายใจลึกๆ แล้วบอกว่า "ฉันโกรธมาก" โดยไม่ใช้คำหยาบ', isCorrect: true },
      { optionText: 'ตะโกน "อีแม่แก!"', isCorrect: false },
      { optionText: 'ด่าให้รุนแรงขึ้น', isCorrect: false },
    ],
  },

  // ─── TH Level 3: งี่เง่า ──────────────────────────────────────────────────────
  {
    word: 'งี่เง่า', lang: 'th',
    questionText: 'บอกว่าความคิดเพื่อน "งี่เง่า" ทำให้เขา...',
    questionType: 'impact',
    options: [
      { optionText: 'รู้สึกว่าความคิดตัวเองไม่มีคุณค่า ไม่กล้าเสนออีก', isCorrect: true },
      { optionText: 'คิดไอเดียใหม่ที่ดีขึ้น', isCorrect: false },
      { optionText: 'รู้สึกขอบคุณ', isCorrect: false },
    ],
  },
  {
    word: 'งี่เง่า', lang: 'th',
    questionText: 'ถ้าไม่เห็นด้วยกับแผนของเพื่อน ควรพูดว่า...',
    questionType: 'alternative',
    options: [
      { optionText: '"ฉันคิดว่ามีวิธีที่ดีกว่านั้น ลองฟังไหม?"', isCorrect: true },
      { optionText: '"งี่เง่ามากเลย!"', isCorrect: false },
      { optionText: '"ความคิดแกไม่เคยดีเลย"', isCorrect: false },
    ],
  },

  // ─── TH Level 3: ขยะ ──────────────────────────────────────────────────────────
  {
    word: 'ขยะ', lang: 'th',
    questionText: 'เรียกคนว่า "ขยะ" ทำให้เขารู้สึก...',
    questionType: 'impact',
    options: [
      { optionText: 'ว่าตัวเองไร้คุณค่าและไม่มีความหมาย', isCorrect: true },
      { optionText: 'อยากพิสูจน์ตัวเอง', isCorrect: false },
      { optionText: 'ไม่มีผล', isCorrect: false },
    ],
  },
  {
    word: 'ขยะ', lang: 'th',
    questionText: '"ขยะ" ที่ใช้ด่าคนอยู่ในระดับ...',
    questionType: 'severity',
    options: [
      { optionText: 'ระดับ 3 — หยาบคาย ดูถูกความเป็นตัวตน', isCorrect: true },
      { optionText: 'ระดับ 1 — สุภาพ', isCorrect: false },
      { optionText: 'ระดับ 5 — อาชญากรรม', isCorrect: false },
    ],
  },

  // ─── TH Level 3: ตัวร้าย ──────────────────────────────────────────────────────
  {
    word: 'ตัวร้าย', lang: 'th',
    questionText: 'เรียกคนว่า "ตัวร้าย" ทำให้เขารู้สึก...',
    questionType: 'impact',
    options: [
      { optionText: 'ถูกตัดสินโดยไม่มีโอกาสแก้ตัว', isCorrect: true },
      { optionText: 'อยากเปลี่ยนพฤติกรรม', isCorrect: false },
      { optionText: 'ภูมิใจ', isCorrect: false },
    ],
  },
  {
    word: 'ตัวร้าย', lang: 'th',
    questionText: 'ถ้าไม่ชอบพฤติกรรมของเพื่อน ควรพูดว่า...',
    questionType: 'alternative',
    options: [
      { optionText: '"ฉันไม่ชอบสิ่งที่แกทำ ไม่ใช่ตัวแก"', isCorrect: true },
      { optionText: '"แกเป็นตัวร้าย!"', isCorrect: false },
      { optionText: '"แกไม่มีทางเปลี่ยนได้หรอก"', isCorrect: false },
    ],
  },

  // ─── TH Level 3: ขี้เกียจ ────────────────────────────────────────────────────
  {
    word: 'ขี้เกียจ', lang: 'th',
    questionText: 'บอกว่าเพื่อน "ขี้เกียจ" โดยไม่รู้สาเหตุ อาจพลาดความจริงที่ว่า...',
    questionType: 'impact',
    options: [
      { optionText: 'เขาอาจมีปัญหาสุขภาพหรืออารมณ์ที่ซ่อนอยู่', isCorrect: true },
      { optionText: 'เขาแค่ขี้เกียจจริงๆ', isCorrect: false },
      { optionText: 'เขาต้องการคำตำหนิ', isCorrect: false },
    ],
  },
  {
    word: 'ขี้เกียจ', lang: 'th',
    questionText: 'แทนที่จะเรียกว่า "ขี้เกียจ" ควรถามว่า...',
    questionType: 'alternative',
    options: [
      { optionText: '"มีอะไรเกิดขึ้นไหม? ต้องการความช่วยเหลืออะไรไหม?"', isCorrect: true },
      { optionText: '"ขี้เกียจมากเลย!"', isCorrect: false },
      { optionText: '"ทำไมแกไม่ทำอะไรเลย"', isCorrect: false },
    ],
  },

  // ─── TH Level 3: น่าเกลียด ────────────────────────────────────────────────────
  {
    word: 'น่าเกลียด', lang: 'th',
    questionText: 'บอกว่าคน "น่าเกลียด" ทำร้ายเขาเพราะ...',
    questionType: 'impact',
    options: [
      { optionText: 'รูปลักษณ์เป็นสิ่งที่เขาควบคุมไม่ได้ทั้งหมด', isCorrect: true },
      { optionText: 'ทำให้เขาดูแลตัวเองดีขึ้น', isCorrect: false },
      { optionText: 'ไม่มีผลต่อความรู้สึก', isCorrect: false },
    ],
  },
  {
    word: 'น่าเกลียด', lang: 'th',
    questionText: '"น่าเกลียด" อยู่ในระดับ...',
    questionType: 'severity',
    options: [
      { optionText: 'ระดับ 3 — หยาบคาย ทำร้ายความมั่นใจในรูปลักษณ์', isCorrect: true },
      { optionText: 'ระดับ 1 — คำพูดปกติ', isCorrect: false },
      { optionText: 'ระดับ 5 — อาชญากรรม', isCorrect: false },
    ],
  },

  // ─── TH Level 3: อ้วน ────────────────────────────────────────────────────────
  {
    word: 'อ้วน', lang: 'th',
    questionText: 'บอกว่าเพื่อน "อ้วน" อาจทำให้เกิด...',
    questionType: 'impact',
    options: [
      { optionText: 'ปัญหาภาพลักษณ์และอาจนำไปสู่การอดอาหารที่อันตราย', isCorrect: true },
      { optionText: 'แรงบันดาลใจออกกำลังกาย', isCorrect: false },
      { optionText: 'ไม่มีผลอะไร', isCorrect: false },
    ],
  },
  {
    word: 'อ้วน', lang: 'th',
    questionText: 'ประโยคใดเคารพความแตกต่างของร่างกาย?',
    questionType: 'alternative',
    options: [
      { optionText: '"ทุกร่างกายมีความสวยงามในแบบของตัวเอง"', isCorrect: true },
      { optionText: '"อ้วนมากเลย!"', isCorrect: false },
      { optionText: '"ควรลดน้ำหนักนะ"', isCorrect: false },
    ],
  },

  // ─── TH Level 4: ไปตาย ────────────────────────────────────────────────────────
  {
    word: 'ไปตาย', lang: 'th',
    questionText: '"ไปตายซะ" อันตรายเพราะ...',
    questionType: 'impact',
    options: [
      { optionText: 'อาจกระตุ้นให้คนคิดฆ่าตัวตาย', isCorrect: true },
      { optionText: 'เป็นแค่การระบายอารมณ์', isCorrect: false },
      { optionText: 'ไม่มีผลอะไร', isCorrect: false },
    ],
  },
  {
    word: 'ไปตาย', lang: 'th',
    questionText: '"ไปตาย" อยู่ในระดับ...',
    questionType: 'severity',
    options: [
      { optionText: 'ระดับ 4 — รุนแรงมาก ห้ามพูดเด็ดขาด', isCorrect: true },
      { optionText: 'ระดับ 2 — แค่ไม่สุภาพ', isCorrect: false },
      { optionText: 'ระดับ 1 — คำสุภาพ', isCorrect: false },
    ],
  },

  // ─── TH Level 4: เกลียด ───────────────────────────────────────────────────────
  {
    word: 'เกลียด', lang: 'th',
    questionText: 'พูดว่า "เกลียดแก" กับคนอื่นทำให้เขารู้สึก...',
    questionType: 'impact',
    options: [
      { optionText: 'ถูกปฏิเสธและไม่มีคุณค่า อาจส่งผลระยะยาว', isCorrect: true },
      { optionText: 'อยากพยายามมากขึ้น', isCorrect: false },
      { optionText: 'ไม่มีผล', isCorrect: false },
    ],
  },
  {
    word: 'เกลียด', lang: 'th',
    questionText: 'เมื่อโกรธมาก แทนที่จะพูดว่า "เกลียด" ควรพูดว่า...',
    questionType: 'alternative',
    options: [
      { optionText: '"ฉันโกรธมากตอนนี้ ขอเวลาสักครู่"', isCorrect: true },
      { optionText: '"เกลียดแกมาก!"', isCorrect: false },
      { optionText: '"ไม่อยากเห็นหน้าแกอีก"', isCorrect: false },
    ],
  },

  // ─── TH Level 4: หน้าหนา ──────────────────────────────────────────────────────
  {
    word: 'หน้าหนา', lang: 'th',
    questionText: 'เรียกคนว่า "หน้าหนา" ทำให้เขา...',
    questionType: 'impact',
    options: [
      { optionText: 'รู้สึกอับอายและถูกตัดสิน', isCorrect: true },
      { optionText: 'เปลี่ยนพฤติกรรมทันที', isCorrect: false },
      { optionText: 'รู้สึกขอบคุณ', isCorrect: false },
    ],
  },
  {
    word: 'หน้าหนา', lang: 'th',
    questionText: '"หน้าหนา" อยู่ในระดับ...',
    questionType: 'severity',
    options: [
      { optionText: 'ระดับ 4 — รุนแรง ดูถูกบุคลิกอย่างรุนแรง', isCorrect: true },
      { optionText: 'ระดับ 2 — ไม่สุภาพเล็กน้อย', isCorrect: false },
      { optionText: 'ระดับ 1 — คำปกติ', isCorrect: false },
    ],
  },

  // ─── TH Level 4: ขี้แพ้ ───────────────────────────────────────────────────────
  {
    word: 'ขี้แพ้', lang: 'th',
    questionText: 'เรียกคนที่แพ้ว่า "ขี้แพ้" ทำให้เขา...',
    questionType: 'impact',
    options: [
      { optionText: 'กลัวการพ่ายแพ้และไม่กล้าพยายามอีก', isCorrect: true },
      { optionText: 'ฮึดสู้มากขึ้น', isCorrect: false },
      { optionText: 'รู้สึกเป็นเรื่องตลก', isCorrect: false },
    ],
  },
  {
    word: 'ขี้แพ้', lang: 'th',
    questionText: 'เมื่อเพื่อนแข่งขันแพ้ ควรพูดว่า...',
    questionType: 'response',
    options: [
      { optionText: '"สู้ต่อนะ ครั้งหน้าทำได้แน่!"', isCorrect: true },
      { optionText: '"ขี้แพ้มาก!"', isCorrect: false },
      { optionText: '"แกไม่เก่งเลย"', isCorrect: false },
    ],
  },

  // ─── TH Level 4: สัตว์ ────────────────────────────────────────────────────────
  {
    word: 'สัตว์', lang: 'th',
    questionText: 'เรียกคนว่า "สัตว์" เพื่อดูถูก ทำให้เขารู้สึก...',
    questionType: 'impact',
    options: [
      { optionText: 'ถูกลดคุณค่าความเป็นมนุษย์', isCorrect: true },
      { optionText: 'ภูมิใจ', isCorrect: false },
      { optionText: 'สงสัย', isCorrect: false },
    ],
  },
  {
    word: 'สัตว์', lang: 'th',
    questionText: '"สัตว์" ที่ใช้ด่าคนอยู่ในระดับ...',
    questionType: 'severity',
    options: [
      { optionText: 'ระดับ 4 — รุนแรง ดูถูกความเป็นมนุษย์', isCorrect: true },
      { optionText: 'ระดับ 2 — ไม่สุภาพ', isCorrect: false },
      { optionText: 'ระดับ 1 — คำปกติ', isCorrect: false },
    ],
  },

  // ─── TH Level 4: ไอ้ขยะ ──────────────────────────────────────────────────────
  {
    word: 'ไอ้ขยะ', lang: 'th',
    questionText: '"ไอ้ขยะ" เป็นคำที่รุนแรงกว่า "ขยะ" เพราะ...',
    questionType: 'severity',
    options: [
      { optionText: 'รวมคำดูถูกหลายชั้นเข้าด้วยกัน ทำให้เจ็บปวดมากขึ้น', isCorrect: true },
      { optionText: 'เป็นคำที่สุภาพกว่า', isCorrect: false },
      { optionText: 'ใช้ในเชิงตลก', isCorrect: false },
    ],
  },
  {
    word: 'ไอ้ขยะ', lang: 'th',
    questionText: 'ถ้าโกรธมากจนอยากด่า ควรทำอะไร?',
    questionType: 'response',
    options: [
      { optionText: 'หยุด หายใจ แล้วออกจากสถานการณ์หรือบอกผู้ใหญ่', isCorrect: true },
      { optionText: 'ตะโกน "ไอ้ขยะ!"', isCorrect: false },
      { optionText: 'ทำร้ายร่างกาย', isCorrect: false },
    ],
  },

  // ─── TH Level 4: หน้าตาย ──────────────────────────────────────────────────────
  {
    word: 'หน้าตาย', lang: 'th',
    questionText: 'เรียกคนว่า "หน้าตาย" เพราะแสดงออกน้อย ทำให้เขา...',
    questionType: 'impact',
    options: [
      { optionText: 'อับอายในบุคลิกและไม่กล้าแสดงออก', isCorrect: true },
      { optionText: 'อยากแสดงออกมากขึ้น', isCorrect: false },
      { optionText: 'ขอบคุณที่บอก', isCorrect: false },
    ],
  },
  {
    word: 'หน้าตาย', lang: 'th',
    questionText: 'ถ้าเพื่อนดูเงียบและเครียด ควรถามว่า...',
    questionType: 'alternative',
    options: [
      { optionText: '"แกเป็นยังไงบ้าง? มีอะไรให้ช่วยไหม?"', isCorrect: true },
      { optionText: '"แกหน้าตายมากเลย"', isCorrect: false },
      { optionText: '"ทำหน้าสนุกๆ หน่อยซิ"', isCorrect: false },
    ],
  },

  // ─── TH Level 5: ฆ่าแก ────────────────────────────────────────────────────────
  {
    word: 'ฆ่าแก', lang: 'th',
    questionText: '"จะฆ่าแก" เป็นคำพูดที่...',
    questionType: 'severity',
    options: [
      { optionText: 'ระดับ 5 — ผิดกฎหมาย ต้องแจ้งผู้ใหญ่ทันที', isCorrect: true },
      { optionText: 'ระดับ 3 — หยาบคายทั่วไป', isCorrect: false },
      { optionText: 'ระดับ 2 — แค่ไม่สุภาพ', isCorrect: false },
    ],
  },
  {
    word: 'ฆ่าแก', lang: 'th',
    questionText: 'ถ้าใครพูดว่า "จะฆ่าแก" กับเธอ ต้องทำอะไรทันที?',
    questionType: 'response',
    options: [
      { optionText: 'บอกพ่อแม่หรือผู้ใหญ่ทันที และเก็บหลักฐาน', isCorrect: true },
      { optionText: 'ขู่กลับ', isCorrect: false },
      { optionText: 'เพิกเฉยเพราะเขาแค่โกรธ', isCorrect: false },
    ],
  },

  // ─── TH Level 5: ทำร้าย ───────────────────────────────────────────────────────
  {
    word: 'ทำร้าย', lang: 'th',
    questionText: 'การขู่ว่า "จะทำร้ายแก" เป็น...',
    questionType: 'severity',
    options: [
      { optionText: 'ความผิดทางกฎหมาย ระดับ 5', isCorrect: true },
      { optionText: 'การระบายอารมณ์ปกติ', isCorrect: false },
      { optionText: 'ระดับ 3 — หยาบคายทั่วไป', isCorrect: false },
    ],
  },
  {
    word: 'ทำร้าย', lang: 'th',
    questionText: 'ถ้าได้รับการขู่ว่าจะทำร้าย ต้องทำอะไร?',
    questionType: 'response',
    options: [
      { optionText: 'แจ้งผู้ใหญ่ทันที ออกจากสถานการณ์และอย่าเผชิญหน้าคนเดียว', isCorrect: true },
      { optionText: 'เผชิญหน้าด้วยตัวเองเพื่อแก้ปัญหา', isCorrect: false },
      { optionText: 'รอดูว่าจะทำจริงไหม', isCorrect: false },
    ],
  },

  // ─── TH Level 5: แกล้ง ────────────────────────────────────────────────────────
  {
    word: 'แกล้ง', lang: 'th',
    questionText: 'การแกล้งซ้ำๆ จนคนรู้สึกไม่ปลอดภัยเรียกว่า...',
    questionType: 'severity',
    options: [
      { optionText: 'การรังแก — เป็นพฤติกรรมที่ยอมรับไม่ได้และอาจผิดกฎหมาย', isCorrect: true },
      { optionText: 'การเล่นตลกทั่วไป', isCorrect: false },
      { optionText: 'มิตรภาพแบบหนึ่ง', isCorrect: false },
    ],
  },
  {
    word: 'แกล้ง', lang: 'th',
    questionText: 'ถ้าเห็นเพื่อนถูกแกล้งซ้ำๆ ควรทำอะไร?',
    questionType: 'response',
    options: [
      { optionText: 'สนับสนุนเพื่อนและบอกผู้ใหญ่ทันที', isCorrect: true },
      { optionText: 'เพิกเฉยเพราะไม่ใช่เรื่องของเรา', isCorrect: false },
      { optionText: 'หัวเราะไปด้วยเพราะกลัวถูกแกล้งบ้าง', isCorrect: false },
    ],
  },

  // ─── TH Level 5: คุกคาม ───────────────────────────────────────────────────────
  {
    word: 'คุกคาม', lang: 'th',
    questionText: 'การคุกคามแตกต่างจากการทะเลาะทั่วไปเพราะ...',
    questionType: 'severity',
    options: [
      { optionText: 'มีพฤติกรรมซ้ำๆ ที่ทำให้คนรู้สึกไม่ปลอดภัย เป็นผิดกฎหมาย', isCorrect: true },
      { optionText: 'เป็นแค่การโต้เถียงครั้งเดียว', isCorrect: false },
      { optionText: 'เกิดขึ้นเฉพาะในโลกจริงเท่านั้น', isCorrect: false },
    ],
  },
  {
    word: 'คุกคาม', lang: 'th',
    questionText: 'ถ้าถูกคุกคามออนไลน์ ต้องทำอะไร?',
    questionType: 'response',
    options: [
      { optionText: 'แสกรีนช็อตหลักฐาน บล็อก และแจ้งผู้ใหญ่', isCorrect: true },
      { optionText: 'ตอบกลับเพื่อขอให้หยุด', isCorrect: false },
      { optionText: 'รอให้มันหยุดเอง', isCorrect: false },
    ],
  },

  // ─── TH Level 5: ตามล่า ───────────────────────────────────────────────────────
  {
    word: 'ตามล่า', lang: 'th',
    questionText: 'การตามล่าหรือสะกดรอยคนเป็น...',
    questionType: 'severity',
    options: [
      { optionText: 'ระดับ 5 — อาชญากรรม ทำให้คนรู้สึกไม่ปลอดภัย', isCorrect: true },
      { optionText: 'ระดับ 2 — แค่ไม่สุภาพ', isCorrect: false },
      { optionText: 'พฤติกรรมปกติของมิตรภาพ', isCorrect: false },
    ],
  },
  {
    word: 'ตามล่า', lang: 'th',
    questionText: 'ถ้าสงสัยว่ามีคนสะกดรอยตาม ต้องทำอะไร?',
    questionType: 'response',
    options: [
      { optionText: 'บอกผู้ใหญ่ทันที และอย่าเผชิญหน้าคนเดียว', isCorrect: true },
      { optionText: 'เผชิญหน้าและถามตรงๆ', isCorrect: false },
      { optionText: 'รอให้แน่ใจก่อนจึงค่อยบอกใคร', isCorrect: false },
    ],
  },

  // ─── TH Level 5: ขู่กรรโชก ────────────────────────────────────────────────────
  {
    word: 'ขู่กรรโชก', lang: 'th',
    questionText: 'การขู่กรรโชกทรัพย์เป็น...',
    questionType: 'severity',
    options: [
      { optionText: 'ระดับ 5 — อาชญากรรมร้ายแรง มีโทษตามกฎหมาย', isCorrect: true },
      { optionText: 'ระดับ 3 — พฤติกรรมหยาบคายทั่วไป', isCorrect: false },
      { optionText: 'วิธีแก้ปัญหาที่ยอมรับได้', isCorrect: false },
    ],
  },
  {
    word: 'ขู่กรรโชก', lang: 'th',
    questionText: 'ถ้าถูกขู่กรรโชก ควรทำอะไร?',
    questionType: 'response',
    options: [
      { optionText: 'ไม่ยอมจ่าย บอกผู้ใหญ่ และแจ้งตำรวจ', isCorrect: true },
      { optionText: 'จ่ายเงินตามที่ขู่เพื่อให้เลิกรบกวน', isCorrect: false },
      { optionText: 'เจรจาต่อรองกับคนขู่', isCorrect: false },
    ],
  },

  // ─── TH Level 5: ทำโทษ ────────────────────────────────────────────────────────
  {
    word: 'ทำโทษ', lang: 'th',
    questionText: 'การขู่ว่า "จะทำโทษแก" เพื่อบังคับให้ทำตาม เป็น...',
    questionType: 'severity',
    options: [
      { optionText: 'การคุกคามที่ยอมรับไม่ได้ อยู่ในระดับ 5', isCorrect: true },
      { optionText: 'การวางกฎเกณฑ์ที่สมเหตุสมผล', isCorrect: false },
      { optionText: 'ระดับ 2 — แค่ไม่สุภาพ', isCorrect: false },
    ],
  },
  {
    word: 'ทำโทษ', lang: 'th',
    questionText: 'ถ้าถูกขู่ว่าจะถูกทำโทษหากไม่ทำตาม ควรทำอะไร?',
    questionType: 'response',
    options: [
      { optionText: 'ออกจากสถานการณ์อย่างปลอดภัยและบอกผู้ใหญ่', isCorrect: true },
      { optionText: 'ยอมทำตามเพื่อความปลอดภัย', isCorrect: false },
      { optionText: 'ขู่กลับ', isCorrect: false },
    ],
  },
]
