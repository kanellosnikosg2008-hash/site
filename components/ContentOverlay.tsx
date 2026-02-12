"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Utensils, Images, MapPin, Star, Heart, Flame, Leaf, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ContentOverlay() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="relative z-10 w-full">
            {/* Themed Header / Action Bar */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 pointer-events-none"
            >
                <div className="pointer-events-auto">
                    <span className="text-xl font-serif text-white tracking-widest uppercase opacity-90">
                        Iguazu Loutraki
                    </span>
                </div>
                <div className="flex gap-4 pointer-events-auto">
                    <Link
                        href="/menu" 
                        className="px-6 py-2 bg-passion text-white rounded-full font-medium shadow-[0_0_20px_rgba(211,47,47,0.4)] hover:scale-105 transition-all flex items-center gap-2"
                    >
                        <Utensils className="w-4 h-4" />
                        <span className="hidden md:inline">Μενού</span>
                        <span className="md:hidden">Μενού</span>
                    </Link>
                    <button className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-medium hover:bg-white/20 transition-all flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-gold" />
                        <span className="hidden md:inline">Πληροφορίες</span>
                    </button>
                     <div className="relative">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 md:hidden bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white/20 transition-all"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        {isMenuOpen && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-obsidian/90 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-2xl flex flex-col gap-1">
                                <Link href="/" className="px-4 py-3 hover:bg-white/10 rounded-lg text-left">Αρχική</Link>
                                <Link href="/menu" className="px-4 py-3 hover:bg-white/10 rounded-lg text-left">Μενού</Link>
                                <Link href="/gallery" className="px-4 py-3 hover:bg-white/10 rounded-lg text-left">Φωτογραφίες</Link>
                            </div>
                        )}
                    </div>
                </div>
            </motion.header>

            {/* 1) Hero Beat (0-15%) */}
            <section className="h-screen flex items-end justify-center text-center pb-32 md:pb-24 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.8 }}
                >
                    <div className="inline-block px-4 py-1.5 mb-6 border border-gold/30 rounded-full bg-gold/10 backdrop-blur-sm">
                        <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase">
                            M'ONO ΣΤΟ IGUAZU LOUTRAKI
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-8xl font-serif text-white mb-6 tracking-tight drop-shadow-lg leading-tight">
                        <span className="block text-white/90">Ο Καφές που θα</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 italic">
                            Ερωτευτείτε.
                        </span>
                    </h1>

                    <p className="text-base md:text-2xl text-amber-100/80 font-light max-w-2xl mx-auto leading-relaxed mb-8 px-2 md:px-0">
                        Σας προσκαλούμε να δοκιμάσετε το αποκλειστικό χαρμάνι του Αγίου Βαλεντίνου. <br className="hidden md:block" />
                        Φτιαγμένο με αγάπη και μεράκι, για να κάνει την κάθε σας στιγμή ξεχωριστή.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center pointer-events-auto">
                        <Link
                            href="/menu"
                            className="bg-white text-obsidian px-8 py-4 rounded-full font-bold tracking-wide hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center gap-2"
                        >
                            ΜΕΝΟΥ <Utensils className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/gallery"
                            className="px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-medium hover:bg-white/10 transition-colors flex items-center gap-2 group"
                        >
                            ΦΩΤΟΓΡΑΦΙΕΣ <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* 2) Core Features (20-55%) */}
            <section className="min-h-[120vh] flex flex-col justify-center py-20 bg-gradient-to-b from-transparent to-black/80">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto w-full px-6">
                    <FeatureCard
                        title="Προέλευση Premium"
                        description="Κόκκοι ηθικής προέλευσης από τα καλύτερα ηφαιστειακά εδάφη, καβουρδισμένοι στην εντέλεια εδώ."
                        icon={<Heart className="w-8 h-8 text-passion" />}
                        delay={0.2}
                    />
                    <FeatureCard
                        title="Limited Edition"
                        description="Διαθέσιμο μόνο για αυτόν τον Φεβρουάριο. Ένα προφίλ γεύσης που δεν θα ξαναβρείτε."
                        icon={<Star className="w-8 h-8 text-gold" />}
                        delay={0.4}
                    />
                    <FeatureCard
                        title="Βελούδινη Επίγευση"
                        description="Νότες από μαύρη σοκολάτα, άγρια μούρα και μια υποψία μπαχαρικών."
                        icon={<Flame className="w-8 h-8 text-orange-500" />}
                        delay={0.6}
                    />
                </div>
            </section>

            {/* 3) Testimonials Carousel (60-80%) */}
            <TestimonialsSection />

            {/* 3.5) Location / Map Section */}
            <section className="min-h-[60vh] flex flex-col items-center justify-center py-20 relative">
                <div className="max-w-7xl mx-auto w-full px-6 flex flex-col md:flex-row gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="w-full md:w-1/2 h-[400px] rounded-2xl overflow-hidden border border-white/10 z-10 shadow-2xl"
                    >
                         {/* Google Maps Embed - Dark Mode via CSS Filter */}
                        <iframe
                            src="https://maps.google.com/maps?q=%CE%95%CE%BB%CE%B5%CF%85%CE%B8%CE%B5%CF%81%CE%AF%CE%BF%CF%85%20%CE%92%CE%B5%CE%BD%CE%B9%CE%B6%CE%AD%CE%BB%CE%BF%CF%85%20%26%20%CE%A0%CE%AD%CE%B9%CE%BD%2036%2C%20%CE%9B%CE%BF%CF%85%CF%84%CF%81%CE%AC%CE%BA%CE%B9%20203%2000&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="w-full md:w-1/2 text-left"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin className="w-6 h-6 text-passion" />
                            <span className="text-gold tracking-widest text-sm uppercase font-bold">Τοποθεσία</span>
                        </div>
                        <h2 className="text-4xl font-serif text-white mb-6">Στην καρδιά του Λουτρακίου</h2>
                         <p className="text-white/70 text-lg mb-6 leading-relaxed">
                            Βρείτε μας σε ένα από τα πιο κεντρικά σημεία. <br/>
                            Απολαύστε τον καφέ σας δίπλα στη θάλασσα και νιώστε την αύρα του Κορινθιακού.
                        </p>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                            <p className="text-xl text-white font-medium mb-2">IGUAZU LOUTRAKI</p>
                            <p className="text-white/60">Ελευθερίου Βενιζέλου & Πέιν 36, Λουτράκι 203 00</p>
                             <div className="mt-4 flex gap-4">
                                <a href="tel:+302744066061" className="text-passion hover:underline font-medium">
                                    +30 2744 066061
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 4) CTA (85-100%) */}
            <section className="h-[80vh] flex items-end justify-center pb-24 relative pointer-events-none">
                <div className="text-center z-10">
                    <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 drop-shadow-2xl">
                        Ζήστε την Εμπειρία.
                    </h2>
                    <div className="flex gap-4 justify-center pointer-events-auto">
                        <button className="px-10 py-4 bg-passion text-white rounded-full text-lg font-bold shadow-[0_0_30px_rgba(211,47,47,0.6)] hover:scale-105 transition-transform">
                            Τηλεφωνική Παραγγελία
                        </button>
                        <button className="px-10 py-4 bg-white text-obsidian rounded-full text-lg font-bold hover:bg-gray-200 transition-colors">
                            Επισκεφθείτε μας
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ title, description, icon, delay }: { title: string, description: string, icon: React.ReactNode, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay }}
            className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors group"
        >
            <div className="mb-6 p-4 rounded-full bg-white/5 w-fit group-hover:scale-110 transition-transform duration-500">
                {icon}
            </div>
            <h3 className="text-2xl font-serif text-white mb-4">{title}</h3>
            <p className="text-white/60 leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}

