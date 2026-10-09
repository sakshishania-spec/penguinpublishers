/* ---------------- Data (placeholder catalog) ---------------- */
/* Mood shelf: real books from the penguin.co.in homepage lists (Instagram made me buy it, Fiction Addiction, Teen Reads,
   Books for young readers, Transportive translations). Descriptions are written in our own words from each book's page;
   mood tags (m) are our editorial picks. c = fallback colours if a cover fails to load. */
const BOOKS = [
  {t:"The Let Them Theory",a:"Mel Robbins",g:"Self-help",m:["inspiring"],c:["#0f7a3d","#4cd07d"],img:"assets/moods/let-them-theory.jpg",
   d:"Two words, “Let them”, to stop spending your energy on other people’s opinions and drama, and take back control of your own life."},
  {t:"The Anxious Generation",a:"Jonathan Haidt",g:"Non-fiction",m:["mind-bending","inspiring"],c:["#0b1d33","#3a6ea5"],img:"assets/moods/anxious-generation.jpg",
   d:"How the shift from a play-based to a phone-based childhood between 2010 and 2015 rewired adolescence and fuelled a rise in teenage anxiety."},
  {t:"It's Okay . . .",a:"Jaya Kishori",g:"Spirituality · Self-help",m:["cozy","inspiring"],c:["#6b7f8f","#c9d3da"],img:"assets/moods/its-okay.jpg",
   d:"Spiritual speaker Jaya Kishori’s gentle reminder that everyone has problems, with advice for handling stress and living a more meaningful life."},
  {t:"The Correspondent",a:"Virginia Evans",g:"Literary fiction",m:["emotional","cozy"],c:["#d9656f","#f4c7c3"],img:"assets/moods/the-correspondent.jpg",
   d:"Told entirely in letters: Sybil Van Antwerp, a 73-year-old retired lawyer and keen gardener, writes to family, authors, neighbours and strangers about friendship, grief and second chances."},
  {t:"The Fourth Girl",a:"Arefa Tehsin",g:"Mystery thriller",m:["thrilling","dark"],c:["#1f1a17","#c0392b"],img:"assets/moods/the-fourth-girl.jpg",
   d:"Twenty years after a mysterious disappearance, three survivors are reunited at a funeral in Colombo, just as a journalist starts asking what happened to the fourth girl."},
  {t:"One of Us Is Lying",a:"Karen M. McManus",g:"Young adult thriller",m:["thrilling"],c:["#2b2d6e","#e0487a"],img:"assets/moods/one-of-us-is-lying.jpg",
   d:"Simon, creator of Bayview High’s gossip app, dies the day before he can post his classmates’ secrets, and everyone who was in detention with him is a suspect."},
  {t:"The Inheritance Games",a:"Jennifer Lynn Barnes",g:"Young adult mystery",m:["adventurous","thrilling"],c:["#123c2c","#c9a14a"],img:"assets/moods/inheritance-games.jpg",
   d:"An eccentric billionaire leaves almost his entire fortune to Avery, a stranger. To find out why, she moves into his mansion of puzzles and codes, and into a deadly game with his family."},
  {t:"The Vegetarian",a:"Han Kang",g:"Fiction in translation",m:["dark","mind-bending"],c:["#6b1a4a","#e05aa0"],img:"assets/moods/the-vegetarian.jpg",
   d:"After recurring nightmares, Yeong-hye stops eating meat, and her quiet rebellion shocks her family and spirals into something stranger. A disturbing, beautiful novel from the Nobel laureate."},
  {t:"At Night All Blood Is Black",a:"David Diop",g:"Fiction in translation",m:["dark","emotional"],c:["#0f5b63","#2aa3a8"],img:"assets/moods/at-night-all-blood-is-black.jpg",
   d:"A Senegalese soldier fighting for France in the First World War loses his closest friend in the trenches and slides towards violence and madness. International Booker Prize winner."},
  {t:"My First Sudha Murty Stories",a:"Sudha Murty",g:"Children’s · Ages 5+",m:["kids","cozy"],c:["#1e6fb8","#8cc8f0"],img:"assets/moods/sudha-murty-stories.jpg",
   d:"A full-colour treasury of Sudha Murty’s best-loved stories, full of magic, memorable characters and warmth, for children just discovering the joy of reading."},
  {t:"Wild Next Door",a:"Arefa Tehsin",g:"Children’s nature",m:["kids","adventurous"],c:["#e0b21a","#f7e27a"],img:"assets/moods/wild-next-door.jpg",
   d:"Grab a magnifying glass: a guide to the surprising creatures in your own home and garden, from hornets and termites to fireflies, skinks and a fish that seems to walk."},
  {t:"The Naga Warriors 2",a:"Akshat Gupta",g:"Mythological fiction",m:["adventurous","dark"],c:["#6d1414","#d4572a"],img:"assets/moods/naga-warriors-2.jpg",
   d:"The battle for Gokul: warrior sadhus stand against Ahmad Shah Abdali as Krishna, the mysterious Adhiraj and the nameless Naga face their fate. From the author of The Hidden Hindu."},
];
const MOODS = [["all","All"],["cozy","☕ Cozy"],["thrilling","⚡ Thrilling"],["emotional","💧 Emotional"],["adventurous","🧭 Adventurous"],["mind-bending","🌀 Mind-bending"],["inspiring","✨ Inspiring"],["dark","🌒 Dark"],["kids","🐧 For kids"]];
const GENRES = ["Fiction","Mystery","Romance","Poetry","Classics","Science Fiction","Memoir","Young Readers","History","Fantasy"];
const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const cover = (b, cls="cover") => b.img ? `<div class="${cls} real" style="background:${b.c[0]}"><img src="${b.img}" alt="${b.t.replace(/"/g,'&quot;')} by ${b.a}" loading="lazy" /></div>` : `<div class="${cls}" style="background:linear-gradient(160deg,${b.c[0]},${b.c[0]} 55%,${b.c[1]})">
  <small>${b.g}</small><span class="motif" style="background:${b.c[1]}"></span><h4>${b.t}</h4><small>${b.a}</small></div>`;

/* ---------------- Loader ---------------- */
let revealed=false;
function revealPage(){ if(revealed) return; revealed=true;
  document.getElementById('loader').classList.add('done');
  document.body.classList.add('ready'); }
if(document.readyState==='complete') setTimeout(revealPage,prefersReduced?0:900);
else addEventListener('load',()=>setTimeout(revealPage,prefersReduced?0:900));
setTimeout(revealPage,2500); // never block on slow fonts/network

/* shared maths helpers */
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)), lerp=(a,b,t)=>a+(b-a)*t;
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;

/* ---------------- First fold v2 (Figma) ---------------- */
const fhHead=document.getElementById('hdr'); let fhLast=0;
const fhMenu=document.getElementById('fhMenu'), navItems=[...fhHead.querySelectorAll('.nh-item')];
const setMenu=open=>{fhHead.classList.toggle('menu-open',open); fhMenu.setAttribute('aria-expanded',open);};
const closeDropdowns=except=>navItems.forEach(it=>{if(it!==except){it.classList.remove('open'); it.firstElementChild.setAttribute('aria-expanded','false');}});
fhMenu.addEventListener('click',()=>setMenu(!fhHead.classList.contains('menu-open')));
navItems.forEach(it=>it.firstElementChild.addEventListener('click',()=>{ // tap/click opens a dropdown (hover works too)
  const open=!it.classList.contains('open'); closeDropdowns(it); it.classList.toggle('open',open); it.firstElementChild.setAttribute('aria-expanded',open);}));
document.getElementById('fhNav').addEventListener('click',e=>{if(e.target.closest('a')){setMenu(false); closeDropdowns();}});
document.addEventListener('click',e=>{if(!e.target.closest('#hdr')){setMenu(false); closeDropdowns();}});
addEventListener('keydown',e=>{if(e.key==='Escape'){setMenu(false); closeDropdowns();}});
// header: soft shadow once scrolled; slides away while scrolling down, returns when scrolling up
addEventListener('scroll',()=>{const y=scrollY; fhHead.classList.toggle('scrolled',y>10);
  fhHead.classList.toggle('hide',y>fhLast&&y>300&&!fhHead.classList.contains('menu-open')); fhLast=y; setMenu(false); closeDropdowns();},{passive:true});
document.getElementById('nhSearch').onclick=()=>{scrollTo({top:0,behavior:'smooth'}); setTimeout(()=>document.getElementById('aiSearch').focus({preventScroll:true}),450);};
// avatar → reader profile menu
const pmBtn=document.getElementById('nhAvatar'), pm=document.getElementById('pmMenu');
function setPm(open){ pm.classList.toggle('open',open); pmBtn.setAttribute('aria-expanded',open); if(open){ renderPm(); setTimeout(()=>pm.querySelector('button').focus({preventScroll:true}),60);} }
pmBtn.onclick=e=>{ e.stopPropagation(); setPm(!pm.classList.contains('open')); };
document.addEventListener('click',e=>{ if(!e.target.closest('.pm-wrap')) setPm(false); });
addEventListener('keydown',e=>{ if(e.key==='Escape'&&pm.classList.contains('open')){ setPm(false); pmBtn.focus(); } });
pm.addEventListener('click',e=>{ const b=e.target.closest('[data-pm]'); if(!b) return; const a=b.dataset.pm;
  if(a==='read'){ autoRead=!autoRead; const t=document.getElementById('autoRead'); t.setAttribute('aria-pressed',autoRead); t.textContent=autoRead?'🔊':'🔈';
    toast2(autoRead?'Penguin will read its answers aloud.':'Read-aloud is off.'); if(!autoRead) stopSpeech(); return renderPm(); }
  setPm(false);
  if(a==='chat') openAi();
  if(a==='profile'){ openAi(); panel.classList.add('side-open'); }
  if(a==='shortlist'){ openAi(); ask('Show my shortlist'); }
  if(a==='picks'){ openAi(); ask('Show my picks'); }
  if(a==='clear'){ profile={moods:{},loved:[],forWhom:[],prefs:[],shortlist:[],chose:[],asks:0}; saveProfile(); toast2('Your reader profile has been cleared from this browser.'); } });
// book fan: gentle parallax with the mouse
const fhero=document.getElementById('fhero'), fan=document.getElementById('fhFan');
fhero.addEventListener('mousemove',e=>{fan.style.translate=`${(e.clientX/innerWidth-.5)*-24}px 0`;});
fhero.addEventListener('mouseleave',()=>fan.style.translate='');

/* ---------------- Book popup: click a hero cover → 3D book opens on an AI summary ----------------
   Spreads: 0 closed cover · 1 inside cover | AI summary · 2 themes | is it for me · 3 read-alikes | ask Penguin.
   Summary copy below is demo content; in production it comes from the AI + catalogue API. */
