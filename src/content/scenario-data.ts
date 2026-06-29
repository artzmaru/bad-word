// 8 scenarios × 4 choices each — seed via: npm run seed:scenarios
export interface ScenarioChoiceData {
  choiceText: string
  choiceTextEn: string
  isGoodChoice: boolean
  feedbackTh: string
  feedbackEn: string
  xpReward: number
}

export interface ScenarioData {
  id: string
  titleTh: string
  titleEn: string
  descriptionTh: string
  descriptionEn: string
  imageSituation: string
  category: string
  difficultyLevel: number
  choices: ScenarioChoiceData[]
}

export const scenarioData: ScenarioData[] = [
  // ─── Scenario 1: Gaming — คนในเกมแพ้ ───────────────────────────────────────
  {
    id: 'gaming-loser-1',
    titleTh: 'เกมออนไลน์: ทีมแพ้',
    titleEn: 'Online Game: Team Loses',
    descriptionTh: 'เพื่อนในทีมเกมทำผิดพลาดและทำให้ทีมแพ้ เขาเสียใจมากอยู่แล้ว เธอจะพูดอะไร?',
    descriptionEn: 'Your teammate made a mistake and your team lost. They already feel bad. What do you say?',
    imageSituation: 'gaming',
    category: 'gaming',
    difficultyLevel: 2,
    choices: [
      {
        choiceText: '"ไม่เป็นไร ครั้งหน้าทำได้แน่!"',
        choiceTextEn: '"It\'s okay, we\'ll get them next time!"',
        isGoodChoice: true,
        feedbackTh: 'ดีมาก! การให้กำลังใจทำให้ทีมรู้สึกดีและอยากพยายามต่อ',
        feedbackEn: 'Great! Encouragement helps the team feel better and try again.',
        xpReward: 30,
      },
      {
        choiceText: '"ขี้แพ้! เพราะแกทีมถึงแพ้!"',
        choiceTextEn: '"Loser! It\'s your fault we lost!"',
        isGoodChoice: false,
        feedbackTh: 'ไม่ดีเลย คำว่า "ขี้แพ้" ทำให้คนรู้สึกแย่มากและไม่อยากเล่นอีก',
        feedbackEn: 'Not good. Calling someone a "loser" makes them feel terrible and not want to play again.',
        xpReward: 0,
      },
      {
        choiceText: '"โอเค เกมต่อไปเราวางแผนกันใหม่นะ"',
        choiceTextEn: '"Okay, let\'s plan better for the next game."',
        isGoodChoice: true,
        feedbackTh: 'ดีมาก! มองไปข้างหน้าและช่วยกันแก้ปัญหา',
        feedbackEn: 'Nice! Moving forward together and solving the problem.',
        xpReward: 25,
      },
      {
        choiceText: '"โง่มาก ทำไมทำแบบนั้น!"',
        choiceTextEn: '"So stupid, why did you do that!"',
        isGoodChoice: false,
        feedbackTh: 'ไม่ดีเลย คำว่า "โง่" ทำร้ายความรู้สึกและทำลายมิตรภาพ',
        feedbackEn: 'Not good. "Stupid" hurts feelings and destroys friendship.',
        xpReward: 0,
      },
    ],
  },

  // ─── Scenario 2: Gaming — คนในเกมด่าว่า loser ──────────────────────────────
  {
    id: 'gaming-loser-2',
    titleTh: 'เกมออนไลน์: มีคนด่าว่า Loser',
    titleEn: 'Online Game: Someone Calls You a Loser',
    descriptionTh: 'ผู้เล่นคนอื่นในเกมด่าว่า "Loser! แกห่วยมาก!" เธอรู้สึกเจ็บปวด จะทำอย่างไร?',
    descriptionEn: 'Another player calls you "Loser! You\'re terrible!" You feel hurt. What do you do?',
    imageSituation: 'gaming',
    category: 'gaming',
    difficultyLevel: 3,
    choices: [
      {
        choiceText: 'รีพอร์ตและบล็อกเขา แล้วเล่นต่อ',
        choiceTextEn: 'Report and block them, then keep playing.',
        isGoodChoice: true,
        feedbackTh: 'ถูกต้อง! การรีพอร์ตและบล็อกช่วยปกป้องตัวเองและคนอื่นจากคนที่ไม่ดี',
        feedbackEn: 'Correct! Reporting and blocking protects yourself and others from toxic players.',
        xpReward: 30,
      },
      {
        choiceText: 'ด่ากลับ "แกต่างหากที่ Loser!"',
        choiceTextEn: 'Insult back: "You\'re the loser!"',
        isGoodChoice: false,
        feedbackTh: 'ไม่ดี การด่ากลับทำให้สถานการณ์แย่ลงและเธอก็จะเป็นคนที่ไม่ดีด้วย',
        feedbackEn: 'Not good. Fighting back makes things worse and makes you toxic too.',
        xpReward: 0,
      },
      {
        choiceText: 'เพิกเฉยและโฟกัสกับเกม',
        choiceTextEn: 'Ignore them and focus on the game.',
        isGoodChoice: true,
        feedbackTh: 'ดี! บางทีการเพิกเฉยก็เป็นวิธีที่ดีที่สุด อย่าปล่อยให้คนแย่ทำลายความสนุก',
        feedbackEn: 'Good! Sometimes ignoring is best. Don\'t let toxic players ruin your fun.',
        xpReward: 20,
      },
      {
        choiceText: 'ออกจากเกมทันทีเพราะโกรธมาก',
        choiceTextEn: 'Quit the game immediately because you\'re too angry.',
        isGoodChoice: false,
        feedbackTh: 'ไม่ดีนัก การออกจากเกมทำให้ทีมเสียเปรียบ ลองรีพอร์ตและเล่นต่อแทน',
        feedbackEn: 'Not ideal. Quitting puts your team at a disadvantage. Try reporting and playing on instead.',
        xpReward: 5,
      },
    ],
  },

  // ─── Scenario 3: School — เพื่อนถูกล้อเรื่องรูปร่าง "fat" ─────────────────
  {
    id: 'school-fat-1',
    titleTh: 'ที่โรงเรียน: เพื่อนถูกล้อเรื่องรูปร่าง',
    titleEn: 'At School: Friend Gets Teased About Weight',
    descriptionTh: 'เธอเห็นเพื่อนถูกล้อว่า "อ้วน!" และกำลังร้องไห้ เธอจะทำอะไร?',
    descriptionEn: 'You see your friend being called "fat!" and they start crying. What do you do?',
    imageSituation: 'school',
    category: 'school',
    difficultyLevel: 3,
    choices: [
      {
        choiceText: 'เข้าไปปกป้องเพื่อนและบอกให้หยุดล้อ',
        choiceTextEn: 'Step in to defend your friend and tell the bully to stop.',
        isGoodChoice: true,
        feedbackTh: 'กล้าหาญมาก! การปกป้องเพื่อนแสดงให้เห็นว่าเธอเป็นเพื่อนที่ดีและช่วยลดการรังแก',
        feedbackEn: 'Very brave! Defending your friend shows you\'re a good friend and helps stop bullying.',
        xpReward: 35,
      },
      {
        choiceText: 'แกล้งทำเป็นไม่เห็นเพราะกลัวว่าจะถูกล้อด้วย',
        choiceTextEn: 'Pretend not to see because you\'re afraid of being teased too.',
        isGoodChoice: false,
        feedbackTh: 'เข้าใจที่กลัว แต่การนิ่งเฉยทำให้ผู้รังแกรู้สึกว่าทำได้ต่อไป เพื่อนเธอต้องการความช่วยเหลือ',
        feedbackEn: 'Understandable fear, but staying silent lets the bully continue. Your friend needs help.',
        xpReward: 0,
      },
      {
        choiceText: 'บอกครูหรือผู้ใหญ่ทันที',
        choiceTextEn: 'Tell a teacher or adult immediately.',
        isGoodChoice: true,
        feedbackTh: 'ดีมาก! การบอกครูเป็นวิธีที่ถูกต้องในการหยุดการรังแก ไม่ใช่การฟ้อง แต่เป็นการปกป้อง',
        feedbackEn: 'Great! Telling a teacher is the right way to stop bullying. It\'s not tattling, it\'s protecting.',
        xpReward: 30,
      },
      {
        choiceText: 'หัวเราะไปกับกลุ่มที่ล้อ',
        choiceTextEn: 'Laugh along with the group that\'s teasing.',
        isGoodChoice: false,
        feedbackTh: 'ไม่ดีเลย การหัวเราะด้วยทำให้เพื่อนรู้สึกแย่มากขึ้นและเธอก็กลายเป็นส่วนหนึ่งของการรังแก',
        feedbackEn: 'Not good at all. Laughing along makes your friend feel worse and makes you part of the bullying.',
        xpReward: 0,
      },
    ],
  },

  // ─── Scenario 4: Online — Cyberbullying ─────────────────────────────────────
  {
    id: 'online-cyberbully-1',
    titleTh: 'ออนไลน์: พบการรังแกในโซเชียล',
    titleEn: 'Online: Seeing Cyberbullying on Social Media',
    descriptionTh: 'เธอเห็นในกลุ่มไลน์มีคนโพสต์รูปของเพื่อนคนหนึ่งพร้อมคำดูถูกและทุกคนกำลังคอมเมนต์ด่า เธอจะทำอะไร?',
    descriptionEn: 'In a LINE group, someone posts a humiliating photo of a classmate and everyone is commenting mean things. What do you do?',
    imageSituation: 'online',
    category: 'online',
    difficultyLevel: 4,
    choices: [
      {
        choiceText: 'แจ้งเตือนเพื่อนที่ถูกโพสต์และบอกให้เขารายงานโพสต์',
        choiceTextEn: 'Warn the friend who was posted about and tell them to report it.',
        isGoodChoice: true,
        feedbackTh: 'ดีมาก! การแจ้งเพื่อนให้รู้และสนับสนุนให้รายงานช่วยได้มาก',
        feedbackEn: 'Great! Warning your friend and encouraging them to report helps a lot.',
        xpReward: 35,
      },
      {
        choiceText: 'คอมเมนต์ดูถูกต่อท้ายเพราะทุกคนก็ทำ',
        choiceTextEn: 'Comment mean things too because everyone else is doing it.',
        isGoodChoice: false,
        feedbackTh: 'ไม่ดีเลย แค่เพราะคนอื่นทำไม่ได้แปลว่ามันถูก การทำแบบนี้คือการรังแกออนไลน์',
        feedbackEn: 'Not good. Just because others are doing it doesn\'t make it right. This is cyberbullying.',
        xpReward: 0,
      },
      {
        choiceText: 'รายงานโพสต์และออกจากกลุ่ม',
        choiceTextEn: 'Report the post and leave the group.',
        isGoodChoice: true,
        feedbackTh: 'ถูกต้อง! การรายงานโพสต์และออกจากกลุ่มที่เป็นพิษเป็นการปกป้องตัวเองและช่วยหยุดการรังแก',
        feedbackEn: 'Correct! Reporting the post and leaving a toxic group protects you and helps stop bullying.',
        xpReward: 30,
      },
      {
        choiceText: 'เงียบ ไม่คอมเมนต์ แต่ก็ไม่ทำอะไร',
        choiceTextEn: 'Stay silent, don\'t comment, but don\'t do anything else either.',
        isGoodChoice: false,
        feedbackTh: 'ดีกว่าคอมเมนต์แย่ๆ แต่การเงียบทำให้การรังแกดำเนินต่อไป ลองรายงานหรือบอกผู้ใหญ่',
        feedbackEn: 'Better than commenting mean things, but silence lets bullying continue. Try reporting or telling an adult.',
        xpReward: 5,
      },
    ],
  },

  // ─── Scenario 5: Online — "I know where you live" ───────────────────────────
  {
    id: 'online-threat-1',
    titleTh: 'ออนไลน์: ได้รับการขู่',
    titleEn: 'Online: Receiving a Threat',
    descriptionTh: 'ในเกมออนไลน์มีคนส่งข้อความว่า "ฉันรู้ว่าแกอยู่ที่ไหน จะไปหาแก!" เธอรู้สึกกลัวมาก จะทำอะไร?',
    descriptionEn: 'In an online game someone messages: "I know where you live, I\'m coming for you!" You feel very scared. What do you do?',
    imageSituation: 'online',
    category: 'online',
    difficultyLevel: 5,
    choices: [
      {
        choiceText: 'บอกพ่อแม่หรือผู้ใหญ่ที่ไว้ใจทันที',
        choiceTextEn: 'Tell a parent or trusted adult immediately.',
        isGoodChoice: true,
        feedbackTh: 'ถูกต้องมาก! การขู่แบบนี้อันตรายมาก ต้องบอกผู้ใหญ่ทันที อย่าเก็บไว้คนเดียว',
        feedbackEn: 'Absolutely correct! This kind of threat is very serious. Tell an adult immediately. Never keep it to yourself.',
        xpReward: 40,
      },
      {
        choiceText: 'ขู่กลับ "ฉันก็รู้ที่อยู่แกเหมือนกัน!"',
        choiceTextEn: 'Threaten back: "I know where you live too!"',
        isGoodChoice: false,
        feedbackTh: 'ไม่ดีเลย การขู่กลับทำให้สถานการณ์อันตรายยิ่งขึ้น บอกผู้ใหญ่แทน',
        feedbackEn: 'Not good at all. Threatening back escalates the danger. Tell an adult instead.',
        xpReward: 0,
      },
      {
        choiceText: 'บล็อกและแสกรีนช็อตเก็บไว้เป็นหลักฐาน',
        choiceTextEn: 'Block and take a screenshot as evidence.',
        isGoodChoice: true,
        feedbackTh: 'ดีมาก! การเก็บหลักฐานและบล็อกเป็นขั้นตอนที่ถูกต้อง แต่ต้องบอกผู้ใหญ่ด้วยนะ',
        feedbackEn: 'Very good! Keeping evidence and blocking are correct steps — but also tell an adult!',
        xpReward: 25,
      },
      {
        choiceText: 'เพิกเฉย มันแค่ล้อเล่นเท่านั้น',
        choiceTextEn: 'Ignore it, it\'s probably just a joke.',
        isGoodChoice: false,
        feedbackTh: 'ไม่ดี การขู่แบบนี้ต้องถือว่าจริงจังเสมอ อย่าเพิกเฉย บอกผู้ใหญ่ทันที',
        feedbackEn: 'Not good. Always take threats seriously. Never ignore them. Tell an adult immediately.',
        xpReward: 0,
      },
    ],
  },

  // ─── Scenario 6: Home — "I hate you" ────────────────────────────────────────
  {
    id: 'home-hate-1',
    titleTh: 'ที่บ้าน: พูดว่าเกลียดพ่อแม่',
    titleEn: 'At Home: Saying "I hate you" to Parents',
    descriptionTh: 'พ่อแม่ไม่อนุญาตให้เล่นเกม เธอโกรธมากและอยากพูดว่า "เกลียด!" ออกไป จะทำอย่างไร?',
    descriptionEn: 'Your parents won\'t let you play games. You\'re very angry and want to say "I hate you!" What do you do?',
    imageSituation: 'home',
    category: 'home',
    difficultyLevel: 3,
    choices: [
      {
        choiceText: 'บอกว่า "หนูโกรธมากตอนนี้ ขอเวลาคนเดียวสักครู่นะคะ/ครับ"',
        choiceTextEn: '"I\'m really angry right now. Can I have some time alone?"',
        isGoodChoice: true,
        feedbackTh: 'ยอดเยี่ยม! การบอกความรู้สึกอย่างตรงไปตรงมาและขอเวลาเป็นการจัดการอารมณ์ที่ดีมาก',
        feedbackEn: 'Excellent! Expressing your feelings directly and asking for space is great emotional management.',
        xpReward: 35,
      },
      {
        choiceText: 'ตะโกน "เกลียดพ่อแม่!" แล้วเข้าห้องไปตีประตูดัง',
        choiceTextEn: 'Yell "I hate you!" and slam the door.',
        isGoodChoice: false,
        feedbackTh: 'ไม่ดีเลย คำว่า "เกลียด" ทำร้ายความรู้สึกของพ่อแม่มาก และปัญหาก็ยังไม่ได้รับการแก้ไข',
        feedbackEn: 'Not good. "I hate you" deeply hurts parents, and the problem still isn\'t solved.',
        xpReward: 0,
      },
      {
        choiceText: 'หายใจลึกๆ แล้วถามว่า "หนูขอเล่นได้เมื่อไหร่คะ/ครับ?"',
        choiceTextEn: 'Take a deep breath and ask "When can I play?"',
        isGoodChoice: true,
        feedbackTh: 'ดีมาก! การสงบสติอารมณ์และถามอย่างสุภาพช่วยให้ได้คำตอบที่ดีกว่า',
        feedbackEn: 'Great! Calming down and asking politely gets a better answer.',
        xpReward: 30,
      },
      {
        choiceText: 'นิ่งเงียบและแสดงหน้าบูดแสดงความไม่พอใจ',
        choiceTextEn: 'Stay silent with a pouty face to show disapproval.',
        isGoodChoice: false,
        feedbackTh: 'ไม่ค่อยดี การแสดงหน้าบูดก็เป็นการสื่อความไม่พอใจในทางลบ ลองพูดตรงๆ แทน',
        feedbackEn: 'Not ideal. Sulking is also a negative way to express displeasure. Try talking directly instead.',
        xpReward: 5,
      },
    ],
  },

  // ─── Scenario 7: School — คนด่าว่า stupid ──────────────────────────────────
  {
    id: 'school-stupid-1',
    titleTh: 'ที่โรงเรียน: ถูกเรียกว่าโง่ในชั้นเรียน',
    titleEn: 'At School: Called Stupid in Class',
    descriptionTh: 'เธอตอบคำถามในชั้นเรียนผิด เพื่อนคนหนึ่งพูดดังๆ ว่า "โง่มากเลย!" ทุกคนหัวเราะ เธอรู้สึกอับอายมาก จะทำอะไร?',
    descriptionEn: 'You answer a question wrong in class. A classmate says loudly "So stupid!" Everyone laughs. You feel very embarrassed. What do you do?',
    imageSituation: 'school',
    category: 'school',
    difficultyLevel: 3,
    choices: [
      {
        choiceText: 'บอกครูว่าเพื่อนพูดไม่ดีและทำให้อับอาย',
        choiceTextEn: 'Tell the teacher that a classmate said something unkind and embarrassed you.',
        isGoodChoice: true,
        feedbackTh: 'ถูกต้อง! ครูควรรู้เมื่อมีคนพูดไม่ดีในชั้นเรียน เธอไม่ได้ทำอะไรผิด',
        feedbackEn: 'Correct! Teachers should know when someone is unkind in class. You did nothing wrong.',
        xpReward: 30,
      },
      {
        choiceText: 'ด่ากลับว่า "แกต่างหากที่โง่!"',
        choiceTextEn: 'Insult back: "You\'re the stupid one!"',
        isGoodChoice: false,
        feedbackTh: 'ไม่ดี การด่ากลับทำให้ปัญหาใหญ่ขึ้นและเธออาจจะถูกตำหนิด้วย',
        feedbackEn: 'Not good. Fighting back escalates the problem and you might get in trouble too.',
        xpReward: 0,
      },
      {
        choiceText: 'พูดอย่างสงบว่า "ไม่โอเคที่จะพูดแบบนั้น"',
        choiceTextEn: 'Calmly say "It\'s not okay to say that."',
        isGoodChoice: true,
        feedbackTh: 'กล้าหาญและดีมาก! การพูดตรงๆ ว่าไม่โอเคช่วยหยุดพฤติกรรมแย่ๆ',
        feedbackEn: 'Brave and great! Calmly saying it\'s not okay helps stop the bad behavior.',
        xpReward: 35,
      },
      {
        choiceText: 'เก็บความรู้สึกไว้คนเดียวและพยายามลืมมัน',
        choiceTextEn: 'Keep the feelings to yourself and try to forget it.',
        isGoodChoice: false,
        feedbackTh: 'เข้าใจที่อยากลืม แต่การเก็บไว้คนเดียวทำให้รู้สึกแย่ยิ่งขึ้น ลองคุยกับคนที่ไว้ใจ',
        feedbackEn: 'Understandable wanting to forget, but keeping it inside makes it worse. Talk to someone you trust.',
        xpReward: 5,
      },
    ],
  },

  // ─── Scenario 8: Online — กลุ่มไลน์ส่งต่อรูปล้อเลียน ───────────────────────
  {
    id: 'online-shame-1',
    titleTh: 'ออนไลน์: ถูกส่งรูปล้อเลียน',
    titleEn: 'Online: Humiliating Photo Shared',
    descriptionTh: 'มีคนส่งรูปที่น่าอับอายของเธอในกลุ่มไลน์ และขอให้ทุกคนส่งต่อ เธอจะทำอะไร?',
    descriptionEn: 'Someone shares an embarrassing photo of you in a LINE group and asks everyone to forward it. What do you do?',
    imageSituation: 'online',
    category: 'online',
    difficultyLevel: 4,
    choices: [
      {
        choiceText: 'บอกพ่อแม่ทันทีและแสกรีนช็อตเป็นหลักฐาน',
        choiceTextEn: 'Tell parents immediately and screenshot it as evidence.',
        isGoodChoice: true,
        feedbackTh: 'ถูกต้องมาก! การแจ้งผู้ใหญ่และเก็บหลักฐานเป็นสิ่งสำคัญที่สุดในกรณีนี้',
        feedbackEn: 'Absolutely correct! Telling adults and keeping evidence is the most important thing here.',
        xpReward: 40,
      },
      {
        choiceText: 'โพสต์รูปน่าอับอายของคนที่แชร์รูปแก้แค้น',
        choiceTextEn: 'Post an embarrassing photo of the person who shared it for revenge.',
        isGoodChoice: false,
        feedbackTh: 'ไม่ดีเลย การแก้แค้นด้วยวิธีเดียวกันทำให้ปัญหาใหญ่ขึ้นและเธอก็ผิดด้วย',
        feedbackEn: 'Not good. Retaliating the same way escalates the problem and makes you wrong too.',
        xpReward: 0,
      },
      {
        choiceText: 'รายงานโพสต์และขอให้เพื่อนที่ไว้ใจช่วยแจ้งด้วย',
        choiceTextEn: 'Report the post and ask trusted friends to report it too.',
        isGoodChoice: true,
        feedbackTh: 'ดีมาก! การรายงานพร้อมกันหลายคนช่วยให้โพสต์ถูกลบเร็วขึ้น',
        feedbackEn: 'Very good! Multiple reports help get the post removed faster.',
        xpReward: 30,
      },
      {
        choiceText: 'ส่งข้อความขอร้องทุกคนในกลุ่มอย่าส่งต่อ',
        choiceTextEn: 'Message everyone in the group asking them not to forward it.',
        isGoodChoice: false,
        feedbackTh: 'เจตนาดี แต่วิธีนี้อาจทำให้คนสนใจมากขึ้น ดีกว่าคือรายงานโพสต์และบอกผู้ใหญ่',
        feedbackEn: 'Good intention, but this might draw more attention. Better to report the post and tell adults.',
        xpReward: 10,
      },
    ],
  },
]