const testimonials = [
    {
        name: "Μαρία Κ.",
        role: "Local Guide",
        text: "Ο καλύτερος καφές στο Λουτράκι! Η ατμόσφαιρα είναι μοναδική και το προσωπικό πάντα χαμογελαστό.",
        rating: 5
    },
    {
        name: "Γιώργος Π.",
        role: "Coffee Lover",
        text: "Δοκίμασα το Valentine's blend και έμεινα έκπληκτος. Απίστευτη γεύση και άρωμα.",
        rating: 5
    },
    {
        name: "Ελένη Σ.",
        role: "Επισκέπτης",
        text: "Πανέμορφος χώρος, εξαιρετική θέα και πολύ προσεγμένο μενού. Το συνιστώ ανεπιφύλακτα!",
        rating: 5
    }
];

function TestimonialsSection() {
    return (
        <section className="min-h-[50vh] flex flex-col justify-center py-20 bg-black/20">
             <div className="max-w-7xl mx-auto w-full px-6">
                 <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="flex flex-col items-center text-center mb-12"
                 >
                     <div className="flex gap-1 mb-4">
                         {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-gold fill-gold" />)}
                     </div>
                     <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">Τι λένε οι πελάτες μας</h2>
                     <p className="text-white/50">4.9/5 Μέση βαθμολογία στο Google Maps</p>
                 </motion.div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {testimonials.map((t, idx) => (
                         <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            className="p-6 bg-white/5 rounded-xl border border-white/5"
                         >
                             <div className="flex gap-1 mb-4">
                                {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-gold fill-gold" />)}
                             </div>
                             <p className="text-white/80 italic mb-6">"{t.text}"</p>
                             <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-passion to-obsidian flex items-center justify-center text-white font-bold">
                                     {t.name[0]}
                                 </div>
                                 <div className="text-left">
                                     <p className="text-white font-medium text-sm">{t.name}</p>
                                     <p className="text-white/40 text-xs">{t.role}</p>
                                 </div>
                             </div>
                         </motion.div>
                     ))}
                 </div>
             </div>
        </section>
    );
}