const HERO=[
 {t:'Riley Dare: Slightly Witchy Sleuth',short:'Riley Dare',a:'M.K. England',g:'Middle-grade mystery',line:'An escape-room mystery with a flicker of magic.',
  sum:"Riley Dare loves puzzles and helps run her aunt's escape room, Level Up, adding a flicker of her own magic. When a famous children's mystery author vanishes during a room themed on the town's biggest unsolved heist, and a ghost may have been spotted, Riley and her friends set out to link the disappearance to a crime from twelve years ago.",
  th:[['Mystery',90],['Puzzles',85],['Friendship',80],['Magic',65]],md:['playful','curious','cozy'],
  yes:['you love escape rooms and puzzles','you like mysteries with a little magic','you want a fun, twisty read for young readers'],no:'you want a dark, grown-up crime novel',m:94,al:[4,2,5]},
 {t:'The Accidental Protector',a:'Amanda McKinney',g:'Romantic suspense',line:'Romantic suspense at a remote security compound.',
  sum:"After a brutal attack, prosecutor Niki Avery goes into hiding at a remote security compound run by Gage Steele, a former Marine who never wanted to take over his late father's firm. As questions about his father's death surface and danger finds Niki again, Gage has to decide how close he can let himself get to the woman he's protecting.",
  th:[['Romance',90],['Suspense',85],['Protection',80],['Family secrets',75]],md:['romantic','tense','dramatic'],
  yes:['you love romantic suspense','you like a brooding protector hero','you enjoy series you can binge'],no:'you want a slow, quiet literary read',m:87,al:[3,6,5]},
 {t:'God Save the Dork',a:'Sidin Vadukut',g:'Humour',line:'Corporate comedy, now with jet lag.',
  sum:"Management consultant Robin 'Einstein' Varghese is sent to London to work on the Lederman account, and very little goes to plan: confusing pay, a colleague who sends mixed signals, museums that seem determined to defeat him, and a client threatening to pull the plug. The second book in Sidin Vadukut's comic Dork trilogy.",
  th:[['Office comedy',90],['Culture clash',80],['Ambition',70],['Awkward romance',60]],md:['funny','light','satirical'],
  yes:['you enjoy workplace comedy','you liked the first Dork book','you want something light for the commute'],no:'you want a serious literary novel',m:91,al:[4,6,0]},
 {t:'What We Did to Survive',a:'Megan Lally',g:'Young adult thriller',line:'A spring-break sail turns into a fight to survive.',
  sum:"Hannah is on spring break in Mexico with her best friend Emmy's family, including Emmy's older brother Jackson, her long-time crush. When Emmy's wealthy new boyfriend charters a sailboat for their last day, theirs is the only boat leaving the marina as a storm rolls in, and the danger on board may be as deadly as the weather.",
  th:[['Suspense',90],['Survival',90],['Secrets',80],['Friendship',75]],md:['thrilling','tense','dark'],
  yes:['you like fast young adult thrillers','you enjoy stories set at sea','you want a proper page-turner'],no:'peril at sea makes you anxious',m:89,al:[1,6,0]},
 {t:'Nirmala & Normala',a:'Sowmya Rajendran',tr:'Illustrated by Niveditha Subramaniam',g:'Graphic novel · Satire',line:'A graphic-novel satire of film clichés.',
  sum:"Twins separated at birth grow up very differently: one becomes a film heroine, the other an ordinary woman. Sowmya Rajendran's graphic novel, illustrated by Niveditha Subramaniam, uses the setup to skewer the clichés of commercial cinema and to call out the harassment that films often pass off as romance.",
  th:[['Satire',90],['Cinema clichés',85],['Gender',80],['Sisterhood',65]],md:['witty','sharp','playful'],
  yes:['you love Indian cinema, and laughing at it','you enjoy graphic novels','you like satire with something to say'],no:'you want a straight-faced romance',m:92,al:[2,6,0]},
 {t:'The Hidden Hindu',a:'Akshat Gupta',g:'Mythological thriller',line:'Hindu mythology meets a modern thriller.',
  sum:"Twenty-one-year-old Prithvi is searching for Om Shastri, a mysterious aghori held and questioned at a high-tech facility on an isolated island. Under hypnosis, Om claims to have lived through all four yugas and taken part in the Ramayana and the Mahabharata, and to be seeking the other immortals. The first book in Akshat Gupta's trilogy.",
  th:[['Mythology',95],['Immortality',85],['Mystery',80],['Adventure',80]],md:['mind-bending','adventurous','epic'],
  yes:['you love mythology retold as a thriller','you enjoy series with big reveals','you like mysteries rooted in the past'],no:'you prefer strictly realistic fiction',m:93,al:[6,3,0]},
 {t:'Mumbai Confidential',a:'Saurav Mohapatra & Vivek Shinde',g:'Graphic novel · Crime noir',line:'Hard-boiled Mumbai noir in graphic-novel form.',
  sum:"Arjun Kadam was a rising star in Mumbai's encounter squad until the death of his wife sent him spiralling into depression and addiction. A hit-and-run leaves him in a month-long coma, and what follows is a hard-boiled story of crime, punishment and redemption in the city's underbelly, told in graphic-novel form.",
  th:[['Crime',90],['City noir',90],['Redemption',80],['Corruption',75]],md:['dark','gritty','intense'],
  yes:['you like hard-boiled crime stories','you enjoy graphic novels for adults','you want Mumbai at its grittiest'],no:'you want something light or family-friendly',m:88,al:[5,3,1]}
];
HERO.push(
 {t:'Rich Dad Poor Dad',a:'Robert T. Kiyosaki',g:'Personal finance',line:'The classic that turned money lessons into a story.',
  sum:"Robert Kiyosaki grew up learning from two father figures: his own highly educated but financially struggling father, and his best friend's father, a self-made businessman. Contrasting their advice, he makes the case for financial literacy: knowing the difference between assets and liabilities, and making money work for you instead of working for money.",
  th:[['Money mindset',90],['Financial literacy',90],['Entrepreneurship',75],['Family lessons',70]],md:['practical','motivating','accessible'],
  yes:["you're new to personal finance",'you like big ideas explained through stories','you want to rethink how you earn and spend'],no:'you want a detailed, technical investing manual',m:90,al:[8,2,5]},
 {t:'Build an Epic Career',a:'Ankur Warikoo',g:'Career · Penguin Business',line:'A practical career guide for Gen Z and millennials.',
  sum:"Ankur Warikoo argues that the world of work has changed while most career advice hasn't. Written for Gen Z and millennials, the book helps you define what success means to you and build a career with money, growth, fulfilment and purpose, from the bestselling author of Do Epic Sh*t and Make Epic Money.",
  th:[['Career growth',90],['Self-reflection',80],['Purpose',80],['Money',75]],md:['practical','motivating','modern'],
  yes:["you're starting out or switching careers",'you like actionable, bite-sized advice','you enjoyed Do Epic Sh*t'],no:'you want a narrative or a novel',m:92,al:[7,2,5]});
HERO.forEach((b,i)=>b.img=`assets/v2/cover-${i+1}.png`);
/* Penguin India "All-time bestsellers" (penguin.co.in homepage). Summaries are written in our own words from each
   book's page on penguin.co.in; The Courage to Be Disliked has no description there, so its copy is general. */
const BEST=[
 {slug:'atomic-habits',t:'Atomic Habits',a:'James Clear',g:'Self-help',line:'Why tiny daily changes add up to big results.',
  sum:"Habits expert James Clear argues that lasting change doesn't come from one giant leap but from the compound effect of many small choices. He explains how tiny routines grow into life-changing results, with practical tools such as habit stacking and the two-minute rule, backed by psychology and neuroscience.",
  th:[['Habits',95],['Self-improvement',90],['Productivity',80],['Psychology',70]],md:['practical','motivating','clear'],
  yes:['you want a system, not just motivation','you like science-backed, practical advice','you keep starting habits and dropping them'],no:'you want a story rather than a guide',m:95,col:'#b8913f'},
 {slug:'ikigai',t:'Ikigai',a:'Héctor García & Francesc Miralles',g:'Wellbeing',line:'The Japanese idea of a reason to get up in the morning.',
  sum:"Ikigai is the Japanese word for a reason to live: the point where your needs, passions, skills and sense of purpose meet. The book explores how finding it is linked to a longer, happier life, and helps you work out what your own ikigai might be.",
  th:[['Purpose',95],['Wellbeing',85],['Longevity',75],['Japanese culture',70]],md:['calm','reflective','uplifting'],
  yes:['you are looking for more meaning day to day','you like short, gentle reads','you are curious about Japanese ideas of wellbeing'],no:'you want a detailed, step-by-step programme',m:92,col:'#7fa6bd'},
 {slug:'heart-lamp',t:'Heart Lamp',a:'Banu Mushtaq',tr:'Translated from the Kannada by Deepa Bhasthi',g:'Short stories · In translation',line:'Stories of women’s everyday lives in southern India.',
  sum:"Translated from the Kannada, these stories capture the everyday lives of women and girls in Muslim communities in southern India, drawing on Banu Mushtaq's years as a journalist and lawyer. They are witty, vivid and moving by turns, full of spirited children, bold grandmothers and mothers carrying more than anyone sees.",
  th:[['Women’s lives',95],['Family & community',85],['Faith & power',75],['Resilience',80]],md:['moving','witty','vivid'],
  yes:['you love short stories','you want to read Indian writing in translation','you like fiction with humour and heart'],no:'you want one long, plot-driven novel',m:90,col:'#a3291f'},
 {slug:'can-we-be-strangers-again',t:'Can We Be Strangers Again?',a:'Shrijeet Shandilya',g:'Romance',line:'Three college friends, one love story, and a betrayal.',
  sum:"Three college friends are bound by laughter, late-night talks and unspoken promises, until two of them fall in love and a betrayal breaks the group apart. As friendships fracture and feelings get tangled, Dev has to decide whether he is willing to risk his heart all over again.",
  th:[['Love',90],['Friendship',85],['Heartbreak',85],['College life',75]],md:['romantic','emotional','bittersweet'],
  yes:['you love college romances','you like stories about friendship and heartbreak','you want an easy, emotional read'],no:'you prefer thrillers or non-fiction',m:88,col:'#7fb3be'},
 {slug:'mother-mary-comes-to-me',t:'Mother Mary Comes to Me',a:'Arundhati Roy',g:'Memoir',line:'Arundhati Roy’s memoir of her mother, and of becoming a writer.',
  sum:"Shaken by the death of the mother she ran away from at eighteen, Arundhati Roy began this memoir: an intimate account of their relationship and of how she became the person and the writer she is, from the author of The God of Small Things.",
  th:[['Mothers & daughters',95],['Memory',85],['Becoming a writer',85],['India',75]],md:['intimate','powerful','reflective'],
  yes:['you loved The God of Small Things','you enjoy literary memoirs','you like writing about family and grief'],no:'you want something light and quick',m:91,col:'#c22a26'},
 {slug:'the-art-of-letting-go',t:'The Art of Letting Go',a:'Nick Trenton',g:'Self-help',line:'Quiet an overthinking mind and find your calm.',
  sum:"If your mind never switches off, this book is about clearing the clutter. Nick Trenton offers psychology-based tips to stop dwelling on the past or worrying about a future that may never happen, manage your self-talk, and get back to a sense of inner peace.",
  th:[['Overthinking',90],['Emotional calm',90],['Self-talk',80],['Mindset',75]],md:['calming','practical','reassuring'],
  yes:['you tend to overthink','you want short, practical exercises','you are working on letting go of the past'],no:'you want a narrative or memoir',m:89,col:'#a8201f'},
 {slug:'thank-you-for-leaving',t:'Thank You for Leaving',a:'Rithvik Singh',g:'Poetry',line:'Poems for people who feel everything deeply.',
  sum:"A collection of poems for people who feel everything deeply: those who overthink, over-love and still believe in kindness. Rithvik Singh writes about heartbreak, letting go and the privilege of feeling emotions intensely.",
  th:[['Heartbreak',90],['Letting go',85],['Love',85],['Self-worth',75]],md:['tender','emotional','hopeful'],
  yes:['you love modern poetry','you are healing from a breakup','you like short pieces you can dip into'],no:'you want a long narrative',m:87,col:'#7d8b3c'},
 {slug:'the-housemaid',t:'The Housemaid',a:'Freida McFadden',g:'Psychological thriller',line:'A live-in job that looks like a fresh start. It isn’t.',
  sum:"Desperate for a fresh start, Millie takes a live-in job cleaning the Winchesters’ beautiful home and looking after their daughter. But Nina Winchester’s behaviour is strange, her husband seems more broken by the day, and the house is hiding more than it lets on.",
  th:[['Suspense',95],['Secrets',90],['Twists',90],['Domestic drama',80]],md:['thrilling','dark','addictive'],
  yes:['you love twisty page-turners','you enjoy unreliable characters','you want a book you can’t put down'],no:'dark themes aren’t for you right now',m:93,col:'#1f3d6b'},
 {slug:'the-courage-to-be-disliked',t:'The Courage to Be Disliked',a:'Ichiro Kishimi & Fumitake Koga',g:'Self-help · Philosophy',line:'How to free yourself, change your life and find happiness.',
  sum:"Told as a conversation between a philosopher and a young man, this Japanese bestseller introduces the ideas of psychologist Alfred Adler: that we are not defined by our past, and that the courage to live freely, even at the risk of being disliked, is the path to real happiness.",
  th:[['Freedom',90],['Happiness',85],['Relationships',80],['Philosophy',85]],md:['thought-provoking','calm','challenging'],
  yes:['you like ideas explained through dialogue','you worry about what others think','you enjoy philosophy made practical'],no:'you want quick tips rather than big ideas',m:90,col:'#c1121f'},
 {slug:'12-rules-for-life',t:'12 Rules for Life',a:'Jordan B. Peterson',g:'Self-help',line:'Twelve principles for a life of responsibility and meaning.',
  sum:"Clinical psychologist Jordan B. Peterson draws on his practice and on lessons from humanity’s oldest myths and stories to offer twelve principles to live by, aimed at helping readers take responsibility and build a meaningful life.",
  th:[['Responsibility',95],['Meaning',90],['Psychology',80],['Myth & story',70]],md:['direct','challenging','reflective'],
  yes:['you want big-picture life principles','you like psychology mixed with philosophy','you are ready for tough-love advice'],no:'you prefer gentle, feel-good reads',m:86,col:'#8c6d55'}
];
// refresh the two Figma books with details from their penguin.co.in pages
Object.assign(HERO[7],{sum:"Twenty-five years on, Robert Kiyosaki's classic is still ranked the number one personal finance book of all time. Contrasting the money lessons of his two father figures, it makes the case that financial literacy, not income, is what builds wealth, and this anniversary edition adds updates for today's world.",
  line:'Still the number one personal finance book of all time.'});
