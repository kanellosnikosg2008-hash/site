"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const FRAME_COUNT = 192; // Total number of frames in the sequence

export default function CoffeeCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { scrollYProgress } = useScroll();

    // Smooth out the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30, // Higher damping = less rubber banding
        restDelta: 0.001
    });

    // Map scroll progress (0 to 1) to frame index (0 to FRAME_COUNT - 1)
    // We use a transform that outputs a float, so we can interpolate or floor it
    const currentFrame = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Handle Resize with DPI awareness
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const dpr = window.devicePixelRatio || 1;
                // Set physical size
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Loading Logic with Mobile Optimization
    useEffect(() => {
        const loadImages = async () => {
            const isMobile = window.innerWidth < 768;
            const step = isMobile ? 2 : 1; // Skip every other frame on mobile to save bandwidth/memory
            
            const loadedImages: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
            let loadedCount = 0;
            const totalToLoad = Math.ceil(FRAME_COUNT / step);

            const promises = [];

            for (let i = 1; i <= FRAME_COUNT; i += step) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    const paddedIndex = i.toString().padStart(3, '0');
                    img.src = `/sequence/frame_${paddedIndex}.jpg`;
                    
                    img.onload = () => {
                        loadedImages[i - 1] = img;
                        loadedCount++;
                        // Optional: Update a progress state here if we wanted to show %
                        resolve();
                    };
                    img.onerror = () => {
                        console.error(`Failed to load frame ${i}`);
                        resolve(); 
                    };
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            
            // Fill gaps for skipped frames (reuse previous frame)
            if (step > 1) {
                for (let i = 0; i < FRAME_COUNT; i++) {
                     if (!loadedImages[i]) {
                         // Find nearest previous encoded frame
                         let prev = i - 1;
                         while (prev >= 0 && !loadedImages[prev]) {
                             prev--;
                         }
                         if (prev >= 0) loadedImages[i] = loadedImages[prev];
                     }
                }
            }

            setImages(loadedImages as HTMLImageElement[]); // Cast ensuring we filled gaps
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    useEffect(() => {
        // Render loop
        const render = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Check if we have a valid context and image
            const frameIndex = Math.round(currentFrame.get());
            const image = images[frameIndex];

            if (image) {
                // Clear screen (black background is expected)
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Calculate scaling - USE 'CONTAIN' logic (Math.min) instead of 'COVER' (Math.max)
                // This ensures the entire image (text + cup) is visible
                const hRatio = canvas.width / image.width;
                const vRatio = canvas.height / image.height;
                const ratio = Math.max(hRatio, vRatio); // Use MAX ratio to ensure image fills screen (Cover)

                const centerShift_x = (canvas.width - image.width * ratio) / 2;
                const centerShift_y = (canvas.height - image.height * ratio) / 2;

                // Draw with high quality smoothing
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';

                ctx.drawImage(
                    image,
                    0,
                    0,
                    image.width,
                    image.height,
                    centerShift_x,
                    centerShift_y,
                    image.width * ratio,
                    image.height * ratio
                );
            }

            requestAnimationFrame(render);
        };

        if (isLoaded) {
            const animationId = requestAnimationFrame(render);
            return () => cancelAnimationFrame(animationId);
        }
    }, [isLoaded, currentFrame, images]);

    return (
        <div className="fixed inset-0 z-0 bg-obsidian pointer-events-none">
            <canvas
                ref={canvasRef}
                className="w-full h-full object-cover opacity-80" 
            />

            {/* 1. Cinematic Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_90%)]" />

            {/* 2. Film Grain Overlay */}
            <div className="absolute inset-0 bg-noise opacity-[0.08] mix-blend-overlay" />

            {/* 3. Velvet Color Grade */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-passion/10 mix-blend-color-dodge" />

            {/* 4. Floating Embers */}
            <Particles />

            {!isLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 bg-obsidian z-50">
                   <div className="w-16 h-16 border-4 border-passion/30 border-t-passion rounded-full animate-spin mb-4" />
                   <p className="font-serif tracking-widest text-sm animate-pulse">PREPARING AROMA...</p>
                </div>
            )}
        </div>
    );
}

function Particles() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Simple random particles
    const particles = Array.from({ length: 20 });

    return (
        <div className="absolute inset-0 overflow-hidden">
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-amber-200/40 blur-[1px]"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        opacity: 0,
                        scale: 0
                    }}
                    animate={{
                        y: [null, Math.random() * -100], // Move up
                        opacity: [0, 0.8, 0], // Fade in/out
                        scale: [0, Math.random() * 3 + 1, 0]
                    }}
                    transition={{
                        duration: Math.random() * 5 + 3,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "easeInOut"
                    }}
                    style={{
                        width: Math.random() * 4 + 1 + 'px',
                        height: Math.random() * 4 + 1 + 'px',
                    }}
                />
            ))}
        </div>
    );
}
