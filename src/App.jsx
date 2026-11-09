import { useEffect, useRef, useState } from 'react';
import { Phone, ArrowLeft, ArrowRight, ArrowDown, X, List, Plus, EnvelopeSimple, MapPin, CornersOut, CaretLeft, CaretRight } from '@phosphor-icons/react';

const categories = [{id:'all',label:'כל העבודות'},{id:'kitchen',label:'מטבחים'},{id:'storage',label:'ארונות וספריות'},{id:'doors',label:'דלתות'},{id:'bath',label:'חדרי אמבטיה'}];
const works = [
 ['project-01.jpg','מטבח בגוונים חמים','kitchen','אי מרכזי, חזיתות בהירות ונגיעות עץ'],
 ['project-48.jpg','ספרייה מעץ','storage','פתרון אחסון רחב בהתאמה לחלל'],
 ['extra-03.jpg','דלת כפולה מעוצבת','doors','שילוב של עץ וזכוכית'],
 ['project-03.jpg','מטבח בגוון כהה','kitchen','קווים נקיים וידיות בגוון פליז'],
 ['project-54.jpg','ויטרינה ופינת אחסון','storage','שילוב זכוכית, מדפים ומגירות'],
 ['extra-06.jpg','נגרות לחדר הרחצה','bath','ארון רחב עם משטח וכיורים'],
 ['project-16.jpg','מטבח בגוון טבעי','kitchen','אחסון פתוח לצד חזיתות סגורות'],
 ['project-42.jpg','ארון קיר מעץ','storage','נגרות המותאמת לקיר שלם'],
 ['extra-02.jpg','דלת עץ בגימור קלאסי','doors','פרטי נגרות ופיתוחים'],
 ['project-13.jpg','מטבח בשילוב גוונים','kitchen','חזיתות כהות עם ארונות זכוכית'],
 ['project-59.jpg','אחסון מתחת למדרגות','storage','התאמת הרהיט לצורת החלל'],
 ['extra-11.jpg','יחידת כיור תלויה','bath','משטח עץ בהתאמה אישית'],
 ['project-31.jpg','מטבח עם דלפק','kitchen','משטח עבודה ופתרונות אחסון'],
 ['project-41.jpg','מזנון ויחידת מדפים','storage','רהיט משולב לקיר הסלון'],
 ['extra-05.jpg','דלת פנים בגוון בהיר','doors','מראה נקי ומינימלי'],
 ['extra-07.jpg','ארון אמבטיה בגוון עץ','bath','נגרות מותאמת לפינת הכיור'],
 ['project-06.jpg','מטבח עץ קלאסי','kitchen','חזיתות עץ ומגירות אחסון'],
 ['project-38.jpg','ארון קיר בהיר','storage','דלתות בקווים נקיים'],
 ['extra-04.jpg','דלת בשילוב זכוכית','doors','גוון כהה וניגוד של חומרים'],
].map(([image,title,category,description],id)=>({id,image,title,category,description}));
const asset = name => `${import.meta.env.BASE_URL}assets/${name}`;
function Logo({footer=false}) { return <a href="#home" className={`brand ${footer?'brand-footer':''}`} aria-label="נגריית אל גולן — לראש העמוד"><span>נגריית</span><strong>אל גולן</strong><i/></a> }
function Photo({name,alt,...props}) {return <img src={asset(name)} alt={alt} {...props}/>}
export function App() {
 const [menu,setMenu]=useState(false),[filter,setFilter]=useState('all'),[limit,setLimit]=useState(6),[active,setActive]=useState(null),[scrolled,setScrolled]=useState(false);
 const dialog=useRef(null),opener=useRef(null);
 const filtered=works.filter(w=>filter==='all'||w.category===filter);
 useEffect(()=>{const fn=()=>setScrolled(window.scrollY>80);window.addEventListener('scroll',fn,{passive:true});return()=>window.removeEventListener('scroll',fn)},[]);
 useEffect(()=>{const d=dialog.current;if(active!==null&&!d.open){d.showModal();document.body.style.overflow='hidden'}else if(active===null&&d.open){d.close();document.body.style.overflow='';opener.current?.focus()}},[active]);
 useEffect(()=>{if(!menu)return;const close=e=>{if(e.key==='Escape')setMenu(false)};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close)},[menu]);
 const open=(id,e)=>{opener.current=e.currentTarget;setActive(id)};
 const choose=id=>{setFilter(id);setLimit(6)};
 const move=delta=>setActive(a=>{const index=filtered.findIndex(w=>w.id===a);return filtered[(index+delta+filtered.length)%filtered.length].id});
 const current=works.find(w=>w.id===active);
 function categoryClick(id){choose(id);document.querySelector('#projects')?.scrollIntoView({behavior:'smooth'})}
 return <>
 <a className="skip-link" href="#main">דילוג לתוכן</a>
 <header className={`site-header ${scrolled?'solid':''}`}><div className="nav-wrap"><Logo/><nav className={menu?'nav-open':''} aria-label="ניווט ראשי"><a href="#projects" onClick={()=>setMenu(false)}>העבודות שלנו</a><a href="#about" onClick={()=>setMenu(false)}>הנגרייה</a><a href="#contact" onClick={()=>setMenu(false)}>יוצרים קשר</a></nav><a className="header-phone" href="tel:0544878562"><Phone size={21}/><span dir="ltr">054-4878562</span></a><button className="menu-toggle" aria-expanded={menu} aria-label={menu?'סגירת התפריט':'פתיחת התפריט'} onClick={()=>setMenu(!menu)}>{menu?<X size={26}/>:<List size={26}/>}</button></div></header>
 <main id="main">
 <section className="hero" id="home" aria-labelledby="hero-title"><Photo name="project-01.jpg" alt="מטבח בהתאמה אישית של אל גולן, עם אי מרכזי וחזיתות בגוונים חמים" className="hero-photo" fetchPriority="high"/><div className="hero-shade"/><div className="hero-content"><span className="eyebrow light">נגרות בהתאמה אישית · ירושלים</span><h1 id="hero-title">עץ. דיוק. אופי.</h1><p>נגרות בהתאמה אישית, מהתכנון ועד ההתקנה.</p><div className="hero-actions"><a className="button bronze" href="#contact">לתיאום שיחת היכרות<ArrowLeft size={21}/></a><a className="text-link light-link" href="#projects">גלו את העבודות<ArrowLeft size={19}/></a></div></div><a className="hero-scroll" href="#categories" aria-label="גלילה לתחומי הנגרות"><ArrowDown size={18}/><span>לכל חלל, הפתרון שלו</span></a><div className="hero-caption">מטבח בהתאמה אישית <span>מתוך העבודות שלנו</span></div></section>
 <section className="categories section-wrap" id="categories" aria-labelledby="categories-title"><div className="center-heading"><span/><h2 id="categories-title">לכל חלל, הפתרון שלו.</h2><span/></div><div className="category-grid">{[{id:'kitchen',image:'project-01.jpg',title:'מטבחים בהתאמה אישית'},{id:'doors',image:'extra-03.jpg',title:'דלתות עם אופי'},{id:'storage',image:'project-48.jpg',title:'ארונות, ספריות ורהיטים'}].map(c=><button className="category" key={c.id} onClick={()=>categoryClick(c.id)}><div className="category-image"><Photo name={c.image} alt={c.title} loading="lazy"/><span className="category-open"><ArrowLeft size={22}/></span></div><span className="category-title">{c.title}<ArrowLeft size={19}/></span></button>)}</div></section>
 <section className="about section-wrap" id="about"><div className="about-text"><span className="eyebrow">הנגרייה שלנו</span><h2>מתחילים בהקשבה.<br/>מסיימים בפרטים הקטנים.</h2><p>נגריית אל גולן שבירושלים מייצרת דלתות ורהיטים בהתאמה אישית ללקוחות פרטיים, למוסדות ולארגונים.</p><p>כל חלל מביא איתו מידות, צרכים ואופי משלו. אנחנו מקפידים על בחירת חומרי הגלם, על רמות הגימור ועל יחס אישי לאורך הדרך — כדי שהנגרות תתאים בדיוק למקום ולמי שמשתמש בו.</p><a className="text-link" href="#contact">ספרו לנו מה אתם מתכננים<ArrowLeft size={20}/></a></div><div className="about-image"><Photo name="project-54.jpg" alt="ויטרינה מעוגלת ומגירות עץ שיוצרו בנגריית אל גולן" loading="lazy"/><span className="image-note">עבודת נגרות. עד הפרט האחרון.</span></div></section>
 <section className="projects" id="projects"><div className="section-wrap"><div className="section-heading"><div><span className="eyebrow">העבודות שלנו</span><h2>החומר מספר את הסיפור.</h2></div><p>מבחר פרויקטים מהנגרייה.<br/>לחצו על תמונה למבט מקרוב.</p></div><div className="filters" role="group" aria-label="סינון עבודות לפי תחום">{categories.map(c=><button key={c.id} aria-pressed={filter===c.id} onClick={()=>choose(c.id)}>{c.label}</button>)}</div><div className="projects-grid" aria-live="polite">{filtered.slice(0,limit).map(w=><button className="project" key={w.id} onClick={e=>open(w.id,e)} aria-label={`הגדלת התמונה: ${w.title}`}><div className="project-image"><Photo name={w.image} alt={w.title} loading="lazy"/><span className="zoom"><CornersOut size={22}/></span></div><span className="project-info"><span><strong>{w.title}</strong><small>{w.description}</small></span><ArrowLeft size={21}/></span></button>)}</div><div className="gallery-bottom"><span>{Math.min(limit,filtered.length)} מתוך {filtered.length} עבודות</span>{limit<filtered.length&&<button className="button outline" onClick={()=>setLimit(v=>v+6)}>עוד מהעבודות שלנו<Plus size={20}/></button>}</div></div></section>
 <section className="process section-wrap"><div className="section-heading"><div><span className="eyebrow">מהרעיון אל החלל שלכם</span><h2>בונים את זה יחד.</h2></div><a className="text-link" href="tel:0544878562">מתחילים בשיחה<Phone size={18}/></a></div><div className="steps">{[['01','מקשיבים ומתכננים','מכירים את החלל, את הצרכים ואת הסגנון שלכם, ומגדירים יחד את הפרויקט.'],['02','בוחרים ומדייקים','מתאימים את החומרים, הגוונים ופתרונות האחסון לפרטי התכנון.'],['03','מייצרים ומתקינים','מהעבודה בנגרייה ועד ההתאמה במקום — עם תשומת לב לגימור ולפרטים.']].map(([n,t,p])=><article key={n}><span className="step-number">{n}</span><h3>{t}</h3><p>{p}</p></article>)}</div></section>
 <section className="contact" id="contact"><div className="contact-inner section-wrap"><div><span className="eyebrow light">יש לכם רעיון?</span><h2>בואו ניתן לו<br/>צורה.</h2><p>מטבח חדש, ארון מדויק או רהיט מיוחד.<br/>נשמח לשמוע מה אתם מתכננים.</p></div><div className="contact-details"><a className="contact-phone" href="tel:0544878562"><span>מדברים עם אל גולן</span><strong dir="ltr">054-4878562</strong><Phone size={32}/></a><a className="contact-line" href="mailto:g0544878562@gmail.com"><EnvelopeSimple size={22}/><span dir="ltr">g0544878562@gmail.com</span><ArrowLeft size={20}/></a><div className="contact-line"><MapPin size={22}/><span>רח׳ היוזמה, אזור התעשייה עטרות, ירושלים</span></div><p className="contact-note">אפשר להתקשר או לשלוח לנו מייל עם פרטי הפרויקט.</p></div></div></section>
 </main>
 <footer><div className="footer-top section-wrap"><Logo footer/><p>נגרות בהתאמה אישית.<br/>דלתות ורהיטים עם אופי.</p><a href="#home" className="back-top">בחזרה למעלה<ArrowRight size={19}/></a></div><div className="footer-bottom section-wrap"><span>© {new Date().getFullYear()} נגריית אל גולן</span><span>ירושלים · עבודת עץ, יחס אישי</span></div></footer>
 <a className="mobile-call" href="tel:0544878562"><Phone size={20}/>שיחה עם אל גולן<span dir="ltr">054-4878562</span></a>
 <dialog ref={dialog} className="lightbox" onCancel={e=>{e.preventDefault();setActive(null)}} onClick={e=>{if(e.target===e.currentTarget)setActive(null)}} onKeyDown={e=>{if(e.key==='ArrowLeft'){e.preventDefault();move(1)}if(e.key==='ArrowRight'){e.preventDefault();move(-1)}}} aria-label={current?.title||'תמונת פרויקט'}>{current&&<><button className="lightbox-close" onClick={()=>setActive(null)} aria-label="סגירת התמונה" autoFocus><X size={27}/></button><div className="lightbox-picture"><button className="lightbox-prev" onClick={()=>move(-1)} aria-label="התמונה הקודמת"><CaretRight size={30}/></button><Photo name={current.image} alt={`${current.title} — ${current.description}`}/><button className="lightbox-next" onClick={()=>move(1)} aria-label="התמונה הבאה"><CaretLeft size={30}/></button></div><div className="lightbox-caption"><strong>{current.title}</strong><span>{current.description}</span><small>{filtered.findIndex(w=>w.id===active)+1} / {filtered.length}</small></div></>}</dialog>
 </>
}