Object.assign(HERO[8],{sum:"From the day we're born we're told to settle: finish college, find a job, get married, buy the house. Ankur Warikoo speaks to readers who are scared of settling for the wrong thing, with a practical guide to building a career with money, growth, fulfilment and purpose.",
  line:'For everyone who is scared of settling for the wrong thing.'});
const BEST_AT=HERO.length;
BEST.forEach(b=>HERO.push({...b,img:`assets/bestsellers/${b.slug}.jpg`}));
// read-alikes within the bestsellers
const BI=s=>BEST_AT+BEST.findIndex(b=>b.slug===s);
const ALIKE={'atomic-habits':[7,8,BI('the-courage-to-be-disliked')],'ikigai':[BI('the-art-of-letting-go'),BI('the-courage-to-be-disliked'),BI('atomic-habits')],
 'heart-lamp':[BI('mother-mary-comes-to-me'),BI('thank-you-for-leaving'),BI('can-we-be-strangers-again')],'can-we-be-strangers-again':[BI('thank-you-for-leaving'),BI('heart-lamp'),BI('the-housemaid')],
 'mother-mary-comes-to-me':[BI('heart-lamp'),BI('thank-you-for-leaving'),BI('ikigai')],'the-art-of-letting-go':[BI('ikigai'),BI('the-courage-to-be-disliked'),BI('atomic-habits')],
 'thank-you-for-leaving':[BI('can-we-be-strangers-again'),BI('the-art-of-letting-go'),BI('heart-lamp')],'the-housemaid':[BI('can-we-be-strangers-again'),6,3],
 'the-courage-to-be-disliked':[BI('ikigai'),BI('12-rules-for-life'),BI('the-art-of-letting-go')],'12-rules-for-life':[BI('atomic-habits'),BI('the-courage-to-be-disliked'),7]};
BEST.forEach(b=>{HERO[BI(b.slug)].al=ALIKE[b.slug];});
HERO[7].al=[8,BI('atomic-habits'),BI('12-rules-for-life')]; HERO[8].al=[7,BI('atomic-habits'),BI('the-courage-to-be-disliked')];
const BM={el:document.getElementById('bm'),book:document.getElementById('bmBook'),fly:document.getElementById('bmFly'),tilt:document.getElementById('bmTilt'),
  stage:document.getElementById('bmStage'),tabs:document.getElementById('bmTabs'),prev:document.getElementById('bmPrev'),next:document.getElementById('bmNext'),
  i:-1,s:0,side:'R',mobile:false,origin:null,timers:[],busy:false,typed:false,typer:null};
