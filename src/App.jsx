import { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Code, 
  BookOpen, 
  Camera, 
  ChevronDown, 
  ChevronUp, 
  Github, 
  Instagram, 
  Linkedin, 
  ExternalLink,
  Mail,
  X,
  Cpu,
  Globe,
  Award,
  Zap,
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Search 
} from 'lucide-react';

// --- CUSTOM CSS FOR NATIVE ANIMATIONS ---
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

  :root {
    --primary: #3b82f6; /* Blue-500 */
    --primary-glow: rgba(59, 130, 246, 0.5);
    --dark: #020617;
  }

  /* GLOBAL SMOOTH SCROLL - WAJIB ADA */
  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Space Grotesk', sans-serif;
    background-color: var(--dark);
    color: #e2e8f0;
    overflow-x: hidden;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #0f172a; 
  }
  ::-webkit-scrollbar-thumb {
    background: #1e293b; 
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--primary); 
  }

  /* Animations */
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }

  @keyframes pulse-glow {
    0% { box-shadow: 0 0 0 0 var(--primary-glow); }
    70% { box-shadow: 0 0 0 15px rgba(59, 130, 246, 0); }
    100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
  }

  @keyframes slide-in-right {
    from { transform: translateX(50px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .cursor-blink {
    animation: blink 1s step-end infinite;
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-pulse-glow {
    animation: pulse-glow 2s infinite;
  }

  .animate-slide-in {
    animation: slide-in-right 0.5s ease-out forwards;
  }

  .glass-card {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  
  .glass-card:hover {
    background: rgba(30, 41, 59, 0.7);
    border-color: rgba(59, 130, 246, 0.3);
  }

  .glass-input {
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
  }

  .glass-input:focus {
    border-color: var(--primary);
    outline: none;
    box-shadow: 0 0 15px var(--primary-glow);
  }

  .hero-gradient {
    background: radial-gradient(circle at 50% 50%, #172554 0%, #020617 50%);
  }
  
  .text-glow {
    text-shadow: 0 0 20px var(--primary-glow);
  }
`;

// --- HELPER FUNCTION UNTUK GAMBAR RUSAK ---
const handleImageError = (e) => {
  e.target.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Fallback&backgroundColor=cce4f7";
};

const handleProjectImageError = (e) => {
  e.target.src = "https://placehold.co/600x400/1e293b/white?text=Project+Image";
};

// --- DATA ---

const lecturerData = {
  name: "M. Yusuf Ramadhan, S.AB., M.AB.",
  role: "Academic Advisor",
  quote: "Membangun pondasi logika yang kuat untuk masa depan digital.",
  image: "/Image/pakyusuf.png", 
  email: "muhamadyusuframadhan@telkomuniversity.ac.id"
};

// --- Data Mahasiswa ---
const studentsData = [
  {
    id: 1,
    name: "Denissa Rahma Putri (Ketua)",
    nim: "607012500052",
    role: "Fullstack Dev",
    image: "/Image/denisa.jpg",
    bio: "Tulis deskripsi singkat atau kata-kata mutiara mahasiswa ini di sini.",
    projects: "Olahin",
    skills: ["HTML", "CSS", "Figma"],
    socials: {
      instagram: "https://www.instagram.com/denissarah.ma/",
      linkedin: "https://www.linkedin.com/in/denissa-rahmaputri/",
      github: "#"
    }
  },
  {
    id: 2,
    name: "Rajiel Jibran Ziya Zidna Fann",
    nim: "607012500099",
    role: "UI/UX Designer",
    image: "/Image/rajiel.jpg",
    bio: "Suka mendesain tampilan web yang user friendly.",
    projects: "KostInt",
    skills: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "HTML", "CSS", "JavaScript"],
    socials: {
      instagram: "https://www.instagram.com/rajiel.jf/",
      linkedin: "https://www.linkedin.com/in/rajiel-jibran-ziya-zidna-fann-421a4a388/",
      github: "#"
    }
  },
  {
    id: 3,
    name: "Dinda Revalina Rahman",
    nim: "607012500002",
    role: "Fullstack Dev",
    image: "/Image/dinda.jpg", 
    bio: "Tulis deskripsi singkat atau kata-kata mutiara mahasiswa ini di sini.",
    projects: "Olahin",
    skills: ["HTML", "CSS", "Figma"],
    socials: {
      instagram: "https://www.instagram.com/dindarva/",
      linkedin: "https://www.linkedin.com/in/dinda-revalina-rahman-107856388/",
      github: "#"
    }
  },
  {
    id: 4,
    name: "Rangga Putra Ananda",
    nim: "607012500004",
    role: "UI/UX Designer",
    image: "/Image/rangga.jpg",
    bio: "Suka mendesain tampilan web yang user friendly.",
    projects: "Gerai.Fox",
    skills: ["Figma", "Adobe XD"],
    socials: {
      instagram: "https://www.instagram.com/rnggaptrannda/",
      linkedin: "https://www.linkedin.com/in/rangga-putra-ananda-36385a388/",
      github: "#"
    }
  },
  {
    id: 5,
    name: "Habib Azmi",
    nim: "607012500006",
    role: "UI/UX Designer",
    image: "/Image/habib.jpg",
    bio: "Tulis deskripsi singkat atau kata-kata mutiara mahasiswa ini di sini.",
    projects: "Ascenda",
    skills: ["HTML", "CSS", "Figma"],
    socials: {
      instagram: "https://www.instagram.com/xenorrra/",
      linkedin: "https://www.linkedin.com/in/habib-azmi-6a1100348/",
      github: "#"
    }
  },
  {
    id: 6,
    name: "Nevi Suryani",
    nim: "607012500008",
    role: "UI/UX Designer",
    image: "/Image/nevi.jpg",
    bio: "Suka mendesain tampilan web yang user friendly.",
    projects: "Lombify",
    skills: ["Figma", "Adobe XD"],
    socials: {
      instagram: "https://www.instagram.com/nevisynn/",
      linkedin: "https://www.linkedin.com/in/nevi-suryani-195857388/",
      github: "#"
    }
  },
  {
    id: 7,
    name: "Afifa",
    nim: "607012530001",
    role: "Fullstack Dev",
    image: "/Image/afifa.jpg",
    bio: ".",
    projects: "TuNotes",
    skills: ["HTML", "CSS", "Figma"],
    socials: {
      instagram: "https://www.instagram.com/fffhaaa_/",
      linkedin: "https://www.linkedin.com/in/afifa-fa-5a102438a/",
      github: "#"
    }
  },
  {
    id: 8,
    name: "Al Nazira Sudirman",
    nim: "607012500093",
    role: "Data Analyst",
    image: "/Image/alnazira.jpg",
    bio: "Suka mendesain tampilan web yang user friendly.",
    projects: "BeautyVerse",
    skills: ["Figma", "Adobe XD"],
    socials: {
      instagram: "https://www.instagram.com/alnaziras/",
      linkedin: "https://www.linkedin.com/in/alnazirasudirman/",
      github: "#"
    }
  },
  {
    id: 9,
    name: "Almira Kalila Hatibie",
    nim: "607012500059",
    role: "Mobile Dev",
    image: "/Image/almira.jpg",
    bio: "Tulis deskripsi singkat atau kata-kata mutiara mahasiswa ini di sini.",
    projects: "Studymate",
    skills: ["HTML", "CSS", "Figma"],
    socials: {
      instagram: "https://www.instagram.com/a_mimiraa/",
      linkedin: "https://www.linkedin.com/in/almira-kalila-hatibie-14880838a/",
      github: "#"
    }
  },
  {
    id: 10,
    name: "Angel Junifa",
    nim: "607012500014",
    role: "Project Manager",
    image: "/Image/angel.jpg",
    bio: "Suka mendesain tampilan web yang user friendly.",
    projects: "KostInt",
    skills: ["Figma", "Adobe XD"],
    socials: {
      instagram: "https://www.instagram.com/enjlyn_13/",
      linkedin: "https://www.linkedin.com/in/angel-junifa-2a2842388/",
      github: "#"
    }
  },
  {
    id: 11,
    name: "Apriano Trisvan Yulistira",
    nim: "607012500077",
    role: "Fullstack Dev",
    image: "/Image/apriano.jpg",
    bio: ".",
    projects: "Studymate",
    skills: ["HTML", "CSS", "Figma"],
    socials: {
      instagram: "https://www.instagram.com/_apree/",
      linkedin: "https://www.linkedin.com/in/apriano-trisvan-02762a321/",
      github: "#"
    }
  },
  {
    id: 12,
    name: "Azzahra Aulia Rahmah",
    nim: "607012500084",
    role: "Programmer",
    image: "/Image/azzahra.jpg",
    bio: "Suka mendesain tampilan web yang user friendly.",
    projects: "LUMIERE",
    skills: ["Figma", "Adobe XD"],
    socials: {
      instagram: "https://www.instagram.com/zahraarhmh/",
      linkedin: "https://www.linkedin.com/in/azzahra-aulia-rahmah-059840388/",
      github: "#"
    }
  },
  {
    id: 13,
    name: "Daffa Satrya Bara Pratama",
    nim: "607012500048",
    role: "Cyber Security",
    image: "/Image/daffa.jpg",
    bio: "Tulis deskripsi singkat atau kata-kata mutiara mahasiswa ini di sini.",
    projects: "Ascenda",
    skills: ["HTML", "CSS", "Figma"],
    socials: {
      instagram: "https://www.instagram.com/d.satryabara.p/",
      linkedin: "https://www.linkedin.com/in/daffa-satrya-bara-pratama-3262b333b/",
      github: "#"
    }
  },
  {
    id: 14,
    name: "Dava Aryadhinata",
    nim: "607012500035",
    role: "UI/UX Designer",
    image: "/Image/dava.jpg",
    bio: "Suka mendesain tampilan web yang user friendly.",
    projects: "LUMIERE",
    skills: ["Figma", "Adobe XD"],
    socials: {
      instagram: "https://www.instagram.com/dappudappuu/",
      linkedin: "https://www.linkedin.com/in/dava-aryadhinata-1bb15838a/",
      github: "#"
    }
  },
  {
    id: 15,
    name: "Deandra Ramadhani",
    nim: "607012500060",
    role: "Project Manager",
    image: "/Image/deandra.jpg",
    bio: "Kalau Stress Jajan Popmart Solusinya.",
    projects: "KostInt",
    skills: ["HTML", "CSS", "Figma", "Canva"],
    socials: {
      instagram: "https://www.instagram.com/ddndra_/",
      linkedin: "https://www.linkedin.com/in/deandra-ramadhani-7a7838388/",
      github: "#"
    }
  },
  {
    id: 16,
    name: "Delia Sahla Nufadilah",
    nim: "607012500096",
    role: "UI/UX Designer",
    image: "/Image/delia.jpg",
    bio: "Suka mendesain tampilan web yang user friendly.",
    projects: "BeautyVerse",
    skills: ["Figma", "Adobe XD"],
    socials: {
      instagram: "https://www.instagram.com/deliasahlaaa/",
      linkedin: "https://www.linkedin.com/in/delia-sahla-6b5005389/",
      github: "#"
    }
  },
  {
    id: 17,
    name: "Laikaa Athaya Putri Khanza",
    nim: "607012500103",
    role: "Cyber Security",
    image: "/Image/laikaa.jpg",
    bio: "Suka mendesain tampilan web yang user friendly.",
    projects: "BeautyVerse",
    skills: ["Figma", "Adobe XD"],
    socials: {
      instagram: "https://www.instagram.com/layy_khnz/",
      linkedin: "https://www.linkedin.com/in/laikaa-athaya-putri-khanza-137860388/",
      github: "#"
    }
  },
  {
    id: 18,
    name: "Farrel Dafikhaliq",
    nim: "607012500012",
    role: "Fullstack Dev",
    image: "/Image/farrel.jpg",
    bio: "Tulis deskripsi singkat atau kata-kata mutiara mahasiswa ini di sini.",
    projects: "Olahin",
    skills: ["HTML", "CSS", "Figma"],
    socials: {
      instagram: "https://www.instagram.com/farreell2525/",
      linkedin: "https://www.linkedin.com/in/farrel-dafikhaliq-75ab24312/",
      github: "#"
    }
  },
  {
    id: 19,
    name: "Lagyf Husayni",
    nim: "607012500026",
    role: "Fullstack Dev",
    image: "/Image/lagyf.jpg",
    bio: "Suka mendesain tampilan web yang user friendly.",
    projects: "Studymate",
    skills: ["Figma", "Adobe XD"],
    socials: {
      instagram: "https://www.instagram.com/husayns_13/",
      linkedin: "https://www.linkedin.com/in/lagyf-husayni-7a104338a/",
      github: "#"
    }
  },
  {
    id: 20,
    name: "Marcel Agustinus Hutahaean",
    nim: "607012500076",
    role: "Progammer",
    image: "/Image/marcel.jpg",
    bio: "Tulis deskripsi singkat atau kata-kata mutiara mahasiswa ini di sini.",
    projects: "Lombify",
    skills: ["HTML", "CSS", "Figma"],
    socials: {
      instagram: "https://www.instagram.com/_marcellagt/",
      linkedin: "https://www.linkedin.com/in/marcel-agustinus-hutahaean-33946a38a/",
      github: "#"
    }
  },
  {
    id: 21,
    name: "Mochamad Hafizh Hakwan",
    nim: "607012500109",
    role: "UI/UX Designer",
    image: "/Image/hafizh.jpg",
    bio: "Humble Person (Yapper Final Boss)",
    projects: "Gerai.Fox",
    skills: ["Figma", "Adobe XD"],
    socials: {
      instagram: "https://www.instagram.com/hkwaan_/",
      linkedin: "https://www.linkedin.com/in/mochamad-hafizh-hakwan-b0298b388/",
      github: "#"
    }
  },
  {
    id: 22,
    name: "Muhammad Fadhil Abdillah",
    nim: "607012500087",
    role: "Mobile Dev",
    image: "/Image/fadhil.jpg",
    bio: "Suka mendesain tampilan web yang user friendly.",
    projects: "KostInt",
    skills: ["Figma", "Adobe XD"],
    socials: {
      instagram: "https://www.instagram.com/fdhil__52/",
      linkedin: "https://www.linkedin.com/in/muhammad-fadhil-abdillah-153a37388/",
      github: "#"
    }
  },
  {
    id: 23,
    name: "Muhammad Reeyhan",
    nim: "607012500105",
    role: "Mobile Dev",
    image: "/Image/reeyhan.jpg",
    bio: "Suka mendesain tampilan web yang user friendly.",
    projects: "KostInt",
    skills: ["Figma", "Adobe XD"],
    socials: {
      instagram: "https://www.instagram.com/muhammad_reeyhan/",
      linkedin: "https://www.linkedin.com/in/muhammad-reeyhan-153a37388/",
      github: "#"
    }
  },
  {
    id: 24,
    name: "Mutiara Cinta Pratiwi",
    nim: "607012500040",
    role: "UI/UX Designer",
    image: "/Image/mutiara.jpg",
    bio: "Suka mendesain tampilan web yang user friendly.",
    projects: "Gerai.Fox",
    skills: ["Figma", "Adobe XD"],
    socials: {
      instagram: "https://www.instagram.com/amoo0rrr/",
      linkedin: "https://www.linkedin.com/in/mutiara-cinta-pratiwi-03a714388/",
      github: "#"
    }
  },
  {
    id: 25,
    name: "Naufal Azmi Algifari",
    nim: "607012500063",
    role: "Fullstack Dev",
    image: "/Image/naufal.jpg",
    bio: "Tulis deskripsi singkat atau kata-kata mutiara mahasiswa ini di sini.",
    projects: "TuNotes",
    skills: ["HTML", "CSS", "Figma"],
    socials: {
      instagram: "https://www.instagram.com/naz_all_/",
      linkedin: "https://www.linkedin.com/in/naufal-azmi-alghifarri-55869838b/",
      github: "#"
    }
  },
  {
    id: 26,
    name: "Nurjihaan Hasna Haasyimiyyah",
    nim: "607012500007",
    role: "UI/UX Designer",
    image: "/Image/nurjihaan.jpg",
    bio: "Suka mendesain tampilan web yang user friendly.",
    projects: "Gerai.Fox",
    skills: ["Figma", "Adobe XD"],
    socials: {
      instagram: "https://www.instagram.com/_sugarxj/",
      linkedin: "https://www.linkedin.com/in/nurjihaan-hasna-haasyimiyyah-a86a45388/",
      github: "#"
    }
  },
  {
    id: 27,
    name: "Reihan Muhammad Ikhlas",
    nim: "607012500018",
    role: "UI/UX Designer",
    image: "/Image/reihan.jpg",
    bio: "Suka mendesain tampilan web yang user friendly.",
    projects: "Gerai.Fox",
    skills: ["Figma", "Adobe XD"],
    socials: {
      instagram: "https://www.instagram.com/reih_muha_/",
      linkedin: "https://www.linkedin.com/in/reihan-muhammad-ikhlas-b91079389/",
      github: "#"
    }
  },
  {
    id: 28,
    name: "Vito Mayshandi",
    nim: "607012500094",
    role: "UI/UX Designer",
    image: "/Image/vito.jpg",
    bio: "Suka mendesain tampilan web yang user friendly.",
    projects: "Gerai.Fox",
    skills: ["Figma", "Adobe XD"],
    socials: {
      instagram: "https://www.instagram.com/vitomyshnd/",
      linkedin: "https://www.linkedin.com/in/vito-mayshandi-10974a36b/",
      github: "#"
    }
  }
];

const projectsData = [
  {
    id: 1,
    title: "Sistem Manajemen Lab",
    status: "Ongoing",
    desc: "Platform terintegrasi untuk peminjaman alat laboratorium dan penjadwalan asisten praktikum.",
    tech: ["Laravel", "React", "MySQL"],
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a785?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    title: "Aplikasi Kantin Pintar",
    status: "Completed",
    desc: "Aplikasi pemesanan makanan di kantin TULT dengan fitur pembayaran QRIS otomatis.",
    tech: ["Flutter", "Firebase", "Go"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    title: "IoT Smart Parking",
    status: "Ongoing",
    desc: "Sistem deteksi parkir kosong di Gedung TULT menggunakan sensor ultrasonik dan dashboard real-time.",
    tech: ["Arduino", "Python", "MQTT"],
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600"
  },
   {
    id: 4,
    title: "Portal Organisasi Mahasiswa",
    status: "Completed",
    desc: "Web portal untuk pendaftaran dan manajemen kegiatan organisasi kemahasiswaan.",
    tech: ["Next.js", "Supabase", "Tailwind"],
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=600"
  }
];

const memoriesData = [
  { type: 'image', src: "/Image/memory/bareng_kak_feb.JPG", caption: "Campus Tour With Kak Feb" },
  { type: 'image', src: "/Image/memory/selesai_studentfair.JPG", caption: "Campus Tour" },
  { type: 'image', src: "/Image/memory/foto_grup_cewek.JPG", caption: "Campus Tour With Kak Feb" },
  { type: 'image', src: "/Image/memory/studio1.JPG", caption: "Class Photo Session" },
  { type: 'image', src: "/Image/memory/studio3.JPG", caption: "Class Photo Session" },
  { type: 'image', src: "/Image/memory/studio2.JPG", caption: "Class Photo Session" },
  { type: 'image', src: "/Image/memory/last_pkkmb1.JPG", caption: "Last Day PKKMB" },
  { type: 'image', src: "/Image/memory/last_pkkmb2.JPG", caption: "Last Day PKKMB" },
  { type: 'image', src: "/Image/memory/last_pkkmb3.JPG", caption: "Last Day PKKMB" },
  { type: 'image', src: "/Image/memory/lo2.JPG", caption: "Best Liaison Officer" },
  { type: 'image', src: "/Image/memory/lo1.JPG", caption: "Best Liaison Officer" },
  { type: 'image', src: "/Image/memory/lo3.JPG", caption: "Best Liaison Officer" },
  { type: 'image', src: "/Image/memory/praktikum1.jpeg", caption: "After Coding Session" },
  { type: 'image', src: "/Image/memory/praktikum2.jpeg", caption: "After Coding Session" },
  { type: 'image', src: "/Image/memory/random5.jpg", caption: "Mirror Selfie" },
  { type: 'image', src: "/Image/memory/random6.jpg", caption: "Mirror Selfie" },
  { type: 'image', src: "/Image/memory/random7.jpg", caption: "Mirror Selfie" },
  { type: 'image', src: "/Image/memory/random8.jpg", caption: "Mirror Selfie" },
  { type: 'image', src: "/Image/memory/random9.jpg", caption: "Mirror Selfie" },
  { type: 'image', src: "/Image/memory/random10.jpg", caption: "Mirror Selfie" },
  { type: 'image', src: "/Image/memory/random11.jpg", caption: "Mirror Selfie" },
  { type: 'image', src: "/Image/memory/random12.jpg", caption: "Mirror Selfie" },
  { type: 'image', src: "/Image/memory/random13.jpg", caption: "Mirror Selfie" },
  { type: 'image', src: "/Image/memory/random14.jpg", caption: "Mirror Selfie" },
];

// --- COMPONENTS ---

const TypingText = ({ textArray, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeedState, setTypingSpeedState] = useState(typingSpeed);

  useEffect(() => {
    let timer;
    const handleTyping = () => {
      const i = loopNum % textArray.length;
      const fullText = textArray[i];

      setDisplayedText(isDeleting 
        ? fullText.substring(0, displayedText.length - 1) 
        : fullText.substring(0, displayedText.length + 1)
      );

      setTypingSpeedState(isDeleting ? deletingSpeed : typingSpeed);

      if (!isDeleting && displayedText === fullText) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    timer = setTimeout(handleTyping, typingSpeedState);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, loopNum, textArray, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="text-blue-500 font-bold">
      {displayedText}
      <span className="cursor-blink">|</span>
    </span>
  );
};

const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!show) return null;

  return (
    <button 
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-500 transition-all hover:-translate-y-1 animate-fadeIn"
    >
      <ChevronUp size={24} />
    </button>
  );
};

const ScrollReveal = ({ children, delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setVisible(true);
      });
    }, { threshold: 0.1 });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Our Class', id: 'about' },
    { name: 'Students', id: 'students' },
    { name: 'Projects', id: 'projects' },
    { name: 'Memories', id: 'memories' },
  ];

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenu(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-blue-500/10 py-4 shadow-lg shadow-blue-900/5' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* REBRANDING D3SI */}
        <div className="text-xl font-bold tracking-tight flex items-center gap-3 group cursor-pointer" onClick={() => scrollTo('home')}>
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(37,99,235,0.5)]">
            <Cpu size={22} strokeWidth={2.5} />
          </div>
          <span className="text-white font-space text-lg">D3SI<span className="text-blue-500">-49-04</span></span>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button key={link.name} onClick={() => scrollTo(link.id)} className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors relative group">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
            </button>
          ))}
          <button onClick={() => scrollTo('students')} className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_10px_rgba(37,99,235,0.3)] hover:shadow-[0_0_20px_rgba(37,99,235,0.6)] transition-all text-sm font-semibold transform hover:-translate-y-0.5">
            Explore Class
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white hover:text-blue-500 transition-colors" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X /> : <Code />}
        </button>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="absolute top-full left-0 w-full bg-slate-900 border-b border-blue-900/30 p-6 flex flex-col gap-4 animate-fadeIn shadow-2xl">
            {navLinks.map(link => (
              <button key={link.name} onClick={() => scrollTo(link.id)} className="text-left text-lg text-slate-300 hover:text-blue-400 font-medium">
                {link.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setOpacity(0);
            setTimeout(onComplete, 500); // Wait for fade out
          }, 500);
          return 100;
        }
        return prev + 2; // Speed of loading
      });
    }, 20);
    return () => clearInterval(timer);
  }, [onComplete]);

  if (opacity === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center transition-opacity duration-700" style={{ opacity }}>
      <div className="mb-8 relative">
        <div className="w-24 h-24 rounded-full border-t-4 border-r-4 border-blue-500 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-blue-500 font-bold text-xl">
          {progress}%
        </div>
      </div>
      <h1 className="text-3xl font-bold text-white tracking-widest animate-pulse">D3SI-49-04</h1>
      <p className="text-blue-400 mt-2 text-sm tracking-wide">Loading Class Portfolio...</p>
    </div>
  );
};

// --- STUDENT SPOTLIGHT (CAROUSEL) ---
const StudentSlider = ({ students, onSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const next = () => setCurrentIndex((prev) => (prev + 1) % students.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + students.length) % students.length);

  // Auto slide with pause on hover
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(next, 3000); 
    return () => clearInterval(timer);
  }, [isHovered, students.length]);

  // Determine prev, current, next indices
  const prevIndex = (currentIndex - 1 + students.length) % students.length;
  const nextIndex = (currentIndex + 1) % students.length;

  const cards = [
    { data: students[prevIndex], type: 'prev' },
    { data: students[currentIndex], type: 'current' },
    { data: students[nextIndex], type: 'next' }
  ];

  return (
    <div 
      className="w-full max-w-6xl mx-auto my-16 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-center mb-10">
         <h3 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-2 flex items-center justify-center gap-2">
            <Zap size={16} /> Spotlight
         </h3>
         <h2 className="text-2xl md:text-3xl font-bold text-white">Featured Students</h2>
      </div>

      <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
        {/* Navigation Buttons */}
        <button onClick={prev} className="absolute left-4 md:left-10 z-20 p-3 bg-slate-900/80 hover:bg-blue-600 border border-slate-700 text-white rounded-full transition-all backdrop-blur-sm">
          <ChevronLeft size={24} />
        </button>
        <button onClick={next} className="absolute right-4 md:right-10 z-20 p-3 bg-slate-900/80 hover:bg-blue-600 border border-slate-700 text-white rounded-full transition-all backdrop-blur-sm">
          <ChevronRight size={24} />
        </button>

        {/* Carousel Content */}
        <div className="flex items-center justify-center w-full h-full relative">
          {cards.map((item, index) => {
            const isCurrent = item.type === 'current';
            let positionClass = '';
            
            if (item.type === 'prev') positionClass = '-translate-x-[60%] scale-75 opacity-40 blur-[2px] z-0 hidden md:flex';
            if (item.type === 'next') positionClass = 'translate-x-[60%] scale-75 opacity-40 blur-[2px] z-0 hidden md:flex';
            if (isCurrent) positionClass = 'z-10 scale-100 opacity-100 shadow-2xl shadow-blue-900/50';

            return (
              <div 
                key={`${item.data.id}-${item.type}`}
                className={`absolute transition-all duration-700 ease-in-out w-[320px] md:w-[600px] glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 cursor-pointer ${positionClass}`}
                onClick={() => isCurrent && onSelect(item.data)}
              >
                <div className="relative shrink-0">
                  <img 
                    src={item.data.image} 
                    alt={item.data.name} 
                    className={`rounded-full object-cover border-4 border-slate-900 bg-slate-800 transition-all ${isCurrent ? 'w-32 h-32 md:w-40 md:h-40 border-blue-500' : 'w-24 h-24 border-slate-700'}`}
                    onError={handleImageError}
                  />
                </div>
                
                <div className={`text-center md:text-left ${!isCurrent && 'hidden md:block'}`}>
                  <div className="inline-block px-3 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 mb-2">
                    {item.data.role}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.data.name}</h3>
                  <p className="text-slate-400 text-sm line-clamp-2">{item.data.bio}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const StudentCard = ({ student, onClick }) => (
  <div 
    onClick={() => onClick(student)}
    className="group relative bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden shadow-lg hover:shadow-blue-900/20 flex flex-col h-full"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    
    <div className="flex items-center justify-between mb-6">
      <div className="relative">
        <img 
          src={student.image} 
          alt={student.name} 
          className="w-16 h-16 rounded-2xl bg-slate-800 object-cover border border-slate-700 group-hover:border-blue-500 transition-colors"
          onError={handleImageError}
        />
      </div>
      <div className="px-2 py-1 bg-slate-800 rounded-md border border-slate-700">
         <ArrowRight size={16} className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
      </div>
    </div>
    
    <div className="mt-auto">
      <h3 className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors truncate">{student.name}</h3>
      <p className="text-xs text-slate-500 font-mono tracking-wider mb-3">{student.nim}</p>
      
      <span className="inline-block px-3 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
        {student.role}
      </span>
    </div>
  </div>
);

const ProjectCard = ({ project }) => (
  <div className="glass-card rounded-2xl overflow-hidden group hover:border-blue-500/30 transition-all duration-500 h-full flex flex-col">
    <div className="h-56 overflow-hidden relative">
      <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10"></div>
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        onError={handleProjectImageError}
      />
      <div className="absolute top-4 right-4 px-3 py-1 bg-slate-950/80 backdrop-blur text-xs font-bold rounded-full border border-white/10 text-white z-20 shadow-lg">
        {project.status}
      </div>
    </div>
    <div className="p-8 flex flex-col flex-1">
      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{project.title}</h3>
      <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-1">{project.desc}</p>
      
      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
        {project.tech.map(t => (
          <span key={t} className="text-[10px] px-3 py-1 rounded-full bg-slate-800 text-blue-200 border border-slate-700 font-medium">
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const StudentModal = ({ student, onClose }) => {
  if (!student) return null;
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="bg-slate-900 w-full max-w-4xl rounded-3xl border border-blue-500/20 shadow-2xl shadow-blue-900/20 relative z-10 overflow-hidden flex flex-col md:flex-row animate-fadeInUp">
        
        {/* Sidebar Image */}
        <div className="w-full md:w-2/5 bg-slate-800/50 relative p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
          <img 
            src={student.image} 
            alt={student.name} 
            className="w-48 h-48 rounded-full border-4 border-blue-500 shadow-xl shadow-blue-500/20 mb-6 relative z-10 object-cover bg-slate-800"
            onError={handleImageError}
          />
          <h2 className="text-2xl font-bold text-white relative z-10">{student.name}</h2>
          <p className="text-blue-400 font-mono text-sm relative z-10 mb-8">{student.nim}</p>
          
          <div className="flex gap-3 relative z-10">
            <a 
              href={student.socials.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 bg-slate-800 rounded-xl hover:bg-blue-600 hover:text-white text-slate-400 transition-all border border-slate-700 hover:border-blue-500 hover:-translate-y-1 flex items-center justify-center"
            >
              <Instagram size={20} />
            </a>
            
            <a 
              href={student.socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 bg-slate-800 rounded-xl hover:bg-blue-600 hover:text-white text-slate-400 transition-all border border-slate-700 hover:border-blue-500 hover:-translate-y-1 flex items-center justify-center"
            >
              <Linkedin size={20} />
            </a>
            
            <a 
              href={student.socials.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 bg-slate-800 rounded-xl hover:bg-blue-600 hover:text-white text-slate-400 transition-all border border-slate-700 hover:border-blue-500 hover:-translate-y-1 flex items-center justify-center"
            >
              <Github size={20} />
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 md:p-12 relative overflow-y-auto max-h-[60vh] md:max-h-auto">
          <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors bg-slate-800/50 p-2 rounded-full"><X size={20} /></button>
          
          <div className="mb-8">
            <h3 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Users size={14} /> About Me
            </h3>
            <p className="text-slate-300 leading-relaxed text-lg font-light">{student.bio}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-slate-800/30 p-4 rounded-xl border border-white/5">
              <h3 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                 <Monitor size={14} /> Role
              </h3>
              <p className="text-white font-medium text-lg">{student.role}</p>
            </div>
            <div className="bg-slate-800/30 p-4 rounded-xl border border-white/5">
              <h3 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                 <Code size={14} /> Project
              </h3>
              <p className="text-white font-medium text-lg">{student.projects}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3 flex items-center gap-2">
               <Zap size={14} /> Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {student.skills.map(skill => (
                <span key={skill} className="px-4 py-2 bg-slate-800 text-slate-200 rounded-lg text-sm border border-slate-700 hover:border-blue-500 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = studentsData.filter(s => {
    const matchesRole = filter === "All" || s.role === filter;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.nim.includes(searchQuery);
    return matchesRole && matchesSearch;
  });

  const roles = ["All", ...new Set(studentsData.map(s => s.role))];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <style>{customStyles}</style>
      
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      
      <div className={`min-h-screen bg-slate-950 transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        {selectedStudent && <StudentModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />}
        <BackToTop />

        {/* --- HERO SECTION --- */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
             <div className="absolute top-20 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] animate-pulse"></div>
             <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="container mx-auto px-6 text-center relative z-10 pt-20">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-900/20 border border-blue-500/20 backdrop-blur mb-8 animate-slide-in">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              <span className="text-sm font-semibold text-blue-300 tracking-wider">TELKOM UNIVERSITY 2025</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-white mb-8 tracking-tight leading-none animate-fadeInUp">
              We are <br className="md:hidden" /> 
              <TypingText textArray={["Developers", "Designers", "Innovators", "D3SI-49-04"]} />
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed animate-fadeInUp delay-200">
              Membangun masa depan digital dengan kode, logika, dan inovasi. 
              <br className="hidden md:block"/> Kami adalah 28 talenta siap berkarya.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-6 animate-fadeInUp delay-300">
              <button 
                onClick={() => scrollToSection('about')}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-600/30 flex items-center justify-center gap-3"
              >
                Start Journey <ArrowRight size={20} />
              </button>
              <button 
                 onClick={() => scrollToSection('students')}
                 className="px-8 py-4 bg-transparent border border-white/10 hover:bg-white/5 hover:border-blue-500/50 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-3"
              >
                View Students <Users size={20} />
              </button>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-blue-500/50">
            <ChevronDown size={32} />
          </div>
        </section>

        {/* --- ABOUT & LECTURER --- */}
        <section id="about" className="py-32 relative bg-slate-900/50 border-t border-white/5">
          <div className="container mx-auto px-6 relative z-10">
            
            <ScrollReveal>
               <div className="text-center mb-16">
                 <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">About <span className="text-blue-500">Our Class</span></h2>
                 <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                   D3SI-49-04 adalah rumah bagi 28 mahasiswa D3 Sistem Informasi yang berdedikasi.
                   Kami belajar, tumbuh, dan berinovasi bersama di Telkom University.
                 </p>
               </div>
            </ScrollReveal>

            {/* CLASS PHOTO (FULL WIDTH) */}
            <ScrollReveal>
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group w-[92%] mx-auto mb-12">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
                <img 
                  src="/Image/class_photo.jpg" 
                  alt="Foto Kelas Formal" 
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 flex justify-between items-end">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Together We Achieve More</h3>
                    <p className="text-slate-300"> Class of 2025 • D3 Sistem Informasi</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            

            {/* LECTURER CARD (BELOW PHOTO, CENTERED) */}
            <ScrollReveal delay={200}>
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 border border-blue-500/20 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-2xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                 
                 <div className="relative shrink-0">
                   <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-br from-blue-500 to-cyan-400">
                     <img src={lecturerData.image} alt={lecturerData.name} className="w-full h-full rounded-full object-cover border-2 border-slate-900" />
                   </div>
                   <div className="absolute -bottom-1 -right-1 bg-blue-600 p-1.5 rounded-full text-white border-4 border-slate-900">
                     <Award size={20} />
                   </div>
                 </div>

                 <div className="text-center md:text-left">
                   <div className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">Dosen Wali</div>
                   <h3 className="text-2xl font-bold text-white mb-2">{lecturerData.name}</h3>
                   <p className="text-slate-500 mb-4">{lecturerData.role}</p>

                   <blockquote className="text-lg text-slate-300 italic mb-6 border-l-4 border-blue-500 pl-4 leading-relaxed">
                      "{lecturerData.quote}"
                   </blockquote>
                   
                   <a href={`mailto:${lecturerData.email}`} className="inline-flex items-center justify-center gap-2 text-white bg-slate-700 hover:bg-blue-600 px-6 py-2.5 rounded-xl transition-all font-medium border border-slate-600 hover:border-blue-500 text-sm">
                      <Mail size={16} /> Contact Lecturer
                   </a>
                 </div>
              </div>
            </ScrollReveal>

            {/* Student Slider Section */}
            <ScrollReveal delay={300}>
               <StudentSlider students={studentsData} onSelect={setSelectedStudent} />
            </ScrollReveal>

          </div>
        </section>

        {/* --- STUDENTS GRID --- */}
        <section id="students" className="py-32 bg-slate-950 relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
          <div className="container mx-auto px-6">
            
            {/* NEW HEADER LAYOUT (CENTERED) */}
            <div className="flex flex-col items-center justify-center text-center mb-16 gap-8">
              
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">All <span className="text-blue-500">Students</span></h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">Daftar lengkap anggota kelas D3SI-49-04.</p>
              </div>

              {/* Search Bar - Centered */}
              <div className="relative w-full max-w-lg">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Cari nama atau NIM..." 
                  className="w-full pl-12 pr-6 py-4 glass-input rounded-full text-white focus:outline-none transition-all border border-slate-700 focus:border-blue-500 bg-slate-900/80 shadow-2xl focus:shadow-blue-500/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filters - Centered */}
              <div className="flex flex-wrap justify-center gap-3">
                {roles.map(role => (
                  <button
                    key={role}
                    onClick={() => setFilter(role)}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                      filter === role 
                      ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30 scale-105' 
                      : 'bg-slate-900/50 text-slate-400 border-slate-700 hover:border-blue-500/50 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>

            </div>

            {/* Changed Grid to 3 Cols */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, idx) => (
                  <ScrollReveal key={student.id} delay={idx * 50}>
                    <StudentCard student={student} onClick={setSelectedStudent} />
                  </ScrollReveal>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="inline-block p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                    <p className="text-slate-400 text-lg">Tidak ditemukan mahasiswa dengan kata kunci "{searchQuery}"</p>
                    <button 
                      onClick={() => {setSearchQuery(''); setFilter('All')}} 
                      className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-all"
                    >
                      Reset Filter & Pencarian
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* --- PROJECTS --- */}
        <section id="projects" className="py-32 bg-slate-900/30 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
               <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our <span className="text-blue-500">Projects</span></h2>
               <p className="text-slate-400 max-w-2xl mx-auto">
                 Kami tidak hanya belajar teori, kami membangun solusi nyata.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {projectsData.map((project, idx) => (
                <ScrollReveal key={project.id} delay={idx * 100}>
                  <ProjectCard project={project} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

         {/* --- MEMORIES --- */}
         <section id="memories" className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex items-center justify-between mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-white">Class <span className="text-blue-500">Memories</span></h2>
               <div className="p-3 bg-slate-800 rounded-full border border-slate-700 text-blue-500">
                 <Camera size={24} />
               </div>
            </div>

            {/* UPDATED MEMORIES GRID (LANDSCAPE 3 COLS) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {memoriesData.map((memory, idx) => (
                <ScrollReveal key={idx} delay={idx % 3 * 100}>
                  <div className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-blue-500/50 transition-colors aspect-video shadow-lg">
                    <img 
                      src={memory.src} 
                      alt={memory.caption} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div>
                        <span className="block text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">Moment</span>
                        <span className="text-white font-bold text-lg">{memory.caption}</span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="py-16 border-t border-blue-900/30 bg-slate-950 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
          
          <div className="container mx-auto px-6 text-center">
            <div className="mb-8 flex justify-center items-center gap-3">
               <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                 <Cpu size={24} />
               </div>
               <h2 className="text-2xl font-bold text-white">D3SI-49-04</h2>
            </div>
            
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Sistem Informasi Telkom University Angkatan 2025. 
              Mewujudkan mimpi digital bersama.
            </p>

            <div className="flex justify-center gap-6 mb-12">
              <a href="#" className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all hover:-translate-y-1">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all hover:-translate-y-1">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all hover:-translate-y-1">
                <Mail size={20} />
              </a>
            </div>
            <p className="text-slate-600 text-sm font-mono">
              © 2025 Created with React & Tailwind CSS.
            </p>
          </div>
        </footer>

      </div>
    </>
  );
};

export default App;