const TABS=['Cover','AI summary','Themes & fit','Read-alikes'];
const SPREADS=TABS.length, LEAVES=3; // cover + 2 content leaves; spread k shows leaf k-1 back | leaf k front (or base)
BM.tabs.innerHTML=TABS.map((t,k)=>`<button type="button" data-k="${k}">${t}</button>`).join('');
const wait=ms=>new Promise(r=>BM.timers.push(setTimeout(r,prefersReduced?0:ms)));
const foot=(n,l)=>`<div class="bm-foot"><span>${l}</span><span>${n}</span></div>`;
function bookHTML(b){
  const leaf=(cls,z,front,back,dur)=>`<div class="bm-leaf ${cls}" style="--z:${z}px${dur?';--dur:'+dur:''}"><div class="bm-face front">${front}</div><div class="bm-face back">${back}</div></div>`;
  return `<div class="bm-board"></div><div class="bm-edge"></div><div class="bm-edge l"></div>
  <div class="bm-base"><div class="bm-paper"><div class="bm-k"><span>✦ Ask Penguin</span></div><h3 class="bm-t sm">Still deciding?</h3>
    <div class="bm-qs">${['Is it good for a book club?','How dark does it get?','What should I read after this?'].map(q=>`<button class="bm-q" type="button" data-q="${q}">${q}</button>`).join('')}</div>
    <form class="bm-ask" id="bmAsk"><input aria-label="Ask Penguin about this book" placeholder="Ask anything about this book…" /><button aria-label="Ask">→</button></form>
    <button class="bm-shelf" type="button">♡ Add to my shelf</button><div class="bm-links"><a href="${linkFor(b).audible}" target="_blank" rel="noopener">🎧 Listen on Audible</a><a href="${linkFor(b).buy}" target="_blank" rel="noopener">Buy on penguin.co.in ↗</a></div>${foot(5,'Penguin Random House India')}</div></div>
  ${leaf('cover',16,`<div class="bm-cover"><img src="${b.img}" alt="" /></div>`,
     `<div class="bm-end"><span class="bm-logo"><img src="assets/v2/logo-penguin.png" alt="" /></span><small>✦ Opened by Penguin</small><h3>${b.t}</h3><p>${b.a}${b.tr?`<br><em>${b.tr}</em>`:''}</p><span class="hint">Penguin's AI summary is ready →</span></div>`)}
  ${leaf('',5,`<div class="bm-paper" id="bmSumPage"><div class="bm-k"><span>✦ AI summary</span><span class="bm-kb"><button type="button" data-speak>🔊 Listen</button><button type="button" id="bmRegen">↻ Regenerate</button></span></div>
      <h3 class="bm-t">${b.t}</h3><div class="bm-a">by ${b.a} · ${b.g}</div><p class="bm-sum" id="bmSum"></p><p class="bm-line">${b.line}</p>${foot(1,'AI-generated · can make mistakes')}</div>`,
    `<div class="bm-paper"><div class="bm-k"><span>Themes &amp; mood</span></div><h3 class="bm-t sm">What it's really about</h3>
      <div class="bm-meters">${b.th.map(([n,v])=>`<div class="bm-meter"><div class="row"><span>${n}</span><b>${v}%</b></div><div class="bm-bar"><i style="--v:${v}%"></i></div></div>`).join('')}</div>
      <div class="bm-moods">${b.md.map(m=>`<span>${m}</span>`).join('')}</div>${foot(2,'Mood read by Penguin')}</div>`)}
  ${leaf('',3,`<div class="bm-paper"><div class="bm-k"><span>Is it for me?</span></div>
      <div class="bm-match"><div class="bm-ring" style="--v:${b.m}"><b>${b.m}%</b></div><div><b>Match with your mood</b><span>Based on what you've asked Penguin today</span></div></div>
      <div class="bm-list yes"><h4>You'll love it if…</h4><ul>${b.yes.map(y=>`<li>${y}</li>`).join('')}</ul></div>
      <div class="bm-list no"><h4>Maybe skip if…</h4><ul><li>${b.no}</li></ul></div>${foot(3,'Personalised by Penguin')}</div>`,
    `<div class="bm-paper"><div class="bm-k"><span>Read-alikes</span></div><h3 class="bm-t sm">If this one lands, try…</h3>
      <div class="bm-alikes">${b.al.map(k=>`<button class="bm-al" type="button" data-k="${k}"><img src="${HERO[k].img}" alt="" /><b>${HERO[k].short||HERO[k].t}</b><span>${HERO[k].a}</span></button>`).join('')}</div>${foot(4,'Tap a cover to open it')}</div>`)}`;
}
const realLeaves=()=>[...BM.book.querySelectorAll('.bm-leaf')];
function setSpread(s,{instant,side}={}){
  s=clamp(s,0,SPREADS-1); BM.s=s; BM.book.dataset.s=s; BM.side=s===0?'R':(side||BM.side);
  if(instant) BM.book.classList.add('snap');
  realLeaves().forEach((lf,k)=>{const a=k<s?-180:0; if(lf.style.getPropertyValue('--a')!==a+'deg'){lf.style.setProperty('--a',a+'deg'); if(!instant){lf.classList.add('turn'); setTimeout(()=>lf.classList.remove('turn'),950);}}});
  // desktop shows the whole spread; phones show one page and slide between the left and right page
  BM.book.style.setProperty('--shift',BM.mobile?`${BM.side==='R'?-BM.pw/2:BM.pw/2}px`:(s===0?`${-BM.pw/2}px`:'0px'));
  if(instant){BM.book.offsetWidth; BM.book.classList.remove('snap');}
  BM.tabs.querySelectorAll('button').forEach((b,k)=>b.classList.toggle('on',k===s));
  BM.prev.disabled=s===0; BM.next.disabled=s===SPREADS-1&&(!BM.mobile||BM.side==='R');
  if(s>=1&&!BM.typed&&!BM.busy) typeSummary();
}
function typeSummary(){
  const b=HERO[BM.i], el=document.getElementById('bmSum'), page=document.getElementById('bmSumPage'); if(!el) return;
  BM.typed=true; clearInterval(BM.typer); page.classList.remove('done');
  const words=b.sum.split(' '); let n=0;
  if(prefersReduced){el.textContent=b.sum; page.classList.add('done'); return;}
  el.innerHTML='<span class="cur"></span>';
  BM.typer=setInterval(()=>{n++; el.innerHTML=words.slice(0,n).join(' ')+'<span class="cur"></span>'; if(n>=words.length){clearInterval(BM.typer); el.textContent=b.sum; page.classList.add('done');}},34);
}
function sizeBM(){BM.mobile=innerWidth<640; BM.pw=Math.floor(BM.mobile?Math.min(360,innerWidth-56,(innerHeight-200)/1.45):Math.min(390,(innerWidth-40)/2,(innerHeight-200)/1.45)); BM.book.style.setProperty('--pw',BM.pw+'px');}
function fromOrigin(){ // transform that places the closed book exactly over the clicked fan cover
  const img=BM.origin.querySelector('img'), r=img.getBoundingClientRect(), f=BM.fly.getBoundingClientRect();
  const fanScale=BM.origin.closest('#fhFan')?fan.getBoundingClientRect().width/fan.offsetWidth:1;
  const rot=parseFloat(getComputedStyle(BM.origin).getPropertyValue('--r'))||0;
  return `translate(${r.left+r.width/2-(f.left+f.width/2)}px,${r.top+r.height/2-(f.top+f.height/2)}px) rotate(${rot}deg) scale(${img.offsetWidth*fanScale/BM.pw})`;
}
async function openBook(i,origin){
  if(BM.busy||BM.el.classList.contains('open')) return;
  BM.busy=true; BM.i=i; BM.origin=origin; BM.typed=false; BM.lastFocus=document.activeElement;
  BM.el.setAttribute('aria-label',`${HERO[i].t}: AI book preview`);
  BM.book.innerHTML=bookHTML(HERO[i]); sizeBM(); setSpread(0,{instant:true});
  document.body.classList.add('bm-lock'); BM.el.classList.remove('closing'); BM.el.classList.add('open');
  origin.style.visibility='hidden';
  if(!prefersReduced) BM.fly.animate([{transform:fromOrigin()},{transform:'none'}],{duration:850,easing:'cubic-bezier(.22,1,.36,1)'});
  BM.el.querySelector('.bm-x').focus({preventScroll:true});
  await wait(900); setSpread(1,{side:'R'}); // cover swings open straight onto the content (no blank pages)
  await wait(520); BM.busy=false; typeSummary();          // Penguin's summary streams in
}
async function closeBook(){
  if(!BM.el.classList.contains('open')||BM.closing) return;
  BM.closing=true; stopSpeech(); BM.timers.forEach(clearTimeout); BM.timers=[]; clearInterval(BM.typer);
  if(BM.s>0){BM.book.classList.add('fast'); setSpread(0); await new Promise(r=>setTimeout(r,prefersReduced?0:600));}
  BM.el.classList.add('closing');
  if(!prefersReduced&&BM.origin){ const a=BM.fly.animate([{transform:'none'},{transform:fromOrigin()}],{duration:600,easing:'cubic-bezier(.55,0,.2,1)',fill:'forwards'}); await a.finished; a.cancel(); }
  if(BM.origin){BM.origin.style.visibility=''; BM.origin.focus({preventScroll:true});}
  BM.el.classList.remove('open','closing'); BM.book.classList.remove('fast'); document.body.classList.remove('bm-lock');
  BM.book.innerHTML=''; BM.busy=false; BM.closing=false;
}
const originFor=i=>{ // a copy of the cover that's on screen (card), else the hero fan, else the spotlight book
  const on=[...document.querySelectorAll(`[data-hero="${i}"] .pc`)].find(el=>{const r=el.getBoundingClientRect(); return r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth;});
  return on||fan.children[i]||document.getElementById('sbFront'); };
async function switchBook(i){ // open a read-alike: close the cover, swap the book, reopen on its summary
  if(BM.busy||i===BM.i) return; BM.busy=true;
  setSpread(0); await wait(950);
  if(BM.origin) BM.origin.style.visibility='';
  BM.origin=originFor(i); BM.origin.style.visibility='hidden';
  BM.i=i; BM.typed=false; BM.book.innerHTML=bookHTML(HERO[i]);
  setSpread(0,{instant:true}); await wait(60); BM.busy=false; setSpread(1,{side:'R'});
}
// wire the hero fan
[...fan.children].forEach((el,i)=>{el.tabIndex=0; el.setAttribute('role','button'); el.setAttribute('aria-label',`Open ${HERO[i].t} with Penguin's AI summary`);
  el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault(); openBook(i,el);}});});
fan.addEventListener('click',e=>{const b=e.target.closest('.fh-book'); if(b) openBook([...fan.children].indexOf(b),b);});
// popup controls
BM.el.addEventListener('click',e=>{
  if(e.target.closest('[data-close]')) return closeBook();
  const sp=e.target.closest('[data-speak]'); if(sp) return speak(HERO[BM.i].sum,sp);
  const tab=e.target.closest('.bm-tabs button'); if(tab&&!BM.busy) return setSpread(+tab.dataset.k,{side:+tab.dataset.k>=2?'L':'R'});
  if(e.target.closest('#bmRegen')){BM.typed=false; return typeSummary();}
  const al=e.target.closest('.bm-al'); if(al) return switchBook(+al.dataset.k);
  const q=e.target.closest('.bm-q'); if(q){ const t=`${q.dataset.q} (${HERO[BM.i].t})`; return closeBook().then(()=>{openAi(); ask(t);}); }
  const sh=e.target.closest('.bm-shelf'); if(sh){sh.classList.toggle('on'); sh.textContent=sh.classList.contains('on')?'♥ On your shelf':'♡ Add to my shelf';}
});
BM.el.addEventListener('submit',e=>{e.preventDefault(); const inp=e.target.querySelector('input'); if(inp.value.trim()){ const t=`${inp.value.trim()} (${HERO[BM.i].t})`; inp.value=''; closeBook().then(()=>{openAi(); ask(t);}); }});
function step(d){ if(BM.busy) return; if(!BM.mobile) return setSpread(BM.s+d);
  if(d>0){ if(BM.side==='L') setSpread(BM.s,{side:'R'}); else if(BM.s<SPREADS-1) setSpread(BM.s+1,{side:'L'}); }
  else { if(BM.side==='R'&&BM.s>0) setSpread(BM.s,{side:'L'}); else if(BM.side==='L') setSpread(BM.s-1,{side:'R'}); } }
BM.prev.onclick=()=>step(-1);
BM.next.onclick=()=>step(1);
addEventListener('keydown',e=>{ if(!BM.el.classList.contains('open')||document.activeElement.tagName==='INPUT') return;
  if(e.key==='Escape'&&!panel.classList.contains('open')) closeBook();
  if(e.key==='ArrowRight') BM.next.click(); if(e.key==='ArrowLeft') BM.prev.click(); });
BM.stage.addEventListener('mousemove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5; BM.tilt.style.setProperty('--ty',`${x*10}deg`); BM.tilt.style.setProperty('--tx',`${7-y*8}deg`);});
BM.stage.addEventListener('mouseleave',()=>{BM.tilt.style.removeProperty('--ty'); BM.tilt.style.removeProperty('--tx');});
let bmX=null; BM.stage.addEventListener('pointerdown',e=>bmX=e.clientX);
BM.stage.addEventListener('pointerup',e=>{ if(bmX===null) return; const dx=e.clientX-bmX; bmX=null; if(Math.abs(dx)>50&&!e.target.closest('button,input,a')) (dx<0?BM.next:BM.prev).click(); });
addEventListener('resize',()=>{ if(BM.el.classList.contains('open')){sizeBM(); setSpread(BM.s,{instant:true});} });


// AI search bar
const aiS=document.getElementById('aiSearch'), drop=document.getElementById('aiDrop');
const phrases=["a picture book about being brave","a cozy mystery for a rainy weekend","something like a thriller but hopeful","poetry for when I miss someone"];
// placeholder rotates through example asks (starts on the Figma copy); pauses while the user types
let phIdx=0; setInterval(()=>{ if(document.activeElement!==aiS&&!aiS.value){phIdx=(phIdx+1)%phrases.length; aiS.placeholder='Try: '+phrases[phIdx];} },3800);
aiS.addEventListener('input',()=>document.getElementById('fhField').classList.toggle('has-text',!!aiS.value));
document.getElementById('aiSearchForm').onsubmit=e=>{e.preventDefault();runAiSearch(aiS.value.trim()||phrases[phIdx]);};
addEventListener('keydown',e=>{
  if(e.key==='/'&&document.activeElement.tagName!=='INPUT'){e.preventDefault();scrollTo({top:0,behavior:'smooth'});aiS.focus();}
  if(e.key==='Escape')drop.classList.remove('open');
});
document.addEventListener('click',e=>{if(!e.target.closest('#aisearch'))drop.classList.remove('open');});
// hero "Ask AI" opens the Talk to Penguin conversation (client: conversational discovery over browsing)
function runAiSearch(q){ openAi(); ask(q); aiS.value=''; document.getElementById('fhField').classList.remove('has-text'); }

/* ---------------- Second fold: The Ones Everyone Loves ----------------
   Browse "Popular Now" on the left; the right panel spotlights the chosen book: a 3D cover that
   spins to the new pick, Penguin's summary streamed in, and buttons to open the book or ask Penguin. */
// Popular Now = Penguin India's all-time bestsellers, in the order shown on penguin.co.in
const ONES=[BI('atomic-habits'),BI('ikigai'),BI('heart-lamp'),7,8,BI('can-we-be-strangers-again'),BI('mother-mary-comes-to-me'),BI('the-art-of-letting-go'),BI('thank-you-for-leaving'),BI('the-housemaid'),BI('the-courage-to-be-disliked'),BI('12-rules-for-life')];
const onesRow=document.getElementById('onesRow'), sb=document.getElementById('sb'), sbImg=document.getElementById('sbImg'), spotInfo=document.getElementById('spotInfo');
const SB_COLORS=ONES.map(i=>HERO[i].col||({7:'#3b2a6b',8:'#2b2e8f'})[i]||'#2a1f18'); // spine/back colour per book
onesRow.innerHTML=ONES.map(i=>`<button class="oc" type="button" role="option" data-hero="${i}" aria-selected="false"><span class="pc"><img src="${HERO[i].img}" alt="" loading="lazy" /></span><span class="t"><b>${HERO[i].short||HERO[i].t}</b><span>${HERO[i].a}</span></span></button>`).join('');
let spotI=-1, spotTyper=null;
function spotContent(i){const b=HERO[i];
  return `<h3>${b.t}</h3><div class="by">${b.a}<span class="g">${b.g}</span></div>
    <p class="spot-sum" id="spotSum"></p>
    <div class="spot-tags">${b.md.map(m=>`<span>${m}</span>`).join('')}</div>
    <div class="spot-cta"><button class="open" type="button" data-open>Open the book ↗</button><button class="ask" type="button" data-ask>✦ Ask Penguin about it</button></div>
    <div class="spot-links"><a href="${linkFor(b).audible}" target="_blank" rel="noopener">🎧 Listen on Audible</a><a href="${linkFor(b).buy}" target="_blank" rel="noopener">Buy on penguin.co.in ↗</a></div>`;}
function streamSum(i){const el=document.getElementById('spotSum'), words=HERO[i].sum.split(' '); let n=0; clearInterval(spotTyper);
  if(prefersReduced){el.textContent=HERO[i].sum; return;}
  el.innerHTML='<span class="cur"></span>';
  spotTyper=setInterval(()=>{n+=2; el.innerHTML=words.slice(0,n).join(' ')+'<span class="cur"></span>'; if(n>=words.length){clearInterval(spotTyper); el.textContent=HERO[i].sum;}},45);}
function setBook(i){ sbImg.src=HERO[i].img; document.getElementById('sbSpine').textContent=HERO[i].short||HERO[i].t;
  sb.style.setProperty('--sbc',SB_COLORS[ONES.indexOf(i)]||'#2a1f18'); }
function dropIn(i){ // the current book tips back onto the table, then the new one drops in from above with a small bounce
  if(swapCur){swapCur.cancel(); swapCur=null;}
  const R='rotateX(6deg) rotateY(-26deg)';
  const out=sb.animate([{opacity:1,transform:R},{opacity:0,transform:'translateY(60px) rotateX(72deg) rotateY(-26deg) scale(.82)'}],{duration:360,easing:'cubic-bezier(.55,0,.8,.3)',fill:'forwards'}); swapCur=out;
  out.finished.then(()=>{ setBook(i);
    const inn=sb.animate([{opacity:0,transform:'translateY(-180px) rotateX(-70deg) rotateY(-26deg) scale(.9)'},{opacity:1,transform:'translateY(12px) rotateX(12deg) rotateY(-26deg)',offset:.7},{opacity:1,transform:R}],{duration:760,easing:'cubic-bezier(.2,.8,.2,1)'});
    out.cancel(); swapCur=inn; inn.finished.then(()=>{if(swapCur===inn) swapCur=null;},()=>{}); },()=>{});
}
let swapCur=null;
function spotlight(i,{instant}={}){
  if(i===spotI) return; const first=spotI<0; spotI=i;
  onesRow.querySelectorAll('.oc').forEach(c=>{const on=+c.dataset.hero===i; c.classList.toggle('on',on); c.setAttribute('aria-selected',on);});
  sb.setAttribute('aria-label',`Open ${HERO[i].t}`);
  if(first||instant||prefersReduced){setBook(i); spotInfo.innerHTML=spotContent(i); streamSum(i); return;}
  dropIn(i);
  spotInfo.classList.add('swap');
  setTimeout(()=>{spotInfo.innerHTML=spotContent(i); spotInfo.classList.remove('swap'); streamSum(i);},420);
}
onesRow.addEventListener('click',e=>{const c=e.target.closest('.oc'); if(!c) return; const i=+c.dataset.hero; if(i===spotI) return;
  if(innerWidth>980) return spotlight(i);
  // stacked layout (tablet/phone): bring the spotlight into view, then drop the book in
  document.querySelector('.ones-right').scrollIntoView({behavior:prefersReduced?'auto':'smooth',block:'start'});
  setTimeout(()=>spotlight(i),prefersReduced?0:480);});
spotInfo.addEventListener('click',e=>{
  if(e.target.closest('[data-open]')) openBook(spotI,document.getElementById('sbFront'));
  if(e.target.closest('[data-ask]')){openAi(); ask(`Tell me about "${HERO[spotI].t}"`);}});
sb.addEventListener('click',()=>openBook(spotI,document.getElementById('sbFront')));
sb.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault(); openBook(spotI,document.getElementById('sbFront'));}});
// the spotlight book leans toward the cursor
const onesRight=document.querySelector('.ones-right');
onesRight.addEventListener('mousemove',e=>{const r=onesRight.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
  sb.style.setProperty('--ty',`${-26+x*30}deg`); sb.style.setProperty('--tx',`${6-y*14}deg`);});
onesRight.addEventListener('mouseleave',()=>{sb.style.removeProperty('--ty'); sb.style.removeProperty('--tx');});
// carousel arrows
const onesStep=()=>onesRow.querySelector('.oc').offsetWidth*2+100;
document.getElementById('onesPrev').onclick=()=>onesRow.scrollBy({left:-onesStep()});
document.getElementById('onesNext').onclick=()=>onesRow.scrollBy({left:onesStep()});
function onesEdges(){const max=onesRow.scrollWidth-onesRow.clientWidth-2;
  document.getElementById('onesPrev').disabled=onesRow.scrollLeft<=2; document.getElementById('onesNext').disabled=onesRow.scrollLeft>=max;
  onesRow.classList.toggle('end',onesRow.scrollLeft>=max);}
onesRow.addEventListener('scroll',onesEdges,{passive:true}); addEventListener('resize',onesEdges); onesEdges();
spotlight(ONES[0]);

/* section heading reveal */
new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');o.disconnect();}}),{threshold:.3}).observe(document.getElementById('headline'));

/* ---------------- Marquee ---------------- */
document.getElementById('track').innerHTML=[...GENRES,...GENRES].map(g=>`<span>${g}</span>`).join('');

/* ---------------- Mood shelf with FLIP animation ---------------- */
const shelf=document.getElementById('shelf');
shelf.innerHTML=BOOKS.map((b,i)=>`<article class="bk reveal" data-m="${b.m.join(' ')}" data-i="${i}" style="transition-delay:${(i%4)*.08}s">
  <span class="tag">${b.m[0]}</span><div class="pages"></div>${cover(b)}
  <div class="meta"><b>${b.t}</b><span>${b.a}</span></div></article>`).join('');
const moodsEl=document.getElementById('moods');
moodsEl.innerHTML=MOODS.map(([k,l],i)=>`<button class="chip ${i?'':'on'}" data-k="${k}">${l}</button>`).join('');
moodsEl.addEventListener('click',e=>{
  const c=e.target.closest('.chip'); if(!c) return;
  moodsEl.querySelectorAll('.chip').forEach(x=>x.classList.toggle('on',x===c));
  const cards=[...shelf.children], first=new Map(cards.map(el=>[el,el.getBoundingClientRect()]));
  cards.forEach(el=>el.classList.toggle('hidden',c.dataset.k!=='all'&&!el.dataset.m.includes(c.dataset.k)));
  cards.forEach(el=>{
    if(el.classList.contains('hidden')) return;
    const f=first.get(el), l=el.getBoundingClientRect();
    const wasHidden=f.width===0;
    el.animate(wasHidden?[{opacity:0,transform:'scale(.85)'},{opacity:1,transform:'none'}]
      :[{transform:`translate(${f.left-l.left}px,${f.top-l.top}px)`},{transform:'none'}],
      {duration:prefersReduced?0:650,easing:'cubic-bezier(.22,1,.36,1)'});
  });
});
shelf.addEventListener('click',e=>{
  const bk=e.target.closest('.bk'); if(!bk) return;
  const b=BOOKS[bk.dataset.i]; openAi(); ask(`Tell me about "${b.t}"`);
});

/* ---------------- Scroll effects ---------------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);} }),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// word-by-word lighting in the mission quote
const q=document.getElementById('quote');
q.innerHTML=q.innerHTML.replace(/(<[^>]+>)|([^\s<]+)/g,(m,tag,w)=>tag?tag:`<span class="w">${w}</span>`);
const qw=[...q.querySelectorAll('.w')];

// counters
const cio=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting) return; cio.unobserve(e.target);
  const el=e.target,n=+el.dataset.count,s=el.dataset.suffix||'',t0=performance.now();
  const step=t=>{const p=Math.min(1,(t-t0)/1600),v=Math.round(n*(1-Math.pow(1-p,3)));el.textContent=v.toLocaleString()+s;if(p<1)requestAnimationFrame(step)};
  requestAnimationFrame(step);
}),{threshold:.6});
document.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));

const prog=document.getElementById('progress');
addEventListener('scroll',()=>{
  const y=scrollY;
  prog.style.width=(y/(document.body.scrollHeight-innerHeight)*100)+'%';
  const r=q.getBoundingClientRect(), p=Math.min(1,Math.max(0,(innerHeight*.85-r.top)/(r.height+innerHeight*.35)));
  qw.forEach((w,i)=>w.classList.toggle('lit',i/qw.length<p));
},{passive:true});

/* ---------------- Cursor + magnetic buttons ---------------- */
const cur=document.getElementById('cursor');
addEventListener('mousemove',e=>{cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px';cur.style.opacity=1});
document.addEventListener('mouseover',e=>cur.classList.toggle('big',!!e.target.closest('a,button,.bk')));
document.querySelectorAll('.magnetic').forEach(b=>{
  b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.3}px,${(e.clientY-r.top-r.height/2)*.4}px)`});
  b.addEventListener('mouseleave',()=>b.style.transform='');
});

/* ---------------- Theme ---------------- */
// Two themes: Orange (data-theme="light") and Black (data-theme="dark").
// Switching reveals the new theme in a circle growing from the click point.
const root=document.documentElement, themeBtn=document.getElementById('themeBtn');
function applyTheme(t){ root.dataset.theme=t;
  const label=t==='dark'?'Switch to Orange theme':'Switch to Black theme';
  themeBtn.setAttribute('aria-pressed',t==='dark'); themeBtn.setAttribute('aria-label',label); themeBtn.title=label;
  try{localStorage.setItem('pg-theme',t)}catch(e){} }
try{ const saved=localStorage.getItem('pg-theme'); if(saved) applyTheme(saved); }catch(e){}
themeBtn.addEventListener('click',e=>{
  const next=root.dataset.theme==='dark'?'light':'dark';
  if(!document.startViewTransition||prefersReduced) return applyTheme(next);
  const b=themeBtn.getBoundingClientRect(), x=e.clientX||b.left+b.width/2, y=e.clientY||b.top+b.height/2, r=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
  document.startViewTransition(()=>applyTheme(next)).ready.then(()=>
    root.animate({clipPath:[`circle(0px at ${x}px ${y}px)`,`circle(${r}px at ${x}px ${y}px)`]},
      {duration:800,easing:'cubic-bezier(.22,1,.36,1)',pseudoElement:'::view-transition-new(root)'}));
});

/* ---------------- Newsletter ---------------- */
document.getElementById('newsForm').onsubmit=e=>{e.preventDefault();document.getElementById('newsOk').textContent='🎉 You\'re in! (demo — nothing was sent)';e.target.reset();};

/* ---------------- AI assistant "Penguin" ----------------
   Demo engine: scores the on-page catalog against the user's words.
   To go live, replace `think()` with a fetch to your own backend endpoint
   (e.g. POST /api/pip -> LLM with the catalog as tool/context). */
const panel=document.getElementById('panel'), fab=document.getElementById('fab'), body=document.getElementById('aiBody');
let greeted=false;
function openAi(){ panel.classList.add('open'); fab.classList.add('open'); document.body.classList.add('chat-lock'); renderSide();
  if(!greeted){ greeted=true;
    if(profile.asks>0){ const tm=topMoods(2).map(m=>MWL[m]); const last=profile.chose[profile.chose.length-1];
      bot(`Welcome back! Last time you were into ${tm.join(' and ')||'a bit of everything'}${last?`, and you picked ${last}`:''}. Shall we pick up where we left off, or try something new?`);
      const c=['More like last time','Something new',...(profile.shortlist.length>=2?['Help me choose']:[])]; setTimeout(()=>add(c.map(x=>`<button type="button">${x}</button>`).join(''),'follow'),prefersReduced?0:1400); }
    else bot("Hi, I'm Penguin, your bookseller. Ask me the way you would in a bookshop: a mood, a book you loved, or who you're buying for. I'll find your five best matches from Penguin's catalogue and help you decide. You can also tap the mic and just say it."); }
  setTimeout(()=>document.getElementById('aiQ').focus(),400); }
document.querySelectorAll('[data-open-ai]').forEach(b=>b.addEventListener('click',openAi));
document.getElementById('closeAi').onclick=()=>{panel.classList.remove('open','side-open');fab.classList.remove('open');document.body.classList.remove('chat-lock');stopSpeech();};
addEventListener('keydown',e=>{if(e.key==='Escape'&&!BM.el.classList.contains('open'))document.getElementById('closeAi').click()});

const SUGG=["I loved Atomic Habits. What next?","A gift for my mum","Something gripping for a flight","Surprise me"];
document.getElementById('suggest').innerHTML=SUGG.map(s=>`<button>${s}</button>`).join('');
document.getElementById('suggest').onclick=e=>{ if(e.target.tagName==='BUTTON') ask(e.target.textContent); };
body.addEventListener('click',e=>{
  const f=e.target.closest('.follow button'); if(f) return ask(f.textContent);
  const sy=e.target.closest('.say'); if(sy) return speak(sy.closest('.msg').dataset.say,sy);
  const act=e.target.closest('[data-act]'); if(!act) return; const host=act.closest('[data-cat]'), b=CATALOG[+host.dataset.cat];
  if(act.dataset.act==='open') openBook(b.hero,host);
  else if(act.dataset.act==='sl') toggleShort(b);
  else ask(`Tell me about ${b.t}`); });
document.getElementById('aiForm').onsubmit=e=>{e.preventDefault();const i=document.getElementById('aiQ');if(i.value.trim()){ask(i.value.trim());i.value='';}};

function add(html,cls){const d=document.createElement('div');d.className=cls;d.innerHTML=html;body.appendChild(d);body.scrollTop=body.scrollHeight;return d;}
function bot(text,opts={}){ // streamed word-by-word, then a 🔊 button to hear it
  const d=add('','msg bot'); d.dataset.say=text; const words=text.split(' '); let i=0;
  const done=()=>{ d.textContent=text; const b=document.createElement('button'); b.type='button'; b.className='say'; b.setAttribute('aria-label','Read aloud'); b.textContent='🔊'; d.appendChild(b);
    if(opts.speak||autoRead) speak(text,b); };
  if(prefersReduced){ done(); return 0; }
  const t=setInterval(()=>{d.textContent=words.slice(0,++i).join(' ');body.scrollTop=body.scrollHeight;if(i>=words.length){clearInterval(t); done();}},35);
  return words.length*35;
}
const bcard=(b,k)=>`<div class="bcard" data-cat="${b.id}" style="animation-delay:${k*.08}s"><img src="${b.img}" alt="" loading="lazy" />
  <div class="bc-t"><b>${esc(b.t)}</b><span>${esc(b.a)} · ${esc(b.g)}</span><p>${esc(b.line)}</p>
  <div class="bc-act">${b.hero!=null?'<button type="button" data-act="open">Open book ↗</button>':'<button type="button" data-act="more">Tell me more</button>'}<button type="button" class="sl${profile.shortlist.includes(b.t)?' on':''}" data-act="sl">${profile.shortlist.includes(b.t)?'♥ Shortlisted':'♡ Shortlist'}</button><a href="${b.buy}" target="_blank" rel="noopener">Buy</a><a href="${b.audible}" target="_blank" rel="noopener">🎧 Sample</a></div></div></div>`;
const decideHTML=b=>{ const share=`https://wa.me/?text=${encodeURIComponent(`My next read: ${b.t} by ${b.a}. Found it with Penguin. ${b.buy}`)}`;
  return `<div data-cat="${b.id}" style="display:contents"><img src="${b.img}" alt="" /><div><small>✦ Your pick</small><b>${esc(b.t)}</b><div class="by">${esc(b.a)} · ${esc(b.g)}</div>
  <div class="dc-act"><a class="primary" href="${b.buy}" target="_blank" rel="noopener">Buy now · see retailers ↗</a><a href="${b.audible}" target="_blank" rel="noopener">🎧 Audio sample on Audible</a>${b.hero!=null?'<button type="button" data-act="open">📖 Open the book</button>':''}<a href="${share}" target="_blank" rel="noopener">Send to WhatsApp</a></div>
  <p class="dc-note">Penguin India sells through retailers, so Buy takes you to the book's page with every buying option.</p></div></div>`; };
function ask(q){
  document.getElementById('suggest').classList.add('gone');
  add(esc(q),'msg me');
  const typing=add('<i></i><i></i><i></i>','msg bot typing');
  setTimeout(()=>{ typing.remove(); const r=converse(q); const dur=bot(r.text,{speak:r.speak});
    setTimeout(()=>{ if(r.books?.length) add(r.books.map(bcard).join(''),'bcards'); if(r.decide) add(decideHTML(r.decide),'decide'); if(r.chips?.length) add(r.chips.map(c=>`<button type="button">${esc(c)}</button>`).join(''),'follow'); },prefersReduced?0:dur+120);
  },600+Math.random()*400);
}
const SYN={cozy:["cozy","cosy","rain","warm","comfort","relax","calm","gentle","weekend"],thrilling:["thrill","gripping","suspense","crime","mystery","murder","page-turner","fast"],emotional:["cry","sad","emotional","love","miss","grief","heart","romance"],adventurous:["adventure","journey","quest","travel","epic","sea"],"mind-bending":["mind","sci","space","ai","future","weird","smart","idea","science"],inspiring:["inspir","hope","uplift","motivat","food","true","real"],dark:["dark","war","noir","scary","creepy"],kids:["kid","child","year-old","son","daughter","picture","young","teen","ya","gift"]};
/* ---------------- Talk to Penguin: conversational discovery ----------------
   Demo engine over every book on this page (hero, bestsellers, mood shelf). It keeps context across turns
   ("more like these", "something shorter", "a gift for my dad"), the way a bookseller would.
   To go live: send the conversation + catalogue to an LLM endpoint and render the same reply shape {text, books, chips}. */
function esc(t){ return String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function linkFor(b){ return {audible:`https://www.audible.in/search?keywords=${encodeURIComponent(b.t+' '+b.a)}`,buy:`https://www.penguin.co.in/?s=${encodeURIComponent(b.t)}`}; } // hoisted: used by the spotlight on load
const MOOD_OF={cozy:['cozy','calm','calming','reassuring','tender','light','gentle','playful','warm'],thrilling:['thrilling','tense','addictive','gritty','intense','clever'],
  emotional:['emotional','moving','bittersweet','intimate','tender','romantic','powerful','haunting'],adventurous:['adventurous','epic','curious'],
  'mind-bending':['mind-bending','thought-provoking','challenging','reflective','wise','sharp'],inspiring:['inspiring','uplifting','motivating','practical','hopeful','clear','direct','accessible','modern'],
  dark:['dark','gritty','intense','haunting'],kids:[]};
const CATALOG=[];
HERO.forEach((b,i)=>{ const m=new Set(); (b.md||[]).forEach(w=>{for(const k in MOOD_OF) if(MOOD_OF[k].includes(w)) m.add(k);});
  if(/middle-grade|children/i.test(b.g)) m.add('kids'); if(/self-help|wellbeing|career|finance|philosophy/i.test(b.g)) m.add('inspiring');
  if(/romance|poetry|memoir|short stories/i.test(b.g)) m.add('emotional'); if(/thriller|crime|mystery/i.test(b.g)) m.add('thrilling');
  CATALOG.push({id:CATALOG.length,hero:i,t:b.t,short:b.short,a:b.a,g:b.g,img:b.img,line:b.line,blurb:b.sum,m:[...m],...linkFor(b)}); });
BOOKS.forEach(b=>{ if(CATALOG.some(c=>c.t===b.t)) return;
  CATALOG.push({id:CATALOG.length,hero:null,t:b.t,a:b.a,g:b.g,img:b.img,line:b.d.split(/(?<=[.!?])\s/)[0],blurb:b.d,m:b.m,...linkFor(b)}); });
SYN.inspiring.push('learn','habit','money','career','improve','productiv','self-help','motivat','grow');
SYN.kids=SYN.kids.filter(w=>w!=='gift');
const STOP=new Set(['something','book','books','read','reading','want','would','like','that','with','about','what','have','some','looking','recommend','please','good','great','really','could','give','them','this','these','from','more','your','just','also','into','need','find','show','tell','something','there','their','which','where','when','will']);
const ctx={last:[],moods:[],focus:null,seen:new Set(),gift:false};
const nm=b=>b.short||b.t;
const FOLLOW=b=>['More like these','Something shorter','Something different',...(profile.shortlist.length>=2?['Help me choose']:b?[`Tell me about ${nm(b)}`]:[])];
function fresh(list,n=5){ const a=list.filter(b=>!ctx.seen.has(b.id)); return (a.length>=n?a:[...a,...list.filter(b=>ctx.seen.has(b.id))]).slice(0,n); }
function moodsIn(s){ const out=[]; for(const k in SYN) if(s.includes(k)||SYN[k].some(w=>s.includes(w))) out.push(k); return out; }
function rank(s,moods){ const words=s.split(/[^a-z0-9'-]+/).filter(w=>w.length>3&&!STOP.has(w));
  return CATALOG.map(b=>{ let n=0; moods.forEach(m=>{if(b.m.includes(m)) n+=3;});
    if(b.m.includes('kids')&&!moods.includes('kids')&&!/kid|child|son|daughter|young|picture/.test(s)) n-=4; // children's books only when asked
    const hay=(b.t+' '+b.g+' '+b.line+' '+b.blurb+' '+b.a).toLowerCase(), g=b.g.toLowerCase();
    words.forEach(w=>{ if(hay.includes(w)) n+=1; if(g.includes(w)) n+=2; });
    if(n>0) b.m.forEach(m=>{ if(profile.moods[m]) n+=Math.min(2,profile.moods[m])*.5; }); // the more you chat, the more it fits you
    return [b,n]; })
    .filter(x=>x[1]>0).sort((x,y)=>y[1]-x[1]).map(x=>x[0]); }
function converse(q){
  const s=q.toLowerCase().trim();
  let named=CATALOG.find(b=>s.includes(b.t.toLowerCase())||(b.short&&s.includes(b.short.toLowerCase())));
  // "is it good for a book club?" → "it" is the book we were just talking about
  if(!named&&ctx.focus&&/club|group|discuss|dark|sad|scary|violent|heavy|tell me more|about it|\bis it\b/.test(s)) named=ctx.focus;
  learn(s,named);
  const took=/\b(i'?ll take|i will take|i'?ll go with|go with|this is the one|i choose)\b/.test(s);
  if(took){ const b=named||ctx.focus||ctx.last[0];
    if(b){ pushU(profile.chose,b.t); saveProfile(); ctx.focus=b;
      return {text:`Great choice. ${b.t} it is. Here's everything you need to get it:`,books:[],chips:['Talk about it while I read','Find my next read after this'],decide:b}; } }
  if(/show my shortlist|my shortlist/.test(s)){ const list=profile.shortlist.map(byTitle).filter(Boolean);
    if(!list.length) return {text:"Your shortlist is empty. Tap ♡ on any book I suggest and it'll wait for you here.",books:[],chips:['Something gripping','Something to learn from','Surprise me']};
    ctx.last=list; ctx.focus=list[0]; return {text:`Here's your shortlist (${list.length}):`,books:list,chips:list.length>=2?['Help me choose','Keep browsing']:['Find similar books','Keep browsing']}; }
  if(/show my picks|my picks|reading history|what have i picked/.test(s)){ const list=profile.chose.map(byTitle).filter(Boolean);
    if(!list.length) return {text:"You haven't picked a book yet. Tell me what you're in the mood for and we'll find your next read.",books:[],chips:SUGG};
    ctx.last=list; ctx.focus=list[list.length-1]; return {text:`Books you've picked with me (${list.length}):`,books:list.slice().reverse(),chips:['Find my next read after this','Talk about it while I read']}; }
  if(/help me (choose|decide|pick)|which (one|should i)|compare (them|my)|can'?t decide/.test(s)){
    const list=profile.shortlist.map(byTitle).filter(Boolean);
    if(list.length<2) return {text:"Add two or three books to your shortlist (tap ♡ on any book I suggest) and I'll help you decide between them.",books:[],chips:['Something gripping','Something to learn from','Surprise me']};
    const tm=topMoods(), fit=b=>b.m.filter(m=>tm.includes(m)).length, best=[...list].sort((x,y)=>fit(y)-fit(x))[0];
    const why=best.m.filter(m=>tm.includes(m)).map(m=>MWL[m]).join(' and ')||best.g.toLowerCase();
    ctx.last=list; ctx.focus=best;
    return {text:`Here's how your shortlist compares:\n${list.map(b=>`• ${nm(b)}: ${b.line}`).join('\n')}\n\nMy pick for you is ${nm(best)}, because it fits what you've told me you're into: ${why}.`,books:[],chips:[`I'll take ${nm(best)}`,...list.filter(b=>b!==best).map(b=>`I'll take ${nm(b)}`)]}; }
  if(/question to think|discussion question/.test(s)&&ctx.focus){ const b=ctx.focus, hb=b.hero!=null?HERO[b.hero]:null, th=hb?hb.th[Math.floor(Math.random()*hb.th.length)][0].toLowerCase():b.g.toLowerCase();
    return {text:`Here's one for ${nm(b)}: what does the book seem to say about ${th}? As you read, notice who changes their mind, and why. Come back and tell me what you think.`,books:[],chips:['Another question','I finished it. What next?']}; }
  if(/another question/.test(s)&&ctx.focus) return {text:`Try this: if you could ask one character in ${nm(ctx.focus)} a single question, who would it be and what would you ask?`,books:[],chips:['I finished it. What next?','Find my next read after this']};
  if(/while i read|i'?m reading|talk about it|discuss it/.test(s)&&(named||ctx.focus)){ const b=named||ctx.focus; ctx.focus=b; const hb=b.hero!=null?HERO[b.hero]:null;
    const themes=hb?hb.th.map(x=>x[0].toLowerCase()).slice(0,3).join(', '):b.g.toLowerCase();
    return {text:`Lovely. I'll stay spoiler-free unless you ask. ${b.t} is a great one to talk about: watch for ${themes}. Come back any time and tell me how far you've got.`,books:[],chips:['Give me a question to think about','I finished it. What next?']}; }
  if(/finished it|next read after|after this/.test(s)&&ctx.focus){ const ref=ctx.focus; ctx.moods=ref.m; pushU(profile.loved,ref.t); saveProfile();
    const sim=fresh(CATALOG.filter(b=>b!==ref&&b.m.some(m=>ref.m.includes(m))&&(ref.m.includes('kids')||!b.m.includes('kids'))));
    return say(`Since you've read ${nm(ref)}, here's what I'd hand you next:`,sim,FOLLOW(sim[0])); }
  if(/like last time/.test(s)){ const ms=topMoods(); ctx.moods=ms; const list=fresh(rank(ms.join(' '),ms).filter(b=>b.m.some(m=>ms.includes(m))));
    if(list.length) return say(`More of what you liked last time (${ms.map(m=>MWL[m]).join(', ')}):`,list,FOLLOW(list[0])); }
  if(/something new|surprise me with something new/.test(s)){ const ms=topMoods(); const list=fresh(CATALOG.filter(b=>!b.m.some(m=>ms.includes(m))&&!b.m.includes('kids')).sort(()=>Math.random()-.5));
    ctx.moods=list[0]?list[0].m:[]; return say("Let's step off your usual shelf. Five you might not have picked yourself:",list,FOLLOW(list[0])); }
  function say(text,books=[],chips=[],extra={}){ if(books.length){ctx.last=books; ctx.focus=books[0];} books.forEach(b=>ctx.seen.add(b.id)); return {text,books,chips,...extra}; }
  if(/read (it|me|the summary|this)|read aloud|say it/.test(s)&&!named){ const b=ctx.focus||ctx.last[0];
    if(b) return say(`Here's ${nm(b)}. ${b.blurb}`,[],['Find similar books','Listen on Audible'],{speak:true}); }
  if(/audio ?book|listen|audible/.test(s)){ const b=named||ctx.focus||ctx.last[0];
    if(b) return say(`Penguin India doesn't sell audiobooks directly, but you can hear ${nm(b)} on Audible. I can also read you my summary right now: tap 🔊 on any of my answers.`,[b],['Read me the summary','Find similar books']);
    return say("Tell me which book, and I'll point you to the audiobook and read you a quick summary.",[],['Atomic Habits','The Housemaid','Ikigai']); }
  if(/\b(buy|price|order|purchase)\b|where can i get/.test(s)){ const b=named||ctx.focus||ctx.last[0];
    if(b) return say(`Every buying option for ${nm(b)} is on its Penguin India page. Tap Buy below.`,[b],['Find similar books']); }
  if(named){
    if(/club|group|discuss/.test(s)) return say(`Yes, ${nm(named)} gives a group plenty to talk about. ${named.line}`,[named],['Find similar books','Read me the summary']);
    if(/dark|sad|scary|violent|heavy/.test(s)) return say(`Tone check for ${nm(named)}: ${named.m.join(', ')||named.g}. ${named.line}`,[named],['Something lighter','Find similar books']);
    if(/loved|liked|enjoyed|what next|similar|more like|like .* but/.test(s)){ ctx.moods=named.m;
      const sim=fresh(CATALOG.filter(b=>b!==named&&b.m.some(m=>named.m.includes(m))&&(named.m.includes('kids')||!b.m.includes('kids'))));
      return say(`If you loved ${nm(named)}, these share its ${named.m.slice(0,2).join(' and ')||'spirit'} feel:`,sim,FOLLOW(sim[0])); }
    ctx.moods=named.m; return say(`${named.t} by ${named.a}. ${named.blurb}`,[named],['Find similar books','Read me the summary','Is it good for a book club?']); }
  if(/^(hi|hello|hey|namaste)\b/.test(s)) return say("Hello! What are you in the mood for? Tell me a feeling, a book you loved, or who you're buying for.",[],SUGG);
  if(ctx.last.length){
    if(/more like (these|this|that)|similar|more of|find similar/.test(s)){ const ref=ctx.focus||ctx.last[0], ms=ctx.moods.length?ctx.moods:ref.m;
      const list=fresh(CATALOG.filter(b=>!ctx.last.includes(b)&&b.m.some(m=>ms.includes(m))&&(ms.includes('kids')||!b.m.includes('kids'))));
      if(list.length) return say('Here are more in the same vein:',list,FOLLOW(list[0])); }
    if(/something (else|different)|another|other option|not (these|that|for me)|different direction/.test(s)){
      const list=fresh(CATALOG.filter(b=>!ctx.last.includes(b)&&!b.m.some(m=>ctx.moods.includes(m)))); ctx.moods=list[0]?list[0].m:[];
      return say("Let's try a different direction:",list,FOLLOW(list[0])); }
    if(/short|quick|lighter|light read|commute|small/.test(s)){ const fit=b=>b.m.some(m=>ctx.moods.includes(m))?1:0;
      const list=fresh(CATALOG.filter(b=>/poetry|short stories|self-help|wellbeing|children|graphic|picture/i.test(b.g)).sort((x,y)=>fit(y)-fit(x)));
      return say('Shorter reads you can finish in a sitting or two:',list,FOLLOW(list[0])); }
  }
  const age=(s.match(/(\d{1,2})\s*-?\s*(year|yr)/)||[])[1];
  const who=(s.match(/\b(mom|mum|mother|dad|father|wife|husband|sister|brother|friend|boss|son|daughter|niece|nephew|grandma|grandpa|teen|kid|child)\b/)||[])[1];
  const giftish=/gift|present|birthday|buying for|for my/.test(s)||ctx.gift;
  if(giftish&&!who&&!age&&/gift|present|birthday|buying for/.test(s)){ ctx.gift=true;
    return say("Lovely. Who's it for? Tell me a little about them and I'll pick something they'll actually read.",[],['My mum','My dad','A friend','A 7-year-old','A teenager']); }
  if(giftish&&(who||age)){ ctx.gift=false; let ms=['emotional','cozy','inspiring'];
    if((age&&+age<=10)||(!age&&/kid|child|son|daughter|niece|nephew/.test(who))) ms=['kids'];
    else if((age&&+age<=17)||who==='teen') ms=['thrilling','adventurous'];
    else if(/dad|father|boss|husband|grandpa|brother/.test(who||'')) ms=['inspiring','thrilling','mind-bending'];
    ctx.moods=ms; const list=fresh(rank(s,ms).filter(b=>b.m.some(m=>ms.includes(m))));
    return say(`For ${who?`your ${who}`:'them'}${age?` (age ${age})`:''}, here are three that tend to land well:`,list,FOLLOW(list[0])); }
  if(/teen|teenager/.test(s)){ ctx.moods=['thrilling','adventurous']; const list=fresh(CATALOG.filter(b=>/young adult|ya\b/i.test(b.g)));
    if(list.length) return say('For a teenager, these are page-turners teens actually finish:',list,FOLLOW(list[0])); }
  if(/surprise|random|anything|you choose|you pick/.test(s)){ ctx.moods=[]; const list=fresh([...CATALOG].sort(()=>Math.random()-.5));
    return say('Taking a leap. Three wildcards from across the shelves:',list,FOLLOW(list[0])); }
  const ms=moodsIn(s), ranked=rank(s,ms);
  if(ranked.length){ ctx.moods=ms.length?ms:ranked[0].m; const list=fresh(ms.includes('kids')?ranked.filter(b=>b.m.includes('kids')):ranked);
    const MW={cozy:'cozy',thrilling:'gripping',emotional:'moving','mind-bending':'thought-provoking',inspiring:'to learn from',dark:'dark',adventurous:'adventurous',kids:'for young readers'};
    return say(ms[0]?`Something ${MW[ms[0]]}, then. Here's what I'd pull off the shelf for you:`:"Here's what I'd pull off the shelf for that:",list,FOLLOW(list[0])); }
  return say("Tell me a bit more. Is it for you or a gift? Do you want something to relax with, something gripping, or something to learn from?",[],['Something to relax with','Something gripping','Something to learn from','A gift']);
}
/* ---------------- Reader profile + shortlist (client: "the profile automatically gets created" from conversations) ----------------
   Kept in this browser only (localStorage) for the prototype; in production this is the reader's record in the CDP. */
const PROFILE_KEY='penguin-reader-v1';
let profile={moods:{},loved:[],forWhom:[],prefs:[],shortlist:[],chose:[],asks:0};
try{ const p=JSON.parse(localStorage.getItem(PROFILE_KEY)||'null'); if(p) profile={...profile,...p}; }catch(e){}
const MWL={cozy:'cozy',thrilling:'gripping',emotional:'moving','mind-bending':'thought-provoking',inspiring:'learning & growth',dark:'dark',adventurous:'adventure',kids:'young readers'};
const topMoods=(n=3)=>Object.entries(profile.moods).sort((a,b)=>b[1]-a[1]).slice(0,n).map(x=>x[0]);
const byTitle=t=>CATALOG.find(b=>b.t===t);
const pushU=(arr,v)=>{ if(v&&!arr.includes(v)) arr.push(v); };
function saveProfile(){ try{localStorage.setItem(PROFILE_KEY,JSON.stringify(profile));}catch(e){} renderSide(); renderPm(); }
function renderPm(){ if(typeof pm==='undefined') return; const tm=topMoods(2).map(m=>MWL[m]);
  document.getElementById('pmTaste').textContent=tm.length?`Into ${tm.join(' and ')}${profile.forWhom.length?` · buying for ${profile.forWhom[profile.forWhom.length-1]}`:''}`:'Your taste builds as you chat with Penguin.';
  document.getElementById('pmProf').textContent=profile.asks?`${profile.asks} chat${profile.asks>1?'s':''} so far`:'Built from your chats';
  document.getElementById('pmShort').textContent=profile.shortlist.length; document.getElementById('pmPicks').textContent=profile.chose.length;
  pm.querySelector('[data-pm="read"]').setAttribute('aria-checked',autoRead); }
function learn(s,named){
  profile.asks++;
  moodsIn(s).forEach(m=>{profile.moods[m]=(profile.moods[m]||0)+1;});
  if(named&&/loved|liked|enjoyed|favourite|favorite/.test(s)){ pushU(profile.loved,named.t); named.m.forEach(m=>{profile.moods[m]=(profile.moods[m]||0)+1;}); }
  const who=(s.match(/\b(mom|mum|mother|dad|father|wife|husband|sister|brother|friend|boss|son|daughter|niece|nephew|grandma|grandpa|teenager|teen)\b/)||[])[1]; if(who) pushU(profile.forWhom,who==='mom'?'mum':who);
  const age=(s.match(/(\d{1,2})\s*-?\s*(year|yr)/)||[])[1]; if(age) pushU(profile.forWhom,`a ${age}-year-old`);
  if(/short|quick|commute|lighter/.test(s)) pushU(profile.prefs,'Shorter reads');
  if(/audio|listen|audible/.test(s)) pushU(profile.prefs,'Likes audio');
  if(/gift|present|birthday/.test(s)) pushU(profile.prefs,'Buys books as gifts');
  saveProfile();
}
function renderSide(){
  const chips=[]; const tm=topMoods();
  if(tm.length) chips.push(`<span><b>Into</b>${tm.map(m=>MWL[m]).join(', ')}</span>`);
  profile.loved.forEach(t=>chips.push(`<span><b>Loved</b>${esc(t)}</span>`));
  profile.forWhom.forEach(w=>chips.push(`<span><b>Buying for</b>${esc(w)}</span>`));
  profile.prefs.forEach(p=>chips.push(`<span>${esc(p)}</span>`));
  profile.chose.forEach(t=>chips.push(`<span><b>Picked</b>${esc(t)}</span>`));
  document.getElementById('profChips').innerHTML=chips.length?chips.join(''):'<p class="pempty">Start chatting. Penguin learns your taste here as you go, no sign-up needed.</p>';
  const sl=profile.shortlist.map(byTitle).filter(Boolean);
  document.getElementById('slCount').textContent=sl.length?`${sl.length}`:'';
  document.getElementById('slList').innerHTML=sl.length?sl.map(b=>`<div class="sl-item" data-cat="${b.id}"><img src="${b.img}" alt="" /><button type="button" class="t" data-sl="ask">${esc(nm(b))}<span>${esc(b.a)}</span></button><button type="button" class="rm" data-sl="rm" aria-label="Remove ${esc(b.t)} from shortlist">✕</button></div>`).join('')
    :'<p class="pempty">Tap ♡ on any book Penguin suggests to keep it here.</p>';
  document.getElementById('slChoose').disabled=sl.length<2;
  document.getElementById('sideBtn').textContent=innerWidth<480?`♥ ${sl.length}`:`♥ ${sl.length} · Profile`;
  document.querySelectorAll('#aiBody .bcard').forEach(c=>{ const b=CATALOG[+c.dataset.cat], on=profile.shortlist.includes(b.t), x=c.querySelector('.sl'); if(x){x.classList.toggle('on',on); x.textContent=on?'♥ Shortlisted':'♡ Shortlist';} });
}
let nudged=false;
function toggleShort(b){
  const i=profile.shortlist.indexOf(b.t); if(i>=0) profile.shortlist.splice(i,1); else { profile.shortlist.push(b.t); b.m.forEach(m=>{profile.moods[m]=(profile.moods[m]||0)+.5;}); }
  saveProfile();
  if(profile.shortlist.length===2&&!nudged){ nudged=true; setTimeout(()=>{ bot('Two on your shortlist. Want me to help you choose between them?'); setTimeout(()=>add(['Help me choose','Keep browsing'].map(c=>`<button type="button">${c}</button>`).join(''),'follow'),prefersReduced?0:900); },300); }
}
document.getElementById('aiSide').addEventListener('click',e=>{
  if(e.target.closest('#slChoose')){ panel.classList.remove('side-open'); return ask('Help me choose'); }
  if(e.target.closest('#profClear')){ profile={moods:{},loved:[],forWhom:[],prefs:[],shortlist:[],chose:[],asks:0}; saveProfile(); return toast2('Your reader profile has been cleared from this browser.'); }
  const it=e.target.closest('[data-sl]'); if(!it) return; const b=CATALOG[+it.closest('.sl-item').dataset.cat];
  if(it.dataset.sl==='rm') toggleShort(b); else { panel.classList.remove('side-open'); ask(`Tell me about ${b.t}`); }
});
document.getElementById('sideBtn').onclick=()=>panel.classList.toggle('side-open');
renderSide();

// read-aloud (browser speech) and voice input (Chrome/Edge speech recognition)
const toast2=msg=>{const t=document.getElementById('toast2'); t.textContent=msg; t.classList.add('show'); clearTimeout(toast2.t); toast2.t=setTimeout(()=>t.classList.remove('show'),3200);};
let speakingBtn=null;
function stopSpeech(){ if(window.speechSynthesis) speechSynthesis.cancel(); document.querySelectorAll('.say.on,[data-speak].on').forEach(x=>x.classList.remove('on')); speakingBtn=null; }
function speak(text,btn){
  if(!window.speechSynthesis) return toast2("Read-aloud isn't supported in this browser.");
  if(btn&&speakingBtn===btn&&speechSynthesis.speaking) return stopSpeech();
  stopSpeech(); const u=new SpeechSynthesisUtterance(String(text).replace(/[✦🐧🔊🎧]/g,''));
  const v=speechSynthesis.getVoices(); u.voice=v.find(x=>/en-IN/i.test(x.lang))||v.find(x=>/en-GB/i.test(x.lang))||v.find(x=>/^en/i.test(x.lang))||null;
  u.lang=u.voice?u.voice.lang:'en-IN'; u.rate=1;
  if(btn){btn.classList.add('on'); speakingBtn=btn;}
  u.onend=u.onerror=()=>{ if(btn) btn.classList.remove('on'); if(speakingBtn===btn) speakingBtn=null; };
  speechSynthesis.speak(u);
}
const SR=window.SpeechRecognition||window.webkitSpeechRecognition; let rec=null;
function listenInto(input,btn,onDone){
  if(!SR) return toast2('Voice input works in Chrome and Edge. You can type your request instead.');
  if(rec){ rec.stop(); return; }
  rec=new SR(); rec.lang='en-IN'; rec.interimResults=true; let said='';
  btn.classList.add('rec'); btn.setAttribute('aria-pressed','true');
  rec.onresult=e=>{ said=[...e.results].map(r=>r[0].transcript).join(''); input.value=said; input.dispatchEvent(new Event('input')); };
  rec.onerror=e=>{ if(e.error==='not-allowed'||e.error==='service-not-allowed') toast2('Microphone access is blocked. Allow it in your browser to talk to Penguin.'); };
  rec.onend=()=>{ btn.classList.remove('rec'); btn.setAttribute('aria-pressed','false'); rec=null; if(said.trim()) onDone(said.trim()); };
  try{ rec.start(); }catch(err){ btn.classList.remove('rec'); rec=null; }
}
document.getElementById('heroMic').onclick=e=>listenInto(aiS,e.currentTarget,q=>runAiSearch(q));
document.getElementById('chatMic').onclick=e=>{const i=document.getElementById('aiQ'); listenInto(i,e.currentTarget,q=>{i.value=''; ask(q);});};
let autoRead=false;
document.getElementById('autoRead').onclick=e=>{ autoRead=!autoRead; e.currentTarget.setAttribute('aria-pressed',autoRead); e.currentTarget.textContent=autoRead?'🔊':'🔈';
  toast2(autoRead?"Penguin will read its answers aloud.":"Read-aloud is off."); if(!autoRead) stopSpeech(); };